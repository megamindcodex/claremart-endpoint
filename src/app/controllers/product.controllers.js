
import { createProduct, addBulkProduct, fetchAllProductsInStock, getProduct, changStockQuantity } from "../services/product-services.js" // 'inc' stands for increment





export const createProduct_controller = async (req, res) => {
  try {
    const productData = req.body
    const result = await createProduct(productData)

    if (!result.success) {
      return res.status(400).json({ message: result.message })
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

export const addBulkProduct_controller = async (req, res) => {
  try {
    const products = req.body
    //console.log(products)

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        message: "Request body must be a non-empty array of products"
      })
    }

    const result = await addBulkProduct(products)

    return res.status(201).json({
      message: result.message,
      insertedCount: result.insertedCount,
      products: result.products
    })
  } catch (err) {
    console.error("Add bulk product error", err)

    const status = err.statusCode || 500
    const message =
      status === 500
        ? "Internal server error"
        : error.message

    return res.status(status).json({ message })
  }
}

export const fetchAllProductsInStock_controller = async (req, res) => {
  try {
    const result = await fetchAllProductsInStock()
    res.status(200).json({ message: result.message, products: result.data })
  } catch (err) {
    console.error(" fetch all product in stock error", err)
    const status = err.statusCode || 500
    const message = status === 500 ? "Internal server error" : err.message
    return res.status(status).json({ message })
  }
}


export const getProduct_controller = async (req, res) => {
  try {
    const { sku } = req.params
    //console.log(sku)
    const result = await getProduct(sku)
    console.log(result)

    if (!result.success) {
      return res.status(404).json({ message: result.message, product: result.data })
    }
    console.log("product: ", result.data)
    return res.status(200).json({ message: result.mesaage, product: result.data })
  } catch (err) {
    console.error("fetch product Error: ", err)
    const status = err.statusCode || 500
    const message = status === 500 ? "Internal server error" : err.message
    return res.status(status).json({ message })
  }
}

export const changStockQuantity_controller = async (req, res) => {// 'inc' stands for increment
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