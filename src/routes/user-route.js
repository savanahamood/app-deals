const express = require("express");
const userrRouter = express.Router();

const { users } = require("../models/index");
const { userCollection } = require("../models/index");

const bearerAuth = require("../auth/middleware/bearer");
const acl = require("../auth/middleware/acl");

// userrRouter.get("/userss", getuser);
// dealRouter.get("/deal/:id", getOnedeal);
// dealRouter.post("/deal", createdeal);
// dealRouter.put("/deal/:id",updatedeal);
// dealRouter.delete("/deal/:id",deletedeal);
// dealRouter.get("/ownerdeal/:id",bearerAuth,acl("readOwner"),getUserdeal);

async function getuser(req, res) {
    let dealRecord = await userCollection.get();
    res.status(200).json(dealRecord);
}
async function getOnedeal(req, res) {
    let id = parseInt(req.params.id);
    let dealRecord = await deal.get(id);
    res.status(200).json(dealRecord);
}
async function createdeal(req, res) {
    let dealData = req.body;
    // dealData.ownerId = req.user.id;

    let dealRecord = await deal.create(dealData);
    res.status(201).json(dealRecord);
}
async function updatedeal(req, res) {
    let id = parseInt(req.params.id);
    let dealData = req.body;
    // let activitsyData = await deal.get(id);
    // if (activitsyData.ownerId == req.user.id || req.user.role == "admin") {
        let dealRecord = await deal.update(id, dealData);
        res.status(201).json(dealRecord);
    
    // res.json("you can't update this deal");
}
async function deletedeal(req, res) {
    let id = parseInt(req.params.id);

    let dealRecord = await deal.delete(id);
    res.status(204).json(dealRecord);
}

async function getUserdeal(req, res) {
    let id = parseInt(req.params.id);
    const favs = await userCollection.readHasMany(id, deal.model);
    res.status(200).json(favs);
}

module.exports = dealRouter;