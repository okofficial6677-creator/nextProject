const propertyService = require("../business/propertyService");

// Create Property
exports.addProperty = async (req, res) => {
  try {
    const result = await propertyService.addProperty(req.body);
    console.log(req.body)
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - addProperty:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// List All Properties
exports.getAllProperties = async (req, res) => {
  try {
    const result = await propertyService.getAllProperties();
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getAllProperties:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Filter by Country Name
exports.getByCountryName = async (req, res) => {
  try {
    const { country_name } = req.params;
    const result = await propertyService.getByCountryName(country_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getByCountryName:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Filter by State Name
exports.getByStateName = async (req, res) => {
  try {
    const { state_name } = req.params;
    const result = await propertyService.getByStateName(state_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getByStateName:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Filter by City Name
exports.getByCityName = async (req, res) => {
  try {
    const { city_name } = req.params;
    const result = await propertyService.getByCityName(city_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getByCityName:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Filter by Property Name
exports.getByPropertyName = async (req, res) => {
  try {
    const { property_name } = req.params;
    const result = await propertyService.getByPropertyName(property_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getByPropertyName:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Filter by Property Code
exports.getByPropertyCode = async (req, res) => {
  try {
    const { property_code } = req.params;
    const result = await propertyService.getByPropertyCode(property_code);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getByPropertyCode:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Filter by Chain Name
exports.getByChainName = async (req, res) => {
  try {
    const { chain_name } = req.params;
    const result = await propertyService.getByChainName(chain_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getByChainName:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Filter by Status
exports.getByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const result = await propertyService.getByStatus(status === "true");
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getByStatus:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

// Filter by Property ID
exports.getById = async (req, res) => {
  try {
    const { property_id } = req.params;
    const result = await propertyService.getById(property_id);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getById:", err.message);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.searchProperties = async (req, res) => {
  try {
    const { keyword } = req.params;

    if (!keyword) {
      return res.status(400).json({ message: "Keyword is required" });
    }

    const properties = await propertyService.searchProperties(keyword);
    res.json(properties);
  } catch (err) {
    console.error("Controller Error - searchProperties:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


