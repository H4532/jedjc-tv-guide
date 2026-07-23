const state = {
  content: null,
  language: localStorage.getItem("jedjcPortalLanguage") || "en",
  activeCategory: "all",
  search: ""
};

const text = {
  en: {
    portalLabel: "Hotel Services",
    heroTitle: "Hotel services\nin one place.",
    search: "Search hotel services",
    all: "All",
    assistanceTitle: "Need assistance?",
    assistanceCopy: "Contact Reception from your room phone.",
    footer: "Available throughout your stay",
    empty: "No matching service was found."
  },
  ar: {
    portalLabel: "خدمات الفندق",
    heroTitle: "خدمات الفندق\nفي مكان واحد.",
    search: "ابحث في خدمات الفندق",
    all: "الكل",
    assistanceTitle: "هل تحتاج إلى مساعدة؟",
    assistanceCopy: "يرجى التواصل مع الاستقبال من هاتف الغرفة.",
    footer: "متاح طوال فترة إقامتكم",
    empty: "لم يتم العثور على خدمة مطابقة."
  }
};

function localized(object, key) {
  const suffix = state.language === "ar" ? "Ar" : "En";
  return object[`${key}${suffix}`] || object[`${key}En`] || "";
}

function safeUrl(url) {
  if (!url) return "";
  try {
    const parsed = new URL(url, window.location.href);
    if (["http:", "https:", "tel:", "mailto:"].includes(parsed.protocol)) return parsed.href;
  } catch (_) {
    return "";
  }
  return "";
}

function setLanguage(language) {
  state.language = language;
  localStorage.setItem("jedjcPortalLanguage", language);
  const isArabic = language === "ar";
  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.getElementById("language-switch").textContent = isArabic ? "English" : "العربية";
  renderStaticText();
  renderCategories();
  renderContent();
}

function renderStaticText() {
  const hotel = state.content.hotel;
  const copy = text[state.language];
  document.getElementById("hotel-name").textContent = localized(hotel, "name");
  document.getElementById("portal-label").textContent = copy.portalLabel;
  document.getElementById("welcome").textContent = localized(hotel, "welcome");
  document.getElementById("hero-title").innerHTML = copy.heroTitle.replace("\n", "<br>");
  document.getElementById("subtitle").textContent = localized(hotel, "subtitle");
  document.getElementById("portal-search").placeholder = copy.search;
  document.getElementById("assistance-title").textContent = copy.assistanceTitle;
  document.getElementById("assistance-copy").textContent = copy.assistanceCopy;
  document.getElementById("footer-copy").textContent = copy.footer;
}

function renderCategories() {
  const pills = document.getElementById("category-pills");
  const copy = text[state.language];
  pills.replaceChildren();

  const all = document.createElement("button");
  all.type = "button";
  all.className = `category-pill${state.activeCategory === "all" ? " active" : ""}`;
  all.textContent = copy.all;
  all.addEventListener("click", () => selectCategory("all"));
  pills.appendChild(all);

  state.content.categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `category-pill${state.activeCategory === category.id ? " active" : ""}`;
    button.textContent = `${category.icon || ""} ${localized(category, "title")}`.trim();
    button.addEventListener("click", () => selectCategory(category.id));
    pills.appendChild(button);
  });
}

function selectCategory(categoryId) {
  state.activeCategory = categoryId;
  renderCategories();
  renderContent();
}

function matchesSearch(item) {
  if (!state.search) return true;
  const haystack = [item.titleEn, item.titleAr, item.descriptionEn, item.descriptionAr]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(state.search);
}

function createServiceCard(item) {
  const url = safeUrl(item.url);
  const card = document.createElement(url ? "a" : "div");
  card.className = `service-card${item.featured ? " featured" : ""}${url ? "" : " disabled"}`;
  if (url) {
    card.href = url;
    if (url.startsWith("http")) {
      card.target = "_blank";
      card.rel = "noopener";
    }
  }

  const icon = document.createElement("span");
  icon.className = "service-icon";
  icon.textContent = item.icon || "↗";

  const serviceCopy = document.createElement("div");
  serviceCopy.className = "service-copy";

  const titleRow = document.createElement("div");
  titleRow.className = "service-title-row";
  const title = document.createElement("h3");
  title.textContent = localized(item, "title");
  titleRow.appendChild(title);

  const badgeText = localized(item, "badge");
  if (badgeText) {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = badgeText;
    titleRow.appendChild(badge);
  }

  const description = document.createElement("p");
  description.textContent = localized(item, "description");
  serviceCopy.append(titleRow, description);

  const arrow = document.createElement("span");
  arrow.className = "service-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.textContent = url ? "›" : "·";

  card.append(icon, serviceCopy, arrow);
  return card;
}

function renderContent() {
  const root = document.getElementById("portal-content");
  root.replaceChildren();
  let visibleCount = 0;

  state.content.categories.forEach((category) => {
    if (state.activeCategory !== "all" && state.activeCategory !== category.id) return;
    const items = (category.items || []).filter((item) => item.active !== false && matchesSearch(item));
    if (!items.length) return;

    const section = document.createElement("section");
    section.className = "portal-section";
    section.id = category.id;

    const heading = document.createElement("div");
    heading.className = "section-heading";
    const headingIcon = document.createElement("span");
    headingIcon.textContent = category.icon || "";
    const headingTitle = document.createElement("h2");
    headingTitle.textContent = localized(category, "title");
    heading.append(headingIcon, headingTitle);

    const grid = document.createElement("div");
    grid.className = "service-grid";
    items.forEach((item) => {
      grid.appendChild(createServiceCard(item));
      visibleCount += 1;
    });

    section.append(heading, grid);
    root.appendChild(section);
  });

  if (!visibleCount) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = text[state.language].empty;
    root.appendChild(empty);
  }
}

async function loadPortal() {
  try {
    const response = await fetch(`content.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    state.content = await response.json();
    setLanguage(state.language);
  } catch (error) {
    console.error(error);
    document.getElementById("portal-content").innerHTML = '<div class="empty-state">The hotel-services portal could not be loaded. Please contact Reception.</div>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("language-switch").addEventListener("click", () => {
    setLanguage(state.language === "ar" ? "en" : "ar");
  });

  document.getElementById("portal-search").addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    renderContent();
  });

  loadPortal();
});