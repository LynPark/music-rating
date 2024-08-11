import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
          username,
          password,
      }, { withCredentials: true });
      if (response.status === 200) {
        const userData = response.data; // 서버에서 받은 userData
        console.log('Received User Data:', userData);
        onLogin(userData); // userData를 App 컴포넌트로 전달
        navigate("/"); // 로그인 후 홈으로 리디렉트
      }
  } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
  }
};

  return (
    <div className="container">
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <label>아이디</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="아이디"
        />
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;
