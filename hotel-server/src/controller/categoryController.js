const categoryService = require("../business/categoryService");

exports.allCategories = async (req, res) => {
  try {
    const data = await categoryService.allCategories();
    res.json({ success: true, message: data });
  } catch (err) {
    console.error("Controller Error - allCategories:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { category_name, category_code, status } = req.body;
    console.log("Received:", category_name, category_code, status);

    if (!category_name || !category_code || typeof status === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: category_name, category_code, or status",
      });
    }

    const result = await categoryService.addCategory({
      category_name,
      category_code,
      status,
    });

    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - addCategory:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.categoryByCode = async (req, res) => {
  try {
    const { category_code } = req.params;

    const result = await categoryService.categoryByCode(category_code);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - categoryByCode:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.categoryByName = async (req, res) => {
  try {
    const { category_name } = req.params;

    const result = await categoryService.categoryByName(category_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - categoryByName:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
