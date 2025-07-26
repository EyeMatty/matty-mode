import Link from "next/link";

// Add graffiti font import to the head (for Google Fonts 'Permanent Marker')
if (typeof window !== 'undefined') {
  const id = 'google-font-permanent-marker';
  if (!document.getElementById(id)) {
    const link = document.createElement('link');
    link.id = id;
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap';
    document.head.appendChild(link);
  }
}

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
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Subtle animated background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="w-full h-full opacity-30 animate-pulse bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-transparent to-transparent"></div>
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <h1 className="mb-8 tracking-widest drop-shadow-lg select-none flex gap-1 justify-center">
          {ransomLetters.map((item, i) => (
            <span
              key={i}
              className={`inline-block font-extrabold ${item.c} ${item.r} ${item.s} px-1 py-0 bg-white/10 rounded shadow-lg`}
              style={{ fontFamily: 'monospace, sans-serif' }}
            >
              {item.l}
            </span>
          ))}
        </h1>
        <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-xl select-none" style={{letterSpacing: '0.1em'}}>A portal to the unknown. Are you ready to play?</p>
        <Link href="/home">
          <button
            className="px-10 py-4 bg-gradient-to-r from-red-700 to-red-500 text-black text-2xl font-semibold rounded-full shadow-lg hover:scale-105 hover:from-red-800 hover:to-red-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-500 animate-bounce"
            style={{ fontFamily: 'Permanent Marker, "Comic Sans MS", cursive, sans-serif' }}
          >
            Enter
          </button>
        </Link>
      </div>
    </div>
  );
}
