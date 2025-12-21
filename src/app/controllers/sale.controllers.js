import { initiateSale, fetchSaleTransaction, addItemToSale } from "../services/sale-services.js";



export const initiateSale_controller = async (req, res) => {
    try {
        // const saleData = req.body

        const result = await initiateSale()

        res.status(201).json({ message: result.message, sale: result.data })
    } catch (err) {
        console.error("initiate sale controller error: ", err)
        const status = err.statusCode || 500
        const message =
            status === 500 ? "Internal server error" : err.message
        res.status(status).json({ message: message })
    }
}


export const fetchSaleTransaction_controller = async (req, res) => {
    try {
        const { saleId } = req.params

        const result = await fetchSaleTransaction(saleId)

        res.status(200).json({ message: result.message, sale: result.data })
    } catch (err) {
        console.error("fetch sale transaction controller error: ", err)
        const status = err.statusCode || 500
        const message =
            status === 500 ? "Internal server error" : err.message
        res.status(status).json({ message: message })
    }
}


export const addItemToSale_controller = async (req, res) => {
    try {
        const { saleId } = req.params
        const { sku } = req.body
        const result = await addItemToSale(saleId, sku)

        res.status(200).json({ message: result.message, sale: result.sale })

    } catch (err) {
        console.error("add item to sale controller error: ", err)
        const status = err.statusCode || 500
        const message =
            status === 500 ? "Internal server error" : err.message
        res.status(status).json({ message: message })
    }
}