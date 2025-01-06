import React from 'react'
import ProductFilter from '../ProductFilter/ProductFilter'
import TabHeader from '../TabHeader/TabHeader'

export default function Product({ pageId, sectionId, language }) {
    return (
        <div>
            <TabHeader name={language === "ar" ? "المنتج" : "Product"} link={'/create-product'} language={language} /> {/* Header for the table */}
            <ProductFilter pageId={pageId} sectionId={sectionId} />
        </div>
    )
}
