const express = require("express");
const hotelController = require("../controller/inclusionontroller");
const routes = express.Router();

routes.get("/allinclusion", hotelController.allInclusions);
routes.post("/addinclusion", hotelController.addInclusion);
routes.get("/inclusionByCode/:inclusion_code", hotelController.inclusionByCode);
routes.get("/inclusionByName/:inclusion_name", hotelController.inclusionByName);

module.exports = routes;
