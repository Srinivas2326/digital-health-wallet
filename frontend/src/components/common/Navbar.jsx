const db = require("../config/db");

exports.getDashboardStats = (req, res) => {
  const userId = req.user.id;
  const userEmail = req.user.email;

  const stats = {
    totalReports: 0,
    totalVitals: 0,
    sharedAccess: 0,
  };

  // 1️⃣ Total reports (ONLY this user)
  db.get(
    "SELECT COUNT(*) AS count FROM reports WHERE userId = ?",
    [userId],
    (err, reports) => {
      if (err) return res.status(500).json({ message: "DB error" });
      stats.totalReports = reports.count;

      // 2️⃣ Total vitals (ONLY this user)
      db.get(
        "SELECT COUNT(*) AS count FROM vitals WHERE userId = ?",
        [userId],
        (err, vitals) => {
          if (err) return res.status(500).json({ message: "DB error" });
          stats.totalVitals = vitals.count;

          // 3️⃣ Shared reports (shared WITH this user)
          db.get(
            "SELECT COUNT(*) AS count FROM shared_access WHERE sharedWith = ?",
            [userEmail],
            (err, shared) => {
              if (err) return res.status(500).json({ message: "DB error" });
              stats.sharedAccess = shared.count;

              return res.json(stats);
            }
          );
        }
      );
    }
  );
};
