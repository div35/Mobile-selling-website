const express = require("express");

var { getalluser, getuser, updateuser} = require("./../Controller/users");
var { loginuser, signupuser, logoutuser, protect, changepass , forgetpassword  , resetpassword} = require("./../Controller/authentication")
let userrouter = express.Router();

userrouter.route("/signup").post(signupuser);
userrouter.route("/login").post(loginuser);
userrouter.route("/logout").get(logoutuser);
userrouter.route("/getalluser").get(protect, getalluser);
userrouter.route("/updateuser").patch(protect, updateuser);
userrouter.route("/changepass").patch(protect, changepass);
userrouter.route("/forgetpass").post(forgetpassword);
userrouter.route("/resetpass").post(resetpassword);
userrouter.route("/:id").get(protect, getuser);

module.exports = userrouter;
