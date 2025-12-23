import express from 'express';
import connectdb from "../db/connectdb.js";
import productRoutes from "../app/routes/product.routes.js";
import saleRoutes from "../app/routes/sale.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())

// Mount product routes
app.use("/product", productRoutes);

// Mount sale routes
app.use("/sale", saleRoutes);

app.get("/", (req, res) => {
  res.send("claremart API endpoint is live")
})

const startAppServer = async () => {
    try {
        await connectdb();
        
        

        app.listen(PORT, () => {
            console.log(`App server is listening on port ${PORT} at http://localhost:${PORT}`);
        })
    } catch (err) {
        console.error("Error starting the app server:", err);
    }
}


export default startAppServer;