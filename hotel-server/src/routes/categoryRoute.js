const express = require("express");
const categoryController = require("../controller/categoryController");
const routes = express.Router();

routes.get("/allcategories", categoryController.allCategories);
routes.post("/addcategory", categoryController.addCategory);
routes.get("/categoryByCode/:category_code", categoryController.categoryByCode);
routes.get("/categoryByName/:category_name", categoryController.categoryByName);

module.exports = routes;
