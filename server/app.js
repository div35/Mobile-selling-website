let express = require("express");
const mobilerouter = require("./Routers/mobiles-router");
const userrouter = require("./Routers/users-router")
const server = express();

server.use(express.json());
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));

server.use("/server/mobile", mobilerouter);
server.use("/server/user", userrouter)

module.exports = server;