const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const router = express.Router();

const secretKey = process.env.JWT_SECRET || 'your-secret-key';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret';

router.post('/login', async (req, res) => {
  const { name, uId, password } = req.body;

  try {
    // Extract company name from uId (assuming uId format includes company name)
    const companyName = extractCompanyNameFromUId(uId);

    // Create a new pool for the specific company's database
    const pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: companyName,
      port: process.env.DB_PORT
    });

    // Query to find the user by name and uId in the specific company's database
    const [results] = await pool.query('SELECT * FROM LoginInfo WHERE employeeName = ? AND u_id = ?', [name, uId]);

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.Password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.id, role: user.role }, refreshTokenSecret, { expiresIn: '30d' });

    res.status(200).json({ message: 'Login successful', accessToken, refreshToken, role: user.role, userId: user.id });
  } catch (error) {
    console.error('Error querying database:', error);
    res.status(500).json({ error: 'Database error' });
  }
});

const extractCompanyNameFromUId = (uId) => {
  // Implement your logic to extract the company name from the uId
  // For example, if uId is formatted as "companyName_someIdentifier"
  return uId.split('_')[0];
};

module.exports = router;
