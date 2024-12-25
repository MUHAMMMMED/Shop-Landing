import React from 'react'
import ProductFilter from '../ProductFilter/ProductFilter'

export default function Product({ pageId, sectionId }) {
    return (
        <div>
            <ProductFilter pageId={pageId} sectionId={sectionId} />
        </div>
    )
}
