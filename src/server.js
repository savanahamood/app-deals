'use strict';
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT
// const multer = require('multer')
const path = require('path')
const userRouter = require("./auth/route");
const dealRouter = require('./routes/deal-route');
const claimeddealRouter = require('./routes/claimeddeals-route');
const errorHandler = require("./error-handlers/500");
const notFound = require("./error-handlers/404.js");

app.use('/Images', express.static(path.join(__dirname, 'Images')));

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(userRouter);
app.use(dealRouter);
app.use(claimeddealRouter);

app.get('/', (req, res) => {
    res.send("hello from savana");
})


app.use("*", notFound);
app.use(errorHandler);

function start(port) {

    app.listen(port, () => {
        console.log(`server on ${port}`)
    })

}
module.exports = {
    start: start,
    app: app
}