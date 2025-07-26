"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const games = [
  { title: "Flappy Brace", slug: "game-one", clip: "/game-clips/flappy-brace.mp4" },
  { title: "Bubble Brace", slug: "game-two", clip: "/game-clips/bubble-brace.mp4" },
  { title: "Gegssend Go", slug: "game-three", clip: "/game-clips/gegssend-go.mp4" },
  { title: "Brace Invaders", slug: "game-four", clip: "/game-clips/brace-invaders.mp4" },
  { title: "Gabrer Gravity", slug: "game-five", clip: "/game-clips/gabrer-gravity.mp4" },
  { title: "Brace Mountain", slug: "game-six", clip: "/game-clips/brace-mountain.mp4" },
  { title: "Gabrer Gang", slug: "game-seven", clip: "/game-clips/gabrer-gang.mp4" },
  { title: "Crush & Brace", slug: "game-eight", clip: "/game-clips/crush-brace.mp4" },
  { title: "Chronicles of Chron", slug: "game-nine", clip: "/game-clips/chronicls-of-chron.mp4" },
  { title: "The Pits II", slug: "game-ten", clip: "/game-clips/game-ten.mp4" },
];

export default function HomePage() {
  const router = useRouter();
  const [explodingTile, setExplodingTile] = useState<string | null>(null);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const handleTileClick = (gameSlug: string) => {
    setExplodingTile(gameSlug);
    
    // Start collapse animation
    setTimeout(() => {
      setExplodingTile(null);
      setNavigatingTo(gameSlug);
    }, 800); // Total animation duration
  };

  useEffect(() => {
    if (navigatingTo) {
      router.push(`/home/${navigatingTo}`);
    }
  }, [navigatingTo, router]);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
                          {/* Epic Header */}
                     <header className="epic-header flex items-center justify-center px-10 py-12 border-b border-gray-800 shadow-2xl header-glow relative">
                           {/* Logo in top left */}
                             <div className="absolute left-10 top-4 z-10">
                                 <div className="flex items-center">
                   {/* Logo only */}
                   <div className="w-32 h-32 relative">
                     <Image
                       src="/bg-logo.png"
                       alt="Brace Gaming Logo"
                       width={128}
                       height={128}
                       className="object-contain"
                       priority
                     />
                   </div>
                 </div>
              </div>
             
             <div className="flex flex-col items-center relative" style={{ marginLeft: 'calc(6rem + 2rem)' }}>
             {/* Floating Particles */}
             {[...Array(20)].map((_, i) => (
               <div
                 key={`particle-${i}`}
                 className="particle"
                 style={{
                   left: `${Math.random() * 100}%`,
                   '--delay': i,
                 } as React.CSSProperties}
               />
             ))}
             
             {/* Sparkles */}
             {[...Array(15)].map((_, i) => (
               <div
                 key={`sparkle-${i}`}
                 className="sparkle"
                 style={{
                   left: `${Math.random() * 100}%`,
                   top: `${Math.random() * 100}%`,
                   '--delay': i,
                 } as React.CSSProperties}
               />
             ))}
             
                           <h1 className="epic-title text-5xl md:text-7xl font-light tracking-widest text-red-500 select-none text-center leading-tight" style={{
                letterSpacing: '0.15em',
                fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
              }}>
                WELCOME TO<br />
                THE BRACE GAMING HUB
              </h1>
             
             {/* Subtitle with glow effect */}
             <div className="mt-4 text-center">
                               <p className="text-lg md:text-xl text-red-400 font-semibold tracking-wide opacity-80" style={{
                  textShadow: '0 0 10px rgba(255, 23, 68, 0.5)',
                  animation: 'titleGlitch 4s ease-in-out infinite'
                }}>
                 Enter the Ultimate Gaming Experience
               </p>
             </div>
                       </div>
            <Link href="/home/profile" aria-label="Profile" className="absolute right-10 top-1/2 transform -translate-y-1/2">
              <button className="profile-glow-btn rounded-full bg-gradient-to-br from-red-900 to-red-700 p-2 shadow-lg flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-2.2 3.6-3.5 6-3.5s6 1.3 6 3.5" />
                </svg>
              </button>
            </Link>
          </header>
        
        {/* Main Layout with Sidebar */}
        <div className="flex flex-1">
          {/* Collapsible Sidebar */}
                     <nav className="group bg-black border-r border-gray-800 flex flex-col py-4 px-2 shadow-2xl z-20 transition-all duration-300 hover:w-80 w-24 sidebar-glow">
                         {/* Home Button */}
             <div className="mb-4">
               <Link href="/home" className="relative w-full flex items-center justify-center gap-4 px-2 py-2 h-16 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold rounded-lg shadow hover:from-red-800 hover:to-red-600 transition-all nav-link-glow group-hover:justify-start group-hover:px-4">
                 <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
                 </svg>
                 <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap text-lg">Home</span>
               </Link>
             </div>
            
                         {/* New Games Button */}
             <div className="mb-4">
               <Link href="/home/new-games" className="relative w-full flex items-center justify-center gap-4 px-2 py-2 h-16 bg-gradient-to-r from-blue-700 to-blue-500 text-white font-bold rounded-lg shadow hover:from-blue-800 hover:to-blue-600 transition-all nav-link-glow group-hover:justify-start group-hover:px-4">
                 <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                 </svg>
                 <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap text-lg">New Games</span>
               </Link>
             </div>
            
                         {/* Trending Button */}
             <div className="mb-4">
               <Link href="/home/trending" className="relative w-full flex items-center justify-center gap-4 px-2 py-2 h-16 bg-gradient-to-r from-green-700 to-green-500 text-white font-bold rounded-lg shadow hover:from-green-800 hover:to-green-600 transition-all nav-link-glow group-hover:justify-start group-hover:px-4">
                 <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                 </svg>
                 <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap text-lg">Trending</span>
               </Link>
             </div>
            
                         {/* Multiplayer Button */}
             <div className="mb-4">
               <Link href="/home/multiplayer" className="relative w-full flex items-center justify-center gap-4 px-2 py-2 h-16 bg-gradient-to-r from-purple-700 to-purple-500 text-white font-bold rounded-lg shadow hover:from-purple-800 hover:to-purple-600 transition-all nav-link-glow group-hover:justify-start group-hover:px-4">
                 <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                 </svg>
                 <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap text-lg">Multiplayer</span>
               </Link>
             </div>
            
                         {/* Create Button */}
             <div className="mb-4">
               <Link href="/home/create" className="relative w-full flex items-center justify-center gap-4 px-2 py-2 h-16 bg-gradient-to-r from-yellow-700 to-yellow-500 text-white font-bold rounded-lg shadow hover:from-yellow-800 hover:to-yellow-600 transition-all nav-link-glow group-hover:justify-start group-hover:px-4">
                 <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                 </svg>
                 <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap text-lg">Create</span>
               </Link>
             </div>
            
                         {/* Mini Games Dropdown */}
             <div className="mb-8 relative">
               <button className="relative w-full flex items-center justify-center gap-4 px-2 py-2 h-16 bg-gradient-to-r from-orange-700 to-orange-500 text-white font-bold rounded-lg shadow hover:from-orange-800 hover:to-orange-600 transition-all nav-link-glow group-hover:justify-start group-hover:px-4">
                 <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
                 <span className="hidden group-hover:block transition-opacity duration-300 whitespace-nowrap text-lg">Mini Games</span>
                 <svg className="w-5 h-5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                 </svg>
               </button>
              <ul className="absolute left-full top-0 ml-2 w-48 space-y-1 bg-black/90 rounded-lg shadow-lg border border-gray-800 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200 z-30">
                {games.map((game) => (
                  <li key={game.slug}>
                    <Link href={`/home/${game.slug}`} className="block px-3 py-2 text-gray-200 hover:text-red-400 transition-colors rounded nav-link-glow">
                      {game.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          
          {/* Content Area */}
          <div className="flex-1 flex flex-col">
                                                                                                       {/* Profile/Guest Buttons */}
               <section className="w-full bg-black py-6 flex justify-center items-center gap-8">
                <div className="bg-black rounded-3xl px-8 py-8 flex justify-center items-center">
                  <button className="glow-animated-btn px-8 py-3 bg-gradient-to-r from-red-700 to-red-500 text-white text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:from-red-800 hover:to-red-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500">
                    Create a Profile
                  </button>
                </div>
                <div className="bg-black rounded-3xl px-8 py-8 flex justify-center items-center">
                  <button className="glow-animated-btn px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:from-gray-800 hover:to-black transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500">
                    Play as Guest
                  </button>
                </div>
              </section>
            
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               {/* Game Tiles Grid */}
                 <main className="flex-1 p-10 pt-0 flex flex-wrap justify-center gap-8 bg-black">
                                                               {games.map((game, idx) => (
                                                                                                                                                        <div 
                                    key={game.slug} 
                                    className={`w-64 sm:w-72 lg:w-80 xl:w-96 bg-black/60 rounded-xl shadow-2xl flex flex-col items-center p-2 pb-0 hover:scale-105 transition-transform border-2 border-gray-800 relative group neon-frame cursor-pointer ${
                                      explodingTile === game.slug ? 'tile-exploding' : ''
                                    }`}
                                    onClick={() => handleTileClick(game.slug)}
                                  >
                                                                               {/* Game video clip */}
                     <div className="w-full h-48 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg flex items-center justify-center mb-8 overflow-hidden relative">
                     <video
                       src={game.clip}
                       width={320}
                       height={180}
                       loop
                       autoPlay
                       muted
                       playsInline
                       className="rounded-lg shadow-lg object-cover w-full h-48"
                     />
                     <div className="absolute inset-0 bg-black/30 group-hover:bg-red-900/20 transition-all"></div>
                   </div>
                                                                               <div className="text-2xl font-bold text-red-400 tracking-wide text-center">
                       {game.title}
                     </div>
                 </div>
               ))}
             </main>
          </div>
        </div>
      </div>
    </div>
  );
} 