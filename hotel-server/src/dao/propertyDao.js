const connection = require("../config/db");

exports.addProperty = async (data) => {
  const {
    property_name,
    property_code,
    property_type,
    base_currency,
    star_category,
    check_in_time,
    check_out_time,
    description,
    address,
    zip_code,
    latitude,
    longitude,
    contact_name,
    contact_number,
    contact_email,
    country_id,
    state_id,
    city_id,
    chain_id,
    category_id,
    status,
  } = data;

  // Convert all undefined fields to null
  const safe = (value) => value === undefined ? null : value;

  const query = `
    INSERT INTO property (
      property_id,property_name, property_code, property_type, base_currency, star_category,
      check_in_time, check_out_time, description, address, zip_code, latitude,
      longitude, contact_name, contact_number, contact_email,
      country_id, state_id, city_id, chain_id, category_id, status
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    safe(property_name),
    safe(property_code),
    safe(property_type),
    safe(base_currency),
    safe(star_category),
    safe(check_in_time),
    safe(check_out_time),
    safe(description),
    safe(address),
    safe(zip_code),
    safe(latitude),
    safe(longitude),
    safe(contact_name),
    safe(contact_number),
    safe(contact_email),
    safe(country_id),
    safe(state_id),
    safe(city_id),
    safe(chain_id),
    safe(category_id),
    safe(status),
  ];

  const [result] = await connection.promise().execute(query, values);
  return result.affectedRows === 1 ? "Property added successfully" : "Failed to add property";
};



exports.getAllProperties = async () => {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        p.property_name,
        ci.city_name AS city_name,
        c.country_name AS country_name,
        s.state_name AS state_name,
        p.address
      FROM property p
      JOIN country c ON p.country_id = c.country_id
      LEFT JOIN state s ON p.state_id = s.state_id
      LEFT JOIN city ci ON p.city_id = ci.city_id
    `);
    return rows;
  } catch (err) {
    console.error("DAO Error - getAllProperties:", err.message);
    throw err;
  }
};

// ----- Individual Filters Below -----

exports.getByCountryName = async (country_name) => {
  const [rows] = await connection.promise().execute(`
    SELECT c.country_name, s.state_name, ci.city_name, p.property_name, p.property_code, ch.chain_name, p.status
    FROM property p
    JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ci ON p.city_id = ci.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    WHERE c.country_name LIKE ?
  `, [`%${country_name}%`]);
  return rows;
};

exports.getByStateName = async (state_name) => {
  const [rows] = await connection.promise().execute(`
    SELECT c.country_name, s.state_name, ci.city_name, p.property_name, p.property_code, ch.chain_name, p.status
    FROM property p
    JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ci ON p.city_id = ci.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    WHERE s.state_name LIKE ?
  `, [`%${state_name}%`]);
  return rows;
};

exports.getByCityName = async (city_name) => {
  const [rows] = await connection.promise().execute(`
    SELECT c.country_name, s.state_name, ci.city_name, p.property_name, p.property_code, ch.chain_name, p.status
    FROM property p
    JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ci ON p.city_id = ci.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    WHERE ci.city_name LIKE ?
  `, [`%${city_name}%`]);
  return rows;
};

exports.getByPropertyName = async (property_name) => {
  const [rows] = await connection.promise().execute(`
    SELECT c.country_name, s.state_nam object but haven't imported or defined it properly.e, ci.city_name, p.property_name, p.property_code, ch.chain_name, p.status
    FROM property p
    JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ci ON p.city_id = ci.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    WHERE p.property_name LIKE ?
  `, [`%${property_name}%`]); //object but haven't imported or defined it properly.
  return rows;
};

exports.getByPropertyCode = async (property_code) => {
  const [rows] = await connection.promise().execute(`
    SELECT c.country_name, s.state_name, ci.city_name, p.property_name, p.property_code, ch.chain_name, p.status
    FROM property p
    JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ci ON p.city_id = ci.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    WHERE p.property_code LIKE ?
  `, [`%${property_code}%`]);
  return rows;
};

exports.getByChainName = async (chain_name) => {
  const [rows] = await connection.promise().execute(`
    SELECT c.country_name, s.state_name, ci.city_name, p.property_name, p.property_code, ch.chain_name, p.status
    FROM property p
    JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ci ON p.city_id =  object but haven't imported or defined it properly.ci.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    WHERE ch.chain_name LIKE ?
  `, [`%${chain_name}%`]);
  return rows;
};

exports.getByStatus = async (status) => {
  const [rows] = await connection.promise().execute(`
    SELECT c.country_name, s.state_name, ci.city_name, p.property_name, p.property_code, ch.chain_name, p.status
    FROM property p
    JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ci ON p.city_id = ci.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    WHERE p.status = ?
  `, [status]);
  return rows;
};

exports.getById = async (property_id) => {
  const [rows] = await connection.promise().execute(`
    SELECT c.country_name, s.state_name, ci.city_name, p.property_name, p.property_code, ch.chain_name, p.status
    FROM property p
    JOIN country c ON p.country_id = c.country_id
    LEFT JOIN state s ON p.state_id = s.state_id
    LEFT JOIN city ci ON p.city_id = ci.city_id
    LEFT JOIN chain ch ON p.chain_id = ch.chain_id
    WHERE p.property_id = ?
  `, [property_id]);
  return rows;
};


exports.searchProperties = async (searchText) => {
  try {
    const [rows] = await connection.execute(`
      SELECT 
        p.property_name,
        ci.city_name,
        c.country_name,
        s.state_name,
        p.address
      FROM property p
      JOIN country c ON p.country_id = c.country_id
      LEFT JOIN state s ON p.state_id = s.state_id
      LEFT JOIN city ci ON p.city_id = ci.city_id
     WHERE 
        p.property_name LIKE ? OR
        ci.city_name LIKE ? OR
        c.country_name LIKE ? OR
        s.state_name LIKE ? OR
        p.address LIKE ?
    `, [
      `%${searchText}%`,
      `%${searchText}%`,
      `%${searchText}%`,
      `%${searchText}%`,
      `%${searchText}%`
    ]);
    return rows;
  } catch (err) {
    console.error("DAO Error - searchProperties:", err.message);
    throw err;
  }
};