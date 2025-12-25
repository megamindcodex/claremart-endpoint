import { initiateSale, fetchSaleTransaction, fetchAllSaleTransactions, addItemToSaleTransaction, decrementItemFromSale, removeItemFromSale, clearSaleItems } from "../services/sale-services.js";



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



export const fetchAllSaleTransactions_controller = async (req, res) => {
  try {
    const result = await fetchAllSaleTransactions()

    res.status(200).json({ message: result.message, sales: result.data })

  } catch (err) {
    console.error("fetch all sales transactions controller error: ", err)
    const status = err.statusCode || 500
    const message =
      status === 500 ? "Internal server error" : err.message
    res.status(status).json({ message: message })
  }
}


export const fetchSaleTransaction_controller = async (req, res) => {
  try {
    const { saleId } = req.params
    console.log(saleId)



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


export const addItemToSaleTransaction_controller = async (req, res) => {
  try {
    const { saleId } = req.params
    const { sku } = req.body


    const result =
      await addItemToSaleTransaction(saleId, sku)

    res.status(200).json({ message: result.message, sale: result.sale })

  } catch (err) {
    console.error("add item to sale controller error: ", err)
    const status = err.statusCode || 500
    const message =
      status === 500 ? "Internal server error" : err.message
    res.status(status).json({ message: message })
  }
}

export const decrementItemFromSale_controller = async (req, res) => {
  try {
    console.log("req body: ", req.body)
    const { saleId } = req.params
    const { sku } = req.body

    const result = await decrementItemFromSale(saleId, sku)

    res.status(200).json({ message: result.message })

  } catch (err) {
    console.error("add item to sale controller error: ", err)
    const status = err.statusCode || 500
    const message =
      status === 500 ? "Internal server error" :
        err.message
    res.status(status).json({ message: message })
  }
}

export const removeItemFromSale_controller = async (req, res) => {
  try {
    const { saleId } = req.params
    const { sku } = req.body

    if (!sku) {
      console.log(`sku parameter is ${sku}`)
    }

    const result = await removeItemFromSale(saleId, sku)

    res.status(200).json({ message: result.message })
  } catch (err) {
    console.error("remove item from sale controller error: ", err)
    const status = err.statusCode || 500
    const message =
      status === 500 ? "Internal server error" :
        err.message
    res.status(status).json({ message: message })
  }
}



export const clearSaleItems_controller = async (req, res) => {
  try {
    const { saleId } = req.params

    const result = await clearSaleItems(saleId)

    res.status(200).json({ message: result.message })
  } catch (err) {
    console.error("clear sale items controller error: ", err)
    const status = err.statusCode || 500
    const message = status === 500 ? "Internal server error" : err.message
    res.status(status).json({ message })
  }
}