const express = require("express");
const claimeddealRouter = express.Router();

const { climeddeals, deal } = require("../models/index");
const { userCollection,user } = require("../models/index");

const bearerAuth = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");

claimeddealRouter.get("/claimeddeal",getAllclaimeddeal);
// claimeddealRouter.get("/claimeddealRest/:id",getclaimeddealD);
claimeddealRouter.get("/claimeddeal/:id",bearerAuth, acl("readUser"), getclaimeddeals);
claimeddealRouter.post("/claimeddeal", bearerAuth, acl("createUser"),addclaimeddeal);
// claimeddealRouter.post("/claimeddeal",addclaimeddeal);

// claimeddealRouter.put("/claimeddeal/:id",updateclaimeddeal);
claimeddealRouter.delete("/claimeddeal/:id",bearerAuth, acl('deleteUser'),deleteclaimeddeal);



async function getAllclaimeddeal(req, res) {
  let claimeddealResult = await climeddeals.get();
  res.status(200).json(claimeddealResult);
}

// async function getclaimeddealD(req, res) {
//   let id = parseInt(req.params.id);
//   const claimeddeals = await deal.readHasMany(id, climeddeals.model);
//   res.status(200).json(claimeddeals);
// }

async function getclaimeddeals(req, res) {
  let claimeddealData = req.body;
  claimeddealData.User_ID = req.user.id;
 
  console.log('ID Parameter:', claimeddealData.User_ID);

  const claimeddealsData = await userCollection.readHasMany(claimeddealData.User_ID, climeddeals.model);
  res.status(200).json(claimeddealsData);
}

async function addclaimeddeal(req, res) {
  let claimeddealData = req.body;
  claimeddealData.User_ID = req.user.id;

  let claimeddealRecord = await climeddeals.create(claimeddealData);
  res.status(201).json(claimeddealRecord);
}
// async function updateclaimeddeal(req, res) {
//   let id = parseInt(req.params.id);
//   let dealData = req.body;
//   dealData.Update_DateTime_UTC = new Date().toUTCString();

//   // let activitsyData = await deal.get(id);
//   // if (activitsyData.ownerId == req.user.id || req.user.role == "admin") {
//       let dealRecord = await climeddeals.update(id, dealData);
//       res.status(201).json(dealRecord);
// }
async function deleteclaimeddeal(req, res) {
  let id = parseInt(req.params.id);

    let dealRecord = await climeddeals.delete(id);
    res.status(204).json(dealRecord);
}

module.exports = claimeddealRouter;