"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CreatePage() {
  const router = useRouter();
  const [particles, setParticles] = useState<Array<{left: string, delay: number}>>([]);
  const [sparkles, setSparkles] = useState<Array<{left: string, top: string, delay: number}>>([]);
  const [stars, setStars] = useState<Array<{id: number, left: string, top: string, size: string, delay: number}>>([]);
  const [isLightspeedActive, setIsLightspeedActive] = useState(false);
  const [shootingStars, setShootingStars] = useState<Array<{id: number, left: string, top: string, delay: number}>>([]);
  const [spaceDust, setSpaceDust] = useState<Array<{id: number, left: string, delay: number}>>([]);
  
  // Character GIF rotation states
  const [leftCharacterIndex, setLeftCharacterIndex] = useState(0);
  const [rightCharacterIndex, setRightCharacterIndex] = useState(1);
  
  // Available character GIFs
  const characterGifs = [
    "/characters/IMG_1692.gif",
    "/characters/IMG_1694.gif"
  ];

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

  // Rotate character GIFs every 3 seconds
  useEffect(() => {
    const rotateCharacters = () => {
      setLeftCharacterIndex((prev) => (prev + 1) % characterGifs.length);
      setRightCharacterIndex((prev) => (prev + 1) % characterGifs.length);
    };
    const interval = setInterval(rotateCharacters, 3000);
    return () => clearInterval(interval);
  }, [characterGifs.length]);

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
                    src={characterGifs[leftCharacterIndex]}
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
                    src={characterGifs[rightCharacterIndex]}
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
        
        {/* Create Content */}
        <div className="flex-1 bg-black p-10">
          <div className="max-w-4xl mx-auto">
                         {/* Main Heading */}
             <div className="text-center mb-12">
               <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-6 glitch-text" style={{
                 fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif',
                 textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)'
               }}>
                 CREATE WITH US
               </h1>
               <div className="w-32 h-1 bg-red-500 mx-auto rounded-full neon-glow"></div>
             </div>

            {/* Content Sections */}
            <div className="space-y-12">
                             {/* Hero Section */}
               <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-8">
                 <h2 className="text-3xl font-bold text-green-500 mb-6 tracking-wide" style={{
                   fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                 }}>
                   Have an idea for a game? Let's bring it to life.
                 </h2>
                <p className="text-xl text-gray-300 leading-relaxed" style={{
                  fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                }}>
                  At BRACE Gaming, we offer full-service game design, development, and deployment — from concept to launch.
                </p>
              </div>

              {/* Services Section */}
              <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-8">
                                 <h3 className="text-2xl font-bold text-green-500 mb-6 tracking-wide" style={{
                   fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                 }}>
                   Full-Service Game Development
                 </h3>
                <p className="text-lg text-gray-300 leading-relaxed mb-6" style={{
                  fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                }}>
                  Whether you're creating a custom experience for your community or want to gamify your brand, our team can help craft engaging, high-performance games tailored to your vision.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed" style={{
                  fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                }}>
                  Whether it's for your project, brand, your community, or just for fun — if you can imagine it, we can build it.
                </p>
              </div>

                             {/* Call to Action */}
               <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-8 text-center">
                 <h3 className="text-2xl font-bold text-green-500 mb-6 tracking-wide" style={{
                   fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                 }}>
                   Ready to Build?
                 </h3>
                                 <p className="text-xl text-gray-300 mb-8 leading-relaxed" style={{
                   fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                 }}>
                   Slide into our DMs or hit that contact button. Let's build your game.
                 </p>
                
                {/* Contact Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <a 
                    href="https://twitter.com/mutantmatty" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold tracking-wide rounded-lg transition-all duration-300 neon-glow flex items-center gap-3"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    X: @mutantmatty
                  </a>
                  
                                     <Link href="/home/contact" className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold tracking-wide rounded-lg transition-all duration-300 neon-glow">
                     Contact Us
                   </Link>
                </div>
              </div>

                             {/* Features Grid */}
               <div className="grid md:grid-cols-3 gap-6">
                 <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-6 text-center">
                   <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                     </svg>
                   </div>
                   <h4 className="text-xl font-bold text-green-500 mb-3 tracking-wide" style={{
                     fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                   }}>
                     Creative Design
                   </h4>
                  <p className="text-gray-300" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    From concept to visual design, we bring your ideas to life with stunning graphics and engaging gameplay.
                  </p>
                </div>

                                 <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-6 text-center">
                   <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                     </svg>
                   </div>
                   <h4 className="text-xl font-bold text-green-500 mb-3 tracking-wide" style={{
                     fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                   }}>
                     Development
                   </h4>
                  <p className="text-gray-300" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    High-performance game development using cutting-edge technologies and best practices.
                  </p>
                </div>

                                 <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-6 text-center">
                   <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                     </svg>
                   </div>
                   <h4 className="text-xl font-bold text-green-500 mb-3 tracking-wide" style={{
                     fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                   }}>
                     Deployment
                   </h4>
                  <p className="text-gray-300" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    Seamless deployment and launch support to get your game in front of players worldwide.
                  </p>
                </div>
              </div>

              {/* Featured Projects Section */}
              <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-8">
                <div className="text-center mb-8">
                                     <h2 className="text-3xl font-bold text-green-500 mb-4 tracking-wide" style={{
                     fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                   }}>
                     FEATURED PROJECTS
                   </h2>
                  <p className="text-lg text-gray-300" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    Check out some of the amazing games we've built for our clients
                  </p>
                </div>

                                 <div className="flex justify-center">
                   {/* FlappyGyatt Project */}
                   <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-purple-500 transition-all duration-300 group max-w-md">
                                           <div className="h-48 relative overflow-hidden">
                        <img 
                          src="/Images/flappy-gyatt.png" 
                          alt="FlappyGyatt Game Preview" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                      </div>
                     <div className="p-4">
                       <p className="text-gray-300 text-sm mb-3">
                         A fun Flappy Bird-style game built for the BepeCoin community with engaging gameplay and smooth mechanics.
                       </p>
                       <div className="flex flex-wrap gap-2 mb-4">
                         <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded">WebGL</span>
                         <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">Unity</span>
                         <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">Crypto</span>
                       </div>
                       <a 
                         href="https://bepearmy.com/flappygyatt/" 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="inline-flex items-center px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm font-semibold rounded-lg transition-all duration-300 w-full justify-center"
                       >
                         <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                         </svg>
                         Play Game
                       </a>
                     </div>
                   </div>
                 </div>

                                 <div className="text-center mt-8">
                                       <Link 
                      href="/home/contact" 
                      className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 neon-glow"
                    >
                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                     </svg>
                     Start Your Project
                   </Link>
                 </div>
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