'use client';

import { useState } from "react";
import axios from "axios";
import {
    StarIcon,
    EarthIcon,
    CreditCardIcon,
    UserIcon
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { baseAPI } from "@/lib/constants";

const ProductDetails = ({ product }) => {

    const router = useRouter();

    const productId = product._id;

    const currency =
        process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || "₹";

    const [isInCart, setIsInCart] =
        useState(product?.isInCart || false);

    const [mainImage, setMainImage] = useState(
        product?.images?.[0] || "/placeholder.png"
    );

    const handleAddToCart = async () => {

        try {

            await axios.post(
                `${baseAPI}/api/cart/add`,
                {
                    productId,
                    quantity: 1,
                },
                {
                    withCredentials: true,
                }
            );

            window.dispatchEvent(
                new Event("cartUpdated")
            );

            setIsInCart(true);

        } catch (error) {

            console.log(error);

        }

    };

    const averageRating = 0;

    return (
        <div className="flex flex-col lg:flex-row gap-12">

            {/* Images */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">

                <div className="flex sm:flex-col gap-3">

                    {product.images?.map((image, index) => (

                        <div
                            key={index}
                            onClick={() => setMainImage(image)}
                            className="bg-slate-100 flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-lg group cursor-pointer"
                        >
                            <Image
                                src={image}
                                alt={product.name}
                                width={70}
                                height={70}
                                className="group-hover:scale-105 transition"
                            />
                        </div>

                    ))}

                </div>

                <div className="flex justify-center items-center w-full h-[280px] sm:h-[360px] bg-slate-100 rounded-lg">

                    <Image
                        src={mainImage}
                        alt={product.name}
                        width={350}
                        height={350}
                        className="object-contain w-full h-full"
                    />

                </div>

            </div>

            {/* Product Info */}
            <div className="flex-1">

                <h1 className="text-3xl font-semibold text-slate-800">
                    {product.name}
                </h1>

                <div className="flex items-center mt-2">

                    {Array(5)
                        .fill("")
                        .map((_, index) => (

                            <StarIcon
                                key={index}
                                size={14}
                                className="text-transparent mt-0.5"
                                fill={
                                    averageRating >= index + 1
                                        ? "#00C950"
                                        : "#D1D5DB"
                                }
                            />

                        ))}

                    <p className="text-sm ml-3 text-slate-500">
                        No Reviews Yet
                    </p>

                </div>

                <div className="my-6 text-3xl font-semibold text-slate-800">

                    {currency}
                    {Number(product.price).toLocaleString("en-IN")}

                </div>

                <div className="space-y-3 text-slate-700">

                    <p>
                        <strong>Brand:</strong>{" "}
                        {product.brand?.name || "N/A"}
                    </p>

                    <p>
                        <strong>Category:</strong>{" "}
                        {product.category?.name || "N/A"}
                    </p>

                </div>

                <div className="mt-6">

                    <h3 className="font-semibold text-lg mb-2">
                        Description
                    </h3>

                    <p className="text-slate-600">
                        {product.description}
                    </p>

                </div>

                <div className="mt-10">

                    <button
                        onClick={() =>
                            isInCart
                                ? router.push("/cart")
                                : handleAddToCart()
                        }
                        className="w-full sm:w-auto bg-slate-800 text-white px-10 py-3 text-sm font-medium rounded hover:bg-slate-900 active:scale-95 transition"
                    >
                        {isInCart
                            ? "View Cart"
                            : "Add To Cart"}
                    </button>

                </div>

                <hr className="border-gray-300 my-5" />

                <div className="flex flex-col gap-4 text-slate-500">

                    <p className="flex gap-3">
                        <EarthIcon className="text-slate-400" />
                        Free shipping worldwide
                    </p>

                    <p className="flex gap-3">
                        <CreditCardIcon className="text-slate-400" />
                        100% Secured Payment
                    </p>

                    <p className="flex gap-3">
                        <UserIcon className="text-slate-400" />
                        Trusted by top brands
                    </p>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;