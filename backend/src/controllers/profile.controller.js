const db = require("../config/db");
const bcrypt = require("bcryptjs");

/* =========================
   GET MY PROFILE
========================= */
exports.getProfile = (req, res) => {
  const userId = req.user.id;

  db.get(
    "SELECT id, name, email FROM users WHERE id = ?",
    [userId],
    (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user);
    }
  );
};

/* =========================
   UPDATE PROFILE (NAME, EMAIL)
========================= */
exports.updateProfile = (req, res) => {
  const userId = req.user.id;
  let { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  email = email.toLowerCase();

  db.run(
    "UPDATE users SET name = ?, email = ? WHERE id = ?",
    [name.trim(), email, userId],
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE")) {
          return res.status(400).json({
            message: "Email already in use",
          });
        }

        return res.status(500).json({ message: "Database error" });
      }

      res.json({ message: "Profile updated successfully" });
    }
  );
};

/* =========================
   CHANGE PASSWORD
========================= */
exports.changePassword = (req, res) => {
  const userId = req.user.id;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      message: "Both passwords are required",
    });
  }

  if (newPassword.length < 6) {
    return res.status(400).json({
      message: "New password must be at least 6 characters",
    });
  }

  db.get(
    "SELECT password FROM users WHERE id = ?",
    [userId],
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          message: "User not found",
        });
      }

      const isMatch = bcrypt.compareSync(
        currentPassword,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Current password is incorrect",
        });
      }

      const hashed = bcrypt.hashSync(newPassword, 10);

      db.run(
        "UPDATE users SET password = ? WHERE id = ?",
        [hashed, userId],
        () => {
          res.json({ message: "Password updated successfully" });
        }
      );
    }
  );
};
