import React, { useState } from "react";
import "./Login.css";
import { auth, googleProvider } from "../../Firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { FaPaperPlane } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignup) {
        if (password !== confirmPassword) {
          alert("Passwords do not match!");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Registration successful!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
      navigate("/introduction"); // Redirect after successful login/signup
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert("Google login successful!");
      navigate("/introduction");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      {/* Left Section */}
      <div className="login-left">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="brand">
          LGHomeComfort<br /> Email Marketing.
        </div>
        <div className="welcome">Welcome to Marketing Web-Application!</div>
      </div>

      {/* Right Section */}
      <div className="login-right">
        {/* Multiple Animated Planes */}
        <FaPaperPlane className="plane plane1" />
        <FaPaperPlane className="plane plane2" />
        <FaPaperPlane className="plane plane3" />
        <FaPaperPlane className="plane plane4" />
        <FaPaperPlane className="plane plane5" />
        <FaPaperPlane className="plane plane6" />

        <div className="login-card">
          <div className="avatar">
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              alt="user avatar"
            />
          </div>
          <p className="login-text">
            {isSignup ? "Create your account" : "Login below to get started."}
          </p>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isSignup && (
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            <button type="submit" className="login-btn">
              {isSignup ? "Register" : "Login"}
            </button>
          </form>

          <button
            onClick={handleGoogleLogin}
            className="login-btn google-btn"
          >
            <i className="fab fa-google"></i> Continue with Google
          </button>

          <p className="register-text">
            {isSignup ? "Already have an account?" : "New user?"}{" "}
            <a href="#" onClick={toggleForm}>
              {isSignup ? "Login" : "Register"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
