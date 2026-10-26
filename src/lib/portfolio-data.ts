export const EMAIL = "hasanrojin847@gmail.com";

export const PROFILE = {
  name: "Sayadi Hasan Rojin",
  shortName: "ROJIN",
  role: "Mechatronics Engineer, Roblox Developer & Hardware/Maker Enthusiast",
  tagline:
    "Bridging the gap between digital code and physical hardware — I bring imagination to life through immersive virtual worlds, custom code, and interactive experiences.",
  email: EMAIL,
};

export interface SocialLink {
  label: string;
  handle: string;
  url: string;
  kind: "youtube";
}

export const SOCIALS: SocialLink[] = [
  {
    label: "RojiN GaminG",
    handle: "@rojingaming",
    url: "https://youtube.com/@rojingaming.?si=VE_tGWhLXNPctvlA",
    kind: "youtube",
  },
  {
    label: "BARCODE",
    handle: "@barcode_bd",
    url: "https://youtube.com/@barcode_bd?si=EULze7jYIKtyH7R1",
    kind: "youtube",
  },
];

/* ------------------------------------------------------------------ */
/* 3D Models — real files shipped in /public/models (optimized WebP)   */
/* ------------------------------------------------------------------ */

export interface ModelEntry {
  id: string;
  name: string;
  file: string;
  tag: string;
  description: string;
  verts: number;
  materials: number;
  textures: number;
  size: string;
}

export const MODELS: ModelEntry[] = [
  {
    id: "apple",
    name: "Apple",
    file: "/models/apple.glb",
    tag: "Prop",
    description:
      "A clean, game-ready prop study — proof that even the simplest object deserves proper topology and materials.",
    verts: 1325,
    materials: 3,
    textures: 0,
    size: "44 KB",
  },
  {
    id: "banch",
    name: "Bench",
    file: "/models/banch.glb",
    tag: "Prop",
    description:
      "A low-poly bench asset, textured and optimized for real-time engines.",
    verts: 192,
    materials: 1,
    textures: 3,
    size: "175 KB",
  },
  {
    id: "coffee",
    name: "Coffee",
    file: "/models/coffee.glb",
    tag: "Prop",
    description:
      "A cozy coffee prop with hand-crafted texturing — small details that bring scenes to life.",
    verts: 419,
    materials: 2,
    textures: 1,
    size: "61 KB",
  },
  {
    id: "ficemikete",
    name: "Ficemikete",
    file: "/models/ficemikete.glb",
    tag: "Environment",
    description:
      "A detailed multi-part scene asset with 12 materials and 20 baked textures.",
    verts: 10951,
    materials: 12,
    textures: 21,
    size: "1.6 MB",
  },
  {
    id: "leaderboard",
    name: "Leaderboard",
    file: "/models/leaderboard.glb",
    tag: "Game Asset",
    description:
      "An in-game leaderboard UI model built for Roblox experiences — function meeting form.",
    verts: 398,
    materials: 4,
    textures: 6,
    size: "494 KB",
  },
  {
    id: "mailbox",
    name: "Mailbox",
    file: "/models/mailbox.glb",
    tag: "Prop",
    description:
      "A hand-painted mailbox with 9 materials across 20 meshes, ready to drop into any street scene.",
    verts: 2737,
    materials: 9,
    textures: 7,
    size: "317 KB",
  },
  {
    id: "old-bed",
    name: "Old Bed",
    file: "/models/old-bed.glb",
    tag: "Prop",
    description:
      "A vintage bed asset with aged, story-driven texturing — character in every surface.",
    verts: 297,
    materials: 2,
    textures: 6,
    size: "548 KB",
  },
  {
    id: "pata",
    name: "Pata",
    file: "/models/pata.glb",
    tag: "Prop",
    description:
      "A traditional Bengali low wooden stool — everyday heritage, modeled and hand-textured for real-time use.",
    verts: 154,
    materials: 1,
    textures: 1,
    size: "69 KB",
  },
  {
    id: "pira",
    name: "Pira",
    file: "/models/pira.glb",
    tag: "Prop",
    description:
      "A classic four-legged Bengali seating stool — a traditional household piece, low-poly and game-ready.",
    verts: 156,
    materials: 1,
    textures: 3,
    size: "176 KB",
  },
  {
    id: "shat-gombuj-masjid",
    name: "Shat Gombuj Masjid",
    file: "/models/shat-gombuj-masjid.glb",
    tag: "Heritage",
    description:
      "A tribute to the historic Sixty Dome Mosque of Bagerhat — heritage architecture rebuilt in 3D, brick by brick.",
    verts: 9126,
    materials: 12,
    textures: 28,
    size: "2.8 MB",
  },
  {
    id: "tea-stall",
    name: "Tea Stall",
    file: "/models/tea-stall.glb",
    tag: "Environment",
    description:
      "A full street-side tea stall scene — 45,057 vertices and 53 hand-painted textures of everyday Bengal.",
    verts: 45057,
    materials: 22,
    textures: 58,
    size: "5.8 MB",
  },
  {
    id: "vikkhar-thali",
    name: "Vikkhar Thali",
    file: "/models/vikkhar-thali.glb",
    tag: "Heritage",
    description:
      "A traditional alms bowl with coins — a detailed cultural artifact, low-poly and game-ready.",
    verts: 1456,
    materials: 5,
    textures: 11,
    size: "1.9 MB",
  },
  /* ----- Batch 2 — new collection additions ----- */
  {
    id: "bottle",
    name: "Bottle",
    file: "/models/bottle.glb",
    tag: "Prop",
    description:
      "A hand-painted bottle prop with clean topology and a full PBR texture set.",
    verts: 2334,
    materials: 2,
    textures: 4,
    size: "285 KB",
  },
  {
    id: "lantern-post",
    name: "Lantern Post",
    file: "/models/lantern-post.glb",
    tag: "Prop",
    description:
      "A stylized lantern post — just 541 vertices, proving tiny assets can still carry character.",
    verts: 541,
    materials: 1,
    textures: 3,
    size: "171 KB",
  },
  {
    id: "jorna",
    name: "Jorna",
    file: "/models/jorna.glb",
    tag: "Heritage",
    description:
      "A circular stone monument with tiered platforms and glowing accents — 25 hand-modeled parts.",
    verts: 2609,
    materials: 2,
    textures: 6,
    size: "446 KB",
  },
  {
    id: "bridge",
    name: "Bridge",
    file: "/models/bridge.glb",
    tag: "Environment",
    description:
      "A modular bridge asset with 16 mesh parts and a clean four-material setup.",
    verts: 2624,
    materials: 4,
    textures: 9,
    size: "776 KB",
  },
  {
    id: "bridge-pro",
    name: "Bridge Pro",
    file: "/models/bridge-pro.glb",
    tag: "Environment",
    description:
      "The upgraded bridge variant — more mesh parts, richer materials, and a full texture set.",
    verts: 3136,
    materials: 7,
    textures: 19,
    size: "2.6 MB",
  },
  {
    id: "nouka",
    name: "Nouka",
    file: "/models/nouka.glb",
    tag: "Heritage",
    description:
      "A traditional Bengali boat (nouka) — 22 hand-modeled parts bringing river life to 3D.",
    verts: 4560,
    materials: 2,
    textures: 6,
    size: "366 KB",
  },
  {
    id: "police-station",
    name: "Police Station",
    file: "/models/police-station.glb",
    tag: "Environment",
    description:
      "A full police-station building with 37 mesh parts — a complete game-ready environment.",
    verts: 5424,
    materials: 2,
    textures: 6,
    size: "606 KB",
  },
  {
    id: "birj-bridge",
    name: "Birj Bridge",
    file: "/models/birj-bridge.glb",
    tag: "Environment",
    description:
      "A second arched bridge design — pillar-supported walkway with clean, baked materials.",
    verts: 2804,
    materials: 4,
    textures: 9,
    size: "1.1 MB",
  },
  {
    id: "dlna",
    name: "Dolna",
    file: "/models/dlna.glb",
    tag: "Heritage",
    description:
      "A traditional Bengali garden swing (dolna) — A-frame structure with a bench and floral details.",
    verts: 5508,
    materials: 4,
    textures: 10,
    size: "1.0 MB",
  },
  {
    id: "dj-pro",
    name: "DJ Pro",
    file: "/models/dj-pro.glb",
    tag: "Prop",
    description:
      "The most detailed prop in the collection — a multi-part DJ rig with 22 baked textures.",
    verts: 9541,
    materials: 8,
    textures: 22,
    size: "967 KB",
  },
];

