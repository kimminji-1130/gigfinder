// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController'); // 컨트롤러 함수 불러오기

// 회원가입 라우트
// /api/users/register 경로로 POST 요청이 오면, registerUser 함수를 실행
router.post('/register', registerUser); 
// 로그인 라우트
router.post('/login', loginUser);

module.exports = router;