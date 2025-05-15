const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'real-estate'
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// -------------------- ROUTES -------------------- //

app.get('/api/governorates', (req, res) => {
    console.log('GET /api/governorates');
  const sql = 'SELECT * FROM governorate';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur gouvernorats :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

app.get('/api/cities/:id_governorate', (req, res) => {
  const sql = 'SELECT * FROM city WHERE id_governorate = ?';
  db.query(sql, [req.params.id_governorate], (err, results) => {
    if (err) {
      console.error('Erreur villes :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

app.get('/api/properties', (req, res) => {
  const { id_governorate, id_city, type } = req.query;

  let sql = `
    SELECT 
      p.id_property,
      p.name_property,
      p.type_property,
      p.price_property,
      p.surface_property,
      p.legal_property,
      p.construction_permit_property,
      p.description_property,
      p.gmaps_link_property,
      p.photo_property,
      g.name_governorate,
      c.name_city
    FROM property p
    JOIN governorate g ON p.id_governorate = g.id_governorate
    JOIN city c ON p.id_city = c.id_city
    WHERE 1
  `;
  const values = [];

  if (id_governorate) {
    sql += ' AND p.id_governorate = ?';
    values.push(id_governorate);
  }

  if (id_city) {
    sql += ' AND p.id_city = ?';
    values.push(id_city);
  }

  if (type) {
    sql += ' AND p.type_property = ?';
    values.push(type);
  }

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error('Erreur propriétés :', err);
      return res.status(500).json({ error: 'Erreur serveur' });
    }
    res.json(results);
  });
});

// ------------------------------------------------- //

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