/* ------------------------------------------------------------------ */
/* Roblox Games — from game-details.txt                                */
/* ------------------------------------------------------------------ */

export interface GameEntry {
  name: string;
  link: string;
  image: string;
  tagline: string;
  index: string;
}

export const GAMES: GameEntry[] = [
  {
    name: "Ice water || Borof pani",
    link: "https://www.roblox.com/games/90827482885651/Ice-water-Borof-pani#store",
    image: "/games/ice-water-borof-pani.png",
    tagline: "Splash into a cool, refreshing multiplayer experience.",
    index: "01",
  },
  {
    name: "Bangla Tower",
    link: "https://www.roblox.com/games/130424560600245/Bangla-Tower",
    image: "/games/bangla-tower.png",
    tagline: "Rise through the floors of this towering challenge.",
    index: "02",
  },
  {
    name: "Mega Easy Parkour Obby",
    link: "https://www.roblox.com/games/97074951725232/Mega-Easy-Parkour-Obby",
    image: "/games/mega-easy-parkour-obby.png",
    tagline: "A smooth, beginner-friendly obby with satisfying jumps.",
    index: "03",
  },
  {
    name: "The hangout Valley (THV)",
    link: "https://www.roblox.com/games/139001729337254/The-hangout-Valley",
    image: "/games/the-hangout-valley.png",
    tagline: "A cozy social valley to hang out with friends.",
    index: "04",
  },
];

/* ------------------------------------------------------------------ */
/* Skills — EXACT list provided by the owner. Nothing else.            */
/* ------------------------------------------------------------------ */

export interface SkillCategory {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
  icon: "cad" | "electronics" | "game" | "modeling" | "video";
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "cad",
    title: "CAD/CAM & Mechanical Design",
    blurb: "From shop drawings to chips on the table.",
    icon: "cad",
    skills: [
      "AutoCAD",
      "SolidWorks",
      "CNC Machining (GRBL firmware & G-code programming)",
      "Custom DIY 3D Printer building & calibration",
    ],
  },
  {
    id: "electronics",
    title: "Electronics & PCB Design",
    blurb: "Circuits designed, wired, and flashed by hand.",
    icon: "electronics",
    skills: ["EasyEDA", "Microcontroller Programming (Arduino, ESP32)"],
  },
  {
    id: "game",
    title: "Game Development & Software",
    blurb: "Shipping playable worlds and the code behind them.",
    icon: "game",
    skills: ["Roblox Studio", "Lua", "C++", "C#", "C"],
  },
  {
    id: "modeling",
    title: "3D Modeling & Texturing",
    blurb: "Assets built, sculpted, and painted for real-time.",
    icon: "modeling",
    skills: ["Blender", "Adobe Substance Painter"],
  },
  {
    id: "video",
    title: "Video Editing",
    blurb: "Cutting gameplay and stories into watchable moments.",
    icon: "video",
    skills: ["Adobe Premiere Pro", "DaVinci Resolve"],
  },
];
