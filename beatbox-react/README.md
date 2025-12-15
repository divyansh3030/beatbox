# 🎵 BeatBox - Music Player

A full-stack music streaming application with user authentication, favorites management, and a beautiful responsive UI.

![BeatBox Logo](./public/logo_new.jpg)

## ✨ Features

- 🎵 **Music Playback**: Play, pause, next, previous controls with progress bar
- 🔐 **User Authentication**: Secure login/register system with JWT
- ❤️ **Favorites System**: Save and manage your favorite songs
- 🔍 **Search**: Find songs quickly with real-time search
- 🎨 **4 Theme Options**: Dark, Light, Purple, and Blue themes
- ⌨️ **Keyboard Shortcuts**: 
  - `Space` - Play/Pause
  - `→` - Next song
  - `←` - Previous song  
  - `↑/↓` - Volume control
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 🔊 **Volume Control**: Adjustable volume with visual slider
- ⏱️ **Time Display**: Current time and duration for each song

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations
- **Font Awesome** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v20 or higher)
- MongoDB account (MongoDB Atlas or local MongoDB)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/beatbox.git
cd beatbox
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_key_here
```

💡 **Tip**: Copy `.env.example` to `.env` and fill in your values.

### 3. Frontend Setup
```bash
cd ..
npm install
```

### 4. Add Audio Files
Place your audio files in the `public/songs/` directory:
- Songs: `public/songs/1.mp3` through `public/songs/10.mp3`
- Covers: `public/covers/1.jpg` through `public/covers/10.jpg`

### 5. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```bash
npm run dev
```

Open your browser and navigate to: **http://localhost:5173**

## 🎮 Usage

1. **Register**: Create a new account with username, email, and password
2. **Login**: Sign in with your credentials
3. **Browse**: View all available songs in the library
4. **Play Music**: Click the play button on any song
5. **Add to Favorites**: Click the heart icon to save your favorite songs
6. **Search**: Use the search bar to find specific songs
7. **Change Theme**: Click the palette icon to cycle through 4 beautiful themes
8. **Keyboard Controls**: Use keyboard shortcuts for quick control

## 📸 Screenshots

### Authentication
Beautiful animated login and registration screens with music note animations.

### Music Player Interface
- Song list with album covers
- Large banner display for current song
- Bottom music player controls
- Real-time progress bar with time display
- Volume control slider

### Themes
- **Dark Theme** - Default sleek dark interface
- **Light Theme** - Clean and bright
- **Purple Theme** - Vibrant purple gradients
- **Blue Theme** - Cool blue tones

## 🔐 Security Features

- ✅ Password hashing with bcryptjs (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Protected API routes with middleware
- ✅ Token verification on page load
- ✅ Secure environment variables

## 📁 Project Structure
```
beatbox/
├── backend/
│   ├── server.js              # Express server & API routes
│   ├── .env                   # Environment variables (not in git)
│   ├── .env.example           # Environment template
│   └── package.json           # Backend dependencies
├── src/
│   ├── components/
│   │   ├── Login.jsx          # Login component
│   │   ├── Register.jsx       # Registration component
│   │   ├── Navbar.jsx         # Navigation bar
│   │   ├── SongList.jsx       # Song list display
│   │   ├── SongBanner.jsx     # Current song banner
│   │   ├── MusicPlayer.jsx    # Music player controls
│   │   └── Auth.css           # Authentication styles
│   ├── App.jsx                # Main app component
│   ├── style.css              # Global styles
│   └── main.jsx               # Entry point
├── public/
│   ├── songs/                 # Audio files (.mp3)
│   ├── covers/                # Album cover images
│   ├── logo_new.jpg           # App logo
│   └── playing.gif            # Playing animation
├── .gitignore                 # Git ignore rules
├── README.md                  # This file
└── package.json               # Frontend dependencies
```

## 🌟 Key Features Explained

### Favorites System
- Save unlimited favorite songs
- Persisted in localStorage per user
- Filter to show only favorites
- Quick add/remove with toast notifications

### Search Functionality
- Real-time search as you type
- Searches song names and artists
- Instant results with highlighting

### Theme Switching
- 4 professionally designed themes
- Smooth transitions between themes
- Theme preference saved locally
- Custom CSS variables for easy theming

### Keyboard Shortcuts
- **Spacebar**: Play/Pause current song
- **Right Arrow**: Next song
- **Left Arrow**: Previous song
- **Up Arrow**: Increase volume
- **Down Arrow**: Decrease volume

## 🐛 Known Issues & Future Improvements

- [ ] Deploy to production (Frontend: Vercel, Backend: Render)
- [ ] Add email verification for registration
- [ ] Implement password reset via email
- [ ] Sync favorites to database for cross-device access
- [ ] Add playlist creation feature
- [ ] Add shuffle and repeat modes
- [ ] Implement song lyrics display
- [ ] Add social sharing capabilities
- [ ] Admin panel for uploading songs

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Divyansh Kakkar**
- 📧 Email: divyanshkakkar30@gmail.com
- 📱 Phone: 8630079657
- 💼 LinkedIn: [Your LinkedIn Profile]
- 🐙 GitHub: [Your GitHub Profile]

## 🙏 Acknowledgments

- **Music**: NCS (No Copyright Sounds) for royalty-free music
- **Icons**: Font Awesome for beautiful icons
- **Fonts**: Google Fonts (Poppins, Ubuntu)
- **Inspiration**: Spotify and other modern music players

---

### 🌐 Environment Variables

Create a `.env` file in the `backend` directory with these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `5000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT signing | `your_random_secret_key` |

---

⭐ **If you like this project, please give it a star on GitHub!**

Made with ❤️ by Divyansh Kakkar