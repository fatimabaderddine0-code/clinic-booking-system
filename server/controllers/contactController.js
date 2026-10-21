const db = require("../config/db");

const createMessage = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const sql = `
    INSERT INTO contact_messages (name, email, message)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error saving message:", err);
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.status(201).json({
      message: "Message sent successfully",
      id: result.insertId
    });
  });
};
const getMessages = (req, res) => {
  const sql = "SELECT * FROM contact_messages ORDER BY created_at DESC, id DESC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    res.json(results);
  });
};

module.exports = { createMessage,getMessages };