'use client';

import PageTitle from "@/components/PageTitle";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchOrders = async () => {

            try {

                const res = await axios.get(
                    "http://localhost:3200/api/order/my-orders",
                    {
                        withCredentials: true,
                    }
                );

                setOrders(res.data.orders || []);

            } catch (error) {

                console.log(error);

            } finally {

                setLoading(false);

            }

        };

        fetchOrders();

    }, []);

    if (loading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-[70vh] mx-6">

            {orders.length > 0 ? (

                <div className="my-20 max-w-7xl mx-auto">

                    <PageTitle
                        heading="My Orders"
                        text={`Showing total ${orders.length} orders`}
                        linkText="Go to home"
                    />

                    <div className="space-y-8 mt-10">

                        {orders.map((order) => (

                            <div
                                key={order._id}
                                className="bg-white border rounded-2xl shadow-sm p-6"
                            >

                                <div className="flex items-center justify-between border-b pb-4">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Order ID
                                        </p>

                                        <p className="font-semibold">
                                            {order.orderId}
                                        </p>
                                    </div>

                                    <div>
                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-medium
                                            ${order.status === "Pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : order.status === "Accepted"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : order.status === "Shipped"
                                                            ? "bg-purple-100 text-purple-700"
                                                            : "bg-green-100 text-green-700"
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>

                                </div>

                                <div className="mt-6 space-y-6">

                                    {order.products?.map((item, index) => (

                                        <div
                                            key={index}
                                            className="flex gap-5"
                                        >

                                            <Image
                                                src={
                                                    item.productId?.images?.[0] ||
                                                    "/placeholder.png"
                                                }
                                                alt={
                                                    item.productId?.name ||
                                                    "Product"
                                                }
                                                width={100}
                                                height={100}

                                                className="w-28 h-28 object-cover rounded-xl border"
                                            />

                                            <div className="flex-1">

                                                <h2 className="font-semibold text-lg">
                                                    {item.productId?.name}
                                                </h2>

                                                <p className="text-gray-500 mt-1">
                                                    Quantity:
                                                    {" "}
                                                    {item.quantity}
                                                </p>

                                                <p className="text-gray-500">
                                                    Price:
                                                    {" "}
                                                    ₹{item.price}
                                                </p>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                <div className="grid md:grid-cols-2 gap-8 mt-8 border-t pt-6">

                                    <div>

                                        <h3 className="font-semibold text-lg mb-3">
                                            Delivery Address
                                        </h3>

                                        <p>
                                            {order.addressId?.fullName}
                                        </p>

                                        <p>
                                            {order.addressId?.address}
                                        </p>

                                        <p>
                                            {order.addressId?.city},
                                            {" "}
                                            {order.addressId?.state}
                                        </p>

                                        <p>
                                            {order.addressId?.phone}
                                        </p>

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-lg mb-3">
                                            Payment Summary
                                        </h3>

                                        <div className="space-y-2">

                                            <div className="flex justify-between">
                                                <span>Subtotal</span>
                                                <span>
                                                    ₹{order.subtotal}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Shipping</span>
                                                <span>
                                                    ₹{order.shippingCharge}
                                                </span>
                                            </div>

                                            <div className="flex justify-between">
                                                <span>Payment Method</span>
                                                <span>
                                                    {order.paymentMethod}
                                                </span>
                                            </div>

                                            <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                                <span>Total</span>
                                                <span>
                                                    ₹{order.total}
                                                </span>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="mt-6 border-t pt-4">

                                    <p className="text-sm text-gray-500">
                                        Ordered On :
                                        {" "}
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                </div>

            ) : (

                <div className="min-h-[80vh] flex items-center justify-center text-slate-400">
                    <h1 className="text-2xl sm:text-4xl font-semibold">
                        You have no orders
                    </h1>
                </div>

            )}

        </div>
    );
}