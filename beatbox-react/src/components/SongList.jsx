export default function SongList({ 
  songs, 
  onPlay, 
  searchQuery, 
  currentSongIndex, 
  allSongs,
  favorites,
  onToggleFavorite 
}) {
  return (
    <div className="songList">
      <h1>
        {searchQuery 
          ? `🔍 Search Results (${songs.length})` 
          : "🎵 Best of NCS - No Copyright Sounds"}
      </h1>

      {songs.length === 0 ? (
        <div style={{ 
          padding: "60px 20px", 
          textAlign: "center", 
          color: "#888"
        }}>
          <p>No songs found matching "{searchQuery}"</p>
        </div>
      ) : (
        <div className="songItemContainer">
          {songs.map((song, index) => {
            const actualIndex = allSongs?.findIndex(s => s.filePath === song.filePath);
            const isPlaying = actualIndex === currentSongIndex;
            const isFavorite = favorites.includes(song.filePath);
            
            return (
              <div 
                className={`songItem ${isPlaying ? 'active' : ''}`}
                key={index}
              >
                <img src={song.coverPath} alt={song.songName} />
                
                <span className="songName">{song.songName}</span>

                <span className="songlistplay">
                  <span className="timestamp">
                    {/* Favorite Heart Icon */}
                    <i
                      className={`fa${isFavorite ? 's' : 'r'} fa-heart`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(song.filePath);
                      }}
                      style={{ 
                        cursor: "pointer",
                        color: isFavorite ? "#ff4d4d" : "#666",
                        marginRight: "15px",
                        fontSize: "1.5rem",
                        transition: "all 0.3s ease"
                      }}
                      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    ></i>

                    {/* Play Button */}
                    <i
                      className={`far ${isPlaying ? 'fa-pause-circle' : 'fa-play-circle'}`}
                      onClick={() => onPlay(index)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  </span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}