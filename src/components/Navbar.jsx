import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, userData, onLogout }) => {
  const navigate = useNavigate();

  console.log("User Data in Navbar:", userData);

  const handleLogout = () => {
    onLogout(); // 로그아웃 함수 호출
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Music App
        </Link>
        <div className="navbar-links">
          {isAuthenticated && userData ? (
            <>
              <p>{userData.username}님</p>
              <Link to="/mypage">마이페이지</Link>
              <button onClick={handleLogout} className="logout-button">
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link to="/signup">회원가입</Link>
              <Link to="/login">로그인</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
