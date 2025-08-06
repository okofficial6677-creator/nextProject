const categoryDao = require("../dao/categoryDao");

exports.allCategories = async () => categoryDao.allCategories();

exports.addCategory = async (data) => categoryDao.addCategory(data);

exports.categoryByCode = async (category_code) => categoryDao.categoryByCode(category_code);

exports.categoryByName = async (category_name) => categoryDao.categoryByName(category_name);
