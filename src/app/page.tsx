"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

const ransomLetters = [
  { l: "W", c: "text-red-900", r: "-rotate-3", s: "text-5xl md:text-7xl" },
  { l: "E", c: "text-red-700", r: "rotate-2", s: "text-4xl md:text-6xl" },
  { l: "L", c: "text-red-800", r: "-rotate-6", s: "text-5xl md:text-7xl" },
  { l: "C", c: "text-red-600", r: "rotate-3", s: "text-4xl md:text-6xl" },
  { l: "O", c: "text-red-500", r: "-rotate-2", s: "text-5xl md:text-7xl" },
  { l: "M", c: "text-red-400", r: "rotate-1", s: "text-4xl md:text-6xl" },
  { l: "E", c: "text-red-300", r: "-rotate-4", s: "text-5xl md:text-7xl" },
];

export default function Landing() {
  const [showPopup, setShowPopup] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false);

  const fullText = "To enhance your user experience, support technical features, and personalize content and ads ... just kidding .....we dont do lame ass cookies and track your shit... this is web3 ... brace";

  // Load Google Fonts
  useEffect(() => {
    const id = 'google-font-permanent-marker';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    // Show popup after a short delay when component mounts
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showPopup && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // Adjust speed here (lower = faster)

      return () => clearTimeout(timeout);
    } else if (showPopup && currentIndex >= fullText.length && !showButtons) {
      // Show buttons after typewriter animation completes
      const buttonTimer = setTimeout(() => {
        setShowButtons(true);
      }, 500); // Small delay after text completes

      return () => clearTimeout(buttonTimer);
    }
  }, [showPopup, currentIndex, fullText, showButtons]);

  const closePopup = () => {
    setShowPopup(false);
    setShowButtons(false);
    setCurrentIndex(0);
    setDisplayText("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] relative overflow-hidden particle-bg">
      {/* Enhanced animated background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full opacity-30 animate-pulse bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
      </div>
      
      {/* Logo in top left */}
      <div className="absolute top-8 left-8 z-20">
        <Image
          src="/bg-logo.png"
          alt="Brace Gaming Logo"
          width={120}
          height={120}
          className="drop-shadow-2xl"
        />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {/* Epic Header with Glitch Effect */}
        <div className="mb-8">
          <h1 className="epic-header header-glow tracking-widest drop-shadow-lg select-none flex gap-1 justify-center">
            {ransomLetters.map((item, i) => (
              <span
                key={i}
                className={`glitch inline-block font-extrabold ${item.c} ${item.r} ${item.s} px-1 py-0 bg-white/10 rounded shadow-lg`}
                style={{ fontFamily: 'monospace, sans-serif' }}
                data-text={item.l}
              >
                {item.l}
              </span>
            ))}
          </h1>
        </div>
        
        <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-xl select-none animate-pulse" style={{letterSpacing: '0.1em'}}>
          A portal to the unknown. Are you ready to play?
        </p>
        
        <Link href="/home">
          <button
            className="epic-button px-10 py-4 bg-gradient-to-r from-red-700 to-red-500 text-black text-2xl font-semibold rounded-full shadow-lg hover:scale-105 hover:from-red-800 hover:to-red-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500 animate-bounce"
            style={{ fontFamily: 'Permanent Marker, "Comic Sans MS", cursive, sans-serif' }}
          >
            Enter
          </button>
        </Link>
      </div>

      {/* Welcome Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 border-2 border-red-500 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 transform transition-all duration-500 scale-100 animate-pulse">
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500 via-purple-500 to-red-500 opacity-20 animate-pulse"></div>
            
            {/* Close button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-400 transition-colors duration-200 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="relative p-8 text-center">
              {/* Title */}
              <h2 className="text-3xl font-bold text-red-400 mb-6 tracking-wider" style={{ fontFamily: 'monospace, sans-serif' }}>
                COOKIES
              </h2>
              
              {/* Typewriter Text */}
              <div className="mb-8 text-left">
                <p className="text-lg text-gray-300 leading-relaxed font-mono">
                  {displayText}
                  <span className="animate-pulse">|</span>
                </p>
              </div>

              {/* Pill Buttons - Only show after typewriter completes */}
              {showButtons && (
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
                  {/* Red Pill */}
                  <button
                    onClick={closePopup}
                    className="epic-button group relative px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-red-700 hover:to-red-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500 transform hover:rotate-1"
                    style={{ 
                      boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
                      fontFamily: 'monospace, sans-serif'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-300 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                    <span className="relative z-10">LFGame</span>
                  </button>

                  {/* Blue Pill */}
                  <a href="https://www.youtube.com/watch?v=3BFTio5296w&list=RD3BFTio5296w&start_radio=1" target="_blank" rel="noopener noreferrer" className="group">
                    <button
                      onClick={closePopup}
                      className="epic-button relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-full shadow-lg hover:scale-105 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 transform hover:-rotate-1"
                      style={{ 
                        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
                        fontFamily: 'monospace, sans-serif'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      <span className="relative z-10">I'm Afraid</span>
                    </button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
