const SPOTIFY_CLIENT_ID = "003f1c3cbbb242b8941a383e45cb9f3b";
const SPOTIFY_REDIRECT_URI = `${window.location.origin}/callback.html`;
const SPOTIFY_SCOPES = [
  "user-top-read",
  "user-library-read",
  "user-read-recently-played",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-private",
  "playlist-modify-public"
];
const SPOTIFY_API_BASE = "https://api.spotify.com/v1";
const TOKEN_STORAGE_KEY = "setflow.spotifyToken";
const LAST_PLAYLIST_KEY = "setflow.lastPlaylistUrl";

const demoLibrary = [
  { title: "Corner Store Cipher", artist: "Northside Poets", year: 1994, duration: 248, energy: 0.31, plays: 96, tags: ["old school rap", "chill", "friends", "boom bap", "rap", "hip hop"], source: ["top", "saved"], explicit: true, color: "#21a35b" },
  { title: "Velvet Loop", artist: "Juno Flex", year: 1992, duration: 221, energy: 0.24, plays: 82, tags: ["old school rap", "jazz rap", "chill", "rap", "hip hop"], source: ["top", "recent"], explicit: false, color: "#dca829" },
  { title: "Low Porch Theory", artist: "Avenue Scholars", year: 1996, duration: 254, energy: 0.38, plays: 75, tags: ["old school rap", "soul", "evening", "rap", "hip hop"], source: ["saved"], explicit: false, color: "#4f77d7" },
  { title: "Bassline Weather", artist: "Metro Sons", year: 1993, duration: 239, energy: 0.43, plays: 88, tags: ["old school rap", "boom bap", "friends", "rap", "hip hop"], source: ["top"], explicit: true, color: "#f06a4f" },
  { title: "Late Train Freestyle", artist: "Fifth Borough", year: 1995, duration: 276, energy: 0.48, plays: 67, tags: ["old school rap", "night", "chill", "rap", "hip hop"], source: ["recent", "saved"], explicit: true, color: "#7858c4" },
  { title: "Gold Chain Static", artist: "Rhyme Union", year: 1991, duration: 233, energy: 0.55, plays: 92, tags: ["old school rap", "classic", "friends", "rap", "hip hop"], source: ["top", "saved"], explicit: true, color: "#cc4a36" },
  { title: "Window Seat Drums", artist: "Vinyl District", year: 1997, duration: 215, energy: 0.27, plays: 58, tags: ["old school rap", "chill", "jazz rap", "rap", "hip hop"], source: ["saved"], explicit: false, color: "#2f8f9d" },
  { title: "Block Party Warmup", artist: "The Breakroom", year: 1990, duration: 262, energy: 0.61, plays: 86, tags: ["old school rap", "party", "friends", "rap", "hip hop"], source: ["top", "recent"], explicit: false, color: "#e0a12a" },
  { title: "Dusty Crate", artist: "Sample Council", year: 1994, duration: 246, energy: 0.35, plays: 71, tags: ["old school rap", "boom bap", "chill", "rap", "hip hop"], source: ["saved", "recent"], explicit: false, color: "#7b8652" },
  { title: "Rooftop Handshake", artist: "Harbor Kings", year: 1998, duration: 268, energy: 0.52, plays: 69, tags: ["old school rap", "evening", "friends", "rap", "hip hop"], source: ["top"], explicit: true, color: "#6d5fb8" },
  { title: "Speaker Wire", artist: "Cassette Crew", year: 1993, duration: 231, energy: 0.64, plays: 78, tags: ["old school rap", "classic", "intense", "rap", "hip hop"], source: ["top", "saved"], explicit: true, color: "#bc5c3d" },
  { title: "Sunday Smoke Break", artist: "Mellow Method", year: 1996, duration: 257, energy: 0.29, plays: 64, tags: ["old school rap", "chill", "soul", "rap", "hip hop"], source: ["saved"], explicit: false, color: "#739e68" },
  { title: "Kick Snare Supper", artist: "Analog League", year: 1992, duration: 224, energy: 0.44, plays: 53, tags: ["old school rap", "friends", "boom bap", "rap", "hip hop"], source: ["recent"], explicit: false, color: "#c9852f" },
  { title: "Sidewalk Royale", artist: "Kingston Ave", year: 1995, duration: 278, energy: 0.68, plays: 84, tags: ["old school rap", "intense", "classic", "rap", "hip hop"], source: ["top"], explicit: true, color: "#343c82" },
  { title: "Blue Hour Bars", artist: "Paper Plan Syndicate", year: 1997, duration: 242, energy: 0.41, plays: 76, tags: ["old school rap", "chill", "evening", "rap", "hip hop"], source: ["top", "saved"], explicit: false, color: "#386b9d" },
  { title: "Concrete Toast", artist: "Boombox Saints", year: 1991, duration: 252, energy: 0.72, plays: 91, tags: ["old school rap", "party", "intense", "rap", "hip hop"], source: ["top", "recent"], explicit: true, color: "#c94d45" },
  { title: "After-Dinner Scratch", artist: "Needlework", year: 1994, duration: 236, energy: 0.47, plays: 57, tags: ["old school rap", "evening", "boom bap", "rap", "hip hop"], source: ["saved"], explicit: false, color: "#a27c2d" },
  { title: "Backseat Thesis", artist: "The Quiet Ones", year: 1993, duration: 229, energy: 0.33, plays: 80, tags: ["old school rap", "jazz rap", "chill", "rap", "hip hop"], source: ["top"], explicit: false, color: "#587c96" },
  { title: "Mixtape Etiquette", artist: "Park Bench Prophets", year: 1999, duration: 261, energy: 0.58, plays: 62, tags: ["old school rap", "friends", "classic", "rap", "hip hop"], source: ["recent", "saved"], explicit: true, color: "#ae6844" },
  { title: "Final Verse Energy", artist: "Cipher State", year: 1996, duration: 288, energy: 0.79, plays: 73, tags: ["old school rap", "intense", "party", "rap", "hip hop"], source: ["top", "saved"], explicit: true, color: "#1f7853" },
  { title: "Turntable Moon", artist: "Sable Wax", year: 1995, duration: 240, energy: 0.37, plays: 44, tags: ["old school rap", "chill", "night", "rap", "hip hop"], source: ["saved"], explicit: false, color: "#515c8e" },
  { title: "Front Stoop Funk", artist: "Three Stripe Theory", year: 1992, duration: 266, energy: 0.59, plays: 70, tags: ["old school rap", "friends", "soul", "rap", "hip hop"], source: ["top"], explicit: false, color: "#c97836" },
  { title: "Crate Runner", artist: "Downtown Static", year: 1998, duration: 218, energy: 0.66, plays: 55, tags: ["old school rap", "intense", "boom bap", "rap", "hip hop"], source: ["recent"], explicit: true, color: "#965053" },
  { title: "Midnight Handclap", artist: "Loop Ritual", year: 1994, duration: 251, energy: 0.51, plays: 61, tags: ["old school rap", "evening", "friends", "rap", "hip hop"], source: ["saved", "recent"], explicit: false, color: "#4b8c73" },
  { title: "Guest List Groove", artist: "Basement Society", year: 1997, duration: 275, energy: 0.74, plays: 65, tags: ["old school rap", "party", "intense", "rap", "hip hop"], source: ["top", "saved"], explicit: true, color: "#d2564a" },
  { title: "Lamplight Cadence", artist: "South End Syntax", year: 1994, duration: 244, energy: 0.36, plays: 63, tags: ["old school rap", "chill", "boom bap", "rap", "hip hop"], source: ["top", "saved"], explicit: false, color: "#6a8d5b" },
  { title: "Crew Neck Verses", artist: "Atlas Block", year: 1996, duration: 259, energy: 0.49, plays: 59, tags: ["old school rap", "friends", "classic", "rap", "hip hop"], source: ["saved"], explicit: false, color: "#b77838" },
  { title: "Taxi Tape", artist: "Night Borough", year: 1993, duration: 237, energy: 0.42, plays: 68, tags: ["old school rap", "night", "chill", "rap", "hip hop"], source: ["top", "recent"], explicit: true, color: "#395d87" },
  { title: "Boom Room Exit", artist: "Static Heights", year: 1999, duration: 271, energy: 0.71, plays: 54, tags: ["old school rap", "party", "intense", "rap", "hip hop"], source: ["saved", "recent"], explicit: true, color: "#bc4f44" },
  { title: "One More Round", artist: "Rooftop Republic", year: 1995, duration: 252, energy: 0.62, plays: 60, tags: ["old school rap", "friends", "evening", "rap", "hip hop"], source: ["top"], explicit: false, color: "#2f7d6c" },
  { title: "Needle Drop Finale", artist: "Cipher House", year: 1997, duration: 286, energy: 0.81, plays: 48, tags: ["old school rap", "intense", "classic", "rap", "hip hop"], source: ["saved"], explicit: true, color: "#8b4c9f" },
  { title: "Amber Keys", artist: "Solstice Keys", year: 2018, duration: 232, energy: 0.28, plays: 49, tags: ["soul", "chill", "evening"], source: ["saved", "recent"], explicit: false, color: "#dca829" },
  { title: "Small Room House", artist: "Lumen Yard", year: 2021, duration: 304, energy: 0.57, plays: 31, tags: ["house", "sunset", "warm"], source: ["recent"], explicit: false, color: "#21a35b" },
  { title: "No Vocal Drift", artist: "Meridian Club", year: 2020, duration: 318, energy: 0.46, plays: 27, tags: ["house", "no vocals", "chill"], source: ["saved"], explicit: false, color: "#4f77d7" },
  { title: "Pre-Game Signal", artist: "East End Mode", year: 2023, duration: 196, energy: 0.83, plays: 43, tags: ["hip hop", "party", "friends"], source: ["recent", "top"], explicit: true, color: "#f06a4f" },
  { title: "Rain on Chrome", artist: "Greyline", year: 2019, duration: 265, energy: 0.22, plays: 51, tags: ["rainy", "soul", "jazz rap"], source: ["saved"], explicit: false, color: "#7858c4" }
];

