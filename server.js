import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Fake database (for now)
let products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 49.99,
    link: "https://amazon.com",
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 99.99,
    link: "https://amazon.com",
    image: "https://via.placeholder.com/150"
  }
];

// ✅ GET all products
app.get("/products", (req, res) => {
  res.json(products);
});

// ✅ GET one product
app.get("/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// ✅ CREATE product
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// ✅ DELETE product
app.delete("/products/:id", (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deleted = products.splice(index, 1);
  res.json(deleted);
});

// Root route
app.get("/", (req, res) => {
  res.send("Product API is running 🚀");
});

// PORT (Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
