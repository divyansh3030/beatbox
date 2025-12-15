import { useState, useEffect } from "react";
import "./style.css";
import Navbar from "./components/Navbar";
import SongList from "./components/SongList";
import MusicPlayer from "./components/MusicPlayer";
import API_URL from "./config/api";
import SongBanner from "./components/SongBanner";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const allSongs = [
    { songName: "Warriyo - Mortals", coverPath: "/covers/1.jpg", filePath: "/songs/1.mp3" },
    { songName: "Cielo - Huma-Huma", coverPath: "/covers/2.jpg", filePath: "/songs/2.mp3" },
    { songName: "DEAF KEV - Invincible", coverPath: "/covers/3.jpg", filePath: "/songs/3.mp3" },
    { songName: "Different Heaven - My Heart", coverPath: "/covers/4.jpg", filePath: "/songs/4.mp3" },
    { songName: "Janji - Heroes Tonight", coverPath: "/covers/5.jpg", filePath: "/songs/5.mp3" },
    { songName: "Rabba - Salam-e-Ishq", coverPath: "/covers/6.jpg", filePath: "/songs/6.mp3" },
    { songName: "Sakhiyaan", coverPath: "/covers/7.jpg", filePath: "/songs/7.mp3" },
    { songName: "Bhula Dena", coverPath: "/covers/8.jpg", filePath: "/songs/8.mp3" },
    { songName: "Tumhari Kasam", coverPath: "/covers/9.jpg", filePath: "/songs/9.mp3" },
    { songName: "Na Jaana", coverPath: "/covers/10.jpg", filePath: "/songs/10.mp3" }
  ];

  const [currentSong, setCurrentSong] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('beatbox-token');
    const savedUser = localStorage.getItem('beatbox-user');
    
    if (token && savedUser) {
      // Verify token with backend
      fetch(`${API_URL}/api/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
          } else {
            handleLogout();
          }
        })
        .catch(() => handleLogout());
    }
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedFavorites = localStorage.getItem(`beatbox-favorites-${user.username}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    }
  }, [isAuthenticated, user]);

  // Save favorites to localStorage
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem(`beatbox-favorites-${user.username}`, JSON.stringify(favorites));
    }
  }, [favorites, isAuthenticated, user]);

  // Load and save theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("beatbox-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("beatbox-theme", theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  // Filter songs
  let filteredSongs = allSongs.filter(song =>
    song.songName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (showFavoritesOnly) {
    filteredSongs = filteredSongs.filter(song => 
      favorites.includes(song.filePath)
    );
  }

  const handleAbout = () => {
    alert(`Hi, I am Divyansh Kakkar – owner of this website.\nContact: 8630079657\nEmail: divyanshkakkar30@gmail.com\n\nLogged in as: ${user?.username}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('beatbox-token');
    localStorage.removeItem('beatbox-user');
    setIsAuthenticated(false);
    setUser(null);
    setFavorites([]);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handlePlay = (filteredIndex) => {
    const selectedSong = filteredSongs[filteredIndex];
    const actualIndex = allSongs.findIndex(s => s.filePath === selectedSong.filePath);
    setCurrentSong(actualIndex);
  };

  const toggleFavorite = (filePath) => {
  const song = allSongs.find(s => s.filePath === filePath);
  const isAdding = !favorites.includes(filePath);
  
  setFavorites(prev => 
    prev.includes(filePath) 
      ? prev.filter(f => f !== filePath)
      : [...prev, filePath]
  );

  // Show toast notification
  const message = isAdding 
    ? `❤️ Added "${song?.songName}" to favorites!`
    : `💔 Removed from favorites`;
  
  showToast(message);
};

// Toast function (ADD THIS before the toggleFavorite function)
const [toast, setToast] = useState(null);

const showToast = (message) => {
  setToast(message);
  setTimeout(() => setToast(null), 3000);
};

  const cycleTheme = () => {
    const themes = ["dark", "light", "purple", "blue"];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    setTheme(nextTheme);
  };

  // Show Login/Register if not authenticated
  if (!isAuthenticated) {
    return showRegister ? (
      <Register 
        onRegister={handleRegister}
        onSwitchToLogin={() => setShowRegister(false)}
      />
    ) : (
      <Login 
        onLogin={handleLogin}
        onSwitchToRegister={() => setShowRegister(true)}
      />
    );
  }

  // Show Music Player if authenticated
  return (
    <>
    {/* Toast Notification */}
    {toast && (
      <div style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(29, 185, 84, 0.95)',
        color: 'white',
        padding: '15px 25px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        zIndex: 10000,
        animation: 'slideIn 0.3s ease-out',
        fontWeight: '500'
      }}>
        {toast}
      </div>
    )}
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onAboutClick={handleAbout} 
        onLogout={handleLogout}
        theme={theme}
        onThemeChange={cycleTheme}
        user={user}
      />

      <div className="container">
        <div style={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          paddingBottom: "15px",
          borderBottom: "2px solid rgba(29, 185, 84, 0.2)"
        }}>
          <button 
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            style={{
              padding: "10px 20px",
              background: showFavoritesOnly ? "#1DB954" : "rgba(29, 185, 84, 0.1)",
              border: "2px solid rgba(29, 185, 84, 0.3)",
              color: showFavoritesOnly ? "white" : "#1DB954",
              borderRadius: "20px",
              cursor: "pointer",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease"
            }}
          >
            <i className="fas fa-heart"></i>
            {showFavoritesOnly ? "Show All Songs" : "Show Favorites Only"}
            {favorites.length > 0 && (
              <span style={{
                background: "#ff4d4d",
                color: "white",
                padding: "2px 8px",
                borderRadius: "10px",
                fontSize: "0.8rem",
                marginLeft: "5px"
              }}>
                {favorites.length}
              </span>
            )}
          </button>
          
          <span style={{ color: "#888", fontSize: "0.95rem" }}>
            🎵 {filteredSongs.length} songs
          </span>
        </div>

        <SongList 
          songs={filteredSongs} 
          onPlay={handlePlay}
          searchQuery={searchQuery}
          currentSongIndex={currentSong}
          allSongs={allSongs}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
        <SongBanner 
          cover={allSongs[currentSong].coverPath}
          songName={allSongs[currentSong].songName}
          favorites={favorites}
          currentFilePath={allSongs[currentSong].filePath}
          onToggleFavorite={toggleFavorite}
        />
      </div>

      <MusicPlayer
        songs={allSongs}
        currentIndex={currentSong}
        onNext={() => setCurrentSong((currentSong + 1) % allSongs.length)}
        onPrev={() => setCurrentSong(currentSong === 0 ? allSongs.length - 1 : currentSong - 1)}
      />
    </>
  );
}

export default App;