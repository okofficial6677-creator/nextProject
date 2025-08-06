const hotelDao = require("../dao/inclusionDao");

exports.allinclusion = async () => hotelDao.allInclusions();

exports.addinclusion = async (data) => hotelDao.addInclusion(data);

exports.inclusionByCode = async (inclusion_code) => hotelDao.inclusionByCode(inclusion_code);

exports.inclusionByName = async (inclusion_name) => hotelDao.inclusionByName(inclusion_name);
