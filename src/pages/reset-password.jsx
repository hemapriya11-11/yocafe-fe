import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await api.post(`/auth/resetpassword/${token}`, { password });
      navigate("/login", { replace: true, state: { message: "Password updated. You can now sign in." } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "This reset link is invalid or expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-decoration decoration-one" /><div className="auth-decoration decoration-two" />
      <section className="auth-layout">
        <div className="auth-intro"><a className="brand brand-light" href="/"><span className="brand-mark">Y</span><span>YO<span className="brand-accent">cafe</span></span></a><div className="intro-copy"><span className="eyebrow">One more step</span><h1>Make it secure,<br /><em>keep it simple.</em></h1><p>Choose a new password and your next coffee break is ready.</p></div></div>
        <div className="auth-card"><span className="card-kicker">New password</span><h2>Set a fresh one.</h2><p className="card-subtitle">Use at least 8 characters for your new password.</p>
          <form onSubmit={handleSubmit}>
            <label>New password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength="8" required /></label>
            <label>Confirm password<input type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" minLength="8" required /></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button full-width" type="submit" disabled={loading}>{loading ? "Updating password..." : "Update password"}<span>→</span></button>
          </form>
          <p className="switch-auth"><Link to="/login">← Back to sign in</Link></p>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
