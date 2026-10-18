const db = require("../config/db");
const createBooking = (req,res)=>{
const {
  customer_name,
  phone,
  email,
  service_id,
  booking_date,
  booking_time,
  notes
} = req.body;
const sql = `
  INSERT INTO bookings
  (customer_name, phone, email, service_id, booking_date, booking_time, notes)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`;
db.query(sql,[    customer_name,
    phone,
    email,
    service_id,
    booking_date,
    booking_time,
    notes],(err,result)=>{
        if(err){
            return res.status(500).json({
            message :" Database error"
        });
        }
         res.status(201).json({
          message: "Booking created successfully",
          id: result.insertId
    });
    })
}
const getAllBookings = (req, res) => {
  const sql = "SELECT * FROM bookings";

  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    res.json(results);
  });
};
const getBookingById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM bookings WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json(results[0]);
  });
};
const updateBooking = (req, res) => {
  const { id } = req.params;

  const {
    customer_name,
    phone,
    email,
    service_id,
    booking_date,
    booking_time,
    notes,
    status
  } = req.body;

  const sql = `
    UPDATE bookings
    SET customer_name = ?, phone = ?, email = ?,
        service_id = ?, booking_date = ?, booking_time = ?,
        notes = ?, status = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [
      customer_name,
      phone,
      email,
      service_id,
      booking_date,
      booking_time,
      notes,
      status,
      id
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Booking not found"
        });
      }

      res.json({
        message: "Booking updated successfully"
      });
    }
  );
};
const deleteBooking = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM bookings WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    res.json({
      message: "Booking deleted successfully"
    });
  });
};
module.exports={createBooking,getAllBookings,getBookingById,updateBooking,deleteBooking};