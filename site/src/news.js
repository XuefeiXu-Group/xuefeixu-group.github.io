// A date can be YYYY-MM-DD or a year when the exact date is unknown.
const stories = [
  {
    id: "2026-mid-autumn-celebration",
    category: "Group activities",
    title: "Mid-Autumn Festival with the Xu Group",
    date: "2026",
    photos: [
      { src: "/assets/gallery/group-2026-mid-autumn.webp", alt: "Xu Group members posing together with the red bowls used for the Mid-Autumn dice game." },
    ],
    summary: "The group celebrated the Mid-Autumn Festival over a round of bobing, a traditional dice game. Bowen Zhang and Chang Qi both rolled the top prize.",
    body: [
      "For our 2026 Mid-Autumn get-together, we gathered around the table for bobing, a dice game traditionally played in Xiamen. We took turns rolling six dice and chose prizes from the tier that matched each roll. One of the most popular prizes was Pengchao Zhang’s “token pack” (a cash red envelope), widely regarded as a timely investment in the group’s AI explorations.",
      "Congratulations to Bowen Zhang and Chang Qi on their zhuangyuan rolls, the highest prize tier. We wish Bowen a smooth graduation and Chang a great first year of graduate school!",
    ],
  },
  {
    id: "2025-sports-day",
    category: "Group activities",
    title: "Faculty and Student Sports Day",
    date: "2025",
    photos: [
      { src: "/assets/gallery/group-2025-sports-race.webp", alt: "Four teammates lining up side by side for the four-person, five-legged race." },
      { src: "/assets/gallery/group-2025-sports-dribbling.webp", alt: "A participant dribbling a football around poles on an outdoor court." },
    ],
    summary: "Our group joined the Department of Energy and Power Engineering’s 2025 sports day for team races, football dribbling, and group rope skipping.",
    body: [
      "Faculty and students in the Xu Group took part in the Department of Energy and Power Engineering’s 2025 sports day. Four teammates had to find a shared rhythm in the five-legged race, while the football dribbling challenge called for quick turns around a series of poles.",
      "The group also tried the caterpillar-track race, moving forward together inside a continuous loop of fabric, and took turns in group rope skipping. Thanks to everyone who joined in and cheered from the sidelines!",
    ],
  },
];

export const newsItems = stories.sort((a, b) => b.date.localeCompare(a.date));
