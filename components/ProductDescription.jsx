'use client'

import { useState } from "react"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-18 text-sm text-slate-600 px-4 sm:px-0">

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 mb-6 max-w-2xl">

                {['Description', 'Product Info'].map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedTab(tab)}
                        className={`${
                            tab === selectedTab
                                ? 'border-b-[1.5px] font-semibold'
                                : 'text-slate-400'
                        } px-3 py-2 font-medium`}
                    >
                        {tab}
                    </button>
                ))}

            </div>

            {/* Description */}
            {selectedTab === "Description" && (
                <div className="space-y-4">

                    <p className="max-w-full">
                        {product.description || "No description available"}
                    </p>

                </div>
            )}

            {/* Product Info */}
            {selectedTab === "Product Info" && (
                <div className="space-y-3">

                    <p>
                        <strong>Name:</strong> {product.name}
                    </p>

                    <p>
                        <strong>Price:</strong> ₹
                        {Number(product.price).toLocaleString("en-IN")}
                    </p>

                    <p>
                        <strong>Brand:</strong>{" "}
                        {product.brand?.name || "N/A"}
                    </p>

                    <p>
                        <strong>Category:</strong>{" "}
                        {product.category?.name || "N/A"}
                    </p>

                </div>
            )}

        </div>
    )
}

export default ProductDescription