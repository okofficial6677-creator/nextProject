const db = require('../config/db');

const getAllHotelCards = async () => {
  const [rows] = await db.execute(`
    SELECT
      p.property_id,
      p.property_name,
      p.star_category,
      c.city_name,
      s.state_name,
      MIN(pp.image_name) AS image_name,
      MIN(r.room_type) AS room_type,
      MIN(r.total_rooms) AS total_rooms,
      MIN(r.max_adult) AS max_adult,
      MIN(rp.base_price) AS old_price,
      MIN(rp.total_price) AS price,
      MIN(rp.currency) AS currency,
      MIN(rp.rate_name) AS rate_name,
      MIN(rp.booking_type) AS booking_type,
      MIN(r.extra_beds) AS extra_beds,
      MIN(r.max_occupancy) AS max_occupancy,
      GROUP_CONCAT(DISTINCT f.facility_name) AS amenities,
      GROUP_CONCAT(DISTINCT i.inclusion_name) AS inclusion_names,
      'Available' AS availability,
      '9.1 Exceptional (320)' AS rating

    FROM property p
    LEFT JOIN city c ON c.city_id = p.city_id
    LEFT JOIN state s ON s.state_id = p.state_id
    LEFT JOIN property_photos pp ON pp.property_id = p.property_id
    LEFT JOIN rooms r ON r.property_id = p.property_id
    LEFT JOIN rate_plan rp ON rp.property_id = p.property_id AND rp.room_id = r.room_id
    LEFT JOIN property_facilities pf ON pf.property_id = p.property_id
    LEFT JOIN facilities f ON f.facility_id = pf.facility_id
    LEFT JOIN property_inclusions pi ON pi.property_id = p.property_id
    LEFT JOIN inclusions i ON i.inclusion_id = pi.inclusion_id

    GROUP BY p.property_id
    LIMIT 10;
  `);

  return rows;
};
module.exports = {
  getAllHotelCards
};
