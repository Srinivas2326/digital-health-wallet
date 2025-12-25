const db = require("../config/db");

exports.getDashboardStats = (req, res) => {
  const userId = req.user.id;
  const userEmail = req.user.email;

  const stats = {
    totalReports: 0,
    totalVitals: 0,
    sharedAccess: 0,
  };

  /* =========================
     TOTAL REPORTS (USER ONLY)
  ========================= */
  db.get(
    "SELECT COUNT(*) AS count FROM reports WHERE userId = ?",
    [userId],
    (err, reportsRow) => {
      if (err) {
        return res.status(500).json({
          message: "Failed to fetch reports count",
        });
      }

      stats.totalReports = reportsRow?.count || 0;

      /* =========================
         TOTAL VITALS (USER ONLY)
      ========================= */
      db.get(
        "SELECT COUNT(*) AS count FROM vitals WHERE userId = ?",
        [userId],
        (err, vitalsRow) => {
          if (err) {
            return res.status(500).json({
              message: "Failed to fetch vitals count",
            });
          }

          stats.totalVitals = vitalsRow?.count || 0;

          /* =========================
             SHARED ACCESS (WITH USER)
          ========================= */
          db.get(
            "SELECT COUNT(*) AS count FROM shared_access WHERE sharedWith = ?",
            [userEmail],
            (err, sharedRow) => {
              if (err) {
                return res.status(500).json({
                  message: "Failed to fetch shared access count",
                });
              }

              stats.sharedAccess = sharedRow?.count || 0;

              return res.json(stats);
            }
          );
        }
      );
    }
  );
};
