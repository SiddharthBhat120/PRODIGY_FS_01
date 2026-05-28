import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../utils/api";
import toast from "react-hot-toast";

const StatCard = ({ label, value, icon, color }) => (
  <div className="glass-panel rounded-xl p-5 border border-border hover:border-accent/30 transition-colors">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-mono text-text-dim uppercase tracking-wider mb-2">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const { user, logout, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const updated = await refreshProfile();
      setProfile(updated);
    } catch {
      // silent
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("See you next time!");
    navigate("/login");
  };

  const joinedDate = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const roleConfig = {
    admin: { label: "Administrator", color: "text-accent-hot", bg: "bg-accent-hot/10 border-accent-hot/30", dot: "bg-accent-hot" },
    moderator: { label: "Moderator", color: "text-accent-cyan", bg: "bg-accent-cyan/10 border-accent-cyan/30", dot: "bg-accent-cyan" },
    user: { label: "Standard User", color: "text-accent", bg: "bg-accent/10 border-accent/30", dot: "bg-accent" },
  };

  const rc = roleConfig[profile?.role] || roleConfig.user;

  const permissions = {
    admin: ["View all users", "Manage accounts", "Access analytics", "System settings", "Delete content"],
    moderator: ["View all users", "Moderate content", "Access analytics", "Flag accounts"],
    user: ["View own profile", "Update settings", "Access dashboard"],
  };
  const perms = permissions[profile?.role] || permissions.user;

  return (
    <div className="min-h-screen bg-void bg-grid pt-16">
      <div className="orb w-96 h-96 bg-accent/6 top-20 right-0 pointer-events-none" />
      <div className="orb w-64 h-64 bg-accent-cyan/4 bottom-40 left-0 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">

        {/* Welcome banner */}
        <div className="glass-panel neon-border rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent-cyan/5 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-accent/20 border border-accent/40 flex items-center justify-center text-2xl font-bold text-accent flex-shrink-0">
                {profile?.username?.[0]?.toUpperCase() || "?"}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold">
                    Hey, {profile?.username} 👋
                  </h1>
                  <span className={`tag border ${rc.bg} ${rc.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${rc.dot}`} />
                    {rc.label}
                  </span>
                </div>
                <p className="text-text-dim text-sm mt-0.5">
                  {profile?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="btn-ghost text-sm py-2 px-4 flex items-center gap-2 flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            label="Account Status"
            value="Active"
            color="bg-green-500/10"
            icon={<svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <StatCard
            label="Access Level"
            value={profile?.role || "user"}
            color="bg-accent/10"
            icon={<svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>}
          />
          <StatCard
            label="Permissions"
            value={perms.length}
            color="bg-accent-cyan/10"
            icon={<svg className="w-5 h-5 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>}
          />
        </div>

        {/* Main grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {/* Profile details */}
          <div className="glass-panel rounded-2xl p-6 border border-border">
            <h2 className="text-sm font-mono text-text-dim uppercase tracking-wider mb-4">
              Profile Details
            </h2>
            <div className="space-y-4">
              {[
                { label: "User ID", value: profile?._id?.slice(-8).toUpperCase(), mono: true },
                { label: "Username", value: profile?.username },
                { label: "Email", value: profile?.email },
                { label: "Joined", value: joinedDate },
              ].map(({ label, value, mono }) => (
                <div key={label} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="text-xs text-text-dim">{label}</span>
                  <span className={`text-sm ${mono ? "font-mono text-accent-cyan" : "text-white"}`}>
                    {value || "—"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions */}
          <div className="glass-panel rounded-2xl p-6 border border-border">
            <h2 className="text-sm font-mono text-text-dim uppercase tracking-wider mb-4">
              Your Permissions
            </h2>
            <div className="space-y-2.5">
              {perms.map((perm) => (
                <div key={perm} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-accent-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm text-white">{perm}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Security info */}
          <div className="glass-panel rounded-2xl p-6 border border-border sm:col-span-2">
            <h2 className="text-sm font-mono text-text-dim uppercase tracking-wider mb-4">
              Security Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: "Password", status: "Hashed (bcrypt)", ok: true },
                { label: "Authentication", status: "JWT Bearer Token", ok: true },
                { label: "Session", status: "Active", ok: true },
              ].map(({ label, status, ok }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-void border border-border">
                  <div className={`w-2 h-2 rounded-full ${ok ? "bg-green-400 animate-pulse-slow" : "bg-accent-hot"}`} />
                  <div>
                    <p className="text-xs text-text-dim">{label}</p>
                    <p className="text-sm font-mono text-green-400">{status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-muted font-mono mt-8">
          🔐 Session secured with JWT · Prodigy Infotech FS-01
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
