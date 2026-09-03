import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/use-auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(formData);
      navigate("/", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-decoration decoration-one" /><div className="auth-decoration decoration-two" />
      <section className="auth-layout">
        <div className="auth-intro">
          <a className="brand brand-light" href="/"><span className="brand-mark">Y</span><span>YO<span className="brand-accent">cafe</span></span></a>
          <div className="intro-copy"><span className="eyebrow">A little pause in your day</span><h1>Come for the coffee,<br /><em>stay for the feeling.</em></h1><p>Thoughtfully sourced beans, lovingly made, and a warm seat waiting for you.</p></div>
          <div className="quote">“The best conversations start with a good cup.”</div>
        </div>
        <div className="auth-card">
          <span className="card-kicker">Welcome back</span><h2>Let&apos;s get brewing.</h2><p className="card-subtitle">Sign in to continue to your café.</p>
          <form onSubmit={handleSubmit}>
            <label>Email address<input type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} autoComplete="email" placeholder="you@example.com" required /></label>
            <label>Password<input type="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} autoComplete="current-password" placeholder="Enter your password" required /></label>
            <div className="forgot-link"><Link to="/forgot-password">Forgot password?</Link></div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button className="primary-button full-width" type="submit" disabled={loading}>{loading ? "Signing you in..." : "Sign in"}<span>→</span></button>
          </form>
          <p className="switch-auth">New to YOcafe? <Link to="/signup">Create an account</Link></p>
        </div>
      </section>
    </main>
  );
};

export default Login;
