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
  user: 'root',           // ou autre si tu l’as changé
  password: 'root',       // mot de passe de MAMP (souvent 'root' par défaut)
  database: 'real-estate' // ton nom de base
});

db.connect(err => {
  if (err) throw err;
  console.log('✅ Connected to MySQL');
});

// Exemple de route
app.get('/properties', (req, res) => {
  db.query('SELECT * FROM property', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erreur de base de données');
    } else {
      res.json(results);
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
