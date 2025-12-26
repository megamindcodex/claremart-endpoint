import { Sale } from "../models/sale.model.js";
import { Product } from "../models/product.model.js";



export const initiateSale = async () => {
  try {

    const newSale = {
      status: "OPEN",
      items: [],
      subtotal: 0,
      tax: 0,
      total: 0,
      closedAt: null,
    }

    const sale = await Sale.create(newSale);
    console.log("New sale initiated:", sale);

    return { success: true, message: "new sale initiated", data: sale };
  } catch (err) {
    console.error("initiateSale error:", err);
    throw err
  }
}


export const fetchAllSaleTransactions = async () => {
  try {
    const saleTransactions = await Sale.find()


    console.log(saleTransactions)
    return { success: true, message: "all sales fetched successFully", data: saleTransactions }

  } catch (err) {
    console.error("fetch All Sale error: ", err)
    throw err
  }
}

export const fetchSaleTransaction = async (saleId) => {
  try {
    console.log(saleId)
    const sale = await Sale.findById(saleId);

    if (!sale) {
      return { success: false, message: "Sale transaction not found" };
    }

    console.log(`sale with the _id: ${sale._id} Fetched`)
    return { success: true, message: "Sale transaction fetched successfully", data: sale };

  } catch (err) {
    console.error("fetchSaleTransaction error:", err);
    throw err
  }
}



export const addItemToSaleTransaction = async (saleId, sku) => {
  try {
    //console.log("product sku: ", sku )
    const product = await Product.findOne({ sku: sku })

    if (!product || product.stockQuantity <= 0) {
      console.log("Product not available in stuck")
      return { success: false, message: "Product not available in stuck" }
    }


    //incremente existing item
    const sale = await Sale.findOneAndUpdate(
      {
        _id: saleId,
        status: "OPEN",
        "items.sku": sku
      },
      {
        $inc: {
          "items.$.quantity": 1,
          "items.$.lineTotal": product.price,
          subtotal: product.price
        }
      },
      { new: true }
    )

    if (sale) {
      console.log("item quantity incremented successfully")
      return { success: true, message: "Item quantity incremented sucessfully" }
    }

    // If item does not exist, push new item
    if (!sale) {
      const newSaleItem = {
        sku: product.sku,
        name: product.name,
        unitPrice: product.price,
        quantity: 1,
        lineTotal: product.price
      }
      await Sale.findOneAndUpdate(
        { _id: saleId, status: "OPEN" },
        {
          $push: { items: newSaleItem },
          $inc: {
            subtotal: product.price
          }
        }
      )
    }

    // Decrement stock
    await Product.updateOne(
      { sku },
      { $inc: { stockQuantity: -1 } }
    )

    return { success: true, message: "Item added to sale" }

  } catch (err) {
    console.error("Add item to sale transaction error:", err)
    throw err
  }
}


export const decrementItemFromSale = async (saleId, sku) => {
  try {
    const sale = await Sale.findOne(
      { _id: saleId, status: "OPEN", "items.sku": sku },
      { "items.$": 1 }
    )

    if (!sale) {
      return { success: false, message: "Item not found in sale" }
    }

    const item = sale.items[0]

    if (item.quantity > 1) {
      await Sale.updateOne(
        { _id: saleId, status: "OPEN", "items.sku": sku },
        {
          $inc: {
            "items.$.quantity": -1,
            "items.$.lineTotal": -item.unitPrice,
            subTotal: -item.unitPrice
          }
        }
      )
    } else {
      await Sale.updateOne(
        { _id: saleId, status: "OPEN" },
        {
          $pull: { items: { sku } },
          $inc: { subTotal: -item.lineTotal }
        }
      )
    }

    await Product.updateOne(
      { sku },
      { $inc: { stockQuantity: 1 } }
    )

    return { success: true, message: "Item quantity drecremented" }

  } catch (err) {
    console.error("decrementItemFromSale error:", err)
    throw err
  }
}


export const removeItemFromSale = async (saleId, sku) => {
  try {
    // 1. Find the item to know its lineTotal
    const sale = await Sale.findOne(
      { _id: saleId, status: "OPEN", "items.sku": sku },
      { "items.$": 1 }
    )

    if (!sale) {
      return {
        success: false,
        message: "Item not found in open sale"
      }
    }

    const item = sale.items[0]

    // 2. Remove the item and adjust subtotal
    await Sale.updateOne(
      { _id: saleId, status: "OPEN" },
      {
        $pull: { items: { sku } },
        $inc: { subTotal: -item.lineTotal }
      }
    )

    return {
      success: true,
      message: "Item removed from sale"
    }

  } catch (err) {
    console.error("removeItemFromSale error:", err)
    throw err
  }
}



export const clearSaleItems = async (saleId) => {
  try {
    const result = await Sale.updateOne(
      { _id: saleId, status: "OPEN" },
      {
        $set: {
          items: [],
          subTotal: 0,
          tax: 0,
          total: 0
        }
      }
    )

    if (result.matchedCount === 0) {
      return {
        success: false,
        message: "Open sale transaction not found"
      }
    }

    return {
      success: true,
      message: "All sale items cleared successfully"
    }

  } catch (err) {
    console.error("clearSaleItems error:", err)
    throw err
  }
}


export const updateSaleStatus = async (saleId, status) => {
  try {
    const result = await Sale.findOneAndUpdate(
      { _id: saleId, status: "OPEN" },
      {
        $set: { status: status }
      }
    )

    if (result.matchedCount === 0) {
      return {
        success: false,
        message: "Open sale transaction not found"
      }
    }

    return {
      success: true,
      message: `sale transaction cancl ${status}`
    }
  } catch (err) {
    console.error("cancleSaleTransaction error", err)
    throw err
  }
}