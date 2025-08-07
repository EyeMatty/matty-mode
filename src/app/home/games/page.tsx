"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const games = [
  { title: "Flappy Brace", slug: "game-one", clip: "/game-clips/flappy-brace.mp4", type: "Endless", releaseDate: "2024-01-15" },
  { title: "Bubble Brace", slug: "game-two", clip: "/game-clips/bubble-brace.mp4", type: "Puzzle", releaseDate: "2024-02-20" },
  { title: "Gegssend Go", slug: "game-three", clip: "/game-clips/gegssend-go.mp4", type: "Adventure", releaseDate: "2024-03-10" },
  { title: "Brace Invaders", slug: "game-four", clip: "/game-clips/brace-invaders.mp4", type: "Shooter", releaseDate: "2024-01-25" },
  { title: "Gabrer Gravity", slug: "game-five", clip: "/game-clips/gabrer-gravity.mp4", type: "Puzzle", releaseDate: "2024-04-05" },
  { title: "Brace Mountain", slug: "game-six", clip: "/game-clips/brace-mountain.mp4", type: "Adventure", releaseDate: "2024-02-15" },
  { title: "Gabrer Gang", slug: "game-seven", clip: "/game-clips/gabrer-gang.mp4", type: "Fighting", releaseDate: "2024-03-25" },
  { title: "Crush & Brace", slug: "game-eight", clip: "/game-clips/crush-brace.mp4", type: "Puzzle", releaseDate: "2024-01-30" },
  { title: "Chronicles of Chron", slug: "game-nine", clip: "/game-clips/chronicls-of-chron.mp4", type: "Adventure", releaseDate: "2024-04-15" },
  { title: "The Pits II", slug: "game-ten", clip: "/game-clips/the-pits.mp4", type: "Endless", releaseDate: "2024-02-28" },
];

type SortOption = 'alphabetical' | 'newest' | 'type';

export default function GamesPage() {
  const router = useRouter();
  const [explodingTile, setExplodingTile] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('alphabetical');
  const [filteredGames, setFilteredGames] = useState(games);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [particles, setParticles] = useState<Array<{left: string, delay: number}>>([]);
  const [sparkles, setSparkles] = useState<Array<{left: string, top: string, delay: number}>>([]);
  const [stars, setStars] = useState<Array<{id: number, left: string, top: string, size: string, delay: number}>>([]);
  const [isLightspeedActive, setIsLightspeedActive] = useState(false);
  const [shootingStars, setShootingStars] = useState<Array<{id: number, left: string, top: string, delay: number}>>([]);
  const [spaceDust, setSpaceDust] = useState<Array<{id: number, left: string, delay: number}>>([]);

  const headerRef = useRef<HTMLElement>(null);

  // Sort and filter games based on selected options
  useEffect(() => {
    let sortedGames = [...games];
    
    // Filter by type if not "all"
    if (selectedType !== 'all') {
      sortedGames = sortedGames.filter(game => game.type === selectedType);
    }
    
    // Sort games
    switch (sortBy) {
      case 'alphabetical':
        sortedGames.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        sortedGames.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
        break;
      case 'type':
        sortedGames.sort((a, b) => a.type.localeCompare(b.type));
        break;
    }
    
    setFilteredGames(sortedGames);
  }, [sortBy, selectedType]);

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
        delay: Math.random() * 4
      }));
      
      setShootingStars(shootingStarData);
    };

    generateShootingStars();
  }, []);

  // Generate space dust
  useEffect(() => {
    const generateSpaceDust = () => {
      const dustData = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 15
      }));
      
      setSpaceDust(dustData);
    };

    generateSpaceDust();
  }, []);

  // Lightspeed jump effect - reduced frequency
  useEffect(() => {
    const startLightspeedSequence = () => {
      setTimeout(() => {
        setIsLightspeedActive(true);
        
        setTimeout(() => {
          setIsLightspeedActive(false);
          startLightspeedSequence();
        }, 2000);
      }, 8000);
    };

    startLightspeedSequence();
  }, []);

  // Sort games based on selected option
  useEffect(() => {
    let sortedGames = [...games];
    
    switch (sortBy) {
      case 'alphabetical':
        sortedGames.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        // Simulate newest games (reverse order for demo)
        sortedGames.reverse();
        break;
      case 'popular':
        // Simulate popular games (random order for demo)
        sortedGames.sort(() => Math.random() - 0.5);
        break;
      case 'trending':
        // Simulate trending games (different random order for demo)
        sortedGames.sort(() => Math.random() - 0.5);
        break;
    }
    
    setFilteredGames(sortedGames);
  }, [sortBy]);

  const handleTileClick = (gameSlug: string) => {
    setExplodingTile(gameSlug);
    setTimeout(() => {
      // Use window.location for more reliable navigation
      window.location.href = `/home/${gameSlug}`;
    }, 500);
  };

  const sortOptions: { value: SortOption; label: string; icon: string }[] = [
    { value: 'alphabetical', label: 'Alphabetical', icon: '🔤' },
    { value: 'newest', label: 'Newest', icon: '🆕' },
    { value: 'type', label: 'Type', icon: '🎮' },
  ];

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
        <nav className="border-b-2 border-red-500 shadow-2xl z-20 sidebar-glow neon-border-red" style={{ backgroundColor: '#6c0b10' }}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-center py-0.5">
              <div className="flex items-center space-x-8">
                {/* Animated Character GIF - Left Side */}
                <div>
                  <img
                    src="/characters/IMG_1692.gif"
                    alt="Animated Character"
                    className="w-15 h-15 object-contain transition-all duration-500"
                    style={{
                      maxWidth: '60px',
                      maxHeight: '60px'
                    }}
                  />
                </div>
                
                <Link href="/home" className="nav-button text-black hover:text-gray-800 transition-all duration-300 font-bold tracking-widest cyberpunk-font">
                  Home
                </Link>
                <Link href="/home/games" className="nav-button text-black hover:text-gray-800 transition-all duration-300 font-bold tracking-widest cyberpunk-font">
                  Games
                </Link>
                <Link href="/home/create" className="nav-button text-black hover:text-gray-800 transition-all duration-300 font-bold tracking-widest cyberpunk-font">
                  Create
                </Link>
                
                {/* Animated Character GIF - Right Side */}
                <div>
                  <img
                    src="/characters/IMG_1694.gif"
                    alt="Animated Character"
                    className="w-15 h-15 object-contain transition-all duration-500"
                    style={{
                      transform: 'scaleX(-1)',
                      maxWidth: '60px',
                      maxHeight: '60px'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Sort Controls */}
        <div className="bg-black border-b border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <span className="text-gray-300 font-semibold tracking-wide">Sort by:</span>
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-6 py-3 rounded-lg font-semibold tracking-wide transition-all duration-300 neon-glow ${
                      sortBy === option.value
                        ? 'bg-red-600 text-white border-red-500'
                        : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-2">{option.icon}</span>
                    {option.label}
                  </button>
                ))}
              </div>
              
              {/* Type Filter Dropdown */}
              <div className="flex items-center space-x-3">
                <span className="text-gray-300 font-semibold tracking-wide">Filter by type:</span>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-4 py-2 bg-gray-800 text-gray-300 border border-gray-700 rounded-lg font-semibold tracking-wide transition-all duration-300 neon-glow hover:bg-gray-700 focus:outline-none focus:border-red-500"
                >
                  <option value="all">All Types</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Fighting">Fighting</option>
                  <option value="Endless">Endless</option>
                  <option value="Shooter">Shooter</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Games Grid */}
        <div className="flex-1 bg-black p-10">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-widest text-white" style={{
              fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
            }}>
              ALL GAMES
            </h2>
            
            <div className="flex flex-wrap justify-center items-start gap-8">
              {filteredGames.map((game, idx) => (
                <div 
                  key={game.slug} 
                  className={`w-80 rounded-xl shadow-2xl hover:scale-105 transition-transform border-2 border-gray-800 relative group neon-frame cursor-pointer game-tile-container overflow-hidden ${
                    explodingTile === game.slug ? 'tile-exploding' : ''
                  }`}
                  onClick={() => handleTileClick(game.slug)}
                >
                  {/* Video clip filling entire frame */}
                  <video
                    src={game.clip}
                    width={320}
                    height={180}
                    loop
                    muted
                    autoPlay
                    playsInline
                    preload="metadata"
                    poster="/bg-logo.png"
                    onError={(e) => {
                      console.error('Video error for', game.clip, ':', e);
                    }}
                    onLoadStart={() => {
                      console.log('Video loading:', game.clip);
                    }}
                    onCanPlay={() => {
                      console.log('Video can play:', game.clip);
                    }}
                    className="w-full h-full object-cover"
                  />
                 
                  {/* Text overlay on video */}
                  <div className="absolute inset-0 flex items-end justify-center pb-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                    <div className="text-xl font-bold text-white tracking-wide text-center drop-shadow-lg">
                      {game.title}
                    </div>
                  </div>
                </div>
              ))}
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