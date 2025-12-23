const db = require("../config/db");
const fs = require("fs");
const path = require("path");

/**
 * ============================
 * UPLOAD MEDICAL REPORT
 * ============================
 */
exports.uploadReport = (req, res) => {
  try {
    const { reportType, reportDate, vitals } = req.body;

    // Validation
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    if (!reportType || !reportDate) {
      return res.status(400).json({
        message: "Report type and report date are required",
      });
    }

    // Store public path (IMPORTANT)
    const filePath = `uploads/reports/${req.file.filename}`;

    db.run(
      `
      INSERT INTO reports (userId, type, reportDate, vitals, filePath)
      VALUES (?,?,?,?,?)
      `,
      [
        req.user.id,
        reportType,
        reportDate,
        vitals || null,
        filePath,
      ],
      function (err) {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        return res.status(201).json({
          message: "Report uploaded successfully",
          reportId: this.lastID,
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
 * GET ALL REPORTS (LOGGED-IN USER)
 * ============================
 */
exports.getMyReports = (req, res) => {
  try {
    db.all(
      `
      SELECT 
        id,
        type,
        reportDate,
        vitals,
        filePath,
        createdAt
      FROM reports
      WHERE userId = ?
      ORDER BY reportDate DESC
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
 * FILTER REPORTS
 * ============================
 */
exports.filterReports = (req, res) => {
  try {
    const { fromDate, toDate, type, vitals } = req.query;

    let query = `
      SELECT 
        id,
        type,
        reportDate,
        vitals,
        filePath,
        createdAt
      FROM reports
      WHERE userId = ?
    `;

    const params = [req.user.id];

    if (fromDate) {
      query += " AND reportDate >= ?";
      params.push(fromDate);
    }

    if (toDate) {
      query += " AND reportDate <= ?";
      params.push(toDate);
    }

    if (type) {
      query += " AND type = ?";
      params.push(type);
    }

    if (vitals) {
      query += " AND vitals LIKE ?";
      params.push(`%${vitals}%`);
    }

    query += " ORDER BY reportDate DESC";

    db.all(query, params, (err, rows) => {
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
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * ============================
 * DELETE REPORT (OWNER ONLY)
 * ============================
 */
exports.deleteReport = (req, res) => {
  const reportId = req.params.id;
  const userId = req.user.id;

  // Verify ownership
  db.get(
    "SELECT * FROM reports WHERE id = ? AND userId = ?",
    [reportId, userId],
    (err, report) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (!report) {
        return res
          .status(404)
          .json({ message: "Report not found or unauthorized" });
      }

      // Delete file from disk
      const absolutePath = path.join(
        __dirname,
        "..",
        report.filePath
      );

      fs.unlink(absolutePath, (fsErr) => {
        if (fsErr) {
          console.warn("File delete warning:", fsErr.message);
        }

        // Delete DB record
        db.run(
          "DELETE FROM reports WHERE id = ?",
          [reportId],
          function (delErr) {
            if (delErr) {
              return res
                .status(500)
                .json({ message: "Failed to delete report" });
            }

            return res.json({
              message: "Report deleted successfully",
            });
          }
        );
      });
    }
  );
};
