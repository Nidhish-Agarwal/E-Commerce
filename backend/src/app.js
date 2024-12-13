if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./src/config/.env",
  });
}

const express = require("express");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const userRouter = require("./routes/user.route.js");

app.get("/", (req, res) => {
  res.send("Welcome to backend");
});

app.use("/user", userRouter);

module.exports = app;
