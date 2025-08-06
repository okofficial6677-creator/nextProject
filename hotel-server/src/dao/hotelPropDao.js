const connection = require('../config/db');

const PropertyDAO = {
  async getAllProperties() {
    const [rows] = await connection.query('SELECT * FROM properties');
    return rows;
  },

  async getPropertyById(id) {
    const [rows] = await connection.query('SELECT * FROM properties WHERE property_id = ?', [id]);
    return rows[0];
  },

  async createProperty(property) {
    const {
      name,
      description,
      address,
      city_id,
      star_rating,
      cover_image,
      is_featured
    } = property;

    const [result] = await connection.query(
      `INSERT INTO properties
        (name, description, address, city_id, star_rating, cover_image, is_featured)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, description, address, city_id, star_rating, cover_image, is_featured || false]
    );

    return { property_id: result.insertId, ...property };
  }
};

module.exports = PropertyDAO;
