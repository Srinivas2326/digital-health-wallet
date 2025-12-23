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

    // 1️⃣ Check report ownership
    db.get(
      "SELECT id FROM reports WHERE id = ? AND userId = ?",
      [reportId, req.user.id],
      (err, report) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        if (!report) {
          return res.status(403).json({
            message: "You are not authorized to share this report",
          });
        }

        // 2️⃣ Prevent duplicate sharing
        db.get(
          `
          SELECT id FROM shared_access
          WHERE reportId = ? AND sharedWith = ?
          `,
          [reportId, sharedWith],
          (err, existing) => {
            if (existing) {
              return res.status(409).json({
                message: "Report already shared with this user",
              });
            }

            // 3️⃣ Insert shared access
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
      ORDER BY r.reportDate DESC
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
          reports: rows || [],
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
 * REVOKE SHARED ACCESS (OWNER)
 * ============================
 */
exports.revokeAccess = (req, res) => {
  try {
    const { reportId, sharedWith } = req.body;

    if (!reportId || !sharedWith) {
      return res.status(400).json({
        message: "Report ID and sharedWith email are required",
      });
    }

    // Ensure owner owns the report
    db.get(
      "SELECT id FROM reports WHERE id = ? AND userId = ?",
      [reportId, req.user.id],
      (err, report) => {
        if (!report) {
          return res.status(403).json({
            message: "Not authorized to revoke access",
          });
        }

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
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
