
import { createProduct, incStockQuantity } from "../services/product-services.js" // 'inc' stands for increment





export const createProduct_controller = async (req, res) => {
    try {
        const productData = req.body
        const result = await createProduct(productData)
        
        if(!result.success) {
          return res.status(400).json({message: result.message})
        }

        res.status(201).json({ message: "Product created successfully", product: result.data })

    } catch (err) {
        console.error("create product controller error: ", err)
        const status = err.statusCode || 500
        const message =
            status === 500 ? "Internal server error" : err.message
        res.status(status).json({ message: message })
    }
}


export const incStockQuantity_controller = async (req, res) => {// 'inc' stands for increment
    try {
        const { sku, quantity } = req.body
        const result = await incStockQuantity(sku, quantity)

        if (!result.success) {
            console.error("update stock quantity controller error: ", result.message)
            return res.status(result.error.statusCode).json({ message: result.message })
        }

        res.status(200).json({ message: "Stock quantity updated successfully", product: result.data })

    } catch (err) {
        console.error("update stock quantity controller error: ", err)
        const status = err.statusCode || 500
        const message =
            status === 500 ? "Internal server error" : err.message
        res.status(status).json({ message: message })
    }
}