const form = document.querySelector("#playlistForm");
const promptInput = document.querySelector("#promptInput");
const trackList = document.querySelector("#trackList");
const titleNode = document.querySelector("#playlistTitle");
const subtitleNode = document.querySelector("#playlistSubtitle");
const statDuration = document.querySelector("#statDuration");
const statTracks = document.querySelector("#statTracks");
const statEnergy = document.querySelector("#statEnergy");
const arcNode = document.querySelector(".energy-arc");
const cover = document.querySelector("#playlistCover");
const toast = document.querySelector("#toast");
const saveButton = document.querySelector("#saveButton");
const connectButton = document.querySelector("#connectButton");
const libraryStatus = document.querySelector("#libraryStatus");

let lastPrompt = promptInput.value;
let liveLibrary = [];
let activeLibrary = demoLibrary;
let currentTracks = [];
let currentIntent = null;
let currentPlaylistUrl = localStorage.getItem(LAST_PLAYLIST_KEY) || "";
let namingProfile = null;

function parsePrompt(prompt, fallbackDuration) {
  const text = prompt.toLowerCase();
  const hourMatch = text.match(/(\d+(?:\.\d+)?)\s*(h|hr|hour|hours)\b/);
  const minuteMatch = text.match(/(\d+)\s*(m|min|minute|minutes)\b/);
  let duration = Number(fallbackDuration);

  if (hourMatch) duration = Math.round(Number(hourMatch[1]) * 60);
  if (minuteMatch) duration = Number(minuteMatch[1]);

  const tags = new Set();
  const wantsRap = /rap|hip hop|boom bap|bars|cipher|\bmc\b/.test(text);
  const wantsHouse = /\bhouse\b|deep house|tech house|melodic house|afro house|organic house/.test(text);
  const wantsIntimate = /\bsex\b|sexy|sensual|intimate|bedroom|make out|after dark|late night/.test(text);
  const wantsDesertScene = /\b(desert|namibia|namibian|sahara|dune|dunes|fireplace|campfire|fire|savanna|outback)\b/.test(text);
  const wantsCooking = /\b(cooking|cook|kitchen|dinner|supper|hosting|host)\b/.test(text);
  const wantsSoftBeautiful = /\b(soft|beautiful|pretty|gentle|cozy|cosy|warm|smooth|sweet|tender|calm|cute|girls'? night|girl dinner)\b/.test(text);
  const wantsStrictSoftMood = (wantsSoftBeautiful || wantsCooking) && !wantsRap && !wantsHouse && !wantsDesertScene;
  const noNewSchool = /no new school|old school|golden era|90s|classic rap|classic hip hop/.test(text);

  if (/old school|classic rap|classic hip hop|golden era|90s|boom bap/.test(text)) tags.add("old school rap");
  if (wantsRap) {
    tags.add("rap");
    tags.add("hip hop");
  }
  if (wantsRap && noNewSchool) tags.add("old school rap");
  if (/chill|relax|low|calm|evening|friends|dinner|cooking|kitchen|laid back/.test(text)) tags.add("chill");
  if (/friend|party|pre.?game|group/.test(text)) tags.add("friends");
  if (/soul/.test(text)) tags.add("soul");
  if (/jazz/.test(text)) tags.add("jazz rap");
  if (wantsHouse) tags.add("house");
  if (wantsCooking) {
    tags.add("dinner");
    tags.add("cozy");
  }
  if (wantsSoftBeautiful) {
    tags.add("soft");
    tags.add("beautiful");
    tags.add("chill");
  }
  if (wantsIntimate) {
    tags.add("intimate");
    tags.add("chill");
  }
  if (wantsDesertScene) {
    tags.add("desert");
    tags.add("world");
    tags.add("ambient");
    tags.add("acoustic");
    tags.add("chill");
    if (/namibia|namibian|africa|african|sahara|savanna/.test(text)) tags.add("african");
    if (/fireplace|campfire|fire/.test(text)) tags.add("campfire");
  }
  if (/no vocal|instrumental/.test(text)) tags.add("no vocals");
  if (/rain/.test(text)) tags.add("rainy");

  const wantsPlayedMost = /played|plays|top|favorite|favourite|most/.test(text);
  const wantsRising = /intense|rise|rising|build|over time|peak/.test(text);
  const wantsLatePeak = /late peak|peak late|end with|finish strong|last third|final stretch/.test(text);
  const wantsSteady = /steady|consistent|same energy|background|no build|flat/.test(text);
  const timeIntent = parseTimeIntent(text);

  return {
    raw: prompt,
    text,
    duration,
    tags: [...tags],
    wantsPlayedMost,
    wantsRising,
    arc: wantsLatePeak ? "latePeak" : wantsRising ? "rising" : wantsSteady ? "steady" : "natural",
    timeIntent,
    qualityBias: /great taste|good taste|best|essential|classic taste|tasteful/.test(text),
    requiredFamilies: [
      wantsRap ? "rap" : "",
      wantsHouse ? "house" : "",
      wantsDesertScene ? "scene" : "",
      wantsStrictSoftMood ? "soft" : ""
    ].filter(Boolean),
    maxYear: noNewSchool ? 2012 : null,
    title: applyNamingStyle(buildTitle(text), namingProfile),
    subtitle: buildSubtitle(duration, tags)
  };
}

function buildTitle(text) {
  const timeIntent = parseTimeIntent(text);
  if (timeIntent?.season && timeIntent.year) return `${capitalize(timeIntent.season)} ${timeIntent.year} Replay`;
  if (timeIntent?.year) return `${timeIntent.year} Replay`;
  if (/\bsex\b|sexy|sensual|intimate|bedroom|make out|after dark|late night/.test(text) && /\bhouse\b|deep house|tech house|melodic house/.test(text)) return "After Dark House";
  if (/namibia|namibian|desert|dune|dunes|campfire|fireplace/.test(text)) return "Namib Desert Fire";
  if (/cooking|cook|kitchen|dinner|supper/.test(text) && /soft|beautiful|pretty|gentle|cozy|cosy|warm|girls'? night|girl dinner/.test(text)) return "Kitchen Glow";
  if (/pre.?game|party/.test(text)) return "Pre-Game: High Signal";
  if (/rain/.test(text)) return "Rainy Room Rotation";
  if (/house|sunset/.test(text)) return "Sunset House Drift";
  if (/old school|rap|hip hop/.test(text)) return "Chill Friends: Golden Hour";
  return "Prompted Set";
}

function buildSubtitle(duration, tags) {
  const hours = duration >= 60 ? `${Number((duration / 60).toFixed(1))}h` : `${duration}m`;
  const mainTag = buildPrimaryLabel([...tags]);
  return `${mainTag} arc for ${hours}.`;
}

function buildPrimaryLabel(tags) {
  const tagSet = new Set(tags);
  if (tagSet.has("old school rap")) return "old school rap";
  if (tagSet.has("rap")) return "rap";
  if (tagSet.has("soft")) return "soft";
  if (tagSet.has("dinner")) return "dinner";
  return tags[0] || "library";
}

function sourceMatches(track, source) {
  return source === "all" || track.source.includes(source);
}

function scoreTrack(track, intent, source, allowExplicit) {
  if (!sourceMatches(track, source)) return -1;
  if (!allowExplicit && track.explicit) return -1;
  if (!passesHardConstraints(track, intent)) return -1;

  const tagScore = intent.tags.reduce((score, tag) => (
    score + tagFitScore(track, tag)
  ), 0);
  const playScore = intent.wantsPlayedMost ? track.plays / 25 : track.plays / 75;
  const eraScore = intent.tags.includes("old school rap") && isOldSchoolRapCandidate(track) ? 1.7 : 0;
  const timeScore = scoreTimeFit(track, intent.timeIntent);
  const intimateScore = intent.tags.includes("intimate") ? scoreIntimateFit(track) : 0;
  const qualityScore = intent.qualityBias ? (track.popularity || 0) / 20 : 0;
  const trustedSoftSearchScore = intent.requiredFamilies?.includes("soft") && trustedSoftQueryMatchesTrack(track.searchQuery || "", track) ? 1.35 : 0;
  const chillPenalty = intent.tags.includes("chill") && track.energy > 0.82 ? -1.4 : 0;
  const searchPenalty = track.source.includes("search") && intent.wantsPlayedMost ? -0.55 : 0;

  return tagScore + playScore + eraScore + timeScore + intimateScore + qualityScore + trustedSoftSearchScore + chillPenalty + searchPenalty;
}

function parseTimeIntent(text) {
  const yearMatch = text.match(/\b(19[6-9]\d|20[0-2]\d)\b/);
  if (!yearMatch) return null;

  const season = /\bsummer\b/.test(text) ? "summer"
    : /\bspring\b/.test(text) ? "spring"
      : /\bautumn\b|\bfall\b/.test(text) ? "autumn"
        : /\bwinter\b/.test(text) ? "winter"
          : "";

  return {
    year: Number(yearMatch[1]),
    season,
    months: season ? seasonMonths(season) : []
  };
}

function seasonMonths(season) {
  if (season === "spring") return [2, 3, 4];
  if (season === "summer") return [5, 6, 7];
  if (season === "autumn") return [8, 9, 10];
  if (season === "winter") return [11, 0, 1];
  return [];
}

function scoreTimeFit(track, timeIntent) {
  if (!timeIntent?.year) return 0;

  let score = 0;
  const savedDateScore = scoreDateFit(track.likedAt, timeIntent);
  const playedDateScore = scoreDateFit(track.playedAt, timeIntent) * 0.75;
  const playlistDateScore = scoreDateFit(track.playlistAddedAt, timeIntent) * 0.55;

  score += Math.max(savedDateScore, playedDateScore, playlistDateScore);
  if (track.year === timeIntent.year) score += 3.2;
  if (Math.abs((track.year || 0) - timeIntent.year) === 1) score += 0.9;
  return score;
}

function scoreDateFit(dateValue, timeIntent) {
  if (!dateValue) return 0;
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime()) || date.getFullYear() !== timeIntent.year) return 0;
  if (!timeIntent.months.length) return 5;
  return timeIntent.months.includes(date.getMonth()) ? 8 : 2;
}

function capitalize(value) {
  return value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : value;
}

function inferNamingProfile(playlists) {
  const names = playlists
    .map((playlist) => playlist?.name || "")
    .map((name) => name.trim())
    .filter((name) => name.length >= 2 && !/^liked songs$/i.test(name))
    .slice(0, 80);

  if (names.length < 3) return null;

  const lowercase = names.filter((name) => name === name.toLowerCase()).length;
  const titleCase = names.filter((name) => /^[A-Z0-9][^a-z]*$/.test(name.split(/\s+/)[0]) || /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)+/.test(name)).length;
  const colon = names.filter((name) => name.includes(":")).length;
  const dash = names.filter((name) => / [-–—] /.test(name)).length;
  const avgWords = names.reduce((sum, name) => sum + name.split(/\s+/).length, 0) / names.length;

  return {
    caseStyle: lowercase / names.length > 0.55 ? "lower" : titleCase / names.length > 0.45 ? "title" : "sentence",
    separator: colon / names.length > 0.25 ? ":" : dash / names.length > 0.25 ? " - " : "",
    short: avgWords <= 3.2
  };
}

function applyNamingStyle(title, profile) {
  if (!profile) return title;

  let styled = title;
  if (profile.short) {
    styled = styled
      .replace(/\bReplay\b/i, "")
      .replace(/\bGolden Hour\b/i, "Gold")
      .replace(/\s+/g, " ")
      .trim();
  }

  if (profile.separator && !styled.includes(profile.separator.trim())) {
    styled = styled.replace(/: /, `${profile.separator} `);
  }

  if (profile.caseStyle === "lower") styled = styled.toLowerCase();
  if (profile.caseStyle === "title") styled = toTitleCase(styled);

  return styled || title;
}

function toTitleCase(value) {
  return value.replace(/\w\S*/g, (word) => (
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ));
}

function tagFitScore(track, tag) {
  if (track.tags.includes(tag)) return 2.2;
  if ((tag === "rap" || tag === "hip hop") && isRapCandidate(track)) return 1.9;
  if (tag === "old school rap" && isOldSchoolRapCandidate(track)) return 2;
  if (tag === "jazz rap" && track.tags.includes("hip hop") && track.tags.includes("jazz")) return 1.2;
  if (tag === "house" && isHouseCandidate(track)) return 2.1;
  if (tag === "intimate" && track.energy >= 0.28 && track.energy <= 0.68) return 1.3;
  if (tag === "desert" && isSceneCandidate(track)) return 2.2;
  if (tag === "african" && track.tags.some((trackTag) => /african|afro|desert blues|tuareg|world/.test(trackTag))) return 1.7;
  if (tag === "world" && track.tags.some((trackTag) => /world|african|afro|tuareg|desert blues/.test(trackTag))) return 1.5;
  if (tag === "ambient" && track.tags.some((trackTag) => /ambient|new age|drone|soundtrack|instrumental/.test(trackTag))) return 1.4;
  if (tag === "acoustic" && track.tags.some((trackTag) => /acoustic|folk|guitar|singer-songwriter|blues/.test(trackTag))) return 1.35;
  if (tag === "campfire" && track.energy < 0.58) return 1.1;
  if (tag === "soft" && isSoftBeautifulCandidate(track)) return 2.25;
  if (tag === "beautiful" && isBeautifulCandidate(track)) return 1.75;
  if (tag === "dinner" && isDinnerCandidate(track)) return 1.45;
  if (tag === "cozy" && track.energy < 0.6 && isSoftBeautifulCandidate(track)) return 1.15;
  if (tag === "chill" && track.energy < 0.45) return 0.7;
  if (tag === "friends" && track.energy > 0.48) return 0.45;
  return 0;
}

function passesHardConstraints(track, intent) {
  if (intent.requiredFamilies?.includes("rap") && !isRapCandidate(track)) return false;
  if (intent.requiredFamilies?.includes("house") && !isHouseCandidate(track)) return false;
  if (intent.requiredFamilies?.includes("scene") && !isSceneCandidate(track)) return false;
  if (intent.requiredFamilies?.includes("soft") && !isSoftBeautifulCandidate(track)) return false;
  if (intent.requiredFamilies?.includes("soft") && track.explicit && !/\b(explicit|dirty|uncensored)\b/.test(intent.text)) return false;
  if (intent.maxYear && track.year && track.year > intent.maxYear) return false;
  if (track.source.includes("search") && (track.duration < 120 || track.duration > 720)) return false;
  if (track.source.includes("search") && isLowQualitySearchResult(track)) return false;
  if (track.source.includes("search") && isGenericSearchResult(track)) return false;
  return true;
}

function isGenericSearchResult(track) {
  return /^track\s*\d+$/i.test(track.title) || /^untitled/i.test(track.title);
}

function isLowQualitySearchResult(track) {
  const text = normalizeSearchText(track);
  return /\b(fitness|workout|pilates|motivation|sleep|study|karaoke|originally performed by|tribute|cover version|easy listening|background music|restaurant background|restaurant music|music for cooking playlist|playlist music|viral media|top danza|jazz for dinner|lounge music|music lounge|chillout lounge|music cafe|house bar|vol\.?\s*\d|mix\s*20\d{2}\s*vol)\b/.test(text);
}

