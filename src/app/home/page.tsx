"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
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
  { title: "The Pits II", slug: "game-ten", clip: "/game-clips/the-pits.mp4" },
];

// Leaderboard data structure
const leaderboardData = [
  { game: "Flappy Brace", player: "BraceMaster", score: "2,847", rank: 1 },
  { game: "Bubble Brace", player: "PopKing", score: "1,923", rank: 1 },
  { game: "Gegssend Go", player: "SpeedDemon", score: "3,456", rank: 1 },
  { game: "Brace Invaders", player: "AlienHunter", score: "5,234", rank: 1 },
  { game: "Gabrer Gravity", player: "GravityGuru", score: "4,567", rank: 1 },
  { game: "Brace Mountain", player: "SummitSeeker", score: "8,901", rank: 1 },
  { game: "Gabrer Gang", player: "GangLeader", score: "6,789", rank: 1 },
  { game: "Crush & Brace", player: "CrusherPro", score: "7,123", rank: 1 },
  { game: "Chronicles of Chron", player: "TimeLord", score: "9,876", rank: 1 },
  { game: "The Pits II", player: "PitMaster", score: "12,345", rank: 1 },
];

export default function HomePage() {
  const router = useRouter();
  const [explodingTile, setExplodingTile] = useState<string | null>(null);
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
  const [activities, setActivities] = useState<Array<{
    id: number;
    type: 'join' | 'score' | 'win' | 'loss' | 'status';
    username: string;
    message: string;
    time: string;
    color: string;
    icon: string;
  }>>([]);

  const [chatMessages, setChatMessages] = useState<Array<{
    id: number;
    username: string;
    message: string;
    time: string;
    avatar: string;
    isOwn: boolean;
  }>>([]);

  const [newMessage, setNewMessage] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const headerRef = useRef<HTMLElement>(null);

  // Generate particle positions only on client side to prevent hydration errors
  useEffect(() => {
    const generateParticles = () => {
      const particleData = Array.from({ length: 8 }, (_, i) => ({ // Reduced from 20 to 8
        left: `${Math.random() * 100}%`,
        delay: i
      }));
      
      const sparkleData = Array.from({ length: 6 }, (_, i) => ({ // Reduced from 15 to 6
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
      const starData = Array.from({ length: 50 }, (_, i) => ({ // Reduced from 150 to 50
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
      const shootingStarData = Array.from({ length: 3 }, (_, i) => ({ // Reduced from 8 to 3
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
      const dustData = Array.from({ length: 15 }, (_, i) => ({ // Reduced from 50 to 15
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 15
      }));
      
      setSpaceDust(dustData);
    };

    generateSpaceDust();
  }, []);

  // Initialize activities
  useEffect(() => {
    const initialActivities = [
      { id: 1, type: 'join' as const, username: 'Player123', message: 'just joined the hub!', time: '2 minutes ago', color: 'bg-green-500', icon: 'user' },
      { id: 2, type: 'score' as const, username: 'GameMaster', message: 'scored 15,420 in Flappy Brace!', time: '5 minutes ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 3, type: 'win' as const, username: 'BraceChampion', message: 'won the Bubble Brace challenge!', time: '8 minutes ago', color: 'bg-yellow-500', icon: 'star' },
      { id: 4, type: 'status' as const, username: 'PixelWarrior', message: '"Just beat my high score! 🎮"', time: '12 minutes ago', color: 'bg-purple-500', icon: 'chat' },
      { id: 5, type: 'loss' as const, username: 'SpeedRunner', message: 'lost the Brace Mountain challenge', time: '15 minutes ago', color: 'bg-red-500', icon: 'warning' },
      { id: 6, type: 'join' as const, username: 'NewPlayer99', message: 'just signed up!', time: '18 minutes ago', color: 'bg-green-500', icon: 'user' },
      { id: 7, type: 'score' as const, username: 'GamingPro', message: 'scored 23,150 in Brace Invaders!', time: '22 minutes ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 8, type: 'win' as const, username: 'ArcadeKing', message: 'won the Crush & Brace challenge!', time: '25 minutes ago', color: 'bg-yellow-500', icon: 'star' },
      { id: 9, type: 'status' as const, username: 'GameMaster', message: '"This hub is absolutely amazing! 🚀"', time: '28 minutes ago', color: 'bg-purple-500', icon: 'chat' },
      { id: 10, type: 'score' as const, username: 'BraceChampion', message: 'scored 18,750 in Gabrer Gravity!', time: '32 minutes ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 11, type: 'join' as const, username: 'RetroGamer', message: 'just joined the hub!', time: '35 minutes ago', color: 'bg-green-500', icon: 'user' },
      { id: 12, type: 'loss' as const, username: 'PixelWarrior', message: 'lost the Gegssend Go challenge', time: '38 minutes ago', color: 'bg-red-500', icon: 'warning' },
      { id: 13, type: 'status' as const, username: 'SpeedRunner', message: '"Can\'t stop playing these games! 🎯"', time: '42 minutes ago', color: 'bg-purple-500', icon: 'chat' },
      { id: 14, type: 'score' as const, username: 'ArcadeKing', message: 'scored 31,200 in Brace Mountain!', time: '45 minutes ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 15, type: 'win' as const, username: 'GamingPro', message: 'won the Flappy Brace challenge!', time: '48 minutes ago', color: 'bg-yellow-500', icon: 'star' },
      { id: 16, type: 'join' as const, username: 'CyberGamer', message: 'just joined the hub!', time: '52 minutes ago', color: 'bg-green-500', icon: 'user' },
      { id: 17, type: 'score' as const, username: 'PixelWarrior', message: 'scored 27,800 in Bubble Brace!', time: '55 minutes ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 18, type: 'win' as const, username: 'SpeedRunner', message: 'won the Brace Invaders challenge!', time: '58 minutes ago', color: 'bg-yellow-500', icon: 'star' },
      { id: 19, type: 'status' as const, username: 'ArcadeKing', message: '"New personal best achieved! 🏆"', time: '1 hour ago', color: 'bg-purple-500', icon: 'chat' },
      { id: 20, type: 'loss' as const, username: 'GameMaster', message: 'lost the Gabrer Gravity challenge', time: '1 hour ago', color: 'bg-red-500', icon: 'warning' },
      { id: 21, type: 'score' as const, username: 'BraceChampion', message: 'scored 42,100 in Crush & Brace!', time: '1 hour ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 22, type: 'join' as const, username: 'NeonPlayer', message: 'just signed up!', time: '1 hour ago', color: 'bg-green-500', icon: 'user' },
      { id: 23, type: 'win' as const, username: 'RetroGamer', message: 'won the Brace Mountain challenge!', time: '1 hour ago', color: 'bg-yellow-500', icon: 'star' },
      { id: 24, type: 'status' as const, username: 'CyberGamer', message: '"This gaming hub is incredible! ⚡"', time: '1 hour ago', color: 'bg-purple-500', icon: 'chat' },
      { id: 25, type: 'score' as const, username: 'GamingPro', message: 'scored 19,850 in Gegssend Go!', time: '1 hour ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 26, type: 'loss' as const, username: 'ArcadeKing', message: 'lost the Flappy Brace challenge', time: '1 hour ago', color: 'bg-red-500', icon: 'warning' },
      { id: 27, type: 'join' as const, username: 'StarGamer', message: 'just joined the hub!', time: '1 hour ago', color: 'bg-green-500', icon: 'user' },
      { id: 28, type: 'status' as const, username: 'NeonPlayer', message: '"Addicted to these mini-games! 🎲"', time: '1 hour ago', color: 'bg-purple-500', icon: 'chat' },
      { id: 29, type: 'score' as const, username: 'PixelWarrior', message: 'scored 33,450 in The Pits II!', time: '1 hour ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 30, type: 'win' as const, username: 'StarGamer', message: 'won the Chronicles of Chron challenge!', time: '1 hour ago', color: 'bg-yellow-500', icon: 'star' },
      { id: 31, type: 'join' as const, username: 'QuantumGamer', message: 'just joined the hub!', time: '1 hour ago', color: 'bg-green-500', icon: 'user' },
      { id: 32, type: 'score' as const, username: 'CyberGamer', message: 'scored 28,900 in Gabrer Gang!', time: '1 hour ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 33, type: 'loss' as const, username: 'NeonPlayer', message: 'lost the Bubble Brace challenge', time: '1 hour ago', color: 'bg-red-500', icon: 'warning' },
      { id: 34, type: 'status' as const, username: 'QuantumGamer', message: '"These games are mind-blowing! 🌟"', time: '1 hour ago', color: 'bg-purple-500', icon: 'chat' },
      { id: 35, type: 'score' as const, username: 'StarGamer', message: 'scored 45,200 in Flappy Brace!', time: '1 hour ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 36, type: 'win' as const, username: 'PixelWarrior', message: 'won the Gabrer Gravity challenge!', time: '1 hour ago', color: 'bg-yellow-500', icon: 'star' },
      { id: 37, type: 'join' as const, username: 'ArcadeMaster', message: 'just signed up!', time: '1 hour ago', color: 'bg-green-500', icon: 'user' },
      { id: 38, type: 'status' as const, username: 'ArcadeMaster', message: '"Best gaming hub I\'ve ever seen! 🎯"', time: '1 hour ago', color: 'bg-purple-500', icon: 'chat' },
      { id: 39, type: 'score' as const, username: 'RetroGamer', message: 'scored 22,150 in Brace Invaders!', time: '1 hour ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 40, type: 'loss' as const, username: 'QuantumGamer', message: 'lost the Crush & Brace challenge', time: '1 hour ago', color: 'bg-red-500', icon: 'warning' },
      { id: 41, type: 'win' as const, username: 'ArcadeMaster', message: 'won the Gegssend Go challenge!', time: '1 hour ago', color: 'bg-yellow-500', icon: 'star' },
      { id: 42, type: 'score' as const, username: 'NeonPlayer', message: 'scored 38,750 in The Pits II!', time: '1 hour ago', color: 'bg-blue-500', icon: 'lightning' },
      { id: 43, type: 'status' as const, username: 'RetroGamer', message: '"Can\'t believe my high score! 🚀"', time: '1 hour ago', color: 'bg-purple-500', icon: 'chat' },
      { id: 44, type: 'join' as const, username: 'SpeedDemon', message: 'just joined the hub!', time: '1 hour ago', color: 'bg-green-500', icon: 'user' },
      { id: 45, type: 'score' as const, username: 'ArcadeMaster', message: 'scored 51,300 in Brace Mountain!', time: '1 hour ago', color: 'bg-blue-500', icon: 'lightning' }
    ];
    setActivities(initialActivities);
  }, []);

  // Initialize chat messages
  useEffect(() => {
    const initialChatMessages = [
      { id: 1, username: 'GameMaster', message: 'Anyone up for a Flappy Brace challenge? 🎮', time: '2:45 PM', avatar: 'GM', isOwn: false },
      { id: 2, username: 'BraceChampion', message: 'I\'m in! My high score is 15,420', time: '2:46 PM', avatar: 'BC', isOwn: false },
      { id: 3, username: 'PixelWarrior', message: 'Just beat my personal best in Bubble Brace! 🎯', time: '2:47 PM', avatar: 'PW', isOwn: false },
      { id: 4, username: 'SpeedRunner', message: 'The new games are absolutely amazing!', time: '2:48 PM', avatar: 'SR', isOwn: false },
      { id: 5, username: 'ArcadeKing', message: 'Who wants to compete in Brace Mountain?', time: '2:49 PM', avatar: 'AK', isOwn: false },
      { id: 6, username: 'CyberGamer', message: 'This hub is the best thing ever! 🚀', time: '2:50 PM', avatar: 'CG', isOwn: false },
      { id: 7, username: 'NeonPlayer', message: 'Can\'t stop playing these mini-games', time: '2:51 PM', avatar: 'NP', isOwn: false },
      { id: 8, username: 'RetroGamer', message: 'The nostalgia is real with these games', time: '2:52 PM', avatar: 'RG', isOwn: false },
      { id: 9, username: 'StarGamer', message: 'Anyone else addicted to Gabrer Gravity?', time: '2:53 PM', avatar: 'SG', isOwn: false },
      { id: 10, username: 'QuantumGamer', message: 'The leaderboards are getting intense! 🔥', time: '2:54 PM', avatar: 'QG', isOwn: false }
    ];
    setChatMessages(initialChatMessages);
  }, []);

  // Simulate live activity updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity = generateActivity();
      setActivities(prev => [newActivity, ...prev.slice(0, 44)]); // Keep 45 activities
    }, 30000); // Add new activity every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Lightspeed jump effect - reduced frequency
  useEffect(() => {
    const startLightspeedSequence = () => {
      // Initial delay before lightspeed - increased from 3s to 8s
      setTimeout(() => {
        setIsLightspeedActive(true);
        
        // Reset after lightspeed effect
        setTimeout(() => {
          setIsLightspeedActive(false);
          // Restart sequence
          startLightspeedSequence();
        }, 2000);
      }, 8000); // Increased delay to reduce frequency
    };

    startLightspeedSequence();
  }, []);

  // Character GIF rotation effect
  useEffect(() => {
    const rotateCharacters = () => {
      setLeftCharacterIndex((prev) => (prev + 1) % characterGifs.length);
      setRightCharacterIndex((prev) => (prev + 1) % characterGifs.length);
    };

    const interval = setInterval(rotateCharacters, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [characterGifs.length]);

  const handleTileClick = (gameSlug: string) => {
    setExplodingTile(gameSlug);
    setTimeout(() => {
      // Use window.location for more reliable navigation
      window.location.href = `/home/${gameSlug}`;
    }, 500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      
      const newChatMessage = {
        id: Date.now(),
        username: 'You',
        message: newMessage.trim(),
        time: timeString,
        avatar: 'YO',
        isOwn: true
      };
      
      setChatMessages(prev => [...prev, newChatMessage]);
      setNewMessage('');
      
      // Auto-scroll to bottom
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  // Auto-scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Generate random activity
  const generateActivity = () => {
    const activityTypes = [
      { type: 'join', message: 'just joined the hub!', color: 'bg-green-500', icon: 'user' },
      { type: 'score', message: 'scored {score} in {game}!', color: 'bg-blue-500', icon: 'lightning' },
      { type: 'win', message: 'won the {game} challenge!', color: 'bg-yellow-500', icon: 'star' },
      { type: 'loss', message: 'lost the {game} challenge', color: 'bg-red-500', icon: 'warning' },
      { type: 'status', message: '"{status}"', color: 'bg-purple-500', icon: 'chat' }
    ];

    const games = ['Flappy Brace', 'Bubble Brace', 'Brace Invaders', 'Brace Mountain', 'Crush & Brace'];
    const usernames = ['Player123', 'GameMaster', 'BraceChampion', 'PixelWarrior', 'SpeedRunner', 'NewPlayer99', 'GamingPro', 'ArcadeKing'];
    const statuses = ['Just beat my high score! 🎮', 'This game is amazing!', 'New personal best!', 'Can\'t stop playing!', 'Addicted to this hub!'];
    
    const randomType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
    const randomGame = games[Math.floor(Math.random() * games.length)];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    let message = randomType.message;
    if (randomType.type === 'score') {
      const score = Math.floor(Math.random() * 50000) + 1000;
      message = message.replace('{score}', score.toLocaleString()).replace('{game}', randomGame);
    } else if (randomType.type === 'win' || randomType.type === 'loss') {
      message = message.replace('{game}', randomGame);
    } else if (randomType.type === 'status') {
      message = message.replace('{status}', randomStatus);
    }

    const timeOptions = ['1 minute ago', '2 minutes ago', '3 minutes ago', '5 minutes ago', '8 minutes ago', '10 minutes ago'];
    const randomTime = timeOptions[Math.floor(Math.random() * timeOptions.length)];

    return {
      id: Date.now(),
      type: randomType.type as 'join' | 'score' | 'win' | 'loss' | 'status',
      username: randomUsername,
      message,
      time: randomTime,
      color: randomType.color,
      icon: randomType.icon
    };
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
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Main Content with Leaderboard, Game Tiles and Activity Feed */}
          <div className="flex-1 flex gap-8 p-10 bg-black">
            {/* Global Leaderboard Sidebar */}
            <aside className="w-80 bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-6">
              <h3 className="text-2xl font-bold text-yellow-500 mb-6 text-center tracking-wide" style={{
                fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
              }}>
                GLOBAL LEADERBOARD
              </h3>
              
              <div className="space-y-3 h-[40rem] overflow-y-auto activity-scrollbar">
                {leaderboardData.map((entry, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-700 leaderboard-item">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black font-bold text-sm">#{entry.rank}</span>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm text-gray-300 font-semibold">{entry.player}</div>
                          <div className="text-xs text-gray-400">{entry.game}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-yellow-400">{entry.score}</div>
                        <div className="text-xs text-gray-400">points</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
            
            {/* Game Tiles Grid */}
            <main className="flex-1 flex flex-wrap justify-center items-start gap-6">
               <div className="flex flex-wrap justify-center items-center gap-6 max-w-6xl">
                {games.map((game, idx) => (
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
            </main>
            
            {/* Activity Feed Sidebar */}
            <aside className="w-80 bg-gray-900 rounded-xl border-2 border-gray-800 shadow-2xl neon-frame p-6">
              <h3 className="text-2xl font-bold text-red-500 mb-6 text-center tracking-wide" style={{
                fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
              }}>
                LIVE ACTIVITY
              </h3>
              
              <div className="space-y-4 h-[40rem] overflow-y-auto activity-scrollbar">
                {activities.map((activity) => (
                  <div key={activity.id} className="activity-item bg-gray-800 rounded-lg p-4 border border-gray-700 neon-glow">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center`}>
                        {activity.icon === 'user' && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        )}
                        {activity.icon === 'lightning' && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        )}
                        {activity.icon === 'star' && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                        {activity.icon === 'warning' && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {activity.icon === 'chat' && (
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gray-300">
                          <span className="font-semibold text-white">{activity.username}</span> {activity.message}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-400 text-xs text-center">
                  Live updates every 30 seconds
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* Global Chat Section */}
      <section className="bg-gray-900 border-t-2 border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-cyan-500 tracking-wide neon-sign-text" style={{
              fontFamily: 'Inter, Roboto Condensed, Open Sans Condensed, sans-serif'
            }}>
              GLOBAL CHAT
            </h2>
            <p className="text-gray-400 mt-2">Connect with players from around the world</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl border-2 border-gray-700 shadow-2xl neon-frame max-w-4xl mx-auto">
            {/* Chat Header */}
            <div className="bg-gray-700 rounded-t-xl px-6 py-4 border-b border-gray-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">Live Chat</span>
                  <span className="text-gray-400 text-sm">• 127 players online</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Eyeverse Hub</span>
                  <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Chat Messages */}
            <div 
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-6 space-y-4 chat-scrollbar"
            >
              {chatMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex gap-3 ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isOwn && (
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {message.avatar}
                    </div>
                  )}
                  
                  <div className={`max-w-xs lg:max-w-md ${message.isOwn ? 'order-first' : ''}`}>
                    <div className={`rounded-lg px-4 py-2 ${
                      message.isOwn 
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white' 
                        : 'bg-gray-700 text-gray-200'
                    }`}>
                      {!message.isOwn && (
                        <div className="text-xs text-cyan-400 font-semibold mb-1">
                          {message.username}
                        </div>
                      )}
                      <div className="text-sm">{message.message}</div>
                      <div className={`text-xs mt-1 ${
                        message.isOwn ? 'text-cyan-200' : 'text-gray-400'
                      }`}>
                        {message.time}
                      </div>
                    </div>
                  </div>
                  
                  {message.isOwn && (
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {message.avatar}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="border-t border-gray-600 p-4">
              <form onSubmit={handleSendMessage} className="flex gap-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-200 placeholder-gray-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  maxLength={200}
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 neon-glow disabled:cursor-not-allowed"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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