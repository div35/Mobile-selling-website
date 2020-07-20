const express = require("express");

var { getallmobile, postmobile, getmobile, updatemobile, buyMobile, deleteMobile, wishlistMobile } = require("./../Controller/mobiles");
var { protect } = require("./../Controller/authentication")

let mobilerouter = express.Router();

mobilerouter.route("/getallmobile").get(getallmobile);
mobilerouter.route("/:id").get(getmobile);
mobilerouter.route("/postmobile").post(protect, postmobile);
mobilerouter.route("/updatemobile").patch(protect, updatemobile);
mobilerouter.route("/deletemobile/:id").delete(protect, deleteMobile)
mobilerouter.route("/buymobile/:id").patch(protect, buyMobile);
mobilerouter.route("/wishlist/:id").patch(protect, wishlistMobile);


module.exports = mobilerouter;