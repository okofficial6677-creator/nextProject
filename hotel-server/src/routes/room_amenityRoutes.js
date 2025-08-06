const express = require("express");
const room_amentiyController = require("../controller/room_amentiyController.js");
const routes = express.Router();

routes.get("/allroomamenity", room_amentiyController.allroomamenity);
routes.post("/addroomamenity", room_amentiyController.addroomamenity);
routes.get("/roomamenityByCode/:amenity_code", room_amentiyController.roomamenityByCode);
routes.get("/roomamenityByName/:amenity_name", room_amentiyController.roomamenityByName);

module.exports = routes;
