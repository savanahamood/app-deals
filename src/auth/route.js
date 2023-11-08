"use strict";

const express = require("express");
const authRouter = express.Router();
const { userCollection } = require("../models/index");

const { users } = require("../models/index");
const basicAuth = require("./middleware/basic.js");

authRouter.get("/users", getuser);
authRouter.get("/users/:id", getOneuser);
authRouter.post("/users", createuser);
authRouter.put("/users/:id",updateuser);
authRouter.delete("/users/:id",deleteuser);
authRouter.post("/users/delete", deleteusers);

async function deleteusers(req, res) {
  try {
    const dealIdsToDelete = req.body.Deal_ID; // Assuming that the frontend sends the array of deal IDs to delete
    const deletedDeals = [];

    for (const id of dealIdsToDelete) {
      const dealRecord = await deal.delete(id);
      deletedDeals.push(dealRecord);
    }

    res.status(204).json(deletedDeals);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete deals" });
  }
}
authRouter.post("/signup", async (req, res, next) => {
  try {
    let userRecord = await users.create(req.body);
    res.status(201).json(userRecord);
  } catch (e) {
    next(e.message);
  }
});

// authRouter.post("/signin", basicAuth, (req, res, next) => {
//   res.status(200).json(req.user);
// });
authRouter.post("/signin", basicAuth, async (req, res, next) => {
  try {
    // Get the user from the database
    const user = await users.findOne({ where: { email: req.body.email } });

    if (user) {
      // Update the Last_Login_DateTime_UTC to the current UTC time
      const now = new Date();
      now.setUTCHours(now.getUTCHours() + 3); // Adjust for UTC+3

      // Update the Last_Login_DateTime_UTC to the current time
      user.Last_Login_DateTime_UTC = now.toISOString();
      // Save the user with the updated Last_Login_DateTime_UTC
      await user.save();
    }

    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
});
async function getuser(req, res) {
  let dealRecord = await userCollection.get();
  res.status(200).json(dealRecord);
}

async function getOneuser(req, res) {
  let id = parseInt(req.params.id);
  let dealRecord = await userCollection.get(id);
  res.status(200).json(dealRecord);
}
async function createuser(req, res) {
  let dealData = req.body;
  // dealData.ownerId = req.user.id;

  let dealRecord = await userCollection.create(dealData);
  res.status(201).json(dealRecord);
}
// async function updateuser(req, res) {
//   let id = parseInt(req.params.id);
//   let dealData = req.body;
//   // let activitsyData = await deal.get(id);
//   // if (activitsyData.ownerId == req.user.id || req.user.role == "admin") {
//       let dealRecord = await userCollection.update(id, dealData);
//       res.status(201).json(dealRecord);
  
//   // res.json("you can't update this deal");
// }


async function updateuser(req, res) {
  let id = parseInt(req.params.id);
  let dealData = req.body;
  
  dealData.Update_DateTime_UTC = new Date().toUTCString();

  let dealRecord = await userCollection.update(id, dealData);
  res.status(201).json(dealRecord);
}
async function deleteuser(req, res) {
  let id = parseInt(req.params.id);

  let dealRecord = await userCollection.delete(id);
  res.status(204).json(dealRecord);
}
module.exports = authRouter;