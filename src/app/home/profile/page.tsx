"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const games = [
  "Flappy Brace",
  "Bubble Brace",
  "Gegssend Go",
  "Brace Invaders",
  "Gabrer Gravity",
  "Brace Mountain",
  "Gabrer Gang",
  "Crush & Brace",
  "Chronicles of Chron",
  "The Pits II",
];

const regions = [
  "North America",
  "South America",
  "Europe",
  "Asia",
  "Africa",
  "Oceania",
  "Antarctica",
];

const emojis = ["😀", "😎", "🔥", "🎮", "💯", "🤖", "🥳", "😴", "😇", "😈"];

// Mock friends feed data
const friendsFeed = [
  {
    name: "Alice",
    mood: "🔥",
    activity: "Playing Flappy Brace",
    challenge: "Challenged you to beat 1200 points!",
    time: "2m ago",
  },
  {
    name: "Bob",
    mood: "😎",
    activity: "Watching Twitch stream",
    challenge: "Sent you a friend request",
    time: "10m ago",
  },
  {
    name: "Charlie",
    mood: "🎮",
    activity: "Just set a new high score in Bubble Brace!",
    challenge: "Wants to co-op in Brace Invaders",
    time: "30m ago",
  },
];

export default function ProfilePage() {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [selectedGame, setSelectedGame] = useState(games[0]);
  const [statusEmoji, setStatusEmoji] = useState(emojis[0]);
  const [username, setUsername] = useState("Display Name");
  const [profilePicture, setProfilePicture] = useState("/default-profile.png");
  const [bannerImage, setBannerImage] = useState("/default-banner.jpg");
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [aboutMe, setAboutMe] = useState("Tell us about yourself...");
  const [tribe, setTribe] = useState("");
  const [socialLinks, setSocialLinks] = useState({
    twitter: "",
    discord: "",
    twitch: "",
    github: ""
  });
  const [statusMessage, setStatusMessage] = useState("");

  const handleProfilePictureUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) return;
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBannerUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditMode) return;
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setBannerImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUsernameSave = () => {
    setIsEditingUsername(false);
  };

  const handleSocialLinkChange = (field: string, value: string) => {
    setSocialLinks(prev => ({ ...prev, [field]: value }));
  };

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode) {
      setIsEditingUsername(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black max-w-full">
      <div className="max-w-4xl mx-auto py-12 px-4">
                 {/* Banner & Profile Pic */}
         <div className="relative mb-16 flex flex-col items-center">
           <div className="h-40 w-full rounded-2xl bg-gradient-to-r from-blue-900 via-blue-700 to-blue-400 flex items-end justify-center overflow-hidden relative group">
             {/* Banner Image */}
             <Image src={bannerImage} alt="Banner" width={1200} height={200} className="object-cover w-full h-40 opacity-80" />
                           {/* Banner Upload Overlay */}
              {isEditMode && (
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                    Upload Banner
                    <input type="file" accept="image/*" onChange={handleBannerUpload} className="hidden" />
                  </label>
                </div>
              )}
           </div>
           <div className="absolute left-1/2 -bottom-12 transform -translate-x-1/2 group">
             <div className="rounded-full border-4 border-white shadow-xl bg-black p-1 relative">
               <Image src={profilePicture} alt="Profile" width={96} height={96} className="rounded-full object-cover w-24 h-24" />
                               {/* Profile Picture Upload Overlay */}
                {isEditMode && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full flex items-center justify-center">
                    <label className="cursor-pointer bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs font-semibold transition-colors">
                      Upload
                      <input type="file" accept="image/*" onChange={handleProfilePictureUpload} className="hidden" />
                    </label>
                  </div>
                )}
             </div>
           </div>
         </div>
        {/* Profile Info Card (centered) */}
        <div className="bg-black/80 rounded-2xl shadow-2xl p-8 pt-16 mt-4 text-white relative flex flex-col items-center max-w-2xl mx-auto neon-frame">
                     <div className="flex items-center gap-2 mb-1">
             {isEditMode ? (
               <input
                 type="text"
                 value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 className="text-3xl font-extrabold text-center bg-transparent border-b-2 border-red-500 focus:outline-none focus:border-red-400"
                 autoFocus
               />
             ) : (
               <h2 className="text-3xl font-extrabold text-center">{username}</h2>
             )}
           </div>
          
          <div className="text-sm text-gray-400 mt-2 text-center">Date Joined: <span className="font-mono">Jan 1, 2024</span></div>
          <div className="flex flex-col md:flex-row gap-6 mt-6 w-full">
                         <div className="flex-1">
               <label className="block text-gray-300 mb-1">About Me</label>
               {isEditMode ? (
                 <textarea 
                   className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white min-h-[80px]" 
                   value={aboutMe}
                   onChange={(e) => setAboutMe(e.target.value)}
                   placeholder="Tell us about yourself..." 
                 />
               ) : (
                 <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white min-h-[80px] flex items-center">
                   {aboutMe === "Tell us about yourself..." ? (
                     <span className="text-gray-500">{aboutMe}</span>
                   ) : (
                     aboutMe
                   )}
                 </div>
               )}
             </div>
             <div className="flex-1">
               <label className="block text-gray-300 mb-1">Favorite Game</label>
               {isEditMode ? (
                 <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" value={selectedGame} onChange={e => setSelectedGame(e.target.value)}>
                   {games.map(game => <option key={game}>{game}</option>)}
                 </select>
               ) : (
                 <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white flex items-center">
                   {selectedGame}
                 </div>
               )}
             </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-6 w-full">
                         <div className="flex-1">
               <label className="block text-gray-300 mb-1">Location</label>
               {isEditMode ? (
                 <select className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)}>
                   {regions.map(region => <option key={region}>{region}</option>)}
                 </select>
               ) : (
                 <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white flex items-center">
                   {selectedRegion}
                 </div>
               )}
             </div>
             <div className="flex-1">
               <label className="block text-gray-300 mb-1">Tribe <span className="text-xs text-gray-400">(with what community are you associated?)</span></label>
               {isEditMode ? (
                 <input 
                   className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" 
                   value={tribe}
                   onChange={(e) => setTribe(e.target.value)}
                   placeholder="Enter your tribe/community" 
                 />
               ) : (
                 <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white flex items-center">
                   {tribe || <span className="text-gray-500">Enter your tribe/community</span>}
                 </div>
               )}
             </div>
          </div>
                     <div className="mb-0 mt-6 w-full">
             <label className="block text-gray-300 mb-2 text-lg">Social Links</label>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {isEditMode ? (
                 <>
                   <input 
                     className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" 
                     value={socialLinks.twitter}
                     onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                     placeholder="Twitter/X (required)" 
                     required 
                   />
                   <input 
                     className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" 
                     value={socialLinks.discord}
                     onChange={(e) => handleSocialLinkChange('discord', e.target.value)}
                     placeholder="Discord Handle" 
                   />
                   <input 
                     className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" 
                     value={socialLinks.twitch}
                     onChange={(e) => handleSocialLinkChange('twitch', e.target.value)}
                     placeholder="Twitch / YouTube / Kick" 
                   />
                   <input 
                     className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" 
                     value={socialLinks.github}
                     onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                     placeholder="Github" 
                   />
                 </>
               ) : (
                 <>
                   <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white flex items-center">
                     {socialLinks.twitter || <span className="text-gray-500">Twitter/X (required)</span>}
                   </div>
                   <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white flex items-center">
                     {socialLinks.discord || <span className="text-gray-500">Discord Handle</span>}
                   </div>
                   <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white flex items-center">
                     {socialLinks.twitch || <span className="text-gray-500">Twitch / YouTube / Kick</span>}
                   </div>
                   <div className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white flex items-center">
                     {socialLinks.github || <span className="text-gray-500">Github</span>}
                   </div>
                 </>
               )}
             </div>
           </div>
           {/* Edit Button - Inside Profile Box */}
           <div className="mt-6 flex justify-center">
             <button
               onClick={toggleEditMode}
               className={`px-3 py-1.5 rounded-full text-sm font-semibold text-white transition-all duration-300 shadow-lg ${
                 isEditMode 
                   ? 'bg-green-600 hover:bg-green-700 shadow-green-500/50' 
                   : 'bg-red-600 hover:bg-red-700 shadow-red-500/50'
               }`}
             >
               {isEditMode ? 'Save' : 'Edit Profile'}
             </button>
           </div>
        </div>
                 {/* Status/Mood Box */}
         <div className="flex flex-col md:flex-row gap-6 mt-8 mb-8">
           <div className="flex-1 bg-black/80 rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center neon-frame">
             <label className="block text-gray-300 mb-1">Status / Mood</label>
                           <div className="flex gap-2 items-center w-full justify-center">
                <select className="bg-gray-900 border border-gray-700 rounded-lg px-2 py-1 text-xl" value={statusEmoji} onChange={e => setStatusEmoji(e.target.value)}>
                  {emojis.map(e => <option key={e}>{e}</option>)}
                </select>
                <input 
                  className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white" 
                  value={statusMessage}
                  onChange={(e) => setStatusMessage(e.target.value)}
                  placeholder="What's your status?" 
                />
              </div>
           </div>
         </div>
        {/* Social Feed & Game Tracker Side by Side */}
        <div className="flex flex-col lg:flex-row gap-8 mt-2">
          {/* Social Section */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
                         <div className="bg-black/80 rounded-2xl shadow-2xl p-6 text-white neon-frame">
               <h3 className="text-2xl font-bold mb-2 text-center">Social</h3>
               {/* Followers/Following Box */}
               <div className="bg-black/80 rounded-2xl shadow-2xl p-4 mb-4 flex flex-col items-center justify-center neon-frame">
                 <div className="flex gap-6 justify-center w-full">
                   <div className="bg-gray-800 rounded-lg p-4 text-center min-w-[100px]">
                     <div className="text-lg font-bold">123</div>
                     <div className="text-gray-400 text-xs">Followers</div>
                   </div>
                   <div className="bg-gray-800 rounded-lg p-4 text-center min-w-[100px]">
                     <div className="text-lg font-bold">456</div>
                     <div className="text-gray-400 text-xs">Following</div>
                   </div>
                 </div>
               </div>
               <div className="flex flex-col md:flex-row gap-6">
                {/* Friends Feed */}
                <div className="flex-1">
                                     <div className="mb-2 text-gray-300 font-semibold text-center">Friends Feed</div>
                  <div className="flex flex-col gap-3">
                    {friendsFeed.map((friend, i) => (
                      <div key={i} className="bg-gray-800 rounded-lg p-4 flex items-center gap-4 shadow">
                        <div className="flex flex-col items-center justify-center mr-2">
                          <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center text-2xl font-bold text-white border-2 border-blue-400">{friend.name[0]}</div>
                          <span className="text-xl mt-1">{friend.mood}</span>
                        </div>
                        <div className="flex-1">
                          <div className="font-bold text-white">{friend.name}</div>
                          <div className="text-gray-300 text-sm">{friend.activity}</div>
                          <div className="text-blue-400 text-xs mt-1">{friend.challenge}</div>
                        </div>
                        <div className="text-xs text-gray-400 ml-2 whitespace-nowrap">{friend.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Game Tracker */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <div className="bg-black/80 rounded-2xl shadow-2xl p-6 text-white neon-frame">
                             <h3 className="text-2xl font-bold mb-2 text-center">Game Tracker</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-gray-400">Game</th>
                      <th className="px-4 py-2 text-left text-gray-400">High Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {games.map(game => (
                      <tr key={game} className="border-b border-gray-800 last:border-0">
                        <td className="px-4 py-2 font-semibold">{game}</td>
                        <td className="px-4 py-2">0</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
                 </div>
               </div>
      </div>
    );
  } 