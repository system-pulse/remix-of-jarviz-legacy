import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "@/lib/adminAuth";
import { Lock } from "lucide-react";
import { CustomCursor } from "@/components/CustomCursor";

const AdminLogin = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(email, password)) {
      nav("/sinimini/dashboard", { replace: true });
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-deep p-6">
      <CustomCursor />
      <form
        onSubmit={submit}
        className="w-full max-w-md border border-white/10 bg-bg-card p-8 shadow-glow-blue"
      >
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center border border-accent-blue/40 bg-accent-blue/10 text-accent-blue">
            <Lock size={20} />
          </div>
          <h1 className="font-syne text-2xl font-extrabold tracking-tight text-text-primary">
            JARVIZ // ADMIN
          </h1>
          <p className="mt-2 font-mono text-[0.65rem] tracking-widest text-text-muted">
            RESTRICTED · AUTHORIZED ACCESS ONLY
          </p>
        </div>

        <label className="mb-4 block">
          <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-white/10 bg-bg-deep px-3 py-2.5 font-dm text-sm text-text-primary outline-none focus:border-accent-blue/60"
            autoComplete="email"
          />
        </label>

        <label className="mb-6 block">
          <span className="mb-1.5 block font-mono text-[0.65rem] uppercase tracking-widest text-text-muted">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-white/10 bg-bg-deep px-3 py-2.5 font-dm text-sm text-text-primary outline-none focus:border-accent-blue/60"
            autoComplete="current-password"
          />
        </label>

        {error && (
          <div className="mb-4 border border-accent-red/40 bg-accent-red/10 px-3 py-2 font-mono text-xs text-accent-red">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-accent-blue px-6 py-3 font-syne text-sm font-semibold uppercase tracking-wider text-bg-deep transition-all hover:shadow-glow-blue-strong"
          style={{ borderRadius: 4 }}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