function normalizeSearchText(track) {
  return `${track.title} ${track.artist} ${track.tags.join(" ")}`
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function isRapCandidate(track) {
  return track.tags.some((tag) => /(^|\s)(rap|hip hop)($|\s)|boom bap|jazz rap|trap|grime/.test(tag));
}

function isHouseCandidate(track) {
  return track.tags.some((tag) => (
    /\b(deep house|tech house|melodic house|afro house|organic house|progressive house|electro house|tropical house|future house|house|garage|edm|electronic|electronica|techno)\b/.test(tag)
  ));
}

function isSceneCandidate(track) {
  const text = normalizeSearchText(track);
  const tagText = track.tags.join(" ").toLowerCase();
  if (/\b(rap|hip hop|trap|drill|r&b|dance pop|pop rap|pop|rock|metal|punk|country|disco|party|club|rave|edm)\b/.test(text)) return false;
  const strongSceneSignal = /\b(desert blues|desert|dune|namibia|namibian|sahara|african|tuareg|kora|mbira|campfire|fireplace|savanna)\b/.test(text);
  const textureGenre = /\b(world|ambient|new age|drone|instrumental|acoustic|folk|guitar|desert blues)\b/.test(tagText);
  return strongSceneSignal || textureGenre;
}

function isSoftBeautifulCandidate(track) {
  const text = normalizeSearchText(track);
  const titleText = String(track.title || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  const tagText = track.tags.join(" ").toLowerCase();
  if (track.energy > 0.7) return false;
  if (/\b(rap|hip hop|trap|drill|gangsta|metal|punk|hard rock|classic rock|album rock|country|bro-country|disco|party|club|rave|edm|techno|trance|psytrance|house|electronic|electronica|hype|anthem|dj|original mix|mix cut|vip mix|radio edit|remaster|remastered|remix)\b/.test(text)) return false;
  if (/\b(marilyn manson|21 savage|travis scott|metro boomin|warren g|kanye west|queen|die arzte|die aerzte|sefa|dr peacock|tinlicker|vintage culture|black coffee|keinemusik|cold war kids|dombresky|cafe de anatolia)\b/.test(text)) return false;
  if (/\b(energy|workout|fitness|rage|mosh|banger)\b/.test(text)) return false;

  const softGenre = /\b(soft|beautiful|gentle|cozy|cosy|warm|smooth|dream pop|bedroom pop|indie pop|neo soul|alternative r&b|r&b|soul|jazz|vocal jazz|bossa nova|singer-songwriter|acoustic|folk|ambient|downtempo|chillwave|lo-?fi|piano|lounge|quiet storm)\b/.test(tagText);
  const softText = /\b(soft|beautiful|pretty|gentle|cozy|cosy|warm|smooth|tender|calm|glow|velvet|coffee|kitchen|dinner|bossa|jazz|piano|acoustic)\b/.test(titleText);
  return softGenre || softText;
}

function isBeautifulCandidate(track) {
  const titleText = String(track.title || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
  const tagText = track.tags.join(" ").toLowerCase();
  return isSoftBeautifulCandidate(track) && (
    /\b(beautiful|pretty|gentle|tender|glow|velvet|soft|warm|calm)\b/.test(titleText)
    || /\b(dream pop|neo soul|alternative r&b|vocal jazz|bossa nova|piano|ambient|downtempo|quiet storm)\b/.test(tagText)
    || track.energy < 0.4
  );
}

function isDinnerCandidate(track) {
  const tagText = track.tags.join(" ").toLowerCase();
  return isSoftBeautifulCandidate(track) && (
    track.energy < 0.58
    || /\b(jazz|soul|neo soul|r&b|bossa nova|acoustic|singer-songwriter|downtempo|ambient|lounge)\b/.test(tagText)
  );
}

function scoreIntimateFit(track) {
  let score = 0;
  if (track.energy >= 0.3 && track.energy <= 0.62) score += 1.6;
  if (track.energy > 0.76) score -= 2.2;
  if (track.tags.includes("house")) score += 0.8;
  if (track.tags.includes("party")) score -= 0.8;
  return score;
}

function isOldSchoolRapCandidate(track) {
  return isRapCandidate(track) && track.year >= 1985 && track.year <= 2012;
}

function buildPlaylist(intent, controls, candidateLibrary = activeLibrary) {
  const targetSeconds = intent.duration * 60;
  const allowExplicit = controls.explicit;
  const primary = scoreLibrary(candidateLibrary, intent, controls.source, allowExplicit, 0);
  const secondary = scoreLibrary(candidateLibrary, intent, "all", allowExplicit, -0.45);
  const fallback = candidateLibrary
    .filter((track) => allowExplicit || !track.explicit)
    .filter((track) => passesHardConstraints(track, intent))
    .map((track) => ({ ...track, score: track.plays / 100 - 1 }));

  const candidates = uniqueByTrack([...primary, ...secondary, ...fallback])
    .sort((a, b) => b.score - a.score);

  const selected = [];
  const selectedKeys = new Set();
  const artistCounts = new Map();
  const titleThemeCounts = new Map();
  let seconds = 0;

  while (seconds < targetSeconds - 90 && selected.length < 42) {
    const pool = candidates
      .filter((track) => !selectedKeys.has(trackKey(track)))
      .filter((track) => {
        const theme = titleThemeKey(track);
        if (!theme) return true;
        const themeCap = track.source.includes("search") ? 1 : 2;
        return (titleThemeCounts.get(theme) || 0) < themeCap;
      })
      .filter((track) => {
        const repeats = artistCounts.get(track.artist) || 0;
        const artistCap = track.source.includes("search") && !isTrustedSceneArtistQuery(track.searchQuery || "") ? 2 : 3;
        return repeats < artistCap;
      })
      .map((track) => {
        const repeats = artistCounts.get(track.artist) || 0;
        const theme = titleThemeKey(track);
        const themeRepeats = theme ? titleThemeCounts.get(theme) || 0 : 0;
        const varietyPenalty = repeats * 1.25;
        const titleThemePenalty = themeRepeats * (track.source.includes("search") ? 2.4 : 1.1);
        const durationFit = seconds + track.duration > targetSeconds + 180 ? -2 : 0;
        return { ...track, pickScore: track.score + durationFit - varietyPenalty - titleThemePenalty };
      })
      .sort((a, b) => b.pickScore - a.pickScore);

    if (!pool.length) break;
    const pick = pool[0];
    selected.push(pick);
    selectedKeys.add(trackKey(pick));
    artistCounts.set(pick.artist, (artistCounts.get(pick.artist) || 0) + 1);
    const theme = titleThemeKey(pick);
    if (theme) titleThemeCounts.set(theme, (titleThemeCounts.get(theme) || 0) + 1);
    seconds += pick.duration;
  }

  return arrangeByPrompt(selected, intent);
}

function scoreLibrary(candidateLibrary, intent, source, allowExplicit, adjustment) {
  return candidateLibrary
    .map((track) => ({
      ...track,
      score: scoreTrack(track, intent, source, allowExplicit) + adjustment
    }))
    .filter((track) => track.score >= 0.8);
}

function uniqueByTrack(tracks) {
  const seen = new Set();
  return tracks.filter((track) => {
    const key = trackKey(track);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function mergeLibraries(tracks) {
  const byKey = new Map();
  tracks.forEach((track) => {
    const key = trackKey(track);
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, { ...track, source: [...new Set(track.source)], tags: [...new Set(track.tags)] });
      return;
    }
    byKey.set(key, {
      ...existing,
      uri: existing.uri || track.uri,
      spotifyUrl: existing.spotifyUrl || track.spotifyUrl,
      image: existing.image || track.image,
      likedAt: existing.likedAt || track.likedAt,
      playedAt: existing.playedAt || track.playedAt,
      playlistAddedAt: existing.playlistAddedAt || track.playlistAddedAt,
      popularity: Math.max(existing.popularity || 0, track.popularity || 0),
      plays: Math.max(existing.plays || 0, track.plays || 0),
      energy: Math.max(existing.energy || 0, track.energy || 0),
      source: [...new Set([...existing.source, ...track.source])],
      tags: [...new Set([...existing.tags, ...track.tags])]
    });
  });
  return [...byKey.values()];
}

function trackKey(track) {
  return `${normalizeKeyPart(track.artist)}::${normalizeKeyPart(track.title)}`;
}

function normalizeKeyPart(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/\[[^\]]*\]/g, "")
    .replace(/\b(remaster(ed)?|explicit|clean|radio edit|single version)\b/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function titleThemeKey(track) {
  return normalizeKeyPart(track.title)
    .split(/\s+/)
    .map(normalizeTitleThemeToken)
    .filter((token) => token.length >= 4 && /[a-z]/.test(token) && !TITLE_THEME_STOP_WORDS.has(token))
    [0] || "";
}

function normalizeTitleThemeToken(token) {
  if (/^sensual/.test(token)) return "sensual";
  return token;
}

const TITLE_THEME_STOP_WORDS = new Set([
  "original",
  "extended",
  "radio",
  "club",
  "dub",
  "rework",
  "version",
  "edit",
  "mix",
  "remix",
  "feat",
  "featuring",
  "with",
  "from",
  "the",
  "and",
  "for",
  "house",
  "deep",
  "afro",
  "melodic",
  "tech",
  "music",
  "vocal",
  "vocals",
  "instrumental"
]);

function arrangeByPrompt(tracks, intent) {
  const ordered = [...tracks];

  if (intent.arc === "steady") {
    return ordered.sort((a, b) => Math.abs(a.energy - 0.52) - Math.abs(b.energy - 0.52));
  }

  if (intent.arc === "latePeak") {
    const mellow = ordered.filter((track) => track.energy < 0.48).sort((a, b) => a.energy - b.energy);
    const middle = ordered.filter((track) => track.energy >= 0.48 && track.energy < 0.68).sort((a, b) => a.energy - b.energy);
    const peak = ordered.filter((track) => track.energy >= 0.68).sort((a, b) => a.energy - b.energy);
    return [...mellow, ...middle, ...peak];
  }

  if (intent.arc === "rising") {
    return ordered.sort((a, b) => a.energy - b.energy || b.plays - a.plays);
  }

  return ordered.sort((a, b) => (b.score || 0) - (a.score || 0) || b.plays - a.plays);
}

function renderPlaylist(tracks, intent) {
  const totalSeconds = tracks.reduce((sum, track) => sum + track.duration, 0);
  const peak = tracks.reduce((max, track) => Math.max(max, track.energy), 0);

  currentTracks = tracks;
  currentIntent = intent;
  window.__setflowDebug = {
    tracks: tracks.map((track) => ({
      title: track.title,
      artist: track.artist,
      year: track.year,
      energy: track.energy,
      plays: track.plays,
      tags: track.tags,
      source: track.source,
      explicit: track.explicit,
      score: track.score,
      searchQuery: track.searchQuery || ""
    })),
    intent
  };
  titleNode.textContent = intent.title;
  const targetSeconds = intent.duration * 60;
  subtitleNode.textContent = totalSeconds < targetSeconds - 900
    ? `${buildPrimaryLabel(intent.tags)} best ${formatDuration(totalSeconds)} found for a ${formatDuration(targetSeconds)} target.`
    : intent.subtitle;
  statDuration.textContent = formatDuration(totalSeconds);
  statTracks.textContent = tracks.length;
  statEnergy.textContent = `${Math.round(peak * 100)}%`;

  trackList.innerHTML = tracks.map((track, index) => `
    <li class="track" data-source="${escapeHtml(track.source.join(","))}" data-tags="${escapeHtml(track.tags.join(","))}" data-explicit="${track.explicit ? "1" : "0"}" data-score="${escapeHtml(String((track.score || 0).toFixed(2)))}" data-query="${escapeHtml(track.searchQuery || "")}">
      <span class="track-index">${String(index + 1).padStart(2, "0")}</span>
      <span class="track-main">
        <span class="track-title">${escapeHtml(track.title)}</span>
        <span class="track-artist">${escapeHtml(track.artist)} · ${track.year || "----"} · ${formatShort(track.duration)}</span>
      </span>
      <span class="track-energy">
        ${Math.round(track.energy * 100)}
        <span class="meter"><span style="width: ${Math.round(track.energy * 100)}%"></span></span>
      </span>
    </li>
  `).join("");

  renderArc(tracks);
  renderCover(tracks);
  updateSaveButton();
}

function renderArc(tracks) {
  const bars = [...arcNode.children];
  const fallbackEnergy = tracks.length ? tracks[tracks.length - 1].energy : 0.2;

  bars.forEach((bar, index) => {
    const track = tracks[Math.floor((index / bars.length) * tracks.length)] || { energy: fallbackEnergy };
    const height = 8 + Math.round(track.energy * 34);
    bar.style.height = `${height}px`;
    bar.style.backgroundColor = track.energy > 0.68 ? "var(--tomato)" : track.energy > 0.48 ? "var(--gold)" : "var(--green)";
  });
}

function renderCover(tracks) {
  const colors = tracks.slice(-4).map((track) => track.color);
  [...cover.children].forEach((tile, index) => {
    tile.style.background = colors[index] || ["#21a35b", "#f06a4f", "#dca829", "#4f77d7"][index];
  });
}

function getControls() {
  const data = new FormData(form);
  return {
    duration: data.get("duration"),
    source: data.get("source"),
    explicit: data.get("explicit") === "on",
    expandCatalog: data.get("expandCatalog") === "on"
  };
}

async function generatePlaylist(options = {}) {
  const controls = getControls();
  const intent = parsePrompt(promptInput.value, controls.duration);
  let candidateLibrary = activeLibrary.length ? activeLibrary : demoLibrary;
  let catalogTracks = [];
  const canSearchCatalog = controls.expandCatalog && options.includeSearch !== false && await hasSpotifyToken();

  if (canSearchCatalog) {
    setStatus("Searching catalog", "loading");
    catalogTracks = await searchSpotifyCatalog(intent).catch((error) => {
      showToast(`Catalog search skipped: ${error.message}`);
      return [];
    });
    if (catalogTracks.length) {
      liveLibrary = mergeLibraries([...liveLibrary, ...catalogTracks]);
      activeLibrary = mergeLibraries([...activeLibrary, ...catalogTracks]);
      candidateLibrary = activeLibrary;
    }
  }

  const tracks = buildPlaylist(intent, controls, candidateLibrary);
  renderPlaylist(tracks, intent);
  lastPrompt = promptInput.value;
  updateConnectionState();
  return tracks;
}

async function startSpotifyLogin() {
  const verifier = generateRandomString(96);
  const challenge = await createCodeChallenge(verifier);
  const state = generateRandomString(24);

  sessionStorage.setItem("setflow.spotifyVerifier", verifier);
  sessionStorage.setItem("setflow.spotifyState", state);

  const params = new URLSearchParams({
    response_type: "code",
    client_id: SPOTIFY_CLIENT_ID,
    scope: SPOTIFY_SCOPES.join(" "),
    redirect_uri: SPOTIFY_REDIRECT_URI,
    state,
    code_challenge_method: "S256",
    code_challenge: challenge
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

async function hasSpotifyToken() {
  return Boolean(await getValidToken());
}

async function getValidToken() {
  const token = readStoredToken();
  if (!token) return "";
  if (Date.now() < token.expiresAt - 60000) return token.accessToken;
  if (!token.refreshToken) return "";

  const refreshed = await refreshSpotifyToken(token.refreshToken).catch(() => null);
  return refreshed?.accessToken || "";
}

function readStoredToken() {
  try {
    return JSON.parse(localStorage.getItem(TOKEN_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

async function refreshSpotifyToken(refreshToken) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: SPOTIFY_CLIENT_ID
    })
  });

  if (!response.ok) throw new Error("Spotify token refresh failed");
  const data = await response.json();
  const token = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || refreshToken,
    expiresAt: Date.now() + data.expires_in * 1000
  };
  localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(token));
  return token;
}

async function spotifyFetch(path, options = {}) {
  const token = await getValidToken();
  if (!token) throw new Error("Connect Spotify first");
  const url = path.startsWith("https://") ? path : `${SPOTIFY_API_BASE}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    const message = detail.error?.message || `Spotify returned ${response.status}`;
    throw new Error(message);
  }

  if (response.status === 204) return {};
  return response.json();
}

async function spotifyPaged(path, maxPages = 4) {
  const items = [];
  let next = path;
  let pages = 0;

  while (next && pages < maxPages) {
    const data = await spotifyFetch(next);
    items.push(...(data.items || []));
    next = data.next || "";
    pages += 1;
  }

  return items;
}

async function hydrateSpotifyLibrary() {
  if (!await hasSpotifyToken()) {
    activeLibrary = demoLibrary;
    updateConnectionState();
    generatePlaylist({ includeSearch: false });
    return;
  }

  setStatus("Loading Spotify", "loading");
  const [topShort, topMedium, topLong, saved, recent, playlists] = await Promise.allSettled([
    spotifyFetch("/me/top/tracks?limit=50&time_range=short_term"),
    spotifyFetch("/me/top/tracks?limit=50&time_range=medium_term"),
    spotifyFetch("/me/top/tracks?limit=50&time_range=long_term"),
    spotifyPaged("/me/tracks?limit=50", 80),
    spotifyFetch("/me/player/recently-played?limit=50"),
    spotifyPaged("/me/playlists?limit=50", 3)
  ]);

  const topTracks = collectSettledTracks([topShort, topMedium, topLong], "items");
  const savedTracks = unwrapSavedTracks(saved.status === "fulfilled" ? saved.value : []);
  const recentTracks = unwrapRecentTracks(collectSettledTracks([recent], "items"));
  const playlistItems = playlists.status === "fulfilled" ? playlists.value : [];
  namingProfile = inferNamingProfile(playlistItems);
  const playlistTracks = await loadPlaylistTracks(playlistItems);
  const artistGenres = await loadArtistGenres([...topTracks, ...savedTracks, ...recentTracks, ...playlistTracks]);

  const normalized = [
    ...topTracks.map((track, index) => normalizeSpotifyTrack(track, "top", index, artistGenres)),
    ...savedTracks.map((track, index) => normalizeSpotifyTrack(track, "saved", index, artistGenres)),
    ...recentTracks.map((track, index) => normalizeSpotifyTrack(track, "recent", index, artistGenres)),
    ...playlistTracks.map((track, index) => normalizeSpotifyTrack(track, "playlist", index, artistGenres))
  ].filter(Boolean);

  liveLibrary = mergeLibraries(normalized);
  activeLibrary = liveLibrary.length ? liveLibrary : demoLibrary;

  if (liveLibrary.length) {
    setStatus(`${liveLibrary.length} Spotify tracks`, "connected");
    await generatePlaylist({ includeSearch: false });
    showToast("Spotify library loaded.");
  } else {
    setStatus("Demo library", "demo");
    generatePlaylist({ includeSearch: false });
    showToast("Spotify connected, but no readable tracks came back yet.");
  }
}

function collectSettledTracks(results, itemKey) {
  return results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value?.[itemKey] || []);
}

function unwrapSavedTracks(items) {
  return items.map((item) => item.track ? {
    ...item.track,
    savedAt: item.added_at
  } : null).filter(Boolean);
}

function unwrapRecentTracks(items) {
  return items.map((item) => item.track ? {
    ...item.track,
    playedAt: item.played_at
  } : null).filter(Boolean);
}

async function loadPlaylistTracks(playlists) {
  const readablePlaylists = playlists
    .filter((playlist) => playlist?.id && (playlist.tracks?.total || 0) > 0)
    .slice(0, 20);

  const results = await Promise.allSettled(readablePlaylists.map(async (playlist) => {
    const items = await spotifyPaged(`/playlists/${playlist.id}/items?limit=50&fields=items(added_at,track(id,uri,is_local,name,artists(id,name),album(name,release_date,images),duration_ms,explicit,popularity,external_urls)),next`, 2);
    return items.map((item) => item.track ? {
      ...item.track,
      playlistAddedAt: item.added_at
    } : null).filter(Boolean);
  }));

  return results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value);
}

async function loadArtistGenres(tracks) {
  const ids = [...new Set(tracks.flatMap((track) => (
    track.artists || []
  ).map((artist) => artist.id).filter(Boolean)))].slice(0, 1500);
  const chunks = [];
  for (let index = 0; index < ids.length; index += 50) {
    chunks.push(ids.slice(index, index + 50));
  }

  const batches = await Promise.allSettled(chunks.map((chunk) => (
    spotifyFetch(`/artists?ids=${chunk.join(",")}`)
  )));

  return new Map(batches
    .filter((batch) => batch.status === "fulfilled")
    .flatMap((batch) => batch.value.artists || [])
    .filter(Boolean)
    .map((artist) => [artist.id, artist.genres || []]));
}

async function searchSpotifyCatalog(intent) {
  const queries = buildCatalogQueries(intent);
  if (!queries.length) return [];

  const results = await Promise.allSettled(queries.map((query) => {
    const params = new URLSearchParams({
      q: query,
      type: "track",
      limit: "10"
    });
    return spotifyFetch(`/search?${params.toString()}`);
  }));
  const searchEntries = results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result, resultIndex) => (
      (result.value.tracks?.items || []).map((track) => ({
        track,
        query: queries[resultIndex]
      }))
    ));
  const tracks = searchEntries.map((entry) => entry.track);
  const artistGenres = await loadArtistGenres(tracks);
  const normalized = searchEntries
    .map(({ track, query }, index) => {
      const normalizedTrack = normalizeSpotifyTrack(track, "search", index, artistGenres);
      if (!normalizedTrack) return null;
      return reinforceSearchIntent({ ...normalizedTrack, searchQuery: query }, intent, query);
    })
    .filter(Boolean);
  const filtered = normalized
    .filter((track) => !isTrustedSoftArtistQuery(track.searchQuery || "") || trustedSoftQueryMatchesTrack(track.searchQuery || "", track))
    .filter((track) => passesHardConstraints(track, intent));
  return mergeLibraries(filtered);
}

function buildCatalogQueries(intent) {
  if (intent.timeIntent?.year) {
    const year = intent.timeIntent.year;
    const season = intent.timeIntent.season;
    if (intent.tags.includes("rap") || intent.tags.includes("hip hop")) {
      return [
        `${season || ""} ${year} rap`.trim(),
        `${year} hip hop`,
        `${year} rap hits`,
        `${year} chill rap`
      ];
    }
    return [
      `${season || ""} ${year} songs`.trim(),
      `${year} hits`,
      `${year} summer songs`,
      `${year} throwback`
    ];
  }

  if (intent.tags.includes("old school rap")) {
    return [
      "old school hip hop rap 90s",
      "classic hip hop boom bap",
      "chill old school rap",
      "stoner rap old school",
      "golden era hip hop",
      "90s east coast hip hop",
      "90s west coast hip hop",
      "laid back old school rap",
      "classic rap 2000s",
      "underground hip hop 90s"
    ];
  }
  if (intent.tags.includes("rap") || intent.tags.includes("hip hop")) {
    return ["chill rap", "hip hop old souls", "rap classics"];
  }
  if (intent.tags.includes("desert")) {
    return [
      "Namibian acoustic music",
      "Namibia desert music",
      "African desert blues",
      "Tuareg guitar desert blues",
      "Sahara blues acoustic",
      "Tinariwen desert blues",
      "Tinariwen acoustic",
      "Bombino desert blues",
      "Mdou Moctar desert guitar",
      "Mdou Moctar acoustic",
      "Etran de L'Air desert guitar",
      "Ali Farka Toure acoustic",
      "Samba Toure desert blues",
      "Sona Jobarteh kora instrumental",
      "Toumani Diabate kora instrumental",
      "desert ambient instrumental",
      "campfire acoustic instrumental",
      "kora ambient desert",
      "mbira acoustic sunset",
      "savanna ambient guitar"
    ];
  }
  if (intent.tags.includes("soft") || intent.tags.includes("dinner") || intent.tags.includes("beautiful")) {
    return [
      "Sade Cherish the Day",
      "Sade By Your Side",
      "Cleo Sol When I'm In Your Arms",
      "Cleo Sol Why Don't You",
      "Men I Trust Show Me How",
      "Men I Trust Tailwhip",
      "Norah Jones Come Away With Me",
      "Norah Jones Sunrise",
      "Laufey From The Start",
      "Laufey Falling Behind",
      "Corinne Bailey Rae Put Your Records On",
      "Corinne Bailey Rae Like A Star",
      "Erykah Badu Didn't Cha Know",
      "Erykah Badu On & On",
      "Jorja Smith Blue Lights",
      "Jorja Smith Teenage Fantasy",
      "Lianne La Havas Green & Gold",
      "Lianne La Havas Bittersweet",
      "Raveena Sweet Time",
      "Raveena Honey",
      "Charlotte Day Wilson Work",
      "Charlotte Day Wilson Mountains",
      "The Marías Hush",
      "The Marías Only In My Dreams",
      "Air Playground Love",
      "Air Cherry Blossom Girl",
      "Zero 7 Destiny",
      "Zero 7 In The Waiting Line",
      "Khruangbin Friday Morning",
      "Khruangbin A Calf Born In Winter",
      "Astrud Gilberto bossa nova",
      "Astrud Gilberto The Girl From Ipanema",
      "Billie Holiday Easy To Love",
      "Billie Holiday I'll Be Seeing You",
      "Dinah Washington I Get A Kick Out Of You",
      "Dinah Washington What A Difference A Day Makes",
      "warm neo soul evening",
      "soft r&b dinner",
      "downtempo warm evening"
    ];
  }
  if (intent.tags.includes("house") && intent.tags.includes("intimate")) {
    return [
      "sensual deep house",
      "late night deep house",
      "after dark melodic house",
      "warm deep house mix",
      "sexy deep house mix",
      "moody afro house",
      "minimal deep house",
      "sensual house original mix",
      "deep house original mix",
      "melodic house extended mix",
      "afro house original mix",
      "deep house 2024",
      "melodic house 2024",
      "afro house 2024",
      "tech house late night"
    ];
  }
  if (intent.tags.includes("house")) return ["sunset house", "warm house no vocals"];
  if (intent.tags.includes("jazz rap")) return ["jazz rap", "laid back jazz rap"];
  if (intent.tags.includes("soul")) return ["soul hip hop", "rainy soul"];
  if (intent.tags.includes("rainy")) return ["rainy day soul"];
  return [intent.raw.split(/\s+/).slice(0, 8).join(" ")].filter(Boolean);
}

function reinforceSearchIntent(track, intent, query = "") {
  const tags = new Set(track.tags);
  if (intent.tags.includes("rap") || intent.tags.includes("hip hop") || intent.tags.includes("old school rap")) {
    tags.add("rap");
    tags.add("hip hop");
  }
  if (intent.tags.includes("old school rap")) {
    tags.add("old school rap");
  }
  if (intent.tags.includes("house") && isHouseCatalogQuery(query) && isLikelyHouseCatalogResult(track)) {
    tags.add("house");
  }
  if (intent.tags.includes("desert") && isSceneCatalogQuery(query) && isLikelySceneCatalogResult(track, query)) {
    tags.add("desert");
    tags.add("world");
    if (/namibia|namibian|african|afro|sahara|tuareg|kora|mbira|savanna/.test(query)) tags.add("african");
    if (/ambient|instrumental|night/.test(query)) tags.add("ambient");
    if (/acoustic|guitar|campfire|fireplace/.test(query)) tags.add("acoustic");
  }
  if ((intent.tags.includes("soft") || intent.tags.includes("dinner") || intent.tags.includes("beautiful")) && isSoftCatalogQuery(query) && isLikelySoftCatalogResult(track, query)) {
    tags.add("soft");
    tags.add("beautiful");
    if (/dinner|cooking|kitchen|bossa|jazz|soul|r&b|storm/.test(query)) tags.add("dinner");
    if (/cozy|warm|evening/.test(query)) tags.add("cozy");
    if (/soul|r&b|storm/.test(query)) tags.add("soul");
    if (/jazz|bossa/.test(query)) tags.add("jazz");
  }
  if (intent.tags.includes("chill") && track.energy < 0.55) tags.add("chill");
  return { ...track, tags: [...tags] };
}

function isSceneCatalogQuery(query) {
  const text = query.toLowerCase();
  return /\b(namibia|namibian|desert|sahara|tuareg|african|kora|mbira|savanna|campfire|fireplace|ambient|acoustic)\b/.test(text);
}

function isLikelySceneCatalogResult(track, query = "") {
  if (isSceneCandidate(track)) return true;
  const text = normalizeSearchText(track);
  const tagText = track.tags.join(" ").toLowerCase();
  if (/\b(rap|hip hop|trap|drill|r&b|dance pop|pop rap|pop|rock|metal|punk|country|disco|party|club|rave|edm|fitness|workout|pilates|motivation)\b/.test(text)) return false;
  if (isTrustedSceneArtistQuery(query)) return true;
  return /\b(african|desert|sahara|tuareg|kora|mbira|savanna)\b/.test(text)
    || /\b(instrumental|acoustic|guitar|ambient|world|folk|desert blues)\b/.test(tagText);
}

function isTrustedSceneArtistQuery(query) {
  const text = query.toLowerCase();
  return /\b(tinariwen|bombino|mdou moctar|etran de l'?air|ali farka|sona jobarteh|toumani diabate|samba toure)\b/.test(text);
}

function isSoftCatalogQuery(query) {
  const text = query.toLowerCase();
  return isTrustedSoftArtistQuery(query) || /\b(soft|beautiful|cozy|cooking|dinner|warm|neo soul|r&b|indie pop|dream pop|acoustic|bossa|jazz|downtempo|quiet storm|mellow)\b/.test(text);
}

function isLikelySoftCatalogResult(track, query = "") {
  const text = normalizeSearchText(track);
  if (/\b(rap|hip hop|trap|drill|gangsta|rock|metal|punk|country|disco|party|club|rave|edm|techno|fitness|workout|pilates|motivation)\b/.test(text)) return false;
  if (isTrustedSoftArtistQuery(query)) return trustedSoftQueryMatchesTrack(query, track);
  if (isSoftBeautifulCandidate(track)) return true;
  return /\b(soft|beautiful|gentle|cozy|warm|smooth|dream|neo soul|r&b|jazz|bossa|acoustic|downtempo|ambient|piano|lounge)\b/.test(text);
}

function isTrustedSoftArtistQuery(query) {
  const text = query.toLowerCase();
  return /\b(sade|cleo sol|men i trust|norah jones|laufey|corinne bailey rae|erykah badu|jorja smith|lianne la havas|raveena|charlotte day wilson|mar[ií]as|air|zero 7|khruangbin|astrud gilberto|billie holiday|dinah washington)\b/.test(text);
}

function trustedSoftQueryMatchesTrack(query, track) {
  const normalizedQuery = normalizeKeyPart(query);
  const normalizedArtist = normalizeKeyPart(track.artist);
  const trustedArtists = [
    "sade",
    "cleo sol",
    "men i trust",
    "norah jones",
    "laufey",
    "corinne bailey rae",
    "erykah badu",
    "jorja smith",
    "lianne la havas",
    "raveena",
    "charlotte day wilson",
    "the marias",
    "marias",
    "air",
    "zero 7",
    "khruangbin",
    "astrud gilberto",
    "billie holiday",
    "dinah washington"
  ];
  const queryArtist = trustedArtists.find((artist) => normalizedQuery.includes(artist));
  if (!queryArtist) return false;
  return normalizedArtist.includes(queryArtist);
}

function isHouseCatalogQuery(query) {
  return /\bhouse\b|deep|melodic|afro|tech/.test(query);
}

function isLikelyHouseCatalogResult(track) {
  if (isHouseCandidate(track)) return true;
  const text = normalizeSearchText(track);
  if (/\b(rap|hip hop|trap|drill|rock|metal|punk|country|folk|latin|salsa|cuban|classical|opera|christmas|kids)\b/.test(text)) {
    return false;
  }
  return /\b(original mix|mix|remix|club|extended|dub|deep|melodic|afro|tech|ibiza)\b/.test(text);
}

function normalizeSpotifyTrack(track, source, index, artistGenres) {
  if (!track?.uri || track.is_local) return null;
  const artistNames = (track.artists || []).map((artist) => artist.name).join(", ") || "Unknown artist";
  const genres = (track.artists || [])
    .flatMap((artist) => artistGenres.get(artist.id) || [])
    .map((genre) => genre.toLowerCase());
  const year = parseYear(track.album?.release_date);
  const tags = inferTags(track, genres, year);

  return {
    id: track.id,
    uri: track.uri,
    spotifyUrl: track.external_urls?.spotify || "",
    image: track.album?.images?.[0]?.url || "",
    likedAt: track.savedAt || "",
    playedAt: track.playedAt || "",
    playlistAddedAt: track.playlistAddedAt || "",
    title: track.name,
    artist: artistNames,
    year,
    duration: Math.round((track.duration_ms || 180000) / 1000),
    energy: estimateEnergy(track, tags, source),
    plays: estimatePlayWeight(track, source, index),
    tags,
    source: [source],
    explicit: Boolean(track.explicit),
    popularity: track.popularity || 0,
    color: colorFromString(track.id || track.name)
  };
}

function inferTags(track, genres, year) {
  const text = `${track.name} ${track.album?.name || ""} ${(track.artists || []).map((artist) => artist.name).join(" ")} ${genres.join(" ")}`.toLowerCase();
  const releaseText = `${track.name} ${track.album?.name || ""}`.toLowerCase();
  const genreText = genres.join(" ");
  const tags = new Set(genres);
  const hasRapContext = /\bhip hop\b|\brap\b|\btrap\b|boom bap|grime/.test(text);
  const houseGenre = /\b(deep house|tech house|melodic house|afro house|organic house|progressive house|electro house|tropical house|future house|house|garage|edm|electronic|electronica|techno)\b/.test(genreText);
  const houseMixTitle = /\b(club mix|house mix|deep mix|extended mix|dance mix|late night mix)\b/.test(releaseText);
  const worldGenre = /\b(world|african|afro|afropop|desert blues|tuareg|sahara|kora|mbira|malian|west african|south african|namibian|ethio)\b/.test(text);
  const ambientGenre = /\b(ambient|new age|drone|meditation|instrumental|downtempo)\b/.test(text);
  const acousticGenre = /\b(acoustic|folk|guitar|singer-songwriter|desert blues|acoustic blues|roots)\b/.test(text);
  const softGenre = /\b(dream pop|bedroom pop|indie pop|neo soul|alternative r&b|r&b|soul|vocal jazz|bossa nova|singer-songwriter|acoustic|folk|ambient|downtempo|chillwave|lo-?fi|piano|lounge|quiet storm)\b/.test(genreText);
  const beautifulText = /\b(soft|beautiful|pretty|gentle|cozy|cosy|warm|smooth|tender|calm|glow|velvet|coffee|kitchen|dinner|bossa|jazz|piano|acoustic)\b/.test(releaseText);

  if (/\bhip hop\b|\brap\b|boom bap|\btrap\b|grime/.test(text)) tags.add("hip hop");
  if (/\brap\b|\bmc\b|bars|freestyle/.test(text)) tags.add("rap");
  if (/boom bap/.test(text)) tags.add("boom bap");
  if (/jazz rap|alternative hip hop|conscious hip hop/.test(genreText) || (/jazz/.test(text) && hasRapContext)) tags.add("jazz rap");
  if (/\b(neo soul|soul|r&b|quiet storm)\b/.test(`${genreText} ${releaseText}`)) tags.add("soul");
  if (houseGenre || houseMixTitle) tags.add("house");
  if (worldGenre) tags.add("world");
  if (/\b(african|afro|desert blues|tuareg|sahara|kora|mbira|malian|west african|south african|namibian)\b/.test(text)) tags.add("african");
  if (ambientGenre) tags.add("ambient");
  if (acousticGenre) tags.add("acoustic");
  if (softGenre || beautifulText) tags.add("soft");
  if (softGenre || beautifulText || /\b(ethereal|lush|dreamy)\b/.test(text)) tags.add("beautiful");
  if (/\b(jazz|soul|neo soul|r&b|bossa nova|acoustic|singer-songwriter|downtempo|ambient|lounge|quiet storm)\b/.test(genreText) || /\b(coffee|kitchen|dinner|bossa|jazz|piano|acoustic)\b/.test(releaseText)) tags.add("dinner");
  if (/\b(cozy|cosy|warm|coffee|kitchen|dinner)\b/.test(releaseText) || /\b(cozy|cosy|warm)\b/.test(genreText)) tags.add("cozy");
  if (/\b(desert|dune|sahara|namibia|namibian|tuareg|desert blues|savanna)\b/.test(text)) tags.add("desert");
  if (/chill|mellow|lofi|lo-fi|smooth|rain|night|late|blue/.test(text)) tags.add("chill");
  if (/party|club|bounce|anthem|hype|energy/.test(text)) tags.add("party");
  if (year >= 1985 && year <= 2005 && (tags.has("rap") || tags.has("hip hop") || tags.has("boom bap"))) {
    tags.add("old school rap");
  }

  return [...tags].slice(0, 14);
}

function estimateEnergy(track, tags, source) {
  let energy = 0.28 + ((track.popularity || 35) / 160);
  if (track.explicit) energy += 0.04;
  if (source === "recent") energy += 0.03;
  if (tags.includes("party")) energy += 0.16;
  if (tags.includes("house")) energy += 0.12;
  if (tags.includes("chill")) energy -= 0.14;
  if (tags.includes("soul") || tags.includes("jazz rap")) energy -= 0.05;
  return clamp(energy, 0.18, 0.88);
}

function estimatePlayWeight(track, source, index) {
  const base = source === "top" ? 100 : source === "saved" ? 76 : source === "playlist" ? 64 : source === "recent" ? 78 : 42;
  const rankBoost = Math.max(0, 50 - index) * (source === "top" ? 1.2 : 0.6);
  return Math.round(base + rankBoost + ((track.popularity || 0) / 6));
}

async function createSpotifyPlaylist() {
  if (!await hasSpotifyToken()) {
    showToast("Connect Spotify first.");
    await startSpotifyLogin();
    return;
  }

  const uris = currentTracks.map((track) => track.uri).filter(Boolean);
  if (!uris.length) {
    showToast("Generate a Spotify-backed playlist first.");
    return;
  }

  saveButton.disabled = true;
  saveButton.textContent = "Creating...";
  try {
    const playlist = await spotifyFetch("/me/playlists", {
      method: "POST",
      body: JSON.stringify({
        name: currentIntent?.title || "Setflow Playlist",
        public: false,
        description: ""
      })
    });

    for (let index = 0; index < uris.length; index += 100) {
      await spotifyFetch(`/playlists/${playlist.id}/items`, {
        method: "POST",
        body: JSON.stringify({ uris: uris.slice(index, index + 100) })
      });
    }

    currentPlaylistUrl = playlist.external_urls?.spotify || "";
    localStorage.setItem(LAST_PLAYLIST_KEY, currentPlaylistUrl);
    showToast("Created private Spotify playlist.");
  } catch (error) {
    showToast(`Spotify create failed: ${error.message}`);
  } finally {
    saveButton.disabled = false;
    updateSaveButton();
  }
}

function updateSaveButton() {
  saveButton.textContent = "Save to Spotify";
}

async function updateConnectionState() {
  if (!libraryStatus) return;
  if (await hasSpotifyToken()) {
    const count = liveLibrary.length;
    setStatus(count ? `${count} Spotify tracks` : "Spotify connected", "connected");
    connectButton.setAttribute("aria-label", "Refresh Spotify library");
    return;
  }
  setStatus("Demo library", "demo");
  connectButton.setAttribute("aria-label", "Connect Spotify");
}

function setStatus(message, mode) {
  if (!libraryStatus) return;
  libraryStatus.textContent = message;
  libraryStatus.dataset.mode = mode;
}

function formatDuration(seconds) {
  const minutes = Math.round(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  if (!hours) return `${minutes}m`;
  return remaining ? `${hours}h ${remaining}m` : `${hours}h`;
}

function formatShort(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remaining = String(seconds % 60).padStart(2, "0");
  return `${minutes}:${remaining}`;
}

function parseYear(value) {
  const year = Number(String(value || "").slice(0, 4));
  return Number.isFinite(year) && year > 0 ? year : new Date().getFullYear();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function colorFromString(value) {
  const palette = ["#21a35b", "#f06a4f", "#dca829", "#4f77d7", "#7858c4", "#2f8f9d", "#c97836", "#4b8c73"];
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(index);
    hash |= 0;
  }
  return palette[Math.abs(hash) % palette.length];
}

function generateRandomString(length) {
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const values = crypto.getRandomValues(new Uint8Array(length));
  return [...values].map((value) => possible[value % possible.length]).join("");
}

async function createCodeChallenge(verifier) {
  const bytes = new TextEncoder().encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 3600);
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  form.classList.add("is-loading");
  try {
    await generatePlaylist();
    showToast("Draft playlist generated.");
  } finally {
    form.classList.remove("is-loading");
  }
});

saveButton.addEventListener("click", createSpotifyPlaylist);

connectButton.addEventListener("click", async () => {
  if (await hasSpotifyToken()) {
    await hydrateSpotifyLibrary();
    return;
  }
  await startSpotifyLogin();
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}

applyUrlPreset();
hydrateSpotifyLibrary();

function applyUrlPreset() {
  const params = new URLSearchParams(window.location.search);
  const prompt = params.get("prompt");
  const source = params.get("source");
  const duration = params.get("duration");
  const expand = params.get("expand");

  if (prompt) promptInput.value = prompt;
  if (source && document.querySelector(`#sourceSelect option[value="${CSS.escape(source)}"]`)) {
    document.querySelector("#sourceSelect").value = source;
  }
  if (duration && document.querySelector(`input[name="duration"][value="${CSS.escape(duration)}"]`)) {
    document.querySelector(`input[name="duration"][value="${CSS.escape(duration)}"]`).checked = true;
  }
  if (expand === "0" || expand === "false") {
    document.querySelector("#expandToggle").checked = false;
  }
}
