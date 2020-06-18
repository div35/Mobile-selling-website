const express = require("express");

var {getallmobile , postmobile} = require("./../Controller/mobiles");

let mobilerouter = express.Router();

mobilerouter.route("/getallmobile").get(getallmobile);
mobilerouter.route("/postmobile").post(postmobile);

module.exports = mobilerouter;