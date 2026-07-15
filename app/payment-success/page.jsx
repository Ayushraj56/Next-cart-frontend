"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { baseAPI } from "@/lib/constants";

export default function PaymentSuccess() {

    const router = useRouter();
    const [status, setStatus] = useState("checking"); // checking | timeout

    useEffect(() => {

        let attempts = 0;
        const maxAttempts = 12;   // 12 tries
        const intervalMs = 1500;  // every 1.5s → up to ~18s total
        let cancelled = false;

        const poll = async () => {
            attempts++;

            try {
                const res = await axios.get(`${baseAPI}/api/order/my-orders`, {
                    withCredentials: true,
                });

                const orders = res.data.orders || [];

                const justPaid = orders.find(o =>
                    o.paymentMethod === "RAZORPAY" &&
                    (Date.now() - new Date(o.createdAt).getTime()) < 5 * 60 * 1000
                );

                if (justPaid) {
                    if (!cancelled) router.push("/orders");
                    return;
                }
            } catch (error) {
                console.log(error);
            }

            if (attempts < maxAttempts) {
                setTimeout(poll, intervalMs);
            } else {
                if (!cancelled) setStatus("timeout");
            }
        };

        poll();

        return () => {
            cancelled = true;
        };

    }, []);

    return (

        <div className="min-h-screen flex items-center justify-center px-6">

            <div className="text-center">

                {status === "checking" ? (
                    <>
                        <h1 className="text-4xl font-bold text-green-600">
                            Payment Successful
                        </h1>

                        <div className="w-8 h-8 mx-auto mt-6 border-4 border-slate-300 border-t-green-600 rounded-full animate-spin" />

                        <p className="mt-4 text-slate-500">
                            Confirming your order...
                        </p>
                    </>
                ) : (
                    <>
                        <h1 className="text-2xl font-semibold text-slate-700">
                            Payment received
                        </h1>

                        <p className="mt-3 text-slate-500">
                            Your order is still being finalized. Please check
                            My Orders in a moment.
                        </p>

                        <button
                            onClick={() => router.push("/orders")}
                            className="mt-6 px-6 py-2.5 bg-slate-700 text-white rounded-full"
                        >
                            Go to My Orders
                        </button>
                    </>
                )}

            </div>

        </div>

    );

}