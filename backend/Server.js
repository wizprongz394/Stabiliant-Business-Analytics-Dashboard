const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// Example API route
app.get("/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
