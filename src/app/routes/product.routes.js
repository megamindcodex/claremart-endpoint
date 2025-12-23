import express from 'express';
import { createProduct_controller, addBulkProduct_controller, fetchAllProductsInStock_controller, getProduct_controller, changStockQuantity_controller } from "../controllers/product.controllers.js"
import productValidation from "../middleware/productValidation.js"



const router = express.Router();


router.post("/add-product", productValidation, createProduct_controller);
router.put("/update-stock-quantity", changStockQuantity_controller)// 'inc' stands for increment
router.post("/add-bulk-products", addBulkProduct_controller)
router.get("/fetch-all-products", fetchAllProductsInStock_controller)
router.get("/get-product/:sku", getProduct_controller)



export default router
