import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    navigate("/dashboard");
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        
        {/* 🖼️ HERO IMAGE SECTION */}
        <div
          className="col-md-7 d-none d-md-flex align-items-center justify-content-center text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-center px-5">
            <h1 className="fw-bold mb-3">🚦 Smart Bengaluru</h1>
            <p className="fs-5">
              Report traffic & pothole issues in real-time and help make
              Bengaluru smarter and safer.
            </p>
          </div>
        </div>

        {/* 🔐 LOGIN FORM SECTION */}
        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card shadow-lg p-4"
            style={{
              width: "380px",
              background: "var(--card-bg)",
            }}
          >
            <h3 className="text-center mb-3">Login</h3>
            <p className="text-center text-muted">
              Welcome back 👋
            </p>

            <form onSubmit={submitHandler}>
              <input
                className="form-control mb-3"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn btn-primary w-100 mb-2">
                Login
              </button>
            </form>

            <small className="text-center d-block">
              Don’t have an account?{" "}
              <Link to="/register">Register</Link>
            </small>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
