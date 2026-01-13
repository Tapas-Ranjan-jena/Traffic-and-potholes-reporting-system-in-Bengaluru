import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/dashboard">
          🚦 Smart Bengaluru
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto align-items-center">
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/create-report">
                    Report
                  </Link>
                </li>

                {/* 👑 Admin Link */}
                {user?.role === "admin" && (
                  <li className="nav-item">
                    <Link className="nav-link text-warning fw-semibold" to="/admin">
                      Admin
                    </Link>
                  </li>
                )}

                {/* 🌙 Theme Toggle */}
                <li className="nav-item">
                  <ThemeToggle />
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
