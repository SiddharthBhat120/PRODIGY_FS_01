import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const roleColors = {
    admin: "bg-accent-hot/10 text-accent-hot border-accent-hot/30",
    moderator: "bg-accent-cyan/10 text-accent-cyan border-accent-cyan/30",
    user: "bg-accent/10 text-accent border-accent/30",
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-accent/20 border border-accent/40 flex items-center justify-center group-hover:bg-accent/30 transition-colors">
              <svg
                className="w-4 h-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight">
              Vault<span className="text-accent">Auth</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === "/dashboard"
                      ? "text-white"
                      : "text-text-dim hover:text-white"
                  }`}
                >
                  Dashboard
                </Link>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-bold text-accent">
                      {user.username[0].toUpperCase()}
                    </div>
                    <span className="text-sm text-text-dim">{user.username}</span>
                    <span
                      className={`tag border ${
                        roleColors[user.role] || roleColors.user
                      }`}
                    >
                      {user.role}
                    </span>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="btn-ghost text-sm py-2 px-4"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm text-text-dim hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-5 w-auto">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-text-dim hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border px-4 py-4 space-y-3">
          {user ? (
            <>
              <div className="flex items-center gap-2 pb-2 border-b border-border">
                <div className="w-7 h-7 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center text-xs font-bold text-accent">
                  {user.username[0].toUpperCase()}
                </div>
                <span className="text-sm">{user.username}</span>
                <span className={`tag border ${roleColors[user.role] || roleColors.user}`}>
                  {user.role}
                </span>
              </div>
              <Link to="/dashboard" className="block text-sm text-text-dim hover:text-white" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <button onClick={handleLogout} className="block text-sm text-accent-hot">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-sm text-text-dim hover:text-white" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block text-sm text-accent" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
