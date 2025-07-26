import { notFound } from "next/navigation";

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

export default function GamePage({ params }: { params: { slug: string } }) {
  const game = games.find(g => g.slug === params.slug);
  if (!game) return notFound();
  const buildSrc = builds[params.slug];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-widest drop-shadow-lg select-none text-center">
        {game.title}
      </h1>
      {buildSrc ? (
        <iframe
          src={buildSrc}
          width={800}
          height={600}
          className="rounded-lg shadow-lg border-0"
          allowFullScreen
          title={game.title}
        />
      ) : (
        <div className="w-[800px] h-[600px] bg-gray-800 flex items-center justify-center rounded-lg shadow-lg">
          <span className="text-gray-400 text-xl">[ WebGL build will go here ]</span>
        </div>
      )}
    </div>
  );
} 