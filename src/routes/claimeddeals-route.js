const express = require("express");
const claimeddealRouter = express.Router();

const { claimeddeal, deal } = require("../models/index");
const { userCollection } = require("../models/index");

const bearerAuth = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");

claimeddealRouter.get("/claimeddealRest/:id",getclaimeddealD);
claimeddealRouter.get("/claimeddeals/:id", getclaimeddeals);
claimeddealRouter.post("/claimeddeal", addclaimeddeal);
claimeddealRouter.put("/claimeddeal/:id",updateclaimeddeal);
claimeddealRouter.delete("/claimeddeal/:id",deleteclaimeddeal);





async function getclaimeddealD(req, res) {
  let id = parseInt(req.params.id);
  const claimeddeals = await deal.readHasMany(id, claimeddeal.model);
  res.status(200).json(claimeddeals);
}

async function getclaimeddeals(req, res) {
  let id = parseInt(req.params.id);
  const claimeddeals = await userCollection.readHasMany(id, claimeddeal.model);
  res.status(200).json(claimeddeals);
}

async function addclaimeddeal(req, res) {
  let claimeddealData = req.body;
  claimeddealData.User_ID = req.user.id;

  let claimeddealRecord = await claimeddeal.create(claimeddealData);
  res.status(201).json(claimeddealRecord);
}
async function updateclaimeddeal(req, res) {
  let id = parseInt(req.params.id);
  let dealData = req.body;
  let claimeddealData = await claimeddeal.get(id);
  if (claimeddealData.User_ID == req.user.id ) {
      let dealRecord = await claimeddeal.update(id,dealData);
      res.status(201).json(dealRecord);
  }
  res.json("you can't update this deal");
}
async function deleteclaimeddeal(req, res) {
  let id = parseInt(req.params.id);
  let claimeddealData = await claimeddeal.get(id);
  if (claimeddealData.User_ID == req.user.id) {
    let claimeddealRecord = await claimeddeal.delete(id);
    res.status(204).json(claimeddealRecord);
  }
  res.json("you can't delete this claimeddeal");
}

module.exports = claimeddealRouter;