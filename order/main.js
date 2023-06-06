require("dotenv").config();
const express = require("express");
const db = require("./db");
const Order = require("./models/Order");
const { default: axios } = require("axios");
const PRODUCTS_SERVICE_BASE_URL = "http://localhost:3000/products";
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());

// calc total price
const totalPriceCalculator = (products = []) => {
  let total = 0;
  products.forEach((product) => {
    total += product.price;
  });
  return total;
};

// get products by array of ids
const getProductsByIds = async (ids, token=null) => {
  const res = await axios.post(
    `${PRODUCTS_SERVICE_BASE_URL}/search`,
    { ids },
    { headers: { token } }
  );
  return res.data?.products;
};

// get all orders
app.get("/orders", authMiddleware, async (req, res) => {
  const orders = await Order.find({});
  res.status(200).json({ orders });
});

app.post("/orders", authMiddleware, async (req, res) => {
  const { ids } = req.body;
  const products = await getProductsByIds(ids, req.headers.token);
  const totalPrice = totalPriceCalculator(products);
  const order = await Order.create({ products: ids, totalPrice });
  res.status(201).json({ order, message: "order created with successfully" });
});

const port = process.env.PORT || 3001;
const start = async () => {
  await db();
  app.listen(port, () => {
    console.log(`product service is up in port ${port}....`);
  });
};
start();
