const db = require("../config/db");

/**
 * ============================
 * ADD VITAL RECORD
 * ============================
 */
exports.addVital = (req, res) => {
  try {
    const { vitalType, value, recordedAt } = req.body;

    if (!vitalType || !value) {
      return res.status(400).json({
        message: "Vital type and value are required",
      });
    }

    db.run(
      `
      INSERT INTO vitals (userId, vitalType, value, recordedAt)
      VALUES (?,?,?,?)
      `,
      [
        req.user.id,
        vitalType,
        value,
        recordedAt || new Date().toISOString(),
      ],
      function (err) {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        return res.status(201).json({
          message: "Vital recorded successfully",
          vitalId: this.lastID,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * ============================
 * GET ALL VITALS (USER)
 * ============================
 */
exports.getMyVitals = (req, res) => {
  try {
    db.all(
      `
      SELECT id, vitalType, value, recordedAt
      FROM vitals
      WHERE userId = ?
      ORDER BY recordedAt DESC
      `,
      [req.user.id],
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        return res.json({
          count: rows.length,
          vitals: rows,
        });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * ============================
 * FILTER VITALS
 * ============================
 * Query Params:
 *  - vitalType
 *  - fromDate
 *  - toDate
 */
exports.filterVitals = (req, res) => {
  try {
    const { vitalType, fromDate, toDate } = req.query;

    let query = `
      SELECT id, vitalType, value, recordedAt
      FROM vitals
      WHERE userId = ?
    `;
    const params = [req.user.id];

    if (vitalType) {
      query += " AND vitalType = ?";
      params.push(vitalType);
    }

    if (fromDate) {
      query += " AND recordedAt >= ?";
      params.push(fromDate);
    }

    if (toDate) {
      query += " AND recordedAt <= ?";
      params.push(toDate);
    }

    query += " ORDER BY recordedAt DESC";

    db.all(query, params, (err, rows) => {
      if (err) {
        return res.status(500).json({
          message: "Database error",
          error: err.message,
        });
      }

      return res.json({
        count: rows.length,
        vitals: rows,
      });
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
