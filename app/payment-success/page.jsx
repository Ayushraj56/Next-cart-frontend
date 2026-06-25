"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {

    const router = useRouter();

    useEffect(() => {

        const timer = setTimeout(() => {

            router.push("/orders");

        }, 3000);

        return () => clearTimeout(timer);

    }, []);

    return (

        <div className="min-h-screen flex items-center justify-center">

            <div className="text-center">

                <h1 className="text-4xl font-bold text-green-600">
                    Payment Successful
                </h1>

                <p className="mt-4">
                    Redirecting to My Orders...
                </p>

            </div>

        </div>

    );

}