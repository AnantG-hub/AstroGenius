// backend/post/panchang.js
const express = require('express');
const fetch = require('node-fetch'); // Make sure this is installed: npm install node-fetch

const router = express.Router();

router.post('/', async (req, res) => {
  const { day, month, year, hour, min, lat, lon, tzone } = req.body;

  // ✅ Securely use your AstroAPI credentials
  const userId = process.env.ASTRO_API_USER;
  const apiKey = process.env.ASTRO_API_KEY;
 const auth = 'Basic ' + Buffer.from(`${process.env.ASTRO_USER_ID}:${process.env.ASTRO_API_KEY}`).toString('base64');


  try {
    const response = await fetch('https://json.astrologyapi.com/v1/basic_panchang', {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ day, month, year, hour, min, lat, lon, tzone }),
    });

    const data = await response.json();
    console.log("🌞 Panchang API data:", data); // helpful debug
    res.json(data);
  } catch (error) {
    console.error("❌ Panchang API error:", error.message);
    res.status(500).json({ error: 'Panchang fetch failed', details: error.message });
  }
});

module.exports = router;
