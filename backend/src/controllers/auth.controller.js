const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* =========================
   EMAIL VALIDATION REGEX
========================= */
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* =========================
   REGISTER USER
========================= */
exports.register = (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // 2️⃣ Email format validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // 3️⃣ Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // 4️⃣ Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 5️⃣ Insert user
    db.run(
      "INSERT INTO users (name, email, password) VALUES (?,?,?)",
      [name.trim(), email.toLowerCase(), hashedPassword],
      function (err) {
        if (err) {
          // Duplicate email
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

/* =========================
   LOGIN USER
========================= */
exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // 2️⃣ Email format validation
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
      });
    }

    // 3️⃣ Fetch user
    db.get(
      "SELECT id, email, password FROM users WHERE email = ?",
      [email.toLowerCase()],
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

        // 4️⃣ Compare password
        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
          return res.status(401).json({
            message: "Invalid email or password",
          });
        }

        // 5️⃣ JWT secret check
        if (!process.env.JWT_SECRET) {
          return res.status(500).json({
            message: "JWT secret not configured",
          });
        }

        // 6️⃣ Generate token
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );

        // 7️⃣ Success
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
