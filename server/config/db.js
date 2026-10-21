
const mysql = require("mysql2");
require("dotenv").config();

const ca = process.env.DB_CA_CERT;
console.log("CA certificate loaded:", !!ca, "Length:", ca?.length);
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    ca: ca,
    rejectUnauthorized: true,
  },
});

module.exports = db;
