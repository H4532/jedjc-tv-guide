const channels = [
  { number: 1, name: "Hotel TV", arabic: "قناة الفندق", category: "Information" },
  { number: 2, name: "Saudi TV", arabic: "قناة السعودية", category: "Saudi Arabia" },
  { number: 3, name: "Thikrayat", arabic: "قناة ذكريات", category: "Saudi Arabia" },
  { number: 4, name: "SBC", arabic: "إس بي سي", category: "Saudi Arabia" },
  { number: 5, name: "Al Ekhbariya", arabic: "قناة الإخبارية", category: "Saudi Arabia" },
  { number: 6, name: "Saudia Alaan", arabic: "السعودية الآن", category: "Saudi Arabia" },
  { number: 7, name: "Quran Channel", arabic: "قناة القرآن الكريم", category: "Saudi Arabia" },
  { number: 8, name: "Sunnah Channel", arabic: "قناة السنة النبوية", category: "Saudi Arabia" },
  { number: 9, name: "KSA Sports 1", arabic: "الرياضية السعودية 1", category: "Saudi Arabia" },
  { number: 10, name: "KSA Sports 2", arabic: "الرياضية السعودية 2", category: "Saudi Arabia" },
  { number: 11, name: "KSA Sports 3", arabic: "الرياضية السعودية 3", category: "Saudi Arabia" },
  { number: 12, name: "Ministry of Health", arabic: "وزارة الصحة", category: "Information" },
  { number: 13, name: "Dubai Sports 1", arabic: "دبي الرياضية 1", category: "Sports" },
  { number: 14, name: "Dubai Sports 2", arabic: "دبي الرياضية 2", category: "Sports" },
  { number: 15, name: "Dubai One", arabic: "دبي ون", category: "Entertainment & Family" },
  { number: 16, name: "Sky News Arabia Radio", arabic: "راديو سكاي نيوز عربية", category: "News" },
  { number: 17, name: "Euronews", arabic: "يورونيوز", category: "News" },
  { number: 18, name: "Cartoon Network Arabia", arabic: "كرتون نتورك بالعربية", category: "Entertainment & Family" },
  { number: 19, name: "Sky News Arabia", arabic: "سكاي نيوز عربية", category: "News" },
  { number: 20, name: "Al Jazeera Mubasher", arabic: "الجزيرة مباشر", category: "News" },
  { number: 21, name: "Al Jazeera Mubasher 2", arabic: "الجزيرة مباشر 2", category: "News" },
  { number: 22, name: "Al Jazeera", arabic: "الجزيرة", category: "News" },
  { number: 23, name: "Al Jazeera English", arabic: "الجزيرة الإنجليزية", category: "News" },
  { number: 24, name: "Al Jazeera Documentary", arabic: "الجزيرة الوثائقية", category: "Documentary & Culture" },
  { number: 25, name: "Asharq News", arabic: "الشرق للأخبار", category: "News" },
  { number: 26, name: "Asharq Documentary", arabic: "الشرق الوثائقية", category: "Documentary & Culture" },
  { number: 27, name: "Asharq Discovery", arabic: "الشرق ديسكفري", category: "Documentary & Culture" },
  { number: 28, name: "National Geographic", arabic: "ناشيونال جيوغرافيك", category: "Documentary & Culture" },
  { number: 29, name: "Sama Dubai", arabic: "سما دبي", category: "Entertainment & Family" },
  { number: 30, name: "Dubai TV", arabic: "تلفزيون دبي", category: "Entertainment & Family" },
  { number: 31, name: "Zee Alwan", arabic: "زي ألوان", category: "Entertainment & Family" },
  { number: 32, name: "Al Jadeed TV", arabic: "الجديد", category: "Entertainment & Family" },
  { number: 33, name: "MTV Lebanon", arabic: "إم تي في لبنان", category: "Entertainment & Family" },
  { number: 34, name: "One", arabic: "ون", category: "Entertainment & Family" },
  { number: 35, name: "Arabica", arabic: "أرابيكا", category: "Entertainment & Family" },
  { number: 36, name: "LBC International", arabic: "إل بي سي إنترناشيونال", category: "Entertainment & Family" },
  { number: 37, name: "Dubai Racing 1", arabic: "دبي ريسينغ 1", category: "Sports" },
  { number: 38, name: "Dubai Racing 2", arabic: "دبي ريسينغ 2", category: "Sports" },
  { number: 39, name: "Tivi5Monde", arabic: "تيفي 5 موند", category: "Documentary & Culture" },
  { number: 40, name: "TV5Monde Maghreb-Orient", arabic: "تي في 5 موند المغرب والمشرق", category: "Documentary & Culture" },
  { number: 41, name: "Tivi5Monde", arabic: "تيفي 5 موند", category: "Documentary & Culture" },
  { number: 42, name: "France 24 Arabic", arabic: "فرانس 24 العربية", category: "News" },
  { number: 43, name: "France 24 Français", arabic: "فرانس 24 الفرنسية", category: "News" },
  { number: 44, name: "France 24 English", arabic: "فرانس 24 الإنجليزية", category: "News" },
  { number: 45, name: "BBC Arabic", arabic: "بي بي سي عربي", category: "News" },
  { number: 46, name: "BBC News", arabic: "بي بي سي نيوز", category: "News" },
  { number: 47, name: "TRT Arabi", arabic: "تي آر تي عربي", category: "News" },
  { number: 48, name: "TRT World", arabic: "تي آر تي وورلد", category: "News" },
  { number: 49, name: "CGTN Arabic", arabic: "سي جي تي إن العربية", category: "News" },
  { number: 50, name: "Al Arabiya", arabic: "العربية", category: "News" },
  { number: 51, name: "Al Arabiya Business", arabic: "العربية بزنس", category: "News" },
  { number: 52, name: "Al Mashhad", arabic: "المشهد", category: "News" },
  { number: 53, name: "ERI TV", arabic: "إري تي في", category: "Entertainment & Family" },
  { number: 54, name: "SSad TV", arabic: "إس ساد تي في", category: "News" },
  { number: 55, name: "RTI 1", arabic: "آر تي آي 1", category: "Entertainment & Family" },
  { number: 56, name: "Alaan TV", arabic: "قناة الآن", category: "Entertainment & Family" },
  { number: 57, name: "Libya Al Wataniya", arabic: "ليبيا الوطنية", category: "Entertainment & Family" },
  { number: 58, name: "LTV", arabic: "إل تي في", category: "Entertainment & Family" },
  { number: 59, name: "ZAD TV", arabic: "قناة زاد", category: "Entertainment & Family" },
  { number: 60, name: "Thmanyah 1", arabic: "ثمانية 1", category: "New Media" },
  { number: 61, name: "Thmanyah 2", arabic: "ثمانية 2", category: "New Media" },
  { number: 62, name: "Thmanyah 3", arabic: "ثمانية 3", category: "New Media" },
  { number: 63, name: "Alkass One", arabic: "الكأس 1", category: "Sports" },
  { number: 64, name: "Alkass Two", arabic: "الكأس 2", category: "Sports" },
  { number: 65, name: "Alkass Four", arabic: "الكأس 4", category: "Sports" },
  { number: 66, name: "MBC 1", arabic: "إم بي سي 1", category: "Entertainment & Family" },
  { number: 67, name: "MBC 4", arabic: "إم بي سي 4", category: "Entertainment & Family" },
  { number: 68, name: "MBC Drama", arabic: "إم بي سي دراما", category: "Entertainment & Family" },
  { number: 69, name: "MBC Bollywood", arabic: "إم بي سي بوليوود", category: "Entertainment & Family" },
  { number: 70, name: "MBC 2", arabic: "إم بي سي 2", category: "Entertainment & Family" },
  { number: 71, name: "MBC Action", arabic: "إم بي سي أكشن", category: "Entertainment & Family" },
  { number: 72, name: "MBC Max", arabic: "إم بي سي ماكس", category: "Entertainment & Family" },
  { number: 73, name: "MBC 3", arabic: "إم بي سي 3", category: "Entertainment & Family" },
  { number: 74, name: "Wanasah", arabic: "وناسة", category: "Entertainment & Family" },
  { number: 75, name: "HDMI / Analogue", arabic: "منفذ HDMI / بث تماثلي", category: "Information" },
];

