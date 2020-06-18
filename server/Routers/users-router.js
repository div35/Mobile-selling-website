const express = require("express");

var {getalluser , postuser} = require("./../Controller/users");

let userrouter = express.Router();

userrouter.route("/getalluser").get(getalluser);

module.exports = userrouter;