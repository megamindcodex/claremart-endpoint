import { Product } from "../models/product.model.js"



export const createProduct = async (productData) => {
  try {
    const { category, name, sku, price, quantity, taxable } = productData

    const productExist = await Product.exists({ sku: sku })
    console.log(productExist)
    if (productExist) {
      return { success: false, message: "Product already in stock" }
    }


    const newProduct = {
      category: category,
      name: name,
      sku: sku,
      price: price,
      stockQuantity: quantity,
      isTaxable: taxable
    }

    const result = await Product.create(newProduct)

    return { success: true, message: "Product added successfully", data: result }

  } catch (err) {
    console.error("add new product error: ", err)
    throw err
  }
}

export const addBulkProduct = async (bulkProductsToAdd) => {
  try {
    //console.log(bulkProductsToAdd)
    const result = await Product.insertMany(bulkProductsToAdd)
    console.log(result)

    return { success: true, message: "bulk products added successfully", data: result }
  } catch (err) {
    console.error("Error adding bulk products", err)
    throw err
  }
}


export const fetchAllProductsInStock = async () => {
  try {
    const products = await Product.find({
      stockQuantity: { $gt: 0 }
    }, { name: 1, sku: 1, price: 1, stockQuantity: 1 })

    if (products.length === 0) {
      return {
        success: false,
        message: "No products in stock",
        data: []
      }
    }

    return {
      success: true,
      message: "All Products Fetched",
      data: products
    }
  } catch (error) {
    console.error("Fetch all products error", error)
    throw error
  }
}


export const changStockQuantity = async (sku, quantity) => { // 'inc' stands for increment
  try {
    const result = await Product.updateOne({ sku: sku }, { $set: { stockQuantity: quantity } })

    if (result.matchedCount === 0) {
      return { success: false, message: "product not found" }
    }


    return { success: true, message: "Stock quantity updated successfully", data: product }
  } catch (err) {
    console.error("add stock quantity error: ", err)
    throw err
  }
}



export const getProduct = async (sku) => {
  try {
    const product = await Product.findOne({ sku })

    if (!product) {
      console.log("product not found")
      return { success: true, message: "product not found" }
    }

    //console.log("product sku: ", product)

    return { success: true, message: "product fetched successfully", data: product }
  } catch (err) {
    console.error("fetch product Error: ", err)
    throw err
  }
}