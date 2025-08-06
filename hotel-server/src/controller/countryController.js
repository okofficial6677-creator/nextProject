
const countryService = require("../business/countryService");

exports.getAllCountries = async (req, res) => {
  try {
    const countries = await countryService.getAllCountries();
    res.json({ success: true, message: countries });
  } catch (err) {
    console.error("Controller Error - getAllCountries:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.addCountry = async (req, res) => {
  try {
    const { country_name, country_code, country_flag, country_isd, status } = req.body;

    if (!country_name || !country_code || !country_isd) {
      return res.status(400).json({
        success: false,
        message: "Required fields: country_name, country_code, country_isd",
      });
    }

    const result = await countryService.addCountry({
      country_name,
      country_code,
      country_flag,
      country_isd,
      status,
    });

    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - addCountry:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getCountryByCode = async (req, res) => {
  try {
    const { country_code } = req.params;
    const result = await countryService.getCountryByCode(country_code);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getCountryByCode:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getCountryByName = async (req, res) => {
  try {
    const { country_name } = req.params;
    const result = await countryService.getCountryByName(country_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getCountryByName:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
