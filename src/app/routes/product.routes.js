import express from 'express';
import { createProduct_controller, incStockQuantity_controller } from "../controllers/product.controllers.js"
import productValidation from "../middleware/productValidation.js"



const router = express.Router();


router.post("/add-product", productValidation, createProduct_controller);
router.put("/update-stock-quantity", incStockQuantity_controller)// 'inc' stands for increment



export default router