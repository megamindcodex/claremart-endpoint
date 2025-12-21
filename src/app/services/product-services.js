import { Product } from "../models/product.model.js"



export const createProduct = async (productData) => {
    try {
        const { category, name, sku, price, taxable, quantity } = productData

        const newProduct = {
            category: category,
            name: name,
            sku: sku,
            price: price,
            isTaxable: taxable,
            stockQuantity: quantity
        }

        const result = await Product.create(newProduct)

        return { success: true, message: "Product added successfully", data: result }

    } catch (err) {
        console.error("add new product error: ", err)
        throw err
    }
}



export const incStockQuantity = async (sku, quantity) => { // 'inc' stands for increment
    try {
        const product = await Product.findOne({ sku: sku })

        if (!product) {
            return { success: false, message: "Product not found" }
        }

        product.stockQuantity = quantity
        await product.save()

        return { success: true, message: "Stock quantity updated successfully", data: product }
    } catch (err) {
        console.error("add stock quantity error: ", err)
        throw err
    }
}


// export const fetchProduct = async (sku) => {
//     try {
//         const product = await Product.findOne({ sku: sku })

//         if (!product) {
//             return { success: false, message: "Product not found" }
//         }

//         return { success: true, message: "Product fetched successfully", data: product }
//     } catch (err) {
//         console.error("fetch product error: ", err)
//         throw err
//     }
// }