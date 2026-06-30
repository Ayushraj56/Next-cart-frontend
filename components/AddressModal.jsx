'use client';

import { XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { baseAPI } from "@/lib/constants";
import { addAddress } from "@/lib/features/address/addressSlice";

const AddressModal = ({ setShowAddressModal }) => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        email: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
    });

    const handleAddressChange = (e) => {

        setAddress({
            ...address,
            [e.target.name]: e.target.value,
        });

    };
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                `${baseAPI}/api/address`,
                address,
                {
                    withCredentials: true,
                }
            );
        
            

            dispatch(
            addAddress(res.data.address)
        );

        setShowAddressModal(false);

        toast.success("Address Added");

    } catch (error) {

        console.log(error);

        toast.error("Failed to add address");

    }

};

return (

    <form
        onSubmit={handleSubmit}
        className="fixed inset-0 z-50 bg-white/60 backdrop-blur h-screen flex items-center justify-center"
    >

        <div className="flex flex-col gap-4 text-slate-700 w-full max-w-md mx-6 bg-white p-6 rounded-lg shadow-lg">

            <h2 className="text-3xl">
                Add New <span className="font-semibold">Address</span>
            </h2>

            <input
                name="fullName"
                value={address.fullName}
                onChange={handleAddressChange}
                className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                type="text"
                placeholder="Full Name"
                required
            />

            <input
                name="phone"
                value={address.phone}
                onChange={handleAddressChange}
                className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                type="text"
                placeholder="Phone Number"
                required
            />

            <input
                name="email"
                value={address.email}
                onChange={handleAddressChange}
                className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                type="email"
                placeholder="Email"
                required
            />

            <input
                name="addressLine1"
                value={address.addressLine1}
                onChange={handleAddressChange}
                className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                type="text"
                placeholder="Address Line 1"
                required
            />

            <input
                name="addressLine2"
                value={address.addressLine2}
                onChange={handleAddressChange}
                className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                type="text"
                placeholder="Address Line 2 (Optional)"
            />

            <div className="flex gap-4">

                <input
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                    type="text"
                    placeholder="City"
                    required
                />

                <input
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                    type="text"
                    placeholder="State"
                    required
                />

            </div>

            <div className="flex gap-4">

                <input
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                    type="text"
                    placeholder="Country"
                    required
                />

                <input
                    name="pincode"
                    value={address.pincode}
                    onChange={handleAddressChange}
                    className="p-2 px-4 outline-none border border-slate-200 rounded w-full"
                    type="text"
                    placeholder="Pincode"
                    required
                />

            </div>

            <button
                type="submit"
                className="bg-slate-800 text-white text-sm font-medium py-3 rounded-md hover:bg-slate-900 active:scale-95 transition-all"
            >
                SAVE ADDRESS
            </button>

        </div>

        <XIcon
            size={30}
            className="absolute top-5 right-5 text-slate-500 hover:text-slate-700 cursor-pointer"
            onClick={() => setShowAddressModal(false)}
        />

    </form>

);
};

export default AddressModal;