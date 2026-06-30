'use client';

import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { baseAPI } from "@/lib/constants";

export default function Product() {

    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [productLoading, setProductLoading] = useState(true);


    const router = useRouter();
    const { user, loading } = useAuth();

    // Check Login
    useEffect(() => {

        if (!loading && !user) {

            router.push("/login");

        }

    }, [user, loading]);

    // Load Product From Pipeline API
    useEffect(() => {

        const loadProduct = async () => {

            try {

                const res = await fetch(
                    `${baseAPI}/api/product/${productId}`,
                    {
                        credentials: "include",
                    }
                );

                const data = await res.json();

                if (data.success) {
                    setProduct(data.product);
                }

            } catch (error) {

                console.log(error);

            } finally {

                setProductLoading(false);

            }

            window.scrollTo(0, 0);

        };

        if (productId) {
            loadProduct();
        }

    }, [productId]);

    if (productLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <h1 className="text-xl">
                    Loading...
                </h1>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <h1 className="text-xl text-red-500">
                    Product Not Found
                </h1>
            </div>
        );
    }

    return (
        <div className="mx-6">

            <div className="max-w-7xl mx-auto">

                <div className="text-gray-600 text-sm mt-8 mb-5">
                    Home / Products / {product.name}
                </div>

                <ProductDetails
                    product={product}
                />

                <ProductDescription
                    product={product}
                />

            </div>

        </div>
    );
}