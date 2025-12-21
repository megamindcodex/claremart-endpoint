import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true, },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    isTaxable: { type: Boolean, default: true },
    stockQuantity: { type: Number, required: true, min: 0 }
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema);