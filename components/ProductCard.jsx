'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { StarIcon } from 'lucide-react'

const ProductCard = ({ product }) => {

    const currency =
        process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'Rs.'

    const rating = 0

    const imageUrl =
        product?.images?.length > 0
            ? product.images[0]
            : '/placeholder.png'

    return (
        <Link
            href={`/product/${product._id}`}
            className='group w-full'
        >
            <div className='bg-[#F5F5F5] w-full h-40 sm:h-56 rounded-lg flex items-center justify-center'>

                <Image
                    width={500}
                    height={500}
                    className='max-h-40 w-auto group-hover:scale-110 transition duration-300'
                    src={imageUrl}
                    alt={product.name}
                />

            </div>

            <div className='flex flex-col gap-2 text-sm text-slate-800 pt-2 w-full min-w-0 sm:flex-row sm:items-center sm:justify-between'>

                <div>
                    <p>{product.name}</p>

                    <div className='flex'>
                        {Array(5)
                            .fill('')
                            .map((_, index) => (
                                <StarIcon
                                    key={index}
                                    size={14}
                                    className='text-transparent mt-0.5'
                                    fill={
                                        rating >= index + 1
                                            ? '#00C950'
                                            : '#D1D5DB'
                                    }
                                />
                            ))}
                    </div>
                </div>

                <p>
                    {currency}
                    {product.price}
                </p>

            </div>
        </Link>
    )
}

export default ProductCard