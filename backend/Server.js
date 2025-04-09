const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs"); // For file-based saving (optional)

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// 🔗 Root route to confirm backend is working
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// 📝 Save session data
app.post("/save-session", (req, res) => {
  const session = req.body;

  // OPTIONAL: Save it to file
  fs.readFile("sessions.json", "utf-8", (err, fileData) => {
    const existing = !err ? JSON.parse(fileData || "[]") : [];

    existing.push(session);

    fs.writeFile("sessions.json", JSON.stringify(existing, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "❌ Failed to save session." });
      }
      return res.status(200).json({ message: "✅ Session saved successfully!" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
