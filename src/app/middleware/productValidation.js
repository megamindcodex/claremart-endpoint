
const productValidation = (req, res, next) => {
    const { category, name, sku, price, quantity } = req.body

    if (!category) {
        return res.status(400).json({ message: "Invalid product 'category' parameter" })
    }

    if (!name) {
        return res.status(400).json({ message: "Invalid product 'name' parameter" })
    }

    if (!sku) {
        return res.status(400).json({ message: "Invalid product 'sku' parameter" })
    }

    if (!price) {
        return res.status(400).json({ message: "Invalid product 'price' parameter" })
    }

    if (!quantity) {
        return res.status(400).json({ message: "Invalid product 'quantity' parameter" })
    }

    next()
}

export default productValidation