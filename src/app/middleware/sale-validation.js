
export const fetchSaleTransaction_validation = (req, res, next) => {
    const { saleId } = req.params;

    if (!saleId) {
        return res.status(400).json({ message: "missing saleId parameter" });
    }


    next()
}


export const addItemToSale_validation = (req, res, next) => {
    const { saleId } = req.params;
    const { sku } = req.body;

    if (!saleId) {
        return res.status(400).json({ message: "missing saleId parameter" });
    }

    if (!sku) {
        return res.status(400).json({ message: "missing sku parameter" }); //sku means stock keeping unit
    }

    next()

    // if (!quantity || quantity <= 0) {
    //     return res.status(400).json({ message: "invalid quantity parameter" });
    // }
}