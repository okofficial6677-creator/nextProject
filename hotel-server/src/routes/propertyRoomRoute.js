const express = require("express");
const roomController = require("../controller/propertyRoomController");
const router = express.Router();

router.get("/all", roomController.getAllRoom);
router.post("/add", roomController.addRoom);

module.exports = router;