const categoryLabels = {
  Information: { en: "Hotel information", ar: "معلومات الفندق" },
  "Saudi Arabia": { en: "Saudi channels", ar: "القنوات السعودية" },
  Sports: { en: "Sports", ar: "رياضة" },
  News: { en: "News", ar: "أخبار" },
  "Documentary & Culture": { en: "Documentary & culture", ar: "وثائقيات وثقافة" },
  "Entertainment & Family": { en: "Entertainment & family", ar: "ترفيه وعائلة" },
  "New Media": { en: "New media", ar: "إعلام جديد" },
};

const missingArabic = channels.filter((channel) => !channel.arabic?.trim());
if (channels.length !== 75 || missingArabic.length) {
  throw new Error(`Invalid bilingual channel data: ${channels.length} channels, ${missingArabic.length} missing Arabic names.`);
}

const categories = Object.keys(categoryLabels);
const searchInput = document.querySelector("#channel-search");
const filters = document.querySelector("#filters");
const channelGrid = document.querySelector("#channel-grid");
const emptyState = document.querySelector("#empty-state");
const showAllButton = document.querySelector("#show-all");
const channelCount = document.querySelector("#channel-count");
const sectionLabel = document.querySelector("#section-label");
const sectionLabelAr = document.querySelector("#section-label-ar");
let activeCategory = "All";

