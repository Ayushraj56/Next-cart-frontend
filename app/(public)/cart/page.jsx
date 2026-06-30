'use client'

import axios from "axios";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useDispatch } from "react-redux";
import { setAddresses } from "@/lib/features/address/addressSlice";

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";

    const router = useRouter();
    const dispatch = useDispatch();
    const { user, loading: authLoading } = useAuth();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const loadCart = async () => {
        try {
            const res = await axios.get(`${baseAPI}/api/cart`, {
                withCredentials: true,
            });

            const items = res.data;
            setCartArray(items);

            let total = 0;
            items.forEach((item) => {
                total += item.productId.price * item.quantity;
            });
            setTotalPrice(total);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteItem = async (cartId) => {
        try {
            await axios.delete(`${baseAPI}/api/cart/${cartId}`, {
                withCredentials: true,
            });

            window.dispatchEvent(new Event("cartUpdated"));
            loadCart();
        } catch (error) {
            console.log(error);
        }
    };

    const loadAddresses = async () => {
        try {
            const res = await axios.get(`${baseAPI}/api/address`, {
                withCredentials: true,
            });
            dispatch(setAddresses(res.data.addresses));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            router.push("/login");
            return;
        }
        loadCart();
        loadAddresses();
    }, [authLoading, user]);

    return cartArray.length > 0 ? (

        <div className="min-h-screen mx-3 sm:mx-6 text-slate-800">
            <div className="max-w-7xl mx-auto">

                <PageTitle
                    heading="My Cart"
                    text="items in your cart"
                    linkText="Add more"
                />

                {/* ✅ flex row: table on left, OrderSummary on right */}
                <div className="flex flex-col gap-5 lg:flex-row items-start justify-between">

                    {/* ✅ Table wrapper — OrderSummary is NOT inside here */}
                    <div className="w-full overflow-x-auto">
                        <table className="min-w-[640px] w-full max-w-full text-slate-600 table-auto">

                            <thead>
                                <tr>
                                    <th className="text-left">Product</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cartArray.map((item) => (
                                    <tr key={item._id}>

                                        <td className="flex gap-3 my-4">
                                            <div className="flex items-center justify-center bg-slate-100 w-16 h-16 rounded-md overflow-hidden">
                                                <Image
                                                    src={item.productId?.images?.[0] || "/placeholder.png"}
                                                    alt={item.productId?.name || "Product"}
                                                    width={64}
                                                    height={64}
                                                    className="object-contain w-full h-full"
                                                />
                                            </div>

                                            <div>
                                                <p>{item.productId?.name}</p>
                                                <p className="text-xs text-slate-500">
                                                    {item.productId?.category?.name}
                                                </p>
                                                <p>{currency}{item.productId?.price}</p>
                                            </div>
                                        </td>

                                        <td className="text-center">
                                            <div className="flex items-center justify-center gap-3">

                                                <button
                                                    onClick={async () => {
                                                        await axios.put(
                                                            `${baseAPI}/api/cart/decrease/${item._id}`,
                                                            {},
                                                            { withCredentials: true }
                                                        );
                                                        loadCart();
                                                        window.dispatchEvent(new Event("cartUpdated"));
                                                    }}
                                                    className="px-2 py-1 border rounded"
                                                >
                                                    -
                                                </button>

                                                <span>{item.quantity}</span>

                                                <button
                                                    onClick={async () => {
                                                        await axios.put(
                                                            `${baseAPI}/api/cart/increase/${item._id}`,
                                                            {},
                                                            { withCredentials: true }
                                                        );
                                                        loadCart();
                                                        window.dispatchEvent(new Event("cartUpdated"));
                                                    }}
                                                    className="px-2 py-1 border rounded"
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </td>

                                        <td className="text-center">
                                            {currency}
                                            {(item.productId.price * item.quantity).toLocaleString("en-IN")}
                                        </td>

                                        <td className="text-center">
                                            <button
                                                onClick={() => handleDeleteItem(item._id)}
                                                className="text-red-500"
                                            >
                                                <Trash2Icon size={18} />
                                            </button>
                                        </td>

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    {/* ✅ OrderSummary is a sibling to the table wrapper, not nested inside */}
                    <OrderSummary
                        totalPrice={totalPrice}
                        items={cartArray}
                    />

                </div>
            </div>
        </div>

    ) : (

        <div className="min-h-[80vh] flex items-center justify-center">
            <h1 className="text-4xl text-slate-400 font-semibold">
                Your cart is empty
            </h1>
        </div>

    );
}