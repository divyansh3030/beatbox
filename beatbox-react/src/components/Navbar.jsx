export default function Navbar({ 
  searchQuery, 
  setSearchQuery, 
  onAboutClick, 
  onLogout,
  theme,
  onThemeChange,
  user
}) {
  return (
    <nav>
      <ul>
        <li className="brand">
          <img src="/logo_new.jpg" alt="BeatBox" />
          <span>BeatBox</span>
        </li>

        <li>Home</li>

        <li onClick={onAboutClick} style={{ cursor: "pointer" }}>
          About
        </li>
      </ul>

      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search songs..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <i className="fas fa-search"></i>
      </div>

      {/* User Info */}
      {user && (
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 15px",
          background: "rgba(29, 185, 84, 0.1)",
          borderRadius: "20px",
          border: "1px solid rgba(29, 185, 84, 0.3)"
        }}>
          <i className="fas fa-user-circle" style={{ fontSize: "1.2rem", color: "#1DB954" }}></i>
          <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>{user.username}</span>
        </div>
      )}

      {/* Theme Switcher */}
      <button 
        className="theme-btn"
        onClick={onThemeChange}
        title="Change Theme"
      >
        <i className="fas fa-palette"></i>
      </button>

      <button className="logoutButton" onClick={onLogout}>
        <i className="fas fa-sign-out-alt"></i> Logout
      </button>
    </nav>
  );
}