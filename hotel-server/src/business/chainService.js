const chainDao = require("../dao/chainDao");

exports.getAllChains = async () => chainDao.getAllChains();

exports.addChain = async (data) => chainDao.addChain(data);

exports.getChainByName = async (name) => chainDao.getChainByName(name);

exports.getChainByDesc = async (code) => chainDao.getChainByDesc(code);
