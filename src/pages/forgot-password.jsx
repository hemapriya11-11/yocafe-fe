import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("");
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/forgotpassword", { email });
      setStatus("Check your inbox for a fresh reset link.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "We could not send the reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-decoration decoration-one" />
      <div className="auth-decoration decoration-two" />
      <section className="auth-layout">
        <div className="auth-intro">
          <a className="brand brand-light" href="/"><span className="brand-mark">Y</span><span>YO<span className="brand-accent">cafe</span></span></a>
          <div className="intro-copy"><span className="eyebrow">A fresh start</span><h1>Every day is a<br /><em>new brew.</em></h1><p>No worries. We&apos;ll help you get back to your table.</p></div>
          <div className="quote">“There&apos;s always time for one more cup.”</div>
        </div>
        <div className="auth-card">
          <span className="card-kicker">Forgot your password?</span>
          <h2>Let&apos;s get you back in.</h2>
          <p className="card-subtitle">Enter your email and we&apos;ll send a secure reset link.</p>
          <form onSubmit={handleSubmit}>
            <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" placeholder="you@example.com" required /></label>
            {status && <p className="form-success" role="status">{status}</p>}
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button full-width" type="submit" disabled={loading}>{loading ? "Sending link..." : "Send reset link"}<span>→</span></button>
          </form>
          <p className="switch-auth"><Link to="/login">← Back to sign in</Link></p>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
