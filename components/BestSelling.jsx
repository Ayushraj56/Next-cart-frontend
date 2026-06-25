'use client'

import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'

const BestSelling = () => {

    const displayQuantity = 8

    const products = useSelector(
        state => state.product?.list || []
    )

    const bestSellingProducts = products
        .slice()
        .sort(
            (a, b) =>
                (b.soldCount || 0) -
                (a.soldCount || 0)
        )
        .slice(0, displayQuantity)

    return (
        <div className='px-6 my-16 max-w-6xl mx-auto'>

            <Title
                title='Best Selling'
                description={`Showing ${
                    bestSellingProducts.length
                } of ${products.length} products`}
                href='/shop'
            />

            <div className='mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>

                {bestSellingProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}

            </div>

        </div>
    )
}

export default BestSelling