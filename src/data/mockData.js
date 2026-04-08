// Pre-computed chart data based on common dates
export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const ZODIAC_SYMBOLS = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋",
  Leo: "♌", Virgo: "♍", Libra: "♎", Scorpio: "♏",
  Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓"
};

export const ZODIAC_ELEMENTS = {
  Aries: "Fire", Taurus: "Earth", Gemini: "Air", Cancer: "Water",
  Leo: "Fire", Virgo: "Earth", Libra: "Air", Scorpio: "Water",
  Sagittarius: "Fire", Capricorn: "Earth", Aquarius: "Air", Pisces: "Water"
};

export const ELEMENT_EMOJIS = { Fire: "🔥", Earth: "🌍", Air: "💨", Water: "💧" };

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
  "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
  "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha",
  "Anuradha", "Jyeshtha", "Moola", "Purva Ashadha", "Uttara Ashadha",
  "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada",
  "Uttara Bhadrapada", "Revati"
];

export const CITIES = [
  { name: "Delhi", lat: 28.6139, lng: 77.209 },
  { name: "Mumbai", lat: 19.076, lng: 72.8777 },
  { name: "Bangalore", lat: 12.9716, lng: 77.5946 },
  { name: "Chennai", lat: 13.0827, lng: 80.2707 },
  { name: "Hyderabad", lat: 17.385, lng: 78.4867 },
  { name: "Kolkata", lat: 22.5726, lng: 88.3639 },
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Jaipur", lat: 26.9124, lng: 75.7873 },
  { name: "Lucknow", lat: 26.8467, lng: 80.9462 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Indore", lat: 22.7196, lng: 75.8577 },
  { name: "Bhopal", lat: 23.2599, lng: 77.4126 },
  { name: "Chandigarh", lat: 30.7333, lng: 76.7794 },
  { name: "Kochi", lat: 9.9312, lng: 76.2673 },
  { name: "Coimbatore", lat: 11.0168, lng: 76.9558 },
  { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
  { name: "Patna", lat: 25.6093, lng: 85.1376 },
  { name: "Varanasi", lat: 25.3176, lng: 83.0068 },
  { name: "Surat", lat: 21.1702, lng: 72.8311 },
  { name: "Kanpur", lat: 26.4499, lng: 80.3319 },
];

export function generateMockChart(birthDate, birthTime, birthPlace) {
  const month = birthDate.getMonth();
  const day = birthDate.getDate();
  const hour = birthTime ? parseInt(birthTime.split(':')[0]) : 12;

  const sunSign = ZODIAC_SIGNS[month];
  const moonIndex = (day + month * 2) % 12;
  const moonSign = ZODIAC_SIGNS[moonIndex];
  const ascIndex = (hour + month) % 12;
  const ascendant = ZODIAC_SIGNS[ascIndex];
  const nakshatraIndex = (day + month) % 27;
  const nakshatra = NAKSHATRAS[nakshatraIndex];
  const venusIndex = (month + 2) % 12;
  const marsIndex = (month + day) % 12;

  // Place planets in houses
  const houses = Array.from({ length: 12 }, (_, i) => ({
    house: i + 1,
    sign: ZODIAC_SIGNS[(ascIndex + i) % 12],
    planets: []
  }));

  // Position planets
  const planetPlacements = [
    { name: "Su", house: (month - ascIndex + 12) % 12 },
    { name: "Mo", house: (moonIndex - ascIndex + 12) % 12 },
    { name: "Ma", house: (marsIndex - ascIndex + 12) % 12 },
    { name: "Me", house: ((month + 1) - ascIndex + 12) % 12 },
    { name: "Ju", house: ((month + 4) - ascIndex + 12) % 12 },
    { name: "Ve", house: (venusIndex - ascIndex + 12) % 12 },
    { name: "Sa", house: ((month + 7) - ascIndex + 12) % 12 },
    { name: "Ra", house: ((day + 3) % 12 - ascIndex + 12) % 12 },
    { name: "Ke", house: ((day + 9) % 12 - ascIndex + 12) % 12 },
  ];
  planetPlacements.forEach(p => houses[p.house].planets.push(p.name));

  return {
    sunSign,
    moonSign,
    ascendant,
    nakshatra,
    venusSign: ZODIAC_SIGNS[venusIndex],
    marsSign: ZODIAC_SIGNS[marsIndex],
    jupiterSign: ZODIAC_SIGNS[(month + 4) % 12],
    saturnSign: ZODIAC_SIGNS[(month + 7) % 12],
    rahuSign: ZODIAC_SIGNS[(day + 3) % 12],
    ketuSign: ZODIAC_SIGNS[(day + 9) % 12],
    mercurySign: ZODIAC_SIGNS[(month + 1) % 12],
    isManglik: [1, 2, 4, 7, 8, 12].includes((day % 12) + 1),
    currentDasha: `${ZODIAC_SIGNS[moonIndex]} Mahadasha`,
    houses
  };
}

export function calculateGunaScore(chart1, chart2) {
  const m1 = ZODIAC_SIGNS.indexOf(chart1.moonSign);
  const m2 = ZODIAC_SIGNS.indexOf(chart2.moonSign);
  const diff = Math.abs(m1 - m2);

  return {
    varna:       { score: diff % 2 === 0 ? 1 : 0, max: 1, label: "Varna", what: "Ego & Work Ethic" },
    vashya:      { score: diff < 4 ? 2 : 1, max: 2, label: "Vashya", what: "Mutual Attraction" },
    tara:        { score: diff < 3 ? 3 : diff < 6 ? 2 : 1, max: 3, label: "Tara", what: "Destiny & Luck" },
    yoni:        { score: Math.min(4, 4 - (diff % 5)), max: 4, label: "Yoni", what: "Physical Intimacy" },
    grahaMaitri: { score: diff < 4 ? 5 : diff < 7 ? 3 : 1, max: 5, label: "Graha Maitri", what: "Mental Connection" },
    gana:        { score: diff < 3 ? 6 : diff < 6 ? 4 : 2, max: 6, label: "Gana", what: "Temperament" },
    bhakoot:     { score: [2, 6, 8, 12].includes(diff + 1) ? 0 : 7, max: 7, label: "Bhakoot", what: "Emotional Bond" },
    nadi:        { score: chart1.nakshatra !== chart2.nakshatra ? 8 : 0, max: 8, label: "Nadi", what: "Genetic Compatibility" },
  };
}

export function getTotalGunaScore(gunaScores) {
  return Object.values(gunaScores).reduce((sum, g) => sum + g.score, 0);
}

const MOON_TRAITS = {
  Aries: "fiery emotional intensity", Taurus: "deep sensual groundedness",
  Gemini: "curious emotional duality", Cancer: "profound nurturing depth",
  Leo: "warm dramatic expressiveness", Virgo: "analytical emotional precision",
  Libra: "harmonious emotional balance", Scorpio: "transformative emotional power",
  Sagittarius: "adventurous emotional freedom", Capricorn: "disciplined emotional resilience",
  Aquarius: "unconventional emotional detachment", Pisces: "boundless emotional empathy"
};

const VENUS_ATTRACTIONS = {
  Aries: "bold, assertive partners who take initiative",
  Taurus: "stability, luxury, and sensual connection",
  Gemini: "witty conversation and intellectual stimulation",
  Cancer: "emotional security and nurturing energy",
  Leo: "grand romantic gestures and adoration",
  Virgo: "quiet devotion and practical acts of love",
  Libra: "beauty, harmony, and romantic partnership",
  Scorpio: "intense passion and soul-deep intimacy",
  Sagittarius: "freedom, adventure, and philosophical depth",
  Capricorn: "ambition, maturity, and long-term commitment",
  Aquarius: "uniqueness, independence, and mental connection",
  Pisces: "dreamy romance and spiritual connection"
};

export const PERSONALITY_NARRATIVES = {
  Aries: `You are a fire-starter in every sense — bold, direct, and unapologetically passionate. Your {moonSign} Moon adds {moonTrait} to your intensity, making you someone who feels deeply but acts fast. In love, you don't do "casual" — when you're in, you're ALL in.\n\nYour Venus in {venusSign} means you're drawn to partners who match your energy and aren't afraid of a little healthy debate. You value {venusAttraction}.\n\nWatch out: your Mars-driven nature can make you impatient with partners who need more time to open up. But the magic? When you find someone who can keep pace with your fire, the connection is electric and unshakeable.`,

  Taurus: `You are the embodiment of sensual stability — grounded, loyal, and with an aesthetic sense that makes everything around you more beautiful. Your {moonSign} Moon reveals that beneath that calm exterior lives a deeply emotional core that craves security and consistency.\n\nIn relationships, you're the partner who remembers anniversaries, cooks comfort food at 2am, and builds a life that feels like home. Your Venus in {venusSign} draws you toward {venusAttraction}.\n\nOne thing to watch: your legendary stubbornness can turn into possessiveness if trust isn't established early. But when you love? You love with a permanence that most people only dream about.`,

  Gemini: `Your mind is a kaleidoscope — endlessly curious, wickedly witty, and impossible to bore. With your {moonSign} Moon, your emotional world is colored by {moonTrait}, making you someone who processes feelings through conversation and connection.\n\nYou need a partner who can keep up intellectually — someone who'll debate philosophy at dinner and send you random articles at midnight. Venus in {venusSign} means you value {venusAttraction}.\n\nThe watch-out: your need for variety can sometimes read as inconsistency. But the truth is, you're not flaky — you're just looking for someone fascinating enough to hold ALL of your attention. When you find them, your loyalty is fierce.`,

  Cancer: `You feel everything — deeply, intensely, and with a memory that never lets go of the important moments. Your {moonSign} Moon amplifies your emotional intelligence, giving you an almost psychic ability to read the people you love.\n\nIn relationships, you're the nurturer — the one who creates a safe space where vulnerability isn't just accepted, it's celebrated. Venus in {venusSign} means you're attracted to {venusAttraction}.\n\nYour superpower is making people feel truly seen and cared for. The watch-out: your protective shell can sometimes keep out the very love you're seeking. But when someone earns your trust? They get access to the deepest, most loyal heart in the zodiac.`,

  Leo: `You walk into a room and the energy shifts — not because you demand attention, but because your warmth is genuinely magnetic. Your {moonSign} Moon means your emotional core is enriched by {moonTrait}, adding real depth beneath that confident exterior.\n\nIn love, you're generous to a fault — the partner who plans surprise dates, writes heartfelt notes, and makes their person feel like royalty. Venus in {venusSign} draws you to {venusAttraction}.\n\nHere's what most people miss: beneath the confidence, you need genuine validation — not flattery, but someone who truly sees and appreciates the real you. When you find that? Your loyalty and devotion are absolutely legendary.`,

  Virgo: `Your mind is a precision instrument — analytical, observant, and constantly optimizing the world around you. But here's the secret your {moonSign} Moon reveals: beneath that practical exterior lives a deeply caring soul who shows love through acts of service.\n\nYou're the partner who remembers how they take their coffee, who notices when something's wrong before they say a word. Venus in {venusSign} means you're attracted to {venusAttraction}.\n\nYour superpower in relationships is making your partner's life tangibly better, every single day. The watch-out: your perfectionism can sometimes turn inward. The partner who helps you relax into "good enough" unlocks your warmest, most playful side.`,

  Libra: `You are the zodiac's artist of human connection — endlessly charming, deeply fair-minded, and with an aesthetic sense that elevates everything around you. Your {moonSign} Moon reveals {moonTrait}, adding emotional depth to your social grace.\n\nIn love, you crave true partnership — not just romance, but genuine intellectual and emotional equality. Venus in {venusSign} (your ruling planet!) means your love language is {venusAttraction}.\n\nYou have an extraordinary gift for seeing both sides of every situation, which makes you a remarkably fair and understanding partner. The watch-out: your desire for harmony can sometimes mean avoiding necessary conflicts. The right partner helps you find your voice.`,

  Scorpio: `You are intensity personified — passionate, perceptive, and with emotional depth that most people can't even fathom. Your {moonSign} Moon adds {moonTrait} to your already complex inner world.\n\nYou don't do surface-level anything — especially relationships. When you love, it's transformative, consuming, and profoundly intimate. Venus in {venusSign} draws you to {venusAttraction}.\n\nYour superpower is your ability to see through masks — you always know what someone really feels. The watch-out: your fear of betrayal can create the very distance you're trying to prevent. But when someone proves worthy of your trust? The connection you build is the most powerful bond in the zodiac.`,

  Sagittarius: `Your spirit is boundless — adventurous, philosophical, and driven by an insatiable hunger for meaning and experience. With your {moonSign} Moon, your emotional landscape is shaped by {moonTrait}.\n\nIn relationships, you need a partner who's both a lover and a fellow explorer — someone who'll debate the meaning of life on a mountaintop and then cook street food together in a new city. Venus in {venusSign} means you value {venusAttraction}.\n\nYour honesty is both your greatest strength and your watch-out — you always speak truth, but sometimes timing needs work. When you find someone who loves your freedom as much as they love you? That's your forever person.`,

  Capricorn: `You are ambition wrapped in quiet dignity — disciplined, strategic, and with a dry wit that catches people completely off guard. Your {moonSign} Moon reveals a surprisingly tender emotional core hidden behind that composed exterior.\n\nIn love, you're the long-game player — not interested in flings, you're building something that lasts. Venus in {venusSign} means you're drawn to {venusAttraction}.\n\nYour love language is commitment — you show up, you follow through, and you build a life that others can only aspire to. The watch-out: your self-reliance can sometimes make partners feel unnecessary. The right person reminds you that needing someone isn't weakness — it's the whole point.`,

  Aquarius: `You are the zodiac's visionary — innovative, fiercely independent, and thinking about the future while everyone else is stuck in the present. Your {moonSign} Moon gives your emotional world a {moonTrait} quality.\n\nIn relationships, you need space and stimulation in equal measure — a partner who respects your independence and shares your curiosity. Venus in {venusSign} means you value {venusAttraction}.\n\nYour superpower is seeing people for who they truly are, without judgment or pretense. The watch-out: your emotional detachment can read as coldness to partners who need more overt affection. But when you love? You love the real person — and that's the rarest gift of all.`,

  Pisces: `You live in a world where feelings are colors, music is emotion, and love is the force that makes everything meaningful. Your {moonSign} Moon amplifies your already extraordinary sensitivity, giving you {moonTrait} depth.\n\nIn relationships, you're the partner who intuitively knows what someone needs before they ask — a natural healer who creates emotional safety just by being present. Venus in {venusSign} draws you to {venusAttraction}.\n\nYour capacity for unconditional love is genuinely remarkable and deeply rare. The watch-out: your empathic nature can blur boundaries. The right partner grounds you without dimming your magic — and together, you create something transcendent.`
};

export function getPersonalityNarrative(chart) {
  const template = PERSONALITY_NARRATIVES[chart.sunSign] || PERSONALITY_NARRATIVES.Aries;
  return template
    .replace(/{moonSign}/g, chart.moonSign)
    .replace(/{moonTrait}/g, MOON_TRAITS[chart.moonSign] || "deep emotional resonance")
    .replace(/{venusSign}/g, chart.venusSign)
    .replace(/{venusAttraction}/g, VENUS_ATTRACTIONS[chart.venusSign] || "meaningful connection");
}

export const TRAIT_TAGS = {
  Aries: ["Bold", "Passionate", "Leader", "Direct"],
  Taurus: ["Loyal", "Sensual", "Grounded", "Patient"],
  Gemini: ["Witty", "Curious", "Adaptable", "Social"],
  Cancer: ["Nurturing", "Intuitive", "Protective", "Empathic"],
  Leo: ["Magnetic", "Generous", "Creative", "Confident"],
  Virgo: ["Analytical", "Devoted", "Precise", "Caring"],
  Libra: ["Charming", "Fair", "Romantic", "Diplomatic"],
  Scorpio: ["Intense", "Perceptive", "Loyal", "Deep"],
  Sagittarius: ["Adventurous", "Honest", "Free-spirited", "Wise"],
  Capricorn: ["Ambitious", "Reliable", "Strategic", "Witty"],
  Aquarius: ["Visionary", "Independent", "Unique", "Intellectual"],
  Pisces: ["Empathic", "Creative", "Intuitive", "Romantic"]
};

export const MOCK_MATCHES = [
  {
    id: 1, name: "Priya Sharma", age: 26, city: "Bangalore", distance: "4km",
    photo: "/profiles/priya.png", avatar: "👩",
    job: "Architect", education: "NIT Trichy", height: "5'6\"",
    sunSign: "Leo", moonSign: "Taurus", ascendant: "Virgo",
    nakshatra: "Rohini", venusSign: "Libra", marsSign: "Scorpio",
    isManglik: false,
    interests: ["Coffee", "Dance", "Reading", "Travel", "Yoga"],
    passions: ["Sustainable Living", "Photography", "Startups"],
    hobbies: ["Classical Dance", "Baking", "Journaling"],
    openingMove: "Tell me your most controversial food opinion 🍕",
    lookingFor: "Long-term Relationship",
    bio: "Architect by day, dancer by night. Looking for someone who can keep up with my energy and doesn't judge my 3am philosophical rants.",
    verified: true,
  },
  {
    id: 2, name: "Ananya Iyer", age: 24, city: "Mumbai", distance: "2km",
    photo: "/profiles/ananya.png", avatar: "👩‍🦱",
    job: "Therapist", education: "TISS Mumbai", height: "5'4\"",
    sunSign: "Pisces", moonSign: "Cancer", ascendant: "Scorpio",
    nakshatra: "Pushya", venusSign: "Pisces", marsSign: "Aries",
    isManglik: true,
    interests: ["Art", "Cooking", "Movies", "Meditation", "Writing"],
    passions: ["Mental Health Advocacy", "Poetry", "Ocean Conservation"],
    hobbies: ["Painting", "Singing", "Stargazing"],
    openingMove: "What song is stuck in your head right now? 🎵",
    lookingFor: "Marriage",
    bio: "Therapist in training. I believe the stars know more than we think. Looking for my forever person.",
    verified: true,
  },
  {
    id: 3, name: "Kavya Reddy", age: 28, city: "Delhi", distance: "7km",
    photo: "/profiles/kavya.png", avatar: "👩‍💼",
    job: "Product Manager", education: "IIM Ahmedabad", height: "5'7\"",
    sunSign: "Capricorn", moonSign: "Virgo", ascendant: "Taurus",
    nakshatra: "Hasta", venusSign: "Sagittarius", marsSign: "Leo",
    isManglik: false,
    interests: ["Fitness", "Tech", "Coffee", "Hiking", "Fashion"],
    passions: ["Women in Tech", "Running", "Investing"],
    hobbies: ["Coding", "Cycling", "Photography"],
    openingMove: "Pitch me your startup idea in one sentence 🚀",
    lookingFor: "Serious Dating",
    bio: "PM at a fintech. Weekend trail runner. Capricorn who actually laughs. Looking for ambition + kindness.",
    verified: true,
  },
  {
    id: 4, name: "Meera Joshi", age: 25, city: "Pune", distance: "5km",
    photo: "/profiles/meera.png", avatar: "👩‍🎨",
    job: "UX Designer", education: "NID Ahmedabad", height: "5'5\"",
    sunSign: "Libra", moonSign: "Gemini", ascendant: "Leo",
    nakshatra: "Swati", venusSign: "Scorpio", marsSign: "Gemini",
    isManglik: false,
    interests: ["Live Music", "Art", "Travel", "Foodie", "Pets"],
    passions: ["Design Thinking", "Animal Rescue", "Minimalism"],
    hobbies: ["Painting", "Pottery", "Gardening"],
    openingMove: "Are you a chai person or a filter coffee person? ☕",
    lookingFor: "Long-term Relationship",
    bio: "UX designer who talks to plants. Looking for my favorite notification. Must love dogs.",
    verified: true,
  },
  {
    id: 5, name: "Shreya Nair", age: 27, city: "Hyderabad", distance: "3km",
    photo: "/profiles/shreya.png", avatar: "👩‍🔬",
    job: "Neuroscientist", education: "IISc Bangalore", height: "5'3\"",
    sunSign: "Scorpio", moonSign: "Pisces", ascendant: "Cancer",
    nakshatra: "Anuradha", venusSign: "Libra", marsSign: "Capricorn",
    isManglik: true,
    interests: ["Reading", "Meditation", "Cooking", "Movies", "Yoga"],
    passions: ["Neuroscience", "Vedic Philosophy", "Slow Living"],
    hobbies: ["Journaling", "Baking", "Stargazing"],
    openingMove: "What's the last thing that made you genuinely laugh? 😄",
    lookingFor: "Marriage",
    bio: "Neuroscientist who reads Rumi. Double Manglik, but make it cool. Depth over everything.",
    verified: true,
  },
  {
    id: 6, name: "Rhea Kapoor", age: 23, city: "Bangalore", distance: "6km",
    photo: "/profiles/rhea.png", avatar: "💃",
    job: "Travel Blogger", education: "Christ University", height: "5'8\"",
    sunSign: "Sagittarius", moonSign: "Aries", ascendant: "Sagittarius",
    nakshatra: "Moola", venusSign: "Capricorn", marsSign: "Sagittarius",
    isManglik: false,
    interests: ["Travel", "Dance", "Photography", "Fitness", "Gaming"],
    passions: ["Solo Travel", "Street Photography", "Martial Arts"],
    hobbies: ["Swimming", "Cycling", "Singing"],
    openingMove: "If money and time weren't a thing, where would you be right now? ✈️",
    lookingFor: "Serious Dating",
    bio: "Nomad at heart. 14 countries and counting. Let's add to the list together.",
    verified: false,
  },
  {
    id: 7, name: "Aisha Khan", age: 25, city: "Chennai", distance: "8km",
    photo: "/profiles/priya.png", avatar: "👧",
    job: "ML Engineer", education: "IIT Madras", height: "5'5\"",
    sunSign: "Aquarius", moonSign: "Leo", ascendant: "Aquarius",
    nakshatra: "Dhanishta", venusSign: "Aquarius", marsSign: "Libra",
    isManglik: false,
    interests: ["Tech", "Gaming", "Movies", "Photography", "Coffee"],
    passions: ["AI Ethics", "Science Fiction", "Open Source"],
    hobbies: ["Coding", "Stargazing", "Journaling"],
    openingMove: "Hot take: the best conversations happen after midnight 🌙",
    lookingFor: "Open to Anything",
    bio: "ML engineer by passion. Futurist by nature. Looking for someone who thinks differently.",
    verified: true,
  },
  {
    id: 8, name: "Diya Malhotra", age: 26, city: "Jaipur", distance: "4km",
    photo: "/profiles/ananya.png", avatar: "👩‍🦰",
    job: "Heritage Architect", education: "SPA Delhi", height: "5'4\"",
    sunSign: "Cancer", moonSign: "Scorpio", ascendant: "Pisces",
    nakshatra: "Ashlesha", venusSign: "Cancer", marsSign: "Taurus",
    isManglik: false,
    interests: ["Cooking", "Reading", "Yoga", "Art", "Pets"],
    passions: ["Heritage Conservation", "Poetry", "Home Cooking"],
    hobbies: ["Baking", "Gardening", "Painting"],
    openingMove: "What's a meal from your childhood you'd never get tired of? 🍲",
    lookingFor: "Marriage",
    bio: "Heritage architect who thinks old buildings have the best love stories. Homebody with a heart of gold.",
    verified: true,
  },
  {
    id: 9, name: "Nisha Gupta", age: 29, city: "Mumbai", distance: "3km",
    photo: "/profiles/kavya.png", avatar: "🧑‍💻",
    job: "VC Analyst", education: "ISB Hyderabad", height: "5'6\"",
    sunSign: "Virgo", moonSign: "Capricorn", ascendant: "Virgo",
    nakshatra: "Hasta", venusSign: "Leo", marsSign: "Virgo",
    isManglik: true,
    interests: ["Fitness", "Coffee", "Reading", "Hiking", "Tech"],
    passions: ["Venture Capital", "Marathons", "Financial Literacy"],
    hobbies: ["Cycling", "Photography", "Swimming"],
    openingMove: "Rate your day 1-10 and tell me why 📊",
    lookingFor: "Serious Dating",
    bio: "VC analyst who runs half-marathons. I optimize everything — except my sleep schedule.",
    verified: true,
  },
  {
    id: 10, name: "Zara Patel", age: 24, city: "Pune", distance: "5km",
    photo: "/profiles/meera.png", avatar: "🎭",
    job: "Content Creator", education: "Symbiosis", height: "5'5\"",
    sunSign: "Gemini", moonSign: "Aquarius", ascendant: "Gemini",
    nakshatra: "Ardra", venusSign: "Taurus", marsSign: "Aquarius",
    isManglik: false,
    interests: ["Live Music", "Writing", "Travel", "Movies", "Dance"],
    passions: ["Stand-up Comedy", "Indie Music", "Storytelling"],
    hobbies: ["Singing", "Journaling", "Photography"],
    openingMove: "Tell me something random you learned this week 🤓",
    lookingFor: "Long-term Relationship",
    bio: "Content creator with a comedy problem. I'll make you laugh before I make you dinner.",
    verified: false,
  },
];

export const COMPATIBILITY_NARRATIVES = {
  high: "Your charts reveal a rare alignment — the kind astrologers write about. Your Moon signs create an emotional resonance that means you'll intuitively understand each other's needs without words. The Graha Maitri (mental friendship) score suggests conversations that flow effortlessly from philosophy to food to future plans. One area to navigate: both charts show strong Mars placements, which means passionate debates are inevitable — but that's also what keeps the spark alive.",
  medium: "There's a compelling tension in your charts — the kind that creates growth. Your strengths lie in emotional compatibility (your Moon signs are naturally harmonious), while the friction comes from different approaches to decision-making. The good news? Your Gana compatibility shows you handle conflict in complementary ways. The AI suggests: lean into your shared interests early, and let the deeper planetary rhythms build trust over time.",
  low: "Your charts present an interesting challenge — not a dealbreaker, but definitely a 'growth opportunity.' The lower Bhakoot score suggests different emotional rhythms, but your strong Tara compatibility means destiny has brought you together for a reason. The AI recommendation: focus on what your Graha Maitri reveals about mental connection, and don't let the numbers overshadow genuine chemistry."
};

export const GUNA_EXPLANATIONS = {
  varna: { full: "Varna represents spiritual compatibility and ego harmony. A full score means both partners approach life with similar levels of spiritual maturity and mutual respect.", weak: "Different ego wavelengths can lead to power dynamics. Practice active conscious equality." },
  vashya: { full: "Strong Vashya means natural magnetic attraction — you'll feel drawn to each other without effort.", weak: "Low Vashya means the initial attraction spark may need conscious nurturing through quality time." },
  tara: { full: "Perfect Tara alignment indicates destiny favors this union. Timing and luck will be on your side.", weak: "Tara friction means some timing challenges — plan important moments carefully." },
  yoni: { full: "Maximum Yoni compatibility signals exceptional physical and intimate chemistry between you.", weak: "Yoni mismatch means physical intimacy styles differ. Open communication about desires is key." },
  grahaMaitri: { full: "Perfect Graha Maitri — your minds are natural friends. Expect effortless intellectual connection and understanding.", weak: "Mental wavelengths differ — you'll need to actively build shared intellectual pursuits." },
  gana: { full: "Identical temperaments — you handle joy, stress, and celebration in harmonious ways.", weak: "Different temperament styles. One may be more social while the other is introspective. Both are valid." },
  bhakoot: { full: "Emotional rhythms are perfectly synchronized. You naturally feel what the other needs.", weak: "Emotional cycles may clash at times. Give each other space during stress — it always passes." },
  nadi: { full: "Excellent genetic compatibility — strong health indicators for progeny. Deep constitutional harmony.", weak: "Same Nadi can indicate too much similarity in constitution. Remedies include specific mantras and rituals." }
};

export const WINGMAN_ICEBREAKERS = [
  { trigger: "Moon in Taurus", msg: "You both have a love of comfort — ask: 'What's your ultimate comfort meal after a long day?'" },
  { trigger: "Venus in Libra", msg: "Your Venus signs crave beauty — try: 'What's the most beautiful place you've ever visited?'" },
  { trigger: "Fire signs match", msg: "Two fire signs! Match that energy: 'If we had to plan an adventure this weekend, what are we doing?'" },
  { trigger: "Strong Nadi", msg: "Your genetic compatibility is off the charts — playfully ask: 'Our charts say our kids would be amazing. Too soon? 😂'" },
  { trigger: "Shared Mercury", msg: "Your communication styles align — try: 'I have a theory about [shared interest]. Want to hear it?'" },
  { trigger: "Moon-Venus harmony", msg: "Emotional + romantic chemistry! Try: 'Describe your perfect lazy Sunday in exactly 3 words'" },
  { trigger: "High Guna score", msg: "With this compatibility level, keep it fun: 'The stars say we should grab coffee. Who am I to argue with the cosmos?'" },
  { trigger: "Nakshatra sync", msg: "Your Nakshatras resonate — ask: 'Do you ever look at the night sky and wonder if someone's looking at the same star?'" },
];

export const WEEKLY_FORECAST = {
  overall: { mood: "☀️", label: "Sunny — Great week for connection!" },
  narrative: "Venus entering your 5th house this week means romance is peaking. Plan something creative together — art gallery, cooking class, or stargazing. Avoid heavy financial discussions on Wednesday (Saturn square). Weekend conversations will flow naturally into deeper territory. Trust the timing.",
  days: [
    { day: "Mon", emoji: "🌤", note: "Ease into the week — light topics" },
    { day: "Tue", emoji: "☀️", note: "Great day for a call or video chat" },
    { day: "Wed", emoji: "⛅", note: "Avoid money talk — Saturn's influence" },
    { day: "Thu", emoji: "☀️", note: "Your Moon sync is strongest today" },
    { day: "Fri", emoji: "🌟", note: "Best date night of the week!" },
    { day: "Sat", emoji: "☀️", note: "Deep conversations flow naturally" },
    { day: "Sun", emoji: "🌤", note: "Recharge — plan the week ahead" },
  ]
};

export const INTERESTS_LIST = [
  { emoji: "☕", label: "Coffee" }, { emoji: "💃", label: "Dance" },
  { emoji: "📚", label: "Reading" }, { emoji: "🎵", label: "Live Music" },
  { emoji: "🧘", label: "Yoga" }, { emoji: "✈️", label: "Travel" },
  { emoji: "🎨", label: "Art" }, { emoji: "🍳", label: "Cooking" },
  { emoji: "💪", label: "Fitness" }, { emoji: "📸", label: "Photography" },
  { emoji: "🎮", label: "Gaming" }, { emoji: "🎬", label: "Movies" },
  { emoji: "🥾", label: "Hiking" }, { emoji: "🐕", label: "Pets" },
  { emoji: "🍜", label: "Foodie" }, { emoji: "🧘", label: "Meditation" },
  { emoji: "⚽", label: "Sports" }, { emoji: "👗", label: "Fashion" },
  { emoji: "💻", label: "Tech" }, { emoji: "✍️", label: "Writing" },
];

export const HOBBIES_LIST = [
  "Classical Dance", "Baking", "Journaling", "Stargazing", "Gardening",
  "Painting", "Singing", "Coding", "Cycling", "Swimming", "Photography", "Pottery"
];

export const AVATARS = ["👨", "👩", "🧑", "👨‍💻", "👩‍🎨", "🧑‍🔬"];
