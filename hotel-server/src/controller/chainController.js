const chainService = require("../business/chainService");

exports.getAllChains = async (req, res) => {
  try {
    const data = await chainService.getAllChains();
    res.json({ success: true, message: data });
  } catch (err) {
    console.error("Controller Error - getAllChains:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.addChain = async (req, res) => {
  try {
    const { chain_name, chain_description, status } = req.body;
    if (!chain_name || !chain_description || typeof status === "undefined") {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: chain_name, chain_description, or status",
      });
    }

    const result = await chainService.addChain({ chain_name, chain_description, status });
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - addChain:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getChainByName = async (req, res) => {
  try {
    const { chain_name } = req.params;
    const result = await chainService.getChainByName(chain_name);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getChainByName:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.getChainByDesc = async (req, res) => {
  try {
    const { chain_description } = req.params;
    const result = await chainService.getChainByDesc(chain_description);
    res.json({ success: true, message: result });
  } catch (err) {
    console.error("Controller Error - getChainByDesc:", err.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
