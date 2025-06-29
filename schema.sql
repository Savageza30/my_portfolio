
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  userid VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) CHECK (role IN ('user', 'operator'))
);

CREATE TABLE issues (
  id SERIAL PRIMARY KEY,
  type VARCHAR(50),
  description TEXT,
  location TEXT,
  photo TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  feedback_time TIMESTAMP
);
