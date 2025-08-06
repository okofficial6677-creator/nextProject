const db = require("../config/db");

// Add a new rate plan
exports.addRatePlan = (ratePlanData) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO rate_plan (
        property_id, room_id, rate_code, rate_name, inclusion_type, board_type, rate_comments,
        status, extra_beds, min_length_of_stay, max_length_of_stay, max_occupancy,
        max_extra_beds_adult, max_extra_beds_child, max_extra_beds_infant,
        child_rate_allowed, charge_type, charge_value,
        booking_type, tax_type,
        cancellation_policy_name, cancellation_description,
        base_price, total_price, commission_percentage, currency,
        from_date, to_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      ratePlanData.property_id,
      ratePlanData.room_id,
      ratePlanData.rate_code,
      ratePlanData.rate_name,
      ratePlanData.inclusion_type,
      ratePlanData.board_type,
      ratePlanData.rate_comments,
      ratePlanData.status,
      ratePlanData.extra_beds,
      ratePlanData.min_length_of_stay,
      ratePlanData.max_length_of_stay,
      ratePlanData.max_occupancy,
      ratePlanData.max_extra_beds_adult,
      ratePlanData.max_extra_beds_child,
      ratePlanData.max_extra_beds_infant,
      ratePlanData.child_rate_allowed,
      ratePlanData.charge_type,
      ratePlanData.charge_value,
      ratePlanData.booking_type,
      ratePlanData.tax_type,
      ratePlanData.cancellation_policy_name,
      ratePlanData.cancellation_description,
      ratePlanData.base_price,
      ratePlanData.total_price,
      ratePlanData.commission_percentage,
      ratePlanData.currency,
      ratePlanData.from_date,
      ratePlanData.to_date
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("Error inserting rate plan:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Get all rate plans
exports.getAllRatePlans = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM rate_plan";
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching rate plans:", err);
        return reject(err);
      }
      resolve(results);
    });
  });
};
