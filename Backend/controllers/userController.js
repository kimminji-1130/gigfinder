// backend/controllers/userController.js
const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); // 비밀번호 암호화
const jwt = require('jsonwebtoken');    // JWT 생성

// @desc    Register a new user (신규 유저 회원가입)
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  // async 키워드 추가
  try {
    const { name, email, password, role } = req.body;

    // 1. 모든 필드가 입력되었는지 확인
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
    }

    // 2. 이미 존재하는 이메일인지 확인
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: '이미 존재하는 이메일입니다.' });
    }

    // 3. 비밀번호 암호화
    const salt = await bcrypt.genSalt(10); // 10자리 salt 생성
    const hashedPassword = await bcrypt.hash(password, salt); // 비밀번호 해시

    // 4. DB에 새로운 유저 생성
    const user = await User.create({
      name,
      email,
      password: hashedPassword, // 해시된 비밀번호 저장
      role,
    });

    // 5. 유저 생성이 성공했다면
    if (user) {
      // 6. JWT 토큰 생성 (페이로드: user id, 비밀키, 만료시간)
      const token = jwt.sign(
        { id: user._id, role: user.role }, // 토큰에 담을 정보
        process.env.JWT_SECRET,             // .env의 비밀 키
        { expiresIn: '30d' }                // 30일간 유효
      );

      // 7. 클라이언트에 응답 (비밀번호는 제외하고 보냄)
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token, // 생성된 토큰도 함께 전송
      });
    } else {
      return res.status(400).json({ message: '유저 생성에 실패했습니다.' });
    }
  } catch (error) {
    // 8. 서버 오류 처리
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. 이메일로 유저 찾기
    const user = await User.findOne({ email });

    // 2. 유저가 존재하고, 비밀번호가 일치하는지 확인
    // bcrypt.compare가 입력된 password와 DB의 암호화된 password를 비교해줌
    if (user && (await bcrypt.compare(password, user.password))) {

      // 3. 일치하면 토큰 발급
      const token = jwt.sign(
        { id: user._id, role: user.role }, // 토큰에 담을 정보
        process.env.JWT_SECRET,             // .env의 비밀 키
        { expiresIn: '30d' }                // 30일간 유효
      );

      // 4. 유저 정보와 토큰 응답 (비밀번호 제외)
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
      });
    } else {
      // 5. 유저가 없거나 비밀번호가 틀린 경우
      return res.status(401).json({ message: '이메일 또는 비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류가 발생했습니다.' });
  }
};

module.exports = {
  registerUser,
  loginUser,
};