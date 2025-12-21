import { Sale } from "../models/sale.model.js";
import { Product } from "../models/product.model.js";



export const initiateSale = async (saleData) => {
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

export const fetchSaleTransaction = async (saleId) => {
    try {
        const sales = await Sale.findById(saleId);

        if (!sales) {
            return { success: false, message: "Sale transaction not found" };
        }

        return { success: true, message: "Sale transaction fetched successfully", data: sales };

    } catch (err) {
        console.error("fetchSaleTransaction error:", err);
        throw err
    }
}


export const addItemToSale = async (saleId, sku) => {
    try {
        // 1. Find product (read-only)
        const product = await Product.findOne({ sku })

        if (!product) {
            return { success: false, message: "Product not found" }
        }

        // 2. Try to increment existing sale item
        const incrementResult = await Sale.updateOne(
            {
                _id: saleId,
                "items.productId": product._id
            },
            {
                $inc: {
                    "items.$.quantity": 1,
                    "items.$.lineTotal": product.price
                }
            }
        )

        // 3. If item existed, we are done
        if (incrementResult.modifiedCount === 1) {
            return { success: true, message: "Item quantity incremented" }
        }

        // 4. Item does not exist → push new item
        const newSalesItem = {
            productId: product._id,
            name: product.name,
            unitPrice: product.price,
            quantity: 1,
            lineTotal: product.price
        }

        const pushResult = await Sale.updateOne(
            { _id: saleId },
            { $push: { items: newSalesItem } }
        )

        if (pushResult.modifiedCount === 0) {
            return { success: false, message: "Sale transaction not found" }
        }

        return { success: true, message: "Item added to sale" }

    } catch (err) {
        console.error("addItemToSale error:", err)
        throw err
    }
}
