const db = require("../config/db");

// 🔍 Auto Suggest Function
exports.getAutoSuggest = async (keyword) => {
  const sql = `
    SELECT 
      p.property_id,
      p.property_name,
      c.city_name,
      s.state_name,
      co.country_name
    FROM property p
    JOIN city c ON p.city_id = c.city_id
    JOIN state s ON p.state_id = s.state_id
    JOIN country co ON p.country_id = co.country_id
    WHERE 
      p.property_name LIKE CONCAT('%', ?, '%')
      OR c.city_name LIKE CONCAT('%', ?, '%')
      OR s.state_name LIKE CONCAT('%', ?, '%')
      OR co.country_name LIKE CONCAT('%', ?, '%')
    LIMIT 10;
  `;
  
  const [rows] = await db.query(sql, [keyword, keyword, keyword, keyword]);
  return rows;
};

exports.searchByPropertyName = async (property_name) => {
  const [rows] = await db.execute(`
    SELECT
      p.property_id,
      p.property_name,
      p.star_category,
      c.city_name,
      s.state_name,
      MIN(pp.image_name) AS image_name,
      MIN(r.room_type) AS room_type,
      MIN(r.max_adult) AS max_adult,
      MIN(r.total_rooms) AS total_rooms,
      MIN(rp.base_price) AS old_price,
      MIN(rp.total_price) AS price,
      MIN(rp.currency) AS currency,
      MIN(rp.rate_name) AS rate_name,
      MIN(rp.booking_type) AS booking_type,
      MIN(r.extra_beds) AS extra_beds,
      MIN(r.max_occupancy) AS max_occupancy,
      GROUP_CONCAT(DISTINCT f.facility_name) AS amenities,
      GROUP_CONCAT(DISTINCT i.inclusion_name) AS inclusion_names

    FROM property p
    LEFT JOIN property_photos pp ON pp.property_id = p.property_id
    LEFT JOIN city c ON c.city_id = p.city_id
    LEFT JOIN state s ON s.state_id = p.state_id
    LEFT JOIN rooms r ON r.property_id = p.property_id
    LEFT JOIN rate_plan rp ON rp.property_id = p.property_id AND rp.room_id = r.room_id
    LEFT JOIN property_facilities pf ON pf.property_id = p.property_id
    LEFT JOIN facilities f ON f.facility_id = pf.facility_id
    LEFT JOIN property_inclusions pi ON pi.property_id = p.property_id
    LEFT JOIN inclusions i ON i.inclusion_id = pi.inclusion_id

    WHERE p.property_name LIKE ?
    GROUP BY p.property_id
    LIMIT 10;
  `, [`%${property_name}%`]);

  return rows;
};

exports.searchHotelsByOffers = async (offer) => {
  if (!offer) {
    return [];
  }

  const sql = `
    SELECT
      p.property_id,
      p.property_name,
      p.star_category,
      c.city_name,
      s.state_name,
      MIN(pp.image_name) AS image_name,
      MIN(r.room_type) AS room_type,
      MIN(r.max_adult) AS max_adult,
      MIN(r.total_rooms) AS total_rooms,
      MIN(rp.base_price) AS old_price,
      MIN(rp.total_price) AS price,
      MIN(rp.currency) AS currency,
      MIN(rp.rate_name) AS rate_name,
      MIN(rp.booking_type) AS booking_type,
      MIN(r.extra_beds) AS extra_beds,
      MIN(r.max_occupancy) AS max_occupancy,
      GROUP_CONCAT(DISTINCT f.facility_name) AS amenities,
      GROUP_CONCAT(DISTINCT i2.inclusion_name) AS inclusion_names

    FROM property p
    LEFT JOIN property_photos pp ON pp.property_id = p.property_id
    LEFT JOIN city c ON c.city_id = p.city_id
    LEFT JOIN state s ON s.state_id = p.state_id
    LEFT JOIN rooms r ON r.property_id = p.property_id
    LEFT JOIN rate_plan rp ON rp.property_id = p.property_id AND rp.room_id = r.room_id
    LEFT JOIN property_facilities pf ON pf.property_id = p.property_id
    LEFT JOIN facilities f ON f.facility_id = pf.facility_id
    -- Join for filtering
    INNER JOIN property_inclusions pi ON pi.property_id = p.property_id
    INNER JOIN inclusions i ON i.inclusion_id = pi.inclusion_id
    -- Join again for GROUP_CONCAT
    LEFT JOIN property_inclusions pi2 ON pi2.property_id = p.property_id
    LEFT JOIN inclusions i2 ON i2.inclusion_id = pi2.inclusion_id
    WHERE i.inclusion_name = ?
    GROUP BY p.property_id
    LIMIT 20;
  `;

  const [rows] = await db.execute(sql, [offer]);
  return rows;
};

exports.isInclusionPresent = async (inclusionName) => {
  const sql = `
    SELECT COUNT(*) AS count
    FROM property_inclusions pi
    JOIN inclusions i ON i.inclusion_id = pi.inclusion_id
    WHERE i.inclusion_name = ?
  `;
  const [rows] = await db.execute(sql, [inclusionName]);
  return rows[0].count > 0;
};

exports.getPropertyById = async (property_id) => {
  const [rows] = await db.execute(`
    SELECT
      p.property_id,
      p.property_name,
      p.star_category,
      c.city_name,
      s.state_name,
      MIN(pp.image_name) AS image_name,
      MIN(r.room_type) AS room_type,
      MIN(r.max_adult) AS max_adult,
      MIN(r.total_rooms) AS total_rooms,
      MIN(rp.base_price) AS old_price,
      MIN(rp.total_price) AS price,
      MIN(rp.currency) AS currency,
      MIN(rp.rate_name) AS rate_name,
      MIN(rp.booking_type) AS booking_type,
      MIN(r.extra_beds) AS extra_beds,
      MIN(r.max_occupancy) AS max_occupancy,
      GROUP_CONCAT(DISTINCT f.facility_name) AS amenities,
      GROUP_CONCAT(DISTINCT i.inclusion_name) AS inclusion_names

    FROM property p
    LEFT JOIN property_photos pp ON pp.property_id = p.property_id
    LEFT JOIN city c ON c.city_id = p.city_id
    LEFT JOIN state s ON s.state_id = p.state_id
    LEFT JOIN rooms r ON r.property_id = p.property_id
    LEFT JOIN rate_plan rp ON rp.property_id = p.property_id AND rp.room_id = r.room_id
    LEFT JOIN property_facilities pf ON pf.property_id = p.property_id
    LEFT JOIN facilities f ON f.facility_id = pf.facility_id
    LEFT JOIN property_inclusions pi ON pi.property_id = p.property_id
    LEFT JOIN inclusions i ON i.inclusion_id = pi.inclusion_id

    WHERE p.property_id = ?
    GROUP BY p.property_id
    LIMIT 1;
  `, [property_id]);

  return rows[0] || null;
};
