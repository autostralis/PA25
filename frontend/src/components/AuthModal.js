import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

/**
 * AuthModal
 * Props:
 * - open: boolean
 * - onClose: function
 * - defaultMode: 'login' | 'register' (optional)
 */
export default function AuthModal({ open, onClose, defaultMode = "register" }) {
  const [mode, setMode] = useState(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Close on ESC
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose && onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const redirectTo = `${window.location.origin}/auth/callback`;

  async function handleOAuth(provider) {
    try {
      setErr(null);
      setLoading(true);
      await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });
      // Supabase will redirect; no further action here.
    } catch (e) {
      setErr(e?.message || "OAuth error");
      setLoading(false);
    }
  }

  async function handleEmailLogin() {
    try {
      setErr(null);
      setInfo(null);
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setLoading(false);
      if (error) return setErr(error.message);
      setInfo("Signed in. Redirecting…");
      window.location.replace("/dashboard");
    } catch (e) {
      setLoading(false);
      setErr(e?.message || "Sign in failed");
    }
  }

  async function handleEmailRegister() {
    try {
      setErr(null);
      setInfo(null);
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: redirectTo },
      });
      setLoading(false);
      if (error) return setErr(error.message);
      if (data?.user && !data.user.confirmed_at) {
        setInfo("Check your email to confirm your account.");
      } else {
        setInfo("Account created. You can sign in now.");
        setMode("login");
      }
    } catch (e) {
      setLoading(false);
      setErr(e?.message || "Sign up failed");
    }
  }

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <strong>{mode === "login" ? "Sign in" : "Create account"}</strong>
          <button style={styles.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div style={styles.buttonsRow}>
          <button
            style={styles.oauthBtn}
            onClick={() => handleOAuth("google")}
            disabled={loading}
          >
            Continue with Google
          </button>
          <button
            style={styles.oauthBtn}
            onClick={() => handleOAuth("facebook")}
            disabled={loading}
          >
            Continue with Facebook
          </button>
        </div>

        <div style={styles.hr}><span>or</span></div>

        <div style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              style={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label style={styles.label}>
            Password
            <input
              style={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={mode === "login" ? "current-password" : "new-password"}
            />
          </label>

          {err ? <p style={styles.err}>{err}</p> : null}
          {info ? <p style={styles.info}>{info}</p> : null}

          {mode === "login" ? (
            <button style={styles.primary} onClick={handleEmailLogin} disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </button>
          ) : (
            <button style={styles.primary} onClick={handleEmailRegister} disabled={loading}>
              {loading ? "Creating…" : "Create account"}
            </button>
          )}

          <p style={styles.switch}>
            {mode === "login" ? (
              <>
                Don’t have an account?{" "}
                <button style={styles.link} onClick={() => setMode("register")}>
                  Create one
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button style={styles.link} onClick={() => setMode("login")}>
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 16,
  },
  modal: {
    width: "100%",
    maxWidth: 480,
    background: "#101826",
    color: "#e6edf3",
    border: "1px solid #213040",
    borderRadius: 12,
    boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 18px",
    borderBottom: "1px solid #213040",
  },
  close: {
    background: "transparent",
    border: 0,
    color: "#9fb0c3",
    fontSize: 20,
    cursor: "pointer",
  },
  buttonsRow: {
    display: "flex",
    gap: 12,
    padding: 16,
  },
  oauthBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #213040",
    background: "#0f1622",
    color: "#e6edf3",
    cursor: "pointer",
  },
  hr: {
    position: "relative",
    textAlign: "center",
    margin: "6px 16px 0",
    height: 24,
    color: "#9fb0c3",
  },
  form: { padding: 16, paddingTop: 0 },
  label: { display: "block", fontSize: 13, marginTop: 12, color: "#c9d7e3" },
  input: {
    width: "100%",
    marginTop: 6,
    padding: "10px 12px",
    background: "#0b1117",
    color: "#e6edf3",
    border: "1px solid #213040",
    borderRadius: 8,
    outline: "none",
  },
  primary: {
    width: "100%",
    marginTop: 16,
    padding: "12px 14px",
    background: "#4bb7ff",
    color: "#0b1117",
    fontWeight: 600,
    border: 0,
    borderRadius: 8,
    cursor: "pointer",
  },
  switch: { marginTop: 12, fontSize: 13, color: "#9fb0c3" },
  link: {
    background: "none",
    border: "none",
    padding: 0,
    color: "#6dd3ff",
    cursor: "pointer",
    textDecoration: "underline",
  },
  err: { color: "#ff8a8a", marginTop: 10 },
  info: { color: "#6dd3ff", marginTop: 10 },
};
