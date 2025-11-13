// frontend/src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // 1. 페이지 이동을 위한 훅
import './Register.css'; // 2. 회원가입 CSS 재사용

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const navigate = useNavigate(); // 3. navigate 함수 초기화

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 4. 로그인 API 호출
      const response = await axios.post('/api/users/login', formData);

      // 5. 로그인 성공 시
      console.log('로그인 성공:', response.data);
      
      // 6. (중요) 토큰과 유저 정보를 localStorage에 저장
      localStorage.setItem('token', response.data.token);
      // 유저 정보 전체를 문자열로 변환하여 저장
      localStorage.setItem('user', JSON.stringify(response.data)); 

      alert('로그인 성공!');
      navigate('/'); // 7. 홈 화면으로 이동

    } catch (error) {
      // 8. 로그인 실패 시
      console.error('로그인 실패:', error.response.data.message);
      alert('로그인 실패: ' + error.response.data.message);
    }
  };

  return (
    // 9. Register.css의 className들을 그대로 사용
    <div className="register-container">
      <h4>Log in to your Account</h4>
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <button type="submit" className="btn-primary">Log in</button>
      </form>
      
      <div className="login-link" style={{ marginTop: '20px' }}>
        <p>Don't have an account? <a href="/register">Sign up</a></p>
      </div>
    </div>
  );
}

export default Login;