import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM users;");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: "Database error: ", err });
  }
});

app.post("/users", async (req, res) => {
  const { name, email, birthday } = req.body;

  if (!name || !email || !birthday) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const [result] = await db.execute(
      "INSERT INTO users (name, email, birthday) VALUES (?, ?, ?)",
      [name, email, birthday],
    );

    res.status(201).json({
      message: "User created",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ message: "Database error", err });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Error 404 - User not found" });
    } else {
      res
        .status(201)
        .json({ message: `User (id: ${id}) deleted successfully` });
    }
  } catch (err) {
    res.status(500).json({ message: "Database error: ", err });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/users`);
});