function createFilter(label, arabic, category) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.category = category;
  button.innerHTML = `<span>${label}</span><small lang="ar" dir="rtl">${arabic}</small>`;
  button.addEventListener("click", () => {
    activeCategory = category;
    render();
  });
  filters.append(button);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeSearch(value) {
  return String(value)
    .toLocaleLowerCase()
    .normalize("NFKD")
    .replace(/[\u064B-\u065F]/g, "")
    .trim();
}

function render() {
  const normalized = normalizeSearch(searchInput.value);
  const filtered = channels.filter((channel) => {
    const matchesCategory = activeCategory === "All" || channel.category === activeCategory;
    const searchable = normalizeSearch(`${channel.number} ${channel.name} ${channel.arabic}`);
    return matchesCategory && (!normalized || searchable.includes(normalized));
  });

  filters.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === activeCategory);
  });

  channelGrid.innerHTML = filtered.map((channel) => {
    const localClass = channel.category === "Saudi Arabia" ? " local" : "";
    return `<article class="channel-card${localClass}">
      <div class="channel-number">${String(channel.number).padStart(2, "0")}</div>
      <div class="channel-name">
        <h3>${escapeHtml(channel.name)}</h3>
        <p lang="ar" dir="rtl">${escapeHtml(channel.arabic)}</p>
      </div>
    </article>`;
  }).join("");

  channelCount.textContent = `${filtered.length} ${filtered.length === 1 ? "channel" : "channels"}`;
  const label = activeCategory === "All"
    ? { en: "Complete channel lineup", ar: "قائمة القنوات الكاملة" }
    : categoryLabels[activeCategory];
  sectionLabel.textContent = label.en;
  sectionLabelAr.textContent = label.ar;
  channelGrid.hidden = filtered.length === 0;
  emptyState.hidden = filtered.length !== 0;
}

createFilter("All", "الكل", "All");
categories.forEach((category) => createFilter(categoryLabels[category].en, categoryLabels[category].ar, category));
searchInput.addEventListener("input", render);
showAllButton.addEventListener("click", () => {
  searchInput.value = "";
  activeCategory = "All";
  render();
  searchInput.focus();
});
render();
