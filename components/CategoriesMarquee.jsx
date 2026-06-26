"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CategoriesMarquee = () => {

    const [categories, setCategories] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get("http://localhost:3200/api/category");
                setCategories(res.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    if (categories.length === 0) return null;

    const doubled = [...categories, ...categories];

    return (
        <section className="w-full py-10 overflow-hidden">

            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 mb-6 flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-1">
                        Browse by
                    </p>
                    <h2 className="text-2xl font-bold text-slate-800">
                        Shop Categories
                    </h2>
                </div>
                <button
                    onClick={() => router.push("/shop")}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-all"
                >
                    View All →
                </button>
            </div>

            {/* Marquee wrapper */}
            <div className="relative select-none">

                {/* Left fade */}
                <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                {/* Right fade */}
                <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                {/* Scrolling track */}
                <div className="flex animate-[marqueeScroll_40s_linear_infinite] hover:[animation-play-state:paused] w-max gap-3 px-4">
                    {doubled.map((category, index) => (
                        <button
                            key={`${category._id}-${index}`}
                            onClick={() => router.push(`/shop?categoryId=${category._id}`)}
                            className="group/card bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 rounded-2xl px-6 py-3 shadow-sm hover:shadow-md hover:shadow-indigo-100 transition-all duration-200 whitespace-nowrap"
                        >
                            <span className="text-sm font-semibold text-slate-600 group-hover/card:text-indigo-700 transition-colors duration-200">
                                {category.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoriesMarquee;