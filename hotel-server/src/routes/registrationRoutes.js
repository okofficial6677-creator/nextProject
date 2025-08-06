const express = require("express");
const router = express.Router();
const registrationController = require("../controller/registrationController");

router.post("/add", registrationController.registerUser);

router.get("/all", registrationController.getAllUsers);

module.exports = router;
