const express = require("express");
const stateController = require("../controller/stateController");
const router = express.Router();

router.get("/all", stateController.getAllStates);

router.post("/add", stateController.addState);

router.get("/filter/code/:state_code", stateController.getStateByCode);

router.get("/filter/name/:state_name", stateController.getStateByName);

router.get("/filter/country/:country_name", stateController.getStateByCountryName);

module.exports = router;
