const express = require("express");
const chainController = require("../controller/chainController");
const router = express.Router();

router.get("/all", chainController.getAllChains);
router.post("/add", chainController.addChain);
router.get("/name/:chain_name", chainController.getChainByName);
router.get("/desc/:chain_description", chainController.getChainByDesc);

module.exports = router;
