require("dotenv").config();
const express = require("express");
const Product = require("./models/Product");
const db = require("./db");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());

//

// get all products
app.get("/products", authMiddleware, async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products });
});

// add product
app.post("/products", authMiddleware, async (req, res) => {
  const { name, price } = req.body;
  const product = await Product.create({ name, price });
  res
    .status(201)
    .json({ product, message: "product created with successfully" });
});

// search for product by ids
app.post("/products/search", authMiddleware, async (req, res) => {
  const { ids } = req.body;
  const products = await Product.find({ _id: { $in: ids } });
  res.status(200).json({ products });
});

const port = process.env.PORT || 3000;

const start = async () => {
  await db();
  app.listen(port, () => {
    console.log(`product service is up in port ${port}....`);
  });
};
start();
