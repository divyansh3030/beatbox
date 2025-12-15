import { useEffect, useRef, useState } from "react";

export default function MusicPlayer({ songs, currentIndex, onNext, onPrev }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
const [showVolumeSlider, setShowVolumeSlider] = useState(false);
const [currentTime, setCurrentTime] = useState(0);
const [duration, setDuration] = useState(0);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio(songs[currentIndex].filePath);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = songs[currentIndex].filePath;
      if (isPlaying) {
        audioRef.current.play().catch((err) => {
          console.log("Play error:", err);
          setIsPlaying(false);
        });
      }
    }
  }, [currentIndex, songs]);
// Update volume
useEffect(() => {
  if (audioRef.current) {
    audioRef.current.volume = volume / 100;
  }
}, [volume]);
  // Toggle Play/Pause
  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Play error:", err);
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  };

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  setProgress(percent);
  setCurrentTime(audio.currentTime);
  setDuration(audio.duration);
};
    

    const handleEnded = () => {
      setIsPlaying(false);
      onNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onNext]);
// Keyboard shortcuts
useEffect(() => {
  const handleKeyPress = (e) => {
    // Prevent if user is typing in input field
    if (e.target.tagName === 'INPUT') return;
    
    switch(e.code) {
      case 'Space':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowRight':
        e.preventDefault();
        onNext();
        break;
      case 'ArrowLeft':
        e.preventDefault();
        onPrev();
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(prev => Math.min(100, prev + 10));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(prev => Math.max(0, prev - 10));
        break;
      default:
        break;
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, [isPlaying, onNext, onPrev]);
  // Seek audio
  const handleSeek = (e) => {
    if (!audioRef.current) return;
    
    const newTime = (e.target.value * audioRef.current.duration) / 100;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  // Handle previous/next with play state
  const handlePrev = () => {
    setIsPlaying(false);
    onPrev();
  };

  const handleNext = () => {
    setIsPlaying(false);
    onNext();
  };
// Format time helper
const formatTime = (seconds) => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
  return (
    <div className="bottom">
  {/* Progress Bar with Time Display */}
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    width: '85%', 
    gap: '15px',
    marginBottom: '15px' 
  }}>
    <span style={{ 
      color: '#888', 
      fontSize: '0.85rem',
      minWidth: '45px',
      textAlign: 'center' 
    }}>
      {formatTime(currentTime)}
    </span>
    
    <input
      type="range"
      min="0"
      max="100"
      value={progress}
      onChange={handleSeek}
      id="myProgressBar"
      style={{ flex: 1 }}
    />
    
    <span style={{ 
      color: '#888', 
      fontSize: '0.85rem',
      minWidth: '45px',
      textAlign: 'center' 
    }}>
      {formatTime(duration)}
    </span>
  </div>

      {/* Player Controls */}
      <div className="icons">
        <i className="fas fa-3x fa-step-backward" onClick={handlePrev}></i>
        <i
          className={`far fa-3x ${isPlaying ? "fa-pause-circle" : "fa-play-circle"}`}
          onClick={togglePlay}
        ></i>
        <i className="fas fa-3x fa-step-forward" onClick={handleNext}></i>
      {/* Volume Control - ADD THIS */}
  <div 
    style={{ position: 'relative' }}
    onMouseEnter={() => setShowVolumeSlider(true)}
    onMouseLeave={() => setShowVolumeSlider(false)}
  >
    <i 
      className={`fas fa-2x ${volume === 0 ? 'fa-volume-mute' : volume < 50 ? 'fa-volume-down' : 'fa-volume-up'}`}
      style={{ cursor: 'pointer' }}
    ></i>
    
    {showVolumeSlider && (
      <div style={{
        position: 'absolute',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(30, 30, 30, 0.95)',
        padding: '15px 10px',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)'
      }}>
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          style={{
            width: '100px',
            transform: 'rotate(-90deg)',
            transformOrigin: 'center'
          }}
        />
        <span style={{ fontSize: '0.85rem', color: '#1DB954', fontWeight: '600' }}>
          {volume}%
        </span>
      </div>
    )}
  </div>
      </div>

      {/* Song Info */}
      <div className="songInfo">
        <img 
          src="/playing.gif" 
          width="42px" 
          alt="Playing animation" 
          style={{ opacity: isPlaying ? 1 : 0 }}
        />
        <span id="masterSongName">{songs[currentIndex].songName}</span>
      </div>
    </div>
  );
}