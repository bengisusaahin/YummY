require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

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
    const deleteUser = await pool.query("DELETE FROM users WHERE userid = $1", [
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
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(
      req.body.encryptedPassword,
      salt
    );

    const { username, email, userrole } = req.body;
    const addUser = await pool.query(
      "INSERT INTO users VALUES (default,$1, $2, $3, $4)",
      [username, email, userrole, encryptedPassword]
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

app.get("/getSpecificOrder/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getOrders = await pool.query(
      "SELECT * FROM orders WHERE tableid = $1",
      [id]
    );
    res.json(getOrders.rows);
  } catch (err) {
    console.log(err.message);
    res.status(400);
  }
});

app.get("/getOrderedTables", async (req, res) => {
  try {
    const getSpecificOrder = await pool.query(
      "SELECT distinct tableid FROM orders ORDER BY tableid ASC "
    );
    res.json(getSpecificOrder.rows);
  } catch (err) {
    console.log(err.message);
    res.status(400);
  }
});

app.get("/getTables", async (req, res) => {
  try {
    const getTables = await pool.query(
      "SELECT * FROM tables ORDER BY tableid ASC "
    );
    res.json(getTables.rows);
  } catch (err) {
    console.log(err.message);
    res.status(400);
  }
});

app.post("/saveOrder", async (req, res) => {
  try {
    const { tableid, ordercontent, orderstate, price, amount } = req.body;
    const saveOrder = await pool.query(
      "INSERT INTO orders VALUES ($1, $2, $3, $4, $5)",
      [tableid, ordercontent, orderstate, price, amount]
    );
    const setTableState = await pool.query(
      "UPDATE tables SET tablestate= 'Full' where tableid = $1",
      [tableid]
    );

    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
  }
});
app.post("/tableOrderReady", async (req, res) => {
  const { tableid } = req.body;
  try {
    const changeTableState = await pool.query(
      "UPDATE tables SET tablestate='Ready to serve' where tableid = $1",
      [tableid]
    );

    const deleteOrder = await pool.query(
      "DELETE FROM orders where tableid = $1",
      [tableid]
    );
    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
  }
});

app.post("/setTableStateAsFull", async (req, res) => {
  const { tableid } = req.body;
  try {
    const changeTableState = await pool.query(
      "UPDATE tables SET tablestate='Full' where tableid = $1",
      [tableid]
    );
    res.status(200).send();
  } catch (err) {
    console.error(err.message);
    res.status(500).send();
  }
});
