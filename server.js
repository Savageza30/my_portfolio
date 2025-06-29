const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { Pool } = require('pg');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'your_db',
  password: 'your_password',
  port: 5432,
});

app.post('/api/login', async (req, res) => {
  const { userId, password, role } = req.body;
  const result = await pool.query(
    'SELECT * FROM users WHERE userid=$1 AND password=$2 AND role=$3',
    [userId, password, role]
  );
  if (result.rows.length > 0) res.json({ success: true });
  else res.status(401).json({ success: false });
});

app.post('/api/issue', upload.single('photo'), async (req, res) => {
  const { type, description, location } = req.body;
  const photoPath = req.file ? req.file.path : null;
  await pool.query(
    'INSERT INTO issues(type, description, location, photo) VALUES($1, $2, $3, $4)',
    [type, description, location, photoPath]
  );
  res.json({ success: true });
});

app.get('/api/issues', async (req, res) => {
  const result = await pool.query('SELECT * FROM issues ORDER BY created_at DESC');
  res.json(result.rows);
});

app.post('/api/feedback', async (req, res) => {
  const { issueId, scheduledTime } = req.body;
  await pool.query('UPDATE issues SET feedback_time=$1 WHERE id=$2', [scheduledTime, issueId]);
  res.json({ success: true });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
