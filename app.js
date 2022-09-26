const express = require("express");
const router = require("./routers");
const app = express();
const handleErrors = require("./middlewares/handle.errors.mw");
app.use(express.static("public"));
app.use(express.json());

//Router
app.use("/api", router);
app.use(handleErrors);

module.exports = app;
