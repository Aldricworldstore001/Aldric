import mongoose from "mongoose";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

// 🔑 Replace these with YOUR real values
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  link: String,
  image: String,
});

const Product = mongoose.model("Product", productSchema);

// Routes
app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// Server
app.listen(5000, () => console.log("Server running on port 5000"));
