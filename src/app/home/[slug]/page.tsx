"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const games = [
  { title: "Flappy Brace", slug: "game-one" },
  { title: "Bubble Brace", slug: "game-two" },
  { title: "Gegssend Go", slug: "game-three" },
  { title: "Brace Invaders", slug: "game-four" },
  { title: "Gabrer Gravity", slug: "game-five" },
  { title: "Brace Mountain", slug: "game-six" },
  { title: "Gabrer Gang", slug: "game-seven" },
  { title: "Crush & Brace", slug: "game-eight" },
  { title: "Chronicles of Chron", slug: "game-nine" },
  { title: "The Pits II", slug: "game-ten" },
];

const builds: Record<string, string> = {
  "game-one": "/webgl/flappy-brace/index.html",
  "game-two": "/webgl/bubble-brace/index.html",
  "game-three": "/webgl/gegssend-go/index.html",
  "game-four": "/webgl/brace-invaders/index.html",
  "game-five": "/webgl/gabrer-gravity/index.html",
  "game-six": "/webgl/brace-mountain/index.html",
  "game-seven": "/webgl/gabrer-gang/index.html",
  "game-eight": "/webgl/crush-brace/index.html",
  "game-nine": "/webgl/chronicls-of-chron/index.html",
  "game-ten": "",
};

// Game-specific iframe dimensions
const gameDimensions: Record<string, { width: number; height: number }> = {
  "game-one": { width: 800, height: 600 },
  "game-two": { width: 800, height: 600 },
  "game-three": { width: 800, height: 600 },
  "game-four": { width: 1000, height: 750 }, // 25% bigger for Brace Invaders
  "game-five": { width: 1200, height: 800 }, // Larger size for Gabrer Gravity
  "game-six": { width: 1200, height: 800 }, // Larger size for Brace Mountain
  "game-seven": { width: 1200, height: 800 }, // Larger size for Gabrer Gang
  "game-eight": { width: 800, height: 600 },
  "game-nine": { width: 800, height: 600 },
  "game-ten": { width: 800, height: 600 },
};

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = games.find(g => g.slug === params.slug);
  if (!game) return notFound();
  const buildSrc = builds[params.slug];
  const dimensions = gameDimensions[params.slug] || { width: 800, height: 600 };

  // State for animations
  const [particles, setParticles] = useState<Array<{left: string, delay: number}>>([]);
  const [sparkles, setSparkles] = useState<Array<{left: string, top: string, delay: number}>>([]);
  const [stars, setStars] = useState<Array<{id: number, left: string, top: string, size: string, delay: number}>>([]);
  const [isLightspeedActive, setIsLightspeedActive] = useState(false);
  const [shootingStars, setShootingStars] = useState<Array<{id: number, left: string, top: string, delay: number}>>([]);
  const [spaceDust, setSpaceDust] = useState<Array<{id: number, left: string, delay: number}>>([]);

  const headerRef = useRef<HTMLElement>(null);

  // Generate game-specific leaderboard data
  const generateGameLeaderboard = (gameTitle: string) => {
    const players = [
      'BraceMaster', 'PopKing', 'SpeedDemon', 'AlienHunter', 'GravityGuru',
      'SummitSeeker', 'GangLeader', 'CrusherPro', 'TimeLord', 'PitMaster',
      'NeonGamer', 'CyberPlayer', 'RetroGamer', 'ArcadeKing', 'PixelWarrior',
      'GameMaster', 'BraceChampion', 'StarGamer', 'QuantumGamer', 'ArcadeMaster'
    ];
    
    const dates = [
      '2 hours ago', '3 hours ago', '5 hours ago', '1 day ago', '2 days ago',
      '3 days ago', '1 week ago', '2 weeks ago', '1 month ago', '2 months ago'
    ];
    
    // Generate 15 random leaderboard entries
    const entries = [];
    for (let i = 0; i < 15; i++) {
      const score = Math.floor(Math.random() * 50000) + 1000;
      const player = players[Math.floor(Math.random() * players.length)];
      const date = dates[Math.floor(Math.random() * dates.length)];
      
      entries.push({
        player,
        score: score.toLocaleString(),
        date
      });
    }
    
    // Sort by score (highest first) and remove duplicates
    const uniqueEntries = entries
      .sort((a, b) => parseInt(b.score.replace(/,/g, '')) - parseInt(a.score.replace(/,/g, '')))
      .filter((entry, index, self) => 
        index === self.findIndex(e => e.player === entry.player)
      )
      .slice(0, 10); // Keep top 10
    
    return uniqueEntries;
  };

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
        
        {/* Game Content */}
        <div className="flex-1 flex flex-col items-center justify-center bg-black text-white p-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-widest drop-shadow-lg select-none text-center">
            {game.title}
          </h1>
          {buildSrc ? (
            <iframe
              src={buildSrc}
              width={dimensions.width}
              height={dimensions.height}
              className="rounded-lg shadow-lg border-0"
              allowFullScreen
              title={game.title}
            />
          ) : (
            <div className={`w-[${dimensions.width}px] h-[${dimensions.height}px] bg-gray-800 flex items-center justify-center rounded-lg shadow-lg`}>
              <span className="text-gray-400 text-xl">[ WebGL build will go here ]</span>
            </div>
          )}
          
          {/* Game Leaderboard */}
          <div className="mt-12 w-full max-w-4xl">
            <h2 className="text-2xl font-bold text-yellow-500 mb-6 text-center tracking-wide" style={{
              fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
            }}>
              {game.title} LEADERBOARD
            </h2>
            
            <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-6">
              <div className="space-y-3 max-h-96 overflow-y-auto activity-scrollbar">
                {generateGameLeaderboard(game.title).map((entry, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700 leaderboard-item">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-amber-600' : 'bg-gray-600'
                        }`}>
                          <span className={`font-bold text-sm ${
                            index === 0 ? 'text-black' : 'text-white'
                          }`}>
                            #{index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="text-lg text-gray-300 font-semibold">{entry.player}</div>
                          <div className="text-sm text-gray-400">{entry.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-yellow-400">{entry.score}</div>
                        <div className="text-xs text-gray-400">points</div>
                      </div>
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