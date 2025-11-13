// frontend/src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // 👈 1. CSS 파일 임포트
import Google from '../assets/Google.png';
import Facebook from '../assets/facebook.png';
import Apple from '../assets/apple.png';
function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'freelancer',
  });

  const handleChange = (e) => {
    // ... (이 부분은 동일) ...
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    // ... (이 부분은 동일) ...
    e.preventDefault(); 
    try {
      const response = await axios.post('/api/users/register', formData);
      console.log('회원가입 성공:', response.data);
      alert('회원가입에 성공했습니다!');
      // (나중에는 alert 대신 /login 페이지로 이동시킵니다)
    } catch (error) {
      console.error('회원가입 실패:', error.response.data.message);
      alert('회원가입 실패: ' + error.response.data.message);
    }
  };

  // ----------------------------------------------------
  // 👈 2. JSX(HTML) 부분에 className 적용
  // ----------------------------------------------------
  return (
    <div className="register-container">
      <h4>Create your Account</h4>
      
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Name</label> {/* (영어로 통일) */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input" // 👈 className 추가
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input" // 👈 className 추가
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
            className="form-input" // 👈 className 추가
            required
          />
        </div>
        <div className="form-group">
          <label>I am a...</label> {/* (Role) */}
          <select 
            name="role" 
            value={formData.role} 
            onChange={handleChange} 
            className="form-select" // 👈 className 추가
          >
            <option value="freelancer">Freelancer (Looking for work)</option>
            <option value="client">Client (Hiring for work)</option>
          </select>
        </div>
        
        <button type="submit" className="btn-primary">Sign up</button>
      </form>
      
      <div className="divider">
        - Or sign up with -
      </div>
      
      <div className="social-buttons">
        <button className="btn-social"><img src={Google} alt="Sign up with Google" /></button>
        <button className="btn-social"><img src={Facebook} alt="Sign up with Facebook" /></button>
        <button className="btn-social"><img src={Apple} alt="Sign up with Apple" /></button>
      </div>
      
      <div className="login-link">
        <p>Already have an account? <a href="/login">Log in</a></p>
      </div>
    </div>
  );
}

export default Register;