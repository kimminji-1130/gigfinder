// backend/config/db.js
const mongoose = require('mongoose');
require('dotenv').config(); // .env 파일의 변수를 로드

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        
    });

    console.log(`✅ MongoDB가 연결되었습니다: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB 연결 오류: ${error.message}`);
    // 오류 발생 시 프로세스 종료
    process.exit(1);
  }
};

module.exports = connectDB;