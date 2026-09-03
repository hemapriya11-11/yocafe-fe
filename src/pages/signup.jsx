import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const update = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });
  const handleSubmit = async (event) => {
    event.preventDefault(); setError(""); setLoading(true);
    try { await api.post("/auth/signup", formData); navigate("/login", { replace: true }); }
    catch (requestError) { setError(requestError.response?.data?.message || "Unable to create account"); }
    finally { setLoading(false); }
  };
  return (
    <main className="auth-page">
      <div className="auth-decoration decoration-one" /><div className="auth-decoration decoration-two" />
      <section className="auth-layout">
        <div className="auth-intro">
          <a className="brand brand-light" href="/"><span className="brand-mark">Y</span><span>YO<span className="brand-accent">cafe</span></span></a>
          <div className="intro-copy"><span className="eyebrow">Make room for good things</span><h1>Your new favorite<br /><em>ritual awaits.</em></h1><p>Join a community that believes coffee tastes better when it&apos;s shared.</p></div>
          <div className="quote">“Take life one sip at a time.”</div>
        </div>
        <div className="auth-card">
          <span className="card-kicker">Join the table</span><h2>Create your account.</h2><p className="card-subtitle">Your next favorite cup is closer than you think.</p>
          <form onSubmit={handleSubmit}>
            <label>Your name<input type="text" name="name" value={formData.name} onChange={update} autoComplete="name" placeholder="What should we call you?" required /></label>
            <label>Email address<input type="email" name="email" value={formData.email} onChange={update} autoComplete="email" placeholder="you@example.com" required /></label>
            <label>Create a password<input type="password" name="password" value={formData.password} onChange={update} autoComplete="new-password" placeholder="At least 8 characters" minLength="8" required /></label>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button full-width" type="submit" disabled={loading}>{loading ? "Creating your account..." : "Create account"}<span>→</span></button>
          </form>
          <p className="switch-auth">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
