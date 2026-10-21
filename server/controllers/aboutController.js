const db = require("../config/db");

const getAbout = (req, res) => {
  const sql = "SELECT * FROM about_content LIMIT 1";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching about:", err);
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "About content not found"
      });
    }

    res.json(results[0]);
  });
};
const updateAbout = (req, res) => {
  const { title, subtitle, description, bottom_text } = req.body;

  if (!title || !subtitle || !description || !bottom_text) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const sql = `
    UPDATE about_content
    SET title = ?, subtitle = ?, description = ?, bottom_text = ?
    WHERE id = 1
  `;

  db.query(
    sql,
    [title, subtitle, description, bottom_text],
    (err, result) => {
      if (err) {
        console.error("Error updating about:", err);
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "About content not found"
        });
      }

      res.json({
        message: "About content updated successfully"
      });
    }
  );
};

module.exports = { getAbout,updateAbout};