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
  return object?.[`${key}${suffix}`] || object?.[`${key}En`] || "";
}

function setTextIfPresent(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
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
  setTextIfPresent("language-switch", isArabic ? "English" : "العربية");

  // Service cards are the critical guest content. Render them first so an
  // optional header or filter issue can never hide all hotel services.
  renderContent();

  try {
    renderStaticText();
  } catch (error) {
    console.warn("Optional portal text could not be updated", error);
  }

  try {
    renderCategories();
  } catch (error) {
    console.warn("Optional category filters could not be rendered", error);
  }
}

function renderStaticText() {
  if (!state.content?.hotel) return;
  const hotel = state.content.hotel;
  const copy = text[state.language];
  setTextIfPresent("hotel-name", localized(hotel, "name"));
  setTextIfPresent("portal-label", copy.portalLabel);
  setTextIfPresent("welcome", localized(hotel, "welcome"));
  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) heroTitle.innerHTML = copy.heroTitle.replace("\n", "<br>");
  setTextIfPresent("subtitle", localized(hotel, "subtitle"));
  const search = document.getElementById("portal-search");
  if (search) search.placeholder = copy.search;
  setTextIfPresent("assistance-title", copy.assistanceTitle);
  setTextIfPresent("assistance-copy", copy.assistanceCopy);
  setTextIfPresent("footer-copy", copy.footer);
}

function renderCategories() {
  const pills = document.getElementById("category-pills");
  if (!pills || !Array.isArray(state.content?.categories)) return;
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
  renderContent();
  try {
    renderCategories();
  } catch (error) {
    console.warn("Category filters could not be refreshed", error);
  }
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
  if (!root || !Array.isArray(state.content?.categories)) return;
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
  const root = document.getElementById("portal-content");
  try {
    const response = await fetch(new URL("content.json", window.location.href), { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const content = await response.json();
    if (!content || !Array.isArray(content.categories)) throw new Error("Invalid portal content structure");
    state.content = content;
  } catch (error) {
    console.error("Portal content request failed", error);
    if (root) root.innerHTML = '<div class="empty-state">The hotel-services portal could not be loaded. Please contact Reception.</div>';
    return;
  }

  // Loading succeeded. From this point, UI enhancement errors must not replace
  // the successfully loaded service data with a false loading-error message.
  try {
    setLanguage(state.language);
  } catch (error) {
    console.error("Portal interface setup failed", error);
    renderContent();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("language-switch")?.addEventListener("click", () => {
    setLanguage(state.language === "ar" ? "en" : "ar");
  });

  document.getElementById("portal-search")?.addEventListener("input", (event) => {
    state.search = event.target.value.trim().toLowerCase();
    renderContent();
  });

  loadPortal();
});
