import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

const Navbar = ({ theme, setTheme }) => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileThemeOpen, setMobileThemeOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" onClick={closeMenu}>
          <img src="/jaimahakal_logo.png" alt="Babazon" style={{ height: '4rem', width: '4rem', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))' }} />
          Babazon
        </Link>
      </div>

      <button
        type="button"
        className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <button type="button" className="navbar-close" onClick={closeMenu} aria-label="Close menu">
          ×
        </button>
        <li><Link to="/shop" onClick={closeMenu}>Shop</Link></li>
        <li><Link to="/cart" onClick={closeMenu}>Cart ({cartItems.length})</Link></li>
        <li className="theme-control-item">
          <div className="theme-control">
            <label htmlFor="theme-select" className="theme-label">Theme</label>
            <div className="theme-select-wrap">
              <select id="theme-select" className="theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>

          <div className="theme-control-mobile-wrap">
            <button
              type="button"
              className={`theme-mobile-trigger ${mobileThemeOpen ? 'open' : ''}`}
              onClick={() => setMobileThemeOpen((prev) => !prev)}
              aria-expanded={mobileThemeOpen}
            >
              <span>Theme</span>
              <span className="theme-mobile-arrow">▾</span>
            </button>

            {mobileThemeOpen && (
              <div className="theme-control-mobile" role="radiogroup" aria-label="Theme selection">
                <label className="theme-radio">
                  <input type="radio" name="theme-mobile" value="dark" checked={theme === 'dark'} onChange={(e) => setTheme(e.target.value)} />
                  <span>Dark</span>
                </label>
                <label className="theme-radio">
                  <input type="radio" name="theme-mobile" value="light" checked={theme === 'light'} onChange={(e) => setTheme(e.target.value)} />
                  <span>Light</span>
                </label>
              </div>
            )}
          </div>
        </li>
        {user ? (
          <>
            <li><Link to="/profile" onClick={closeMenu}>Hi, {user.name}</Link></li>
            {user.role === 'admin' && <li><Link to="/admin" onClick={closeMenu}>Admin</Link></li>}
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
