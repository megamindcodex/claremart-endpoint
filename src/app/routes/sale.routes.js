import express from 'express';

import { fetchSaleTransaction_validation, addItemToSale_validation } from "../middleware/sale-validation.js";

import { initiateSale_controller, fetchSaleTransaction_controller, addItemToSaleTransaction_controller, decrementItemFromSale_controller, removeItemFromSale_controller, clearSaleItems_controller} from "../controllers/sale.controllers.js";


const router = express.Router();


router.post("/initiate-sale", initiateSale_controller);
router.get("/sale-transaction/:saleId", fetchSaleTransaction_validation, fetchSaleTransaction_controller);
router.post("/sale-transaction/add-item/:saleId", addItemToSale_validation, addItemToSaleTransaction_controller);
router.put("/sale-transaction/clear-items/:saleId", clearSaleItems_controller)
router.put("/sale-transaction/decrement-item/:saleId", decrementItemFromSale_controller)
router.put("/sale-transaction/remove-item/:saleId", removeItemFromSale_controller)

export default router;