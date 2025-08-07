"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface Profile {
  username: string;
  profilePicture: string;
  bio: string;
  discordName: string;
  xHandle: string;
  youtubeTwitchLink: string;
  favoriteGame: string;
  xp: number;
  gameScores: { [key: string]: number };
}

interface Avatar {
  id: number;
  image: string;
  name: string;
  createdAt: string;
}

const GAMES = [
  "Brace Invaders",
  "Brace Mountain", 
  "Bubble Brace",
  "Chronicles of Chron",
  "Crush Brace",
  "Flappy Brace",
  "Gabber Gang",
  "Gabber Gravity",
  "Gegssend Go",
  "The Pits"
];

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile>({
    username: "",
    profilePicture: "",
    bio: "",
    discordName: "",
    xHandle: "",
    youtubeTwitchLink: "",
    favoriteGame: "",
    xp: 0,
    gameScores: {}
  });
  
  const [userAvatars, setUserAvatars] = useState<Avatar[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Animation states
  const [particles, setParticles] = useState<Array<{left: string, delay: number}>>([]);
  const [sparkles, setSparkles] = useState<Array<{left: string, top: string, delay: number}>>([]);
  const [stars, setStars] = useState<Array<{id: number, left: string, top: string, size: string, delay: number}>>([]);
  const [isLightspeedActive, setIsLightspeedActive] = useState(false);
  const [shootingStars, setShootingStars] = useState<Array<{id: number, left: string, top: string, delay: number}>>([]);
  const [spaceDust, setSpaceDust] = useState<Array<{id: number, left: string, delay: number}>>([]);

  const headerRef = useRef<HTMLElement>(null);

  // Generate particle positions only on client side to prevent hydration errors
  useEffect(() => {
    const generateParticles = () => {
      const particleData = Array.from({ length: 8 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        delay: i
      }));
      
      const sparkleData = Array.from({ length: 6 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: i
      }));
      
      setParticles(particleData);
      setSparkles(sparkleData);
    };

    generateParticles();
  }, []);

  // Generate stars for space background
  useEffect(() => {
    const generateStars = () => {
      const starData = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)],
        delay: Math.random() * 3
      }));
      
      setStars(starData);
    };

    generateStars();
  }, []);

  // Generate shooting stars
  useEffect(() => {
    const generateShootingStars = () => {
      const shootingStarData = Array.from({ length: 3 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 50}%`,
        delay: Math.random() * 5
      }));
      
      setShootingStars(shootingStarData);
    };

    generateShootingStars();
  }, []);

  // Generate space dust
  useEffect(() => {
    const generateSpaceDust = () => {
      const dustData = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 10
      }));
      
      setSpaceDust(dustData);
    };

    generateSpaceDust();
  }, []);

  useEffect(() => {
    // Load saved profile from localStorage
    const savedProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    setProfile(prev => ({ ...prev, ...savedProfile }));
    
    // Load saved avatars from localStorage
    const savedAvatars = JSON.parse(localStorage.getItem('userAvatars') || '[]');
    setUserAvatars(savedAvatars);
    
    // Set the first avatar as selected if available
    if (savedAvatars.length > 0 && !selectedAvatar) {
      setSelectedAvatar(savedAvatars[0]);
    }
  }, []);

  // Calculate total XP from game scores
  const totalXP = Object.values(profile.gameScores).reduce((sum, score) => sum + score, 0);

  const handleProfileChange = (field: keyof Profile, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setIsEditing(false);
  };

  const handleAvatarSelect = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
    handleProfileChange('profilePicture', avatar.image);
    localStorage.setItem('selectedAvatar', JSON.stringify(avatar));
  };

  const handleDeleteAvatar = (avatarId: number) => {
    const updatedAvatars = userAvatars.filter(avatar => avatar.id !== avatarId);
    setUserAvatars(updatedAvatars);
    localStorage.setItem('userAvatars', JSON.stringify(updatedAvatars));
    
    // If the deleted avatar was selected, select the first available one
    if (selectedAvatar?.id === avatarId) {
      setSelectedAvatar(updatedAvatars.length > 0 ? updatedAvatars[0] : null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen particle-bg">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Epic Header */}
        <header ref={headerRef} className="epic-header flex items-center justify-center px-10 py-12 border-b border-gray-800 shadow-2xl header-glow relative">
          {/* Space Background */}
          <div className="space-background">
            {/* Nebula */}
            <div className="nebula"></div>
            
            {/* Stars Container */}
            <div className={`stars-container ${isLightspeedActive ? 'lightspeed-active' : ''}`}>
              {stars.map((star) => (
                <div
                  key={`star-${star.id}`}
                  className={`star ${star.size}`}
                  style={{
                    left: star.left,
                    top: star.top,
                    animationDelay: `${star.delay}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Shooting Stars */}
            {shootingStars.map((shootingStar) => (
              <div
                key={`shooting-${shootingStar.id}`}
                className="shooting-star"
                style={{
                  left: shootingStar.left,
                  top: shootingStar.top,
                  animationDelay: `${shootingStar.delay}s`,
                }}
              />
            ))}
            
            {/* Space Dust */}
            {spaceDust.map((dust) => (
              <div
                key={`dust-${dust.id}`}
                className="space-dust"
                style={{
                  left: dust.left,
                  animationDelay: `${dust.delay}s`,
                }}
              />
            ))}
          </div>

          {/* Logo in top left */}
          <div className="absolute left-10 top-4 z-10 logo-container-glow">
            <div className="flex items-center">
              {/* Logo only */}
              <div className="w-16 h-16 relative">
                <Image
                  src="/bg-logo.png"
                  alt="Brace Gaming Logo"
                  width={64}
                  height={64}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Profile Button in top right */}
          <div className="absolute right-10 top-4 z-10">
            <div className="relative group">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer border-2 border-gray-700 hover:border-red-500 transition-all duration-300 neon-glow">
                <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              
              {/* Hover Pop-out Buttons */}
              <div className="absolute right-0 top-14 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="flex flex-col space-y-2">
                  <Link href="/home/profile" className="w-24 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold text-center transition-all duration-300 neon-glow justify-center">
                    Sign In
                  </Link>
                  <Link href="/home/guest" className="w-24 bg-gray-700 hover:bg-gray-600 text-white px-3 py-2 rounded-lg text-sm font-semibold text-center transition-all duration-300 neon-glow justify-center">
                    Guest Access
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center relative">
            {/* Floating Particles */}
            {particles.map((particle, i) => (
              <div
                key={`particle-${i}`}
                className="particle"
                style={{
                  left: particle.left,
                  '--delay': particle.delay,
                } as React.CSSProperties}
              />
            ))}
            
            {/* Sparkles */}
            {sparkles.map((sparkle, i) => (
              <div
                key={`sparkle-${i}`}
                className="sparkle"
                style={{
                  left: sparkle.left,
                  top: sparkle.top,
                  '--delay': sparkle.delay,
                } as React.CSSProperties}
              />
            ))}
            
            {/* Main Title */}
            <h1 className="text-5xl md:text-7xl font-bold text-red-600 tracking-wider text-center glitch-text" style={{
              fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
            }}>
              BRACE GAMING HUB
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 mt-4 text-center tracking-wide" style={{
              fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
            }}>
              Enter the Ultimate Mini-Game Experience
            </p>
          </div>
        </header>

        {/* Top Navigation Bar */}
        <nav className="bg-black border-b-2 border-red-500 shadow-2xl z-20 sidebar-glow neon-border-red">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center space-x-8">
                <Link href="/home" className="nav-button text-white hover:text-gray-300 transition-all duration-300 font-bold tracking-widest cyberpunk-font">
                  Home
                </Link>
                <Link href="/home/games" className="nav-button text-white hover:text-gray-300 transition-all duration-300 font-bold tracking-widest cyberpunk-font">
                  Games
                </Link>
                <Link href="/home/trending" className="nav-button text-white hover:text-gray-300 transition-all duration-300 font-bold tracking-widest cyberpunk-font">
                  Trending
                </Link>
                <Link href="/home/create" className="nav-button text-white hover:text-gray-300 transition-all duration-300 font-bold tracking-widest cyberpunk-font">
                  Create
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <p className="text-xl text-gray-300">
            Customize your gamer profile, challenge your friends, compete on the leaderboards, track your progress
          </p>
        </div>

        {/* Profile Form */}
        <div className="patterned-frame bg-black rounded-xl shadow-2xl p-8 mb-8">
          <div className="absolute top-4 right-4">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded text-xs font-semibold transition-all duration-300"
              >
                Edit
              </button>
            ) : (
              <div className="space-x-1">
                <button
                  onClick={handleSaveProfile}
                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs font-semibold transition-all duration-300"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Username */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Username</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => handleProfileChange('username', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300"
                    placeholder="Enter your username"
                  />
                ) : (
                  <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {profile.username || "Not set"}
                  </div>
                )}
              </div>

              {/* Discord Name */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Discord Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.discordName}
                    onChange={(e) => handleProfileChange('discordName', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300"
                    placeholder="Enter your Discord name"
                  />
                ) : (
                  <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {profile.discordName || "Not set"}
                  </div>
                )}
              </div>

              {/* X Handle */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">X Handle</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.xHandle}
                    onChange={(e) => handleProfileChange('xHandle', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300"
                    placeholder="Enter your X handle"
                  />
                ) : (
                  <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {profile.xHandle || "Not set"}
                  </div>
                )}
              </div>

              {/* YouTube/Twitch Link */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">YouTube/Twitch Link</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={profile.youtubeTwitchLink}
                    onChange={(e) => handleProfileChange('youtubeTwitchLink', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300"
                    placeholder="Enter your YouTube or Twitch channel URL"
                  />
                ) : (
                  <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {profile.youtubeTwitchLink ? (
                      <a 
                        href={profile.youtubeTwitchLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
                      >
                        {profile.youtubeTwitchLink}
                      </a>
                    ) : (
                      "Not set"
                    )}
                  </div>
                )}
              </div>

              {/* Favorite Game */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Favorite Game</label>
                {isEditing ? (
                  <select
                    value={profile.favoriteGame}
                    onChange={(e) => handleProfileChange('favoriteGame', e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300"
                  >
                    <option value="">Select your favorite game</option>
                    {GAMES.map((game) => (
                      <option key={game} value={game}>{game}</option>
                    ))}
                  </select>
                ) : (
                  <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white">
                    {profile.favoriteGame || "Not set"}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Profile Picture */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Profile Picture</label>
                <div className="w-full bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-700 h-80 flex items-center justify-center">
                  {profile.profilePicture ? (
                    <img 
                      src={profile.profilePicture} 
                      alt="Profile"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                {isEditing && (
                  <div className="mt-4 text-center">
                    <Link 
                      href="/home/create"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                    >
                      Create Avatar
                    </Link>
                  </div>
                )}
              </div>

              {/* Bio */}
              <div>
                <label className="block text-gray-300 font-semibold mb-2">Bio</label>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-all duration-300 resize-none"
                    placeholder="Tell us about yourself..."
                  />
                ) : (
                  <div className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white min-h-[100px]">
                    {profile.bio || "No bio yet"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

              {/* XP Meter */}
      <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl p-8 mb-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-yellow-500 mb-2">TOTAL XP</h2>
        </div>
        
        <div className="xp-circular-meter">
          <svg viewBox="0 0 100 100">
            <defs>
              <linearGradient id="xpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00bcd4" stopOpacity="1" />
                <stop offset="50%" stopColor="#0066ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#00bcd4" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="xpGradientAnimated" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff88" stopOpacity="1" />
                <stop offset="50%" stopColor="#8800ff" stopOpacity="1" />
                <stop offset="100%" stopColor="#00ff88" stopOpacity="1" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="glowIntense">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Background Circle */}
            <circle 
              className="background-circle"
              cx="50" 
              cy="50" 
              r="40"
            />
            
            {/* Progress Circle */}
            <circle 
              className="progress-circle"
              cx="50" 
              cy="50" 
              r="40"
              strokeDasharray={`${(totalXP % 10000) / 100 * 251.2} 251.2`}
              strokeDashoffset="0"
            />
            
            {/* Animated Overlay Circle */}
            <circle 
              className="progress-circle-animated"
              cx="50" 
              cy="50" 
              r="44"
              strokeDasharray="251.2"
              strokeDashoffset="0"
            />
          </svg>
          
          <div className="center-content">
            <div className="xp-value">{totalXP.toLocaleString()}</div>
            <div className="xp-label">XP</div>
            <div className="level-info">
              Level {Math.floor(totalXP / 10000) + 1} • {totalXP % 10000}/10,000
            </div>
          </div>
        </div>
      </div>

        {/* Game Scores */}
        <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-500 mb-6 text-center">GAME SCORES</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {GAMES.map((game) => (
              <div key={game} className="bg-gray-800 rounded-lg p-4 text-center">
                <h3 className="text-sm font-semibold text-gray-300 mb-2 truncate">{game}</h3>
                <div className="text-2xl font-bold text-yellow-500">
                  {profile.gameScores[game] || 0}
                </div>
              </div>
            ))}
          </div>
        </div>


          </div>
        </div>
      </div>

      {/* Spacing between content and footer */}
      <div className="py-16 bg-black"></div>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-300 mt-auto">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Branding */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Eyeverse Arcade</h3>
              <p className="text-gray-400 leading-relaxed">
                A collection of skill-based mini-games. Compete, climb, conquer.
              </p>
            </div>

            {/* Middle Column - Quick Links */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/home" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/home/leaderboards" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Leaderboards
                  </Link>
                </li>
                <li>
                  <Link href="/home/games" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Games
                  </Link>
                </li>
                <li>
                  <Link href="/home/profile" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link href="/home/about" className="text-gray-400 hover:text-white transition-colors duration-200">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/home/terms" className="text-gray-400 hover:text-white transition-colors duration-200">
                    Terms & Privacy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right Column - Connect */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://twitter.com/eyeverse" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    X (Twitter)
                  </a>
                </li>
                <li>
                  <a 
                    href="https://discord.gg/eyeverse" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a 
                    href="https://youtube.com/@eyeverse" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    YouTube
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:contact@eyeverse.com" 
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Eye Labs. All rights reserved.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              Built on ApeChain 🦍
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
} 