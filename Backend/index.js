// backend/index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config(); // .env 로드
const connectDB = require('./config/db'); // DB 연결 함수 불러오기
const userRoutes = require('./routes/userRoutes');
const gigRoutes = require('./routes/gigRoutes');

dotenv.config();
// --- 데이터베이스 연결 ---
connectDB();

const app = express();
const port = process.env.PORT || 5000; // 이게 있어야 req.body를 JSON으로 파싱할 수 있습니다.

// 미들웨어 설정
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/gigs', gigRoutes);

const PORT = process.env.PORT || 5000;

// 서버 시작
app.listen(port, () => {
  console.log(`🚀 백엔드 서버가 ${port}번 포트에서 실행 중입니다.`);
});