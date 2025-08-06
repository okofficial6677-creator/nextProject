const db = require("../config/db");

// 🔍 Auto Suggest Function - Enhanced for better search results
exports.getAutoSuggest = async (keyword) => {
  try {
    console.log("DAO: getAutoSuggest called with keyword:", keyword);
    
    // Mock data for demonstration - replace with actual DB query when database is ready
    const mockData = [
      { property_id: 1, property_name: 'Taj Lands End', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India' },
      { property_id: 2, property_name: 'The Taj Mahal Palace Mumbai', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India' },
      { property_id: 3, property_name: 'Taj Santacruz', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India' },
      { property_id: 4, property_name: 'Taj Mahal Tower, Mumbai', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India' },
      { property_id: 5, property_name: 'Oberoi Mumbai', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India' },
      { property_id: 6, property_name: 'ITC Grand Central', city_name: 'Mumbai', state_name: 'Maharashtra', country_name: 'India' },
      { property_id: 7, property_name: 'Hotel Delhi Palace', city_name: 'Delhi', state_name: 'Delhi', country_name: 'India' },
      { property_id: 8, property_name: 'The Leela Ambience', city_name: 'Delhi', state_name: 'Delhi', country_name: 'India' },
      { property_id: 9, property_name: 'Taj Bengal', city_name: 'Bengaluru', state_name: 'Karnataka', country_name: 'India' },
      { property_id: 10, property_name: 'ITC Windsor', city_name: 'Bengaluru', state_name: 'Karnataka', country_name: 'India' },
      { property_id: 11, property_name: 'Taj Exotica Resort', city_name: 'Goa', state_name: 'Goa', country_name: 'India' },
      { property_id: 12, property_name: 'Grand Hyatt Goa', city_name: 'Goa', state_name: 'Goa', country_name: 'India' },
      { property_id: 13, property_name: 'The Leela Palace Chennai', city_name: 'Chennai', state_name: 'Tamil Nadu', country_name: 'India' },
      { property_id: 14, property_name: 'ITC Grand Chola', city_name: 'Chennai', state_name: 'Tamil Nadu', country_name: 'India' }
    ];

    // Filter based on keyword (case insensitive)
    const keyword_lower = keyword.toLowerCase();
    const filteredData = mockData.filter(item => 
      (item.property_name && item.property_name.toLowerCase().includes(keyword_lower)) ||
      (item.city_name && item.city_name.toLowerCase().includes(keyword_lower)) ||
      (item.state_name && item.state_name.toLowerCase().includes(keyword_lower)) ||
      (item.country_name && item.country_name.toLowerCase().includes(keyword_lower))
    );

    // Sort by priority (property name matches first, then city, then state, then country)
    filteredData.sort((a, b) => {
      const aPropMatch = a.property_name?.toLowerCase().startsWith(keyword_lower) ? 1 : 0;
      const bPropMatch = b.property_name?.toLowerCase().startsWith(keyword_lower) ? 1 : 0;
      const aCityMatch = a.city_name?.toLowerCase().startsWith(keyword_lower) ? 1 : 0;
      const bCityMatch = b.city_name?.toLowerCase().startsWith(keyword_lower) ? 1 : 0;
      
      if (aPropMatch !== bPropMatch) return bPropMatch - aPropMatch;
      if (aCityMatch !== bCityMatch) return bCityMatch - aCityMatch;
      return 0;
    });

    const result = filteredData.slice(0, 5); // Limit to 5 results
    console.log("DAO: Mock query result rows count:", result.length);
    return result;

    // TODO: Replace with actual database query when database is configured
    /*
    const sql = `
      SELECT DISTINCT
        p.property_id,
        p.property_name,
        c.city_name,
        s.state_name,
        co.country_name,
        CASE 
          WHEN p.property_name LIKE CONCAT(?, '%') THEN 1
          WHEN c.city_name LIKE CONCAT(?, '%') THEN 2
          WHEN s.state_name LIKE CONCAT(?, '%') THEN 3
          WHEN co.country_name LIKE CONCAT(?, '%') THEN 4
          ELSE 5
        END as priority
      FROM property p
      JOIN city c ON p.city_id = c.city_id
      JOIN state s ON p.state_id = s.state_id
      JOIN country co ON p.country_id = co.country_id
      WHERE 
        p.property_name LIKE CONCAT('%', ?, '%')
        OR c.city_name LIKE CONCAT('%', ?, '%')
        OR s.state_name LIKE CONCAT('%', ?, '%')
        OR co.country_name LIKE CONCAT('%', ?, '%')
      ORDER BY priority, p.property_name
      LIMIT 5;
    `;
    
    console.log("DAO: Executing SQL query");
    const [rows] = await db.query(sql, [keyword, keyword, keyword, keyword, keyword, keyword, keyword, keyword]);
    console.log("DAO: Query result rows count:", rows.length);
    return rows;
    */
  } catch (error) {
    console.error("DAO Error in getAutoSuggest:", error);
    throw error;
  }
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
