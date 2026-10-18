const db = require("../config/db");

const getAllServices = (req,res)=>{
    const sql = "SELECT * FROM services";
    db.query(sql,(err,results)=>{
        if(err){
            return res.status(500).json({
                message:"Database error"
            });
        }
        return res.json(results);

    });
};
const createService = (req,res)=>{
    const {name,description,price,duration}= req.body;
    const sql = "INSERT INTO services (NAME,DESCRIPTION,price,duration)VALUE(?,?,?,?)";
    db.query(sql,[name,description,price,duration],(err,result)=>{
        if(err){
            return res.status(500).json({
                message:"Database error"
            });
        }
        res.status(201).json({
            message:"Services created successfully",
            id: result.insertId
        });
    });
}
const getServiceById = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM services WHERE id = ?";

  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    res.json(results[0]);
  });
};
const updateService = (req, res) => {
  const { id } = req.params;
  const { name, description, price, duration } = req.body;

  const sql = `
    UPDATE services
    SET NAME = ?, DESCRIPTION = ?, price = ?, duration = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, description, price, duration, id],
    (err, result) => {
      if (err) {
        return res.status(500).json({
          message: "Database error"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Service not found"
        });
      }

      res.json({
        message: "Service updated successfully"
      });
    }
  );
};
const deleteService = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM services WHERE id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Database error"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Service not found"
      });
    }

    res.json({
      message: "Service deleted successfully"
    });
  });
};
module.exports={getAllServices,createService,getServiceById,updateService,deleteService};