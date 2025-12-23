const db = require("../config/db");

/**
 * ============================
 * SHARE REPORT (OWNER ONLY)
 * ============================
 */
exports.shareReport = (req, res) => {
  try {
    const { reportId, sharedWith } = req.body;

    if (!reportId || !sharedWith) {
      return res.status(400).json({
        message: "Report ID and sharedWith email are required",
      });
    }

    // Check ownership
    db.get(
      "SELECT * FROM reports WHERE id = ? AND userId = ?",
      [reportId, req.user.id],
      (err, report) => {
        if (!report) {
          return res.status(403).json({
            message: "You are not authorized to share this report",
          });
        }

        // Insert share access
        db.run(
          `
          INSERT INTO shared_access (reportId, sharedWith, permission)
          VALUES (?,?,?)
          `,
          [reportId, sharedWith, "read"],
          function (err) {
            if (err) {
              return res.status(500).json({
                message: "Database error",
                error: err.message,
              });
            }

            return res.status(201).json({
              message: "Report shared successfully",
            });
          }
        );
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
 * GET REPORTS SHARED WITH ME
 * ============================
 */
exports.getSharedWithMe = (req, res) => {
  try {
    db.all(
      `
      SELECT 
        r.id,
        r.type,
        r.reportDate,
        r.vitals,
        r.filePath,
        r.createdAt
      FROM reports r
      JOIN shared_access s ON r.id = s.reportId
      WHERE s.sharedWith = ?
      `,
      [req.user.email],
      (err, rows) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        return res.json({
          count: rows.length,
          reports: rows,
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
 * REVOKE SHARED ACCESS
 * ============================
 */
exports.revokeAccess = (req, res) => {
  try {
    const { reportId, sharedWith } = req.body;

    db.run(
      `
      DELETE FROM shared_access
      WHERE reportId = ? AND sharedWith = ?
      `,
      [reportId, sharedWith],
      function (err) {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        return res.json({
          message: "Access revoked successfully",
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
