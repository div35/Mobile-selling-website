let  express = require("express");
const  mobilerouter = require("./Routers/mobiles-router");
const server = express();

server.use(express.json());
server.use(express.static("public"));
server.use(express.urlencoded({extended : true}));

server.use("/server/mobile" , mobilerouter);

module.exports = server;