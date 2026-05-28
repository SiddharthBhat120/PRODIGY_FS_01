import { createContext, useContext, useState, useEffect } from "react";
import API from "../utils/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("vault_user");
    const token = localStorage.getItem("vault_token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const register = async (formData) => {
    const { data } = await API.post("/auth/register", formData);
    localStorage.setItem("vault_token", data.token);
    localStorage.setItem("vault_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const login = async (formData) => {
    const { data } = await API.post("/auth/login", formData);
    localStorage.setItem("vault_token", data.token);
    localStorage.setItem("vault_user", JSON.stringify(data.user));
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("vault_token");
    localStorage.removeItem("vault_user");
    setUser(null);
  };

  const refreshProfile = async () => {
    const { data } = await API.get("/auth/profile");
    localStorage.setItem("vault_user", JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, register, login, logout, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
