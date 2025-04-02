const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'users'
});

db.connect((err) => {
  if (err) {
    console.error('DB 연결 실패:', err);
  } else {
    console.log('MySQL 연결 성공');
  }
});

// 회원가입 처리 API
app.post('/register', (req, res) => {
  const { name, dateOfBirth, gender, phoneNumber, email, username, password } = req.body;

  const sql = 'INSERT INTO users (name, dateOfBirth, gender, phoneNumber, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [name, dateOfBirth, gender, phoneNumber, email, username, password], (err, result) => {
    if (err) {
      res.status(500).send('회원가입 실패');
    } else {
      res.status(200).send('회원가입 성공');
    }
  });
});

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다`);
});
