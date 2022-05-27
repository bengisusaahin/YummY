require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/getUsers", async (req, res) => {
  try {
    const allUsers = await pool.query(
      "SELECT * FROM users order by userID ASC"
    );
    res.json(allUsers.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query("DELETE FROM users WHERE userID = $1", [
      id,
    ]);
    if (deleteUser.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/addUser", async (req, res) => {
  try {
    const addUser = await pool.query(
      `INSERT INTO users
       VALUES(default, '${req.body.username}','${req.body.userrole}','${req.body.encrypedPassword})`
    );
    if (addUser.rowCount === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(200);
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3002, () => {
  console.log("Server has started on port 3002");
});

app.post("/update_role", async (req, res) => {
  try {
    const { userid, username, userrole, user_old_role } = req.body;

    const updateRole = await pool.query(
      "update users set userrole = $1 where userid = $2",
      [userrole, userid]
    );
    console.log(userrole);

    res.json(updateRole.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});