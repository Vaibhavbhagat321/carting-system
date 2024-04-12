const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
} = require("./controller/productController");
const {
  getAllOrders,
  getOrder,
  createOrder,
  getOrders,
  checkoutSession,
} = require("./controller/orderController");
const { login, register, getMe } = require("./controller/userController");
const { protect } = require("./middleware/protect");
const {
  addToCart,
  deleteCart,
  getAllCart,
  updateCartProductQuantity,
} = require("./controller/cartController");

// const multer = require("multer");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "images");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       `product-${req.body.name}-${Date.now()}.${file.mimetype.split("/")[1]}`
//     );
//   },
// });

// const upload = multer({ storage: storage });

dotenv.config({ path: "./vars/config.env" });
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// CONNECTING TO DATABASE
const conStr = process.env.MONGOOSE_STRING.replace(
  "<password>",
  process.env.MONGOOSE_PASSWORD
);
mongoose.connect(conStr).then(() => console.log("Connected to database"));

// DEFINE ROUTES

// app.post("/product", upload.single("image"), createProduct);
app.post("/product", createProduct);

app.get("/product", getAllProducts);

app.get("/product/:productId", getProduct);

app.post("/login", login);

app.post("/register", register);

app.use(protect);

app.post("/checkout", checkoutSession);

app.delete("/product/:productId", deleteProduct);

app.put("/product/:productId", updateProduct);

app.get("/user", getMe);

app.get("/order", getOrders);

app.get("/adminOrder", getAllOrders);

app.get("/order/:orderId", getOrder);

app.post("/order", createOrder);

app.post("/cart", addToCart);

app.put("/cart/:cartId", updateCartProductQuantity);

app.delete("/cart/:cartId", deleteCart);

app.get("/cart", getAllCart);

// UNKNOWN REQUEST HANDLER

app.all("*", (req, res) => {
  res.status(404).json({
    status: "Url not found",
    data: `${req.url} is not found on the server.`,
  });
});

//  GLOBAL ERROR HANDLER

app.use((err, req, res, next) => {
  console.log("Handler: ", err.message);
  res.status(400).json({ status: "error", message: err.message });
});

// LISTENING ON SERVER

app.listen(process.env.PORT, () =>
  console.log(`Serving on port: http://localhost:${process.env.PORT}`)
);
