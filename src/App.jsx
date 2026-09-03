import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./context/use-auth";
import Login from "./pages/login";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <main className="cafe-app">
      <nav className="topbar">
        <a className="brand" href="/">
          <span className="brand-mark">Y</span>
          <span>YO<span className="brand-accent">cafe</span></span>
        </a>
        <div className="topbar-actions">
          <span className="user-greeting">Good day, {user.name}</span>
          <button className="text-button" onClick={logout}>Sign out</button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Your daily ritual</span>
          <h1>Good coffee.<br /><em>Good moments.</em></h1>
          <p>Welcome back to your neighborhood corner for slow mornings, bold brews, and something sweet.</p>
          <button className="primary-button">Explore today&apos;s menu <span>→</span></button>
        </div>
        <div className="coffee-art" aria-label="A cup of coffee">
          <div className="steam steam-one" />
          <div className="steam steam-two" />
          <div className="cup"><div className="coffee" /></div>
          <div className="saucer" />
          <span className="art-note">Roasted<br />with care</span>
        </div>
      </section>

      <section className="menu-preview">
        <div className="section-heading">
          <div><span className="eyebrow">Made for you</span><h2>Today&apos;s favorites</h2></div>
          <a href="/menu">View menu <span>↗</span></a>
        </div>
        <div className="menu-grid">
          <article className="menu-card card-latte"><span className="menu-icon">☕</span><span className="menu-tag">Classic</span><h3>Velvet Latte</h3><p>Espresso · steamed milk · honey</p><strong>$5.50</strong></article>
          <article className="menu-card card-pastry"><span className="menu-icon">✦</span><span className="menu-tag">Fresh today</span><h3>Almond Croissant</h3><p>Buttery layers · almond cream</p><strong>$4.25</strong></article>
          <article className="menu-card card-cold"><span className="menu-icon">◒</span><span className="menu-tag">New</span><h3>Cold Brew Tonic</h3><p>Bright citrus · slow-steeped coffee</p><strong>$6.00</strong></article>
        </div>
      </section>
      <footer className="footer"><span>YOcafe</span><span>Open daily · 7am — 8pm</span><span>Made for lingering.</span></footer>
    </main>
  );
};

const Admin = () => (
  <main className="simple-page">
    <span className="eyebrow">YOcafe workspace</span>
    <h1>Admin dashboard</h1>
    <p>Manage the menu, orders, and your café community.</p>
  </main>
);

const App = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading-screen"><span className="brand-mark">Y</span><span>Warming up the coffee...</span></div>;

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" replace /> : <Signup />} />
      <Route path="/forgot-password" element={user ? <Navigate to="/" replace /> : <ForgotPassword />} />
      <Route path="/reset-password/:token" element={user ? <Navigate to="/" replace /> : <ResetPassword />} />
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/admin" element={user?.role === "admin" ? <Admin /> : <Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to={user ? "/" : "/login"} replace />} />
    </Routes>
  );
};

export default App;
