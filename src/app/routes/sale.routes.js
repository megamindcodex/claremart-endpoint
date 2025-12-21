import express from 'express';

import { fetchSaleTransaction_validation, addItemToSale_validation } from "../middleware/sale-validation.js";

import { initiateSale_controller, fetchSaleTransaction_controller, addItemToSale_controller } from "../controllers/sale.controllers.js";


const router = express.Router();


router.post("/initiate-sale", initiateSale_controller);
router.get("/sale-transaction/:saleId", fetchSaleTransaction_validation, fetchSaleTransaction_controller);
router.post("/sale-transaction/:saleId/add-item", addItemToSale_validation, addItemToSale_controller);

export default router;