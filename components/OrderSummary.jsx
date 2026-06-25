'use client'

import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '₹';
    const shippingCharge = 50;
    const finalTotal = totalPrice + shippingCharge;

    const router = useRouter();

    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');

    useEffect(() => {
        if (addressList.length > 0 && !selectedAddress) {
            setSelectedAddress(addressList[addressList.length - 1]);
        }
    }, [addressList]);

    const handleCouponCode = async (event) => {
        event.preventDefault();
        // Coupon logic here
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        try {
            console.log("Selected Address:", selectedAddress);

            if (!selectedAddress) {
                toast.error("Please select address");
                return;
            }

            const res = await axios.post(
                "http://localhost:3200/api/order/create",
                {
                    addressId: selectedAddress._id,
                    shippingCharge,
                },
                { withCredentials: true }
            );

            console.log(res.data);
            toast.success("Order Placed Successfully");
            router.push("/orders");

        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Failed to place order");
        }
    };

    const handleRazorpayPayment = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3200/api/payment/create-payment-link",
                {},
                { withCredentials: true }
            );

            window.location.href = res.data.payment_link;

        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className='w-full max-w-lg lg:max-w-[340px] bg-slate-50/30 border border-slate-200 text-slate-500 text-sm rounded-xl p-7'>

            <h2 className='text-xl font-medium text-slate-600'>
                Payment Summary
            </h2>

            <p className='text-slate-400 text-xs my-4'>
                Payment Method
            </p>

            <div className='flex gap-2 items-center'>
                <input
                    type="radio"
                    id="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className='accent-gray-500'
                />
                <label htmlFor="COD" className='cursor-pointer'>
                    COD
                </label>
            </div>

            <div className='flex gap-2 items-center mt-1'>
                <input
                    type="radio"
                    id="RAZORPAY"
                    checked={paymentMethod === 'RAZORPAY'}
                    onChange={() => setPaymentMethod('RAZORPAY')}
                    className='accent-gray-500'
                />
                <label htmlFor="RAZORPAY" className='cursor-pointer'>
                    Razorpay Payment
                </label>
            </div>

            <div className='my-4 py-4 border-y border-slate-200 text-slate-400'>

                <p>Address</p>

                {selectedAddress ? (

                    <div className='mt-3'>
                        <div className='flex items-center gap-2'>
                            <p className='text-slate-600 text-xs'>
                                {selectedAddress.fullName}<br />
                                {selectedAddress.addressLine1}
                                {selectedAddress.addressLine2 && `, ${selectedAddress.addressLine2}`}
                                <br />
                                {selectedAddress.city}, {selectedAddress.state}
                                <br />
                                {selectedAddress.country}{' - '}{selectedAddress.pincode}
                                <br />
                                Phone: {selectedAddress.phone}
                                {' '}email: {selectedAddress.email}
                            </p>

                            <SquarePenIcon
                                size={18}
                                className='cursor-pointer'
                                onClick={() => setSelectedAddress(null)}
                            />
                        </div>
                    </div>

                ) : (

                    <div>
                        {addressList.length > 0 && (
                            <select
                                className='border border-slate-400 p-2 w-full my-3 outline-none rounded'
                                onChange={(e) => setSelectedAddress(addressList[e.target.value])}
                            >
                                <option value="">Select Address</option>
                                {addressList.map((address, index) => (
                                    <option key={address._id} value={index}>
                                        {address.fullName}, {address.city}, {address.state}, {address.pincode}
                                    </option>
                                ))}
                            </select>
                        )}

                        <button
                            className='flex items-center gap-1 text-slate-600 mt-1'
                            onClick={() => setShowAddressModal(true)}
                        >
                            Add Address
                            <PlusIcon size={18} />
                        </button>
                    </div>

                )}

            </div>

            <div className='pb-4 border-b border-slate-200'>

                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1 text-slate-400'>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        {coupon && <p>Coupon:</p>}
                    </div>

                    <div className='flex flex-col gap-1 font-medium text-right'>
                        <p>{currency}{totalPrice.toLocaleString()}</p>
                        <p>{currency}{shippingCharge}</p>
                        {coupon && (
                            <p>-{currency}{(coupon.discount / 100 * totalPrice).toFixed(2)}</p>
                        )}
                    </div>
                </div>

                {!coupon ? (

                    <form
                        onSubmit={(e) =>
                            toast.promise(handleCouponCode(e), { loading: 'Checking Coupon...' })
                        }
                        className='flex justify-center gap-3 mt-3'
                    >
                        <input
                            type="text"
                            placeholder='Coupon Code'
                            value={couponCodeInput}
                            onChange={(e) => setCouponCodeInput(e.target.value)}
                            className='border border-slate-400 p-1.5 rounded w-full outline-none'
                        />
                        <button className='bg-slate-600 text-white px-3 rounded'>
                            Apply
                        </button>
                    </form>

                ) : (

                    <div className='w-full flex items-center justify-center gap-2 text-xs mt-2'>
                        <p>
                            Code:
                            <span className='font-semibold ml-1'>
                                {coupon.code.toUpperCase()}
                            </span>
                        </p>
                        <XIcon
                            size={18}
                            onClick={() => setCoupon('')}
                            className='cursor-pointer'
                        />
                    </div>

                )}

            </div>

            <div className='flex justify-between py-4'>
                <p>Total:</p>
                <p className='font-medium text-right'>
                    {currency}
                    {coupon
                        ? (finalTotal - (coupon.discount / 100 * finalTotal)).toFixed(2)
                        : finalTotal.toLocaleString()
                    }
                </p>
            </div>

            <button
                onClick={(e) => {
                    if (paymentMethod === 'COD') {
                        toast.promise(
                            handlePlaceOrder(e),
                            { loading: 'Placing Order...' }
                        );
                    } else {
                        handleRazorpayPayment();
                    }
                }}
                className='w-full bg-slate-700 text-white py-2.5 rounded'
            >
                Place Order
            </button>

            {showAddressModal && (
                <AddressModal setShowAddressModal={setShowAddressModal} />
            )}

        </div>

    );

};

export default OrderSummary;