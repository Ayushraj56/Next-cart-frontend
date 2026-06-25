'use client'

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import { fetchProducts } from "@/lib/actions/fetchProducts";
import { fetchCategories } from "@/lib/actions/fetchCategories";
import { fetchBrands } from "@/lib/actions/fetchBrands";

export default function Home() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, [dispatch]);

    return (
        <div>
            <Hero />
            <LatestProducts />
            <BestSelling />
            <OurSpecs />
            <Newsletter />
        </div>
    );
}