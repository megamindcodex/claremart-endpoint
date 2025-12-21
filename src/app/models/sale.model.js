import mongoose from "mongoose";

const saleItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    unitPrice: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    lineTotal: { type: Number, required: true, min: 0 },
}, { _id: false }); // Disable _id for subdocument schema

const saleSchema = new mongoose.Schema({
    status: { type: String, enum: ["OPEN", "CLOSED", "CANCELLED"], default: "OPEN" },
    items: { type: [saleItemSchema], default: [] },
    subtotal: { type: Number, required: true, default: 0, },
    tax: { type: Number, required: true, default: 0, },
    total: { type: Number, required: true, default: 0, },
    closedAt: { type: Date, default: null },
}, { timestamps: true })


export const Sale = mongoose.model("Sale", saleSchema);



