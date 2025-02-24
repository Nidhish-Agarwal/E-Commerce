if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./src/config/.env",
  });
}
const cors = require("cors");
const express = require("express");

const app = express();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cors({ path: ["http://localhost:5173"] }));
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
const userRouter = require("./routes/user.route.js");
const productRouter = require("./routes/product.route.js");
const cartRouter = require("./routes/cart.route.js");
const orderRouter = require("./routes/orders.route.js");
const PaymentRouter = require("./routes/Payment.route.js");

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/orders", orderRouter);
app.use("/payment", PaymentRouter);

module.exports = app;
