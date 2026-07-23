const channels = [
  { number: 1, name: "Hotel TV", arabic: "قناة الفندق", category: "Information" },
  { number: 2, name: "Saudi TV", arabic: "قناة السعودية", category: "Saudi Arabia", hd: true },
  { number: 3, name: "Thikrayat", arabic: "قناة ذكريات", category: "Saudi Arabia", hd: true },
  { number: 4, name: "SBC", category: "Saudi Arabia", hd: true },
  { number: 5, name: "Al Ekhbariya", arabic: "قناة الإخبارية", category: "Saudi Arabia", hd: true },
  { number: 6, name: "Saudia Alaan", arabic: "السعودية الآن", category: "Saudi Arabia", hd: true },
  { number: 7, name: "Quran Channel", arabic: "قناة القرآن الكريم", category: "Saudi Arabia", hd: true },
  { number: 8, name: "Sunnah Channel", arabic: "قناة السنة النبوية", category: "Saudi Arabia", hd: true },
  { number: 9, name: "KSA Sports 1", arabic: "الرياضية السعودية 1", category: "Saudi Arabia", hd: true },
  { number: 10, name: "KSA Sports 2", arabic: "الرياضية السعودية 2", category: "Saudi Arabia", hd: true },
  { number: 11, name: "KSA Sports 3", arabic: "الرياضية السعودية 3", category: "Saudi Arabia", hd: true },
  { number: 12, name: "Ministry of Health", arabic: "وزارة الصحة", category: "Information" },
  { number: 13, name: "Dubai Sports 1", category: "Sports", hd: true },
  { number: 14, name: "Dubai Sports 2", category: "Sports", hd: true },
  { number: 15, name: "Dubai One", category: "Entertainment & Family", hd: true },
  { number: 16, name: "Sky News Arabia Radio", category: "News" },
  { number: 17, name: "Euronews", category: "News" },
  { number: 18, name: "Cartoon Network Arabia", category: "Entertainment & Family" },
  { number: 19, name: "Sky News Arabia", category: "News", hd: true },
  { number: 20, name: "Al Jazeera Mubasher", category: "News", hd: true },
  { number: 21, name: "Al Jazeera Mubasher 2", category: "News", hd: true },
  { number: 22, name: "Al Jazeera", category: "News", hd: true },
  { number: 23, name: "Al Jazeera English", category: "News", hd: true },
  { number: 24, name: "Al Jazeera Documentary", category: "Documentary & Culture", hd: true },
  { number: 25, name: "Asharq News", category: "News", hd: true },
  { number: 26, name: "Asharq Documentary", category: "Documentary & Culture", hd: true },
  { number: 27, name: "Asharq Discovery", category: "Documentary & Culture", hd: true },
  { number: 28, name: "National Geographic", category: "Documentary & Culture" },
  { number: 29, name: "Sama Dubai", category: "Entertainment & Family", hd: true },
  { number: 30, name: "Dubai TV", category: "Entertainment & Family", hd: true },
  { number: 31, name: "Zee Alwan", category: "Entertainment & Family" },
  { number: 32, name: "Al Jadeed TV", category: "Entertainment & Family", hd: true },
  { number: 33, name: "MTV Lebanon", category: "Entertainment & Family", hd: true },
  { number: 34, name: "One", category: "Entertainment & Family" },
  { number: 35, name: "Arabica", category: "Entertainment & Family" },
  { number: 36, name: "LBC International", category: "Entertainment & Family" },
  { number: 37, name: "Dubai Racing 1", category: "Sports", hd: true },
  { number: 38, name: "Dubai Racing 2", category: "Sports", hd: true },
  { number: 39, name: "Tivi5Monde", category: "Documentary & Culture", hd: true },
  { number: 40, name: "TV5Monde Maghreb-Orient", category: "Documentary & Culture", hd: true },
  { number: 41, name: "Tivi5Monde", category: "Documentary & Culture" },
  { number: 42, name: "France 24 Arabic", category: "News", hd: true },
  { number: 43, name: "France 24 Français", category: "News", hd: true },
  { number: 44, name: "France 24 English", category: "News", hd: true },
  { number: 45, name: "BBC Arabic", category: "News", hd: true },
  { number: 46, name: "BBC News", category: "News" },
  { number: 47, name: "TRT Arabi", category: "News", hd: true },
  { number: 48, name: "TRT World", category: "News", hd: true },
  { number: 49, name: "CGTN Arabic", category: "News", hd: true },
  { number: 50, name: "Al Arabiya", category: "News" },
  { number: 51, name: "Al Arabiya Business", category: "News" },
  { number: 52, name: "Al Mashhad", category: "News" },
  { number: 53, name: "ERI TV", category: "Entertainment & Family" },
  { number: 54, name: "SSad TV", category: "News" },
  { number: 55, name: "RTI 1", category: "Entertainment & Family" },
  { number: 56, name: "Alaan TV", category: "Entertainment & Family", hd: true },
  { number: 57, name: "Libya Al Wataniya", category: "Entertainment & Family" },
  { number: 58, name: "LTV", category: "Entertainment & Family" },
  { number: 59, name: "ZAD TV", category: "Entertainment & Family" },
  { number: 60, name: "Thmanyah 1", arabic: "ثمانية 1", category: "New Media" },
  { number: 61, name: "Thmanyah 2", arabic: "ثمانية 2", category: "New Media" },
  { number: 62, name: "Thmanyah 3", arabic: "ثمانية 3", category: "New Media" },
  { number: 63, name: "Alkass One", category: "Sports", hd: true },
  { number: 64, name: "Alkass Two", category: "Sports", hd: true },
  { number: 65, name: "Alkass Four", category: "Sports", hd: true },
  { number: 66, name: "MBC 1", category: "Entertainment & Family" },
  { number: 67, name: "MBC 4", category: "Entertainment & Family" },
  { number: 68, name: "MBC Drama", category: "Entertainment & Family" },
  { number: 69, name: "MBC Bollywood", category: "Entertainment & Family" },
  { number: 70, name: "MBC 2", category: "Entertainment & Family" },
  { number: 71, name: "MBC Action", category: "Entertainment & Family" },
  { number: 72, name: "MBC Max", category: "Entertainment & Family" },
  { number: 73, name: "MBC 3", category: "Entertainment & Family" },
  { number: 74, name: "Wanasah", category: "Entertainment & Family" },
  { number: 75, name: "HDMI / Analogue", category: "Information" },
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

function render() {
  const query = searchInput.value.trim();
  const normalized = query.toLocaleLowerCase();
  const filtered = channels.filter((channel) => {
    const matchesCategory = activeCategory === "All" || channel.category === activeCategory;
    const matchesQuery = !normalized ||
      channel.name.toLocaleLowerCase().includes(normalized) ||
      (channel.arabic && channel.arabic.includes(query)) ||
      String(channel.number) === normalized;
    return matchesCategory && matchesQuery;
  });

  filters.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.category === activeCategory);
  });

  channelGrid.innerHTML = filtered.map((channel) => {
    const localClass = channel.category === "Saudi Arabia" ? " local" : "";
    const arabic = channel.arabic ? `<p lang="ar" dir="rtl">${escapeHtml(channel.arabic)}</p>` : "";
    const hd = channel.hd ? '<span class="hd">HD</span>' : "";
    return `<article class="channel-card${localClass}">
      <div class="channel-number">${String(channel.number).padStart(2, "0")}</div>
      <div class="channel-name"><h3>${escapeHtml(channel.name)}</h3>${arabic}</div>
      <div class="channel-meta">${hd}
        <span class="category-dot" title="${escapeHtml(categoryLabels[channel.category].en)}"></span>
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
