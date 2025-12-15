export default function SongBanner({ 
  cover, 
  songName,
  favorites,
  currentFilePath,
  onToggleFavorite 
}) {
  const isFavorite = favorites.includes(currentFilePath);

  return (
    <div className="songBanner">
      <img src={cover} alt="Song Banner" className="banner-img" />
      
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3 style={{ color: "#1DB954", marginBottom: "10px" }}>Now Playing</h3>
        <h2 style={{ marginBottom: "20px" }}>{songName}</h2>
        
        <button 
          onClick={() => onToggleFavorite(currentFilePath)}
          style={{
            padding: "12px 30px",
            background: isFavorite ? "#ff4d4d" : "rgba(255, 77, 77, 0.1)",
            border: "2px solid #ff4d4d",
            color: isFavorite ? "white" : "#ff4d4d",
            borderRadius: "25px",
            cursor: "pointer",
            fontSize: "1rem",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "0 auto"
          }}
        >
          <i className={`fa${isFavorite ? 's' : 'r'} fa-heart`}></i>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
}