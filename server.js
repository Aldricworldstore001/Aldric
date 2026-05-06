import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

// Route
app.get("/", (req, res) => {
  res.json([
    { name: "Wireless Earbuds", link: "https://amazon.com" },
    { name: "Smart Watch", link: "https://amazon.com" }
  ]);
});

// ✅ IMPORTANT PART (for Render)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
