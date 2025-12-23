const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * =========================
 * REGISTER USER
 * =========================
 */
exports.register = (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // 2️⃣ Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 3️⃣ Insert user
    db.run(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name, email, hashedPassword],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE")) {
            return res.status(400).json({
              message: "Email already registered",
            });
          }

          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        return res.status(201).json({
          message: "User registered successfully",
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
 * =========================
 * LOGIN USER
 * =========================
 */
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2️⃣ Fetch user
    db.get(
      "SELECT id, email, password FROM users WHERE email = ?",
      [email],
      (err, user) => {
        if (err) {
          return res.status(500).json({
            message: "Database error",
            error: err.message,
          });
        }

        if (!user) {
          return res.status(401).json({
            message: "Invalid email or password",
          });
        }

        // 3️⃣ Compare password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          return res.status(401).json({
            message: "Invalid email or password",
          });
        }

        // 4️⃣ Ensure JWT secret exists
        if (!process.env.JWT_SECRET) {
          return res.status(500).json({
            message: "JWT secret not configured",
          });
        }

        // 5️⃣ Generate token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        // 6️⃣ Success response
        return res.json({
          message: "Login successful",
          token,
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
