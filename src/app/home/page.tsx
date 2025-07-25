import Link from "next/link";
import { useState } from "react";

const games = [
  { title: "Flappy Brace", slug: "game-one", clip: "/game-clips/flappy-brace.mp4" },
  { title: "Bubble Brace", slug: "game-two", clip: "/game-clips/game-two.mp4" },
  { title: "Gegssend Go", slug: "game-three", clip: "/game-clips/game-three.mp4" },
  { title: "Brace Invaders", slug: "game-four", clip: "/game-clips/game-four.mp4" },
  { title: "Gabrer Gravity", slug: "game-five", clip: "/game-clips/game-five.mp4" },
  { title: "Brace Mountain", slug: "game-six", clip: "/game-clips/game-six.mp4" },
  { title: "Gabrer Gang", slug: "game-seven", clip: "/game-clips/game-seven.mp4" },
  { title: "Crush & Brace", slug: "game-eight", clip: "/game-clips/game-eight.mp4" },
  { title: "Chronicles of Chron", slug: "game-nine", clip: "/game-clips/game-nine.mp4" },
  { title: "The Pits II", slug: "game-ten", clip: "/game-clips/game-ten.mp4" },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <nav className="w-56 bg-black/60 border-r border-gray-800 flex flex-col py-8 px-4 gap-4 shadow-2xl z-20">
        {/* Home Button */}
        <div className="mb-4">
          <Link href="/home" className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-lg shadow hover:from-red-700 hover:to-red-900 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" /></svg>
            Home
          </Link>
        </div>
        {/* Mini Games Dropdown */}
        <div className="mb-8 group relative">
          <button className="w-full flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-700 to-red-500 text-white font-bold rounded-lg shadow hover:from-red-800 hover:to-red-600 transition-all">
            Mini Games
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <ul className="absolute left-0 w-full mt-2 ml-0 space-y-1 bg-black/90 rounded-lg shadow-lg border border-gray-800 opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto pointer-events-none transition-opacity duration-200 z-30">
            {games.map((game) => (
              <li key={game.slug}>
                <Link href={`/home/${game.slug}`} className="block px-3 py-2 text-gray-200 hover:text-red-400 transition-colors rounded">
                  {game.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-10 py-6 border-b border-gray-800 bg-black/40 shadow-lg">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-widest text-white drop-shadow-lg select-none" style={{letterSpacing: '0.1em'}}>Welcome to the mini game hub</h1>
          <button className="rounded-full bg-gradient-to-r from-gray-700 to-gray-900 p-2 shadow-lg hover:from-red-700 hover:to-red-900 transition-all">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M6 20c0-2.2 3.6-3.5 6-3.5s6 1.3 6 3.5" /></svg>
          </button>
        </header>
        {/* Profile/Guest Buttons */}
        <div className="flex justify-center gap-8 mt-8 mb-8">
          <button className="px-8 py-3 bg-gradient-to-r from-red-700 to-red-500 text-white text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:from-red-800 hover:to-red-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500">
            Create a Profile
          </button>
          <button className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white text-lg font-bold rounded-full shadow-lg hover:scale-105 hover:from-gray-800 hover:to-black transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500">
            Play as Guest
          </button>
        </div>
        {/* Game Tiles Grid */}
        <main className="flex-1 p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 bg-gradient-to-br from-black/80 via-gray-900/80 to-gray-800/80">
          {games.map((game, idx) => (
            <div key={game.slug} className="bg-black/60 rounded-xl shadow-2xl flex flex-col items-center p-4 hover:scale-105 transition-transform border border-gray-800 relative group">
              {/* Game video clip */}
              <div className="w-full h-40 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 rounded-lg flex items-center justify-center mb-4 overflow-hidden relative">
                <video
                  src={game.clip}
                  width={320}
                  height={180}
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="rounded-lg shadow-lg object-cover w-full h-40"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-red-900/20 transition-all"></div>
              </div>
              <Link href={`/home/${game.slug}`} className="mt-2 text-lg font-bold text-red-400 hover:underline tracking-wide text-center">
                {game.title}
              </Link>
            </div>
          ))}
        </main>
      </div>
    </div>
  );
} 