"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ContactPage() {
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

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    xProfile: '',
    discordUsername: '',
    projectName: '',
    mainObjective: '',
    gameType: '',
    inspirations: '',
    features: '',
    artStyle: '',
    needArtwork: '',
    existingAssets: '',
    budget: '',
    timeline: '',
    needHosting: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      console.log('Form data:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      setFormData({
        name: '',
        xProfile: '',
        discordUsername: '',
        projectName: '',
        mainObjective: '',
        gameType: '',
        inspirations: '',
        features: '',
        artStyle: '',
        needArtwork: '',
        existingAssets: '',
        budget: '',
        timeline: '',
        needHosting: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
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
        
        {/* Contact Content */}
        <div className="flex-1 bg-black p-10">
          <div className="max-w-4xl mx-auto">
            {/* Main Heading */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wider mb-6 glitch-text" style={{
                fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.2)'
              }}>
                CONTACT US
              </h1>
              <div className="w-32 h-1 bg-red-500 mx-auto rounded-full neon-glow"></div>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="bg-green-900 border-2 border-green-500 rounded-xl p-6 mb-8 text-center neon-frame">
                <h3 className="text-2xl font-bold text-green-400 mb-2">Message Sent!</h3>
                <p className="text-green-300">Thank you for your inquiry. We'll get back to you soon!</p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-900 border-2 border-red-500 rounded-xl p-6 mb-8 text-center neon-frame">
                <h3 className="text-2xl font-bold text-red-400 mb-2">Submission Failed</h3>
                <p className="text-red-300">Please try again or contact us directly at matty@eyelabs.xyz</p>
              </div>
            )}

            {/* Contact Form */}
            <div className="bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-green-500 font-semibold mb-2" style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300"
                      style={{
                        fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-green-500 font-semibold mb-2" style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}>
                      X Profile
                    </label>
                    <input
                      type="text"
                      name="xProfile"
                      value={formData.xProfile}
                      onChange={handleInputChange}
                      placeholder="@username"
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300"
                      style={{
                        fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-green-500 font-semibold mb-2" style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}>
                      Discord Username
                    </label>
                    <input
                      type="text"
                      name="discordUsername"
                      value={formData.discordUsername}
                      onChange={handleInputChange}
                      placeholder="username#1234"
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300"
                      style={{
                        fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-green-500 font-semibold mb-2" style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}>
                      Project Name *
                    </label>
                    <input
                      type="text"
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300"
                      style={{
                        fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                      }}
                    />
                  </div>
                </div>

                {/* Project Details */}
                <div>
                  <label className="block text-green-500 font-semibold mb-2" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    What is the main objective of this project? *
                  </label>
                  <textarea
                    name="mainObjective"
                    value={formData.mainObjective}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300 resize-none"
                    style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-green-500 font-semibold mb-2" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    What type of game are you looking to create (genre, style)?
                  </label>
                  <textarea
                    name="gameType"
                    value={formData.gameType}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="e.g., Platformer, RPG, Puzzle, etc."
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300 resize-none"
                    style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-green-500 font-semibold mb-2" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    Do you have any specific inspirations or references for the project?
                  </label>
                  <textarea
                    name="inspirations"
                    value={formData.inspirations}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="e.g., Minecraft, Flappy Bird, etc."
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300 resize-none"
                    style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-green-500 font-semibold mb-2" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    Are there any specific features or mechanics you would like to include?
                  </label>
                  <textarea
                    name="features"
                    value={formData.features}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="e.g., in-game leaderboard, multiplayer, achievements, etc."
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300 resize-none"
                    style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-green-500 font-semibold mb-2" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    Do you have a specific art style in mind?
                  </label>
                  <textarea
                    name="artStyle"
                    value={formData.artStyle}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="e.g., Pixel art, 3D, Cartoon, Minimalist, etc."
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300 resize-none"
                    style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}
                  />
                </div>

                <div>
                  <label className="block text-green-500 font-semibold mb-2" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    Do you need support for artwork or sprite generation and animation?
                  </label>
                  <select
                    name="needArtwork"
                    value={formData.needArtwork}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300"
                    style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}
                  >
                    <option value="">Select an option</option>
                    <option value="yes">Yes, I need full art support</option>
                    <option value="partial">Yes, but I have some assets</option>
                    <option value="no">No, I have all the artwork</option>
                  </select>
                </div>

                <div>
                  <label className="block text-green-500 font-semibold mb-2" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    Are there any existing assets you would like to share? (link)
                  </label>
                  <input
                    type="url"
                    name="existingAssets"
                    value={formData.existingAssets}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300"
                    style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-green-500 font-semibold mb-2" style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}>
                      Do you have a set budget to work with?
                    </label>
                                                               <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300"
                        style={{
                          fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                        }}
                      >
                        <option value="">Select budget range</option>
                        <option value="not-sure">Not sure</option>
                        <option value="200-500">$200 - $500</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-1500">$1,000 - $1,500</option>
                        <option value="1500-2500">$1,500 - $2,500</option>
                        <option value="2500-3500">$2,500 - $3,500</option>
                        <option value="3500-5000">$3,500 - $5,000</option>
                        <option value="5000+">$5,000+</option>
                      </select>
                  </div>

                  <div>
                    <label className="block text-green-500 font-semibold mb-2" style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}>
                      What is your timeline for completion?
                    </label>
                                         <select
                       name="timeline"
                       value={formData.timeline}
                       onChange={handleInputChange}
                       className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300"
                       style={{
                         fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                       }}
                     >
                       <option value="">Select timeline</option>
                       <option value="less-than-1-month">Less than 1 month</option>
                       <option value="1-2-months">1-2 months</option>
                       <option value="3-6-months">3-6 months</option>
                       <option value="6-12-months">6-12 months</option>
                       <option value="over-12-months">Over 12 months</option>
                       <option value="flexible">Flexible</option>
                     </select>
                  </div>
                </div>

                <div>
                  <label className="block text-green-500 font-semibold mb-2" style={{
                    fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                  }}>
                    Do you need help with hosting / website / token gating, etc? (may require development resource)
                  </label>
                  <textarea
                    name="needHosting"
                    value={formData.needHosting}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describe any additional services you need..."
                    className="w-full bg-gray-800 border-2 border-gray-700 rounded-lg px-4 py-3 text-white focus:border-red-500 focus:outline-none transition-all duration-300 resize-none"
                    style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-12 py-4 font-bold tracking-wide rounded-lg transition-all duration-300 neon-glow ${
                      isSubmitting
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700 text-white hover:scale-105'
                    }`}
                    style={{
                      fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                    }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Sending...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Contact Info */}
            <div className="mt-12 bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-8 text-center">
              <h3 className="text-2xl font-bold text-green-500 mb-4 tracking-wide" style={{
                fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
              }}>
                Direct Contact
              </h3>
              <p className="text-gray-300 mb-4" style={{
                fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
              }}>
                Prefer to reach out directly? Contact us at:
              </p>
              <a 
                href="mailto:matty@eyelabs.xyz"
                className="text-red-400 hover:text-red-300 font-semibold text-lg transition-all duration-300"
                style={{
                  fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
                }}
              >
                matty@eyelabs.xyz
              </a>
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