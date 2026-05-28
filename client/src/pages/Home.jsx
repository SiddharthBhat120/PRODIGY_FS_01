import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-void bg-grid flex flex-col items-center justify-center p-6 pt-24 text-center">
      <div className="orb w-96 h-96 bg-accent/10 -top-20 -right-20" />
      <div className="orb w-72 h-72 bg-accent-hot/6 bottom-0 -left-10" />
      <div className="orb w-64 h-64 bg-accent-cyan/5 top-40 left-1/2" />

      <div className="relative z-10 max-w-2xl animate-slide-up">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-xs font-mono text-accent mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Prodigy Infotech — Full Stack Internship Task 01
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6 leading-none">
          Secure Auth<br />
          <span className="text-accent">By Default.</span>
        </h1>

        <p className="text-text-dim text-lg leading-relaxed mb-10 max-w-lg mx-auto">
          A production-ready authentication system with JWT, bcrypt, role-based access control, and a clean dark UI.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {user ? (
            <Link to="/dashboard" className="btn-primary w-auto px-8">
              Go to Dashboard →
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-primary w-auto px-8">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-ghost w-auto px-8">
                Sign In
              </Link>
            </>
          )}
        </div>

        {/* Feature pills */}
        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {["JWT Auth", "bcrypt Hashing", "Protected Routes", "Role-Based Access", "MongoDB", "React + Vite"].map((f) => (
            <span key={f} className="px-3 py-1.5 rounded-full text-xs font-mono text-text-dim border border-border bg-panel">
              {f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
