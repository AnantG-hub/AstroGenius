// ✅ Updated server.js (ESM syntax)
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import fetch from 'node-fetch';
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/panchang", async (req, res) => {
  try {
    const { day, month, year, hour, min, lat, lon, tzone } = req.body;

    const response = await fetch("https://json.astrologyapi.com/v1/panchang", {
      method: "POST",
      headers: {
        Authorization: "Basic " + Buffer.from(`${process.env.USER_ID}:${process.env.API_KEY}`).toString("base64"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ day, month, year, hour, min, lat, lon, tzone }),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: "Panchang API error", details: data });
    }

    res.json(data);
  } catch (err) {
    console.error("❌ Server Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
