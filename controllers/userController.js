const db_connection = require("../dbConnection").promise();

// INSERTING USER
exports.insert = async (req, res, next) => {

  if (!req.body.firstName || !req.body.lastName || !req.body.address || !req.body.phone || !req.body.startingDate || !req.body.EndingDate || !req.body.email ||   !req.body.Fees) {
    return res.status(400).json({
      message: "Please fill in all the required fields.",
      fields: ["firstName","lastName","address","phone","startingDate", "EndingDate","email","Fees"],
    });
  }

  try {
      
    const [rows] = await db_connection.execute(
      "INSERT INTO `usersinformation`(`firstName`,`lastName`,`address`,`phone`,`startingDate`,`EndingDate`,`email`,`Fees`) VALUES(?,?,?,?,?,?,?,?)",
      [req.body.firstName,req.body.lastName,req.body.address,req.body.phone,req.body.startingDate,req.body.EndingDate,req.body.email,req.body.Fees]
    );

    if (rows.affectedRows === 1) {
      return res.status(201).json({
        message: "The usersinformation has been successfully inserted.",
        userID: rows.insertId,
      });
    }

  } catch (err) {
    next(err);
  }
  
};

// FETCHING ALL USERS
exports.getAllUsers = async (req, res, next) => {
  try {

    const [rows] = await db_connection.execute("SELECT * FROM `usersinformation`");

    if (rows.length === 0) {
      return res.status(200).json({
        message:
          "There are no usersinformation in the database, please insert some usersinformation",
      });
    }

    res.status(200).json(rows);

  } catch (err) {
    next(err);
  }

};


// FETCHING SINGLE USER
exports.getUserByID = async (req, res, next) => {

  try {

    const [row] = await db_connection.execute(
        "SELECT * FROM `usersinformation` WHERE `id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "No User Found!",
      });
    }

    res.status(200).json(row[0]);

  } catch (err) {
    next(err);
  }

};

// UPDATING USERINFORMATION
exports.updateUser = async (req, res, next) => {
  try {

    const [row] = await db_connection.execute(
        "SELECT * FROM `usersinformation` WHERE `id`=?",
        [req.params.id]
    );

    if (row.length === 0) {
      return res.status(404).json({
        message: "Invalid User ID",
      });
    }

    if (req.body.firstName) row[0].firstName = req.body.firstName;
    if (req.body.lastName) row[0].lastName = req.body.lastName;
    if (req.body.address) row[0].address = req.body.address;
    if (req.body.phone) row[0].phone = req.body.phone;
    if (req.body.startingDate) row[0].startingDate = req.body.startingDate;
    if (req.body.EndingDate) row[0].EndingDate = req.body.EndingDate;
    if (req.body.email) row[0].email = req.body.email;
    if (req.body.Fees) row[0].Fees = req.body.Fees;

    const [update] = await db_connection.execute(
      "UPDATE `usersinformation` SET `firstName`=?,`lastName`=?,`address`=?,`phone`=?,`startingDate`=?,`EndingDate`=?, `email`=?,`Fees`=? WHERE `id`=?",
      [row[0].firstName, row[0].lastName, row[0].address, row[0].phone, row[0].startingDate, row[0].EndingDate, row[0].email, row[0].Fees, req.params.id]
    );

    if (update.affectedRows === 1) {
      return res.json({
        message: "The Userinformation has been successfully updated.",
      });
    }

  } catch (err) {
    next(err);
  }

};

// DELETING USER
exports.deleteUser = async (req, res, next) => {

  try {

    const [row] = await db_connection.execute(
        "DELETE FROM `usersinformation` WHERE `id`=?",
        [req.params.id]
    );

    if (row.affectedRows === 0) {
      return res.status(404).json({
        message: "Invalid user ID (No User Found!)",
      });
    }

    res.status(200).json({
      message: "The user has been deleted successfully.",
    });
    
  } catch (err) {
    next(err);
  }

};