import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../api/axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    await API.post("/auth/register", {
      name,
      email,
      password,
    });

    navigate("/");
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
            <h1 className="fw-bold mb-3">🚦 Join Smart Bengaluru</h1>
            <p className="fs-5">
              Be a part of the initiative to make Bengaluru roads safer and
              traffic smarter.
            </p>
          </div>
        </div>

        {/* 📝 REGISTER FORM SECTION */}
        <div className="col-md-5 d-flex align-items-center justify-content-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card shadow-lg p-4"
            style={{
              width: "400px",
              background: "var(--card-bg)",
            }}
          >
            <h3 className="text-center mb-3">Create Account</h3>
            <p className="text-center text-muted">
              Get started in seconds 🚀
            </p>

            <form onSubmit={submitHandler}>
              <input
                className="form-control mb-3"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <input
                className="form-control mb-3"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button className="btn btn-primary w-100 mb-2">
                Register
              </button>
            </form>

            <small className="text-center d-block">
              Already have an account?{" "}
              <Link to="/">Login</Link>
            </small>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
