// backend/models/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // 1. 이름
  name: {
    type: String,
    required: [true, '이름을 입력해주세요.'], // 필수 항목
  },
  // 2. 이메일
  email: {
    type: String,
    required: [true, '이메일을 입력해주세요.'],
    unique: true, // 유일한 값이어야 함 (중복 가입 방지)
    lowercase: true, // 항상 소문자로 저장
  },
  // 3. 비밀번호
  password: {
    type: String,
    required: [true, '비밀번호를 입력해주세요.'],
  },
  // 4. 역할 (구직자/고용주 구분)
  role: {
    type: String,
    enum: ['freelancer', 'client'], // '구직자(freelancer)' 또는 '고용주(client)'
    required: [true, '역할을 선택해주세요.'],
  },
}, {
  // 타임스탬프: createdAt(생성일), updatedAt(수정일) 자동 기록
  timestamps: true,
});

// 'User' (단수형) 이름으로 모델을 만들면,
// Mongoose가 자동으로 'users' (복수형) 컬렉션에 연결합니다.
module.exports = mongoose.model('User', userSchema);