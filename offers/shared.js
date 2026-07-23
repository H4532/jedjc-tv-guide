const pageState = {
  data: null,
  language: localStorage.getItem("jedjcPortalLanguage") || "en",
  search: ""
};

function localized(object, key) {
  const suffix = pageState.language === "ar" ? "Ar" : "En";
  return object[`${key}${suffix}`] || object[`${key}En`] || "";
}

function safeUrl(value) {
  if (!value) return "";
  try {
    const parsed = new URL(value, window.location.href);
    if (["http:", "https:", "tel:", "mailto:"].includes(parsed.protocol)) return parsed.href;
  } catch (_) {
    return "";
  }
  return "";
}

function parseDate(value, endOfDay = false) {
  if (!value) return null;
  const parsed = new Date(`${value}T${endOfDay ? "23:59:59" : "00:00:00"}`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isCurrentlyVisible(item) {
  if (item.active === false) return false;
  const now = new Date();
  const start = parseDate(item.startDate);
  const end = parseDate(item.endDate, true);
  if (start && now < start) return false;
  if (end && now > end) return false;
  return true;
}

function formatDate(value) {
  if (!value) return "";
  const parsed = parseDate(value);
  if (!parsed) return value;
  return new Intl.DateTimeFormat(pageState.language === "ar" ? "ar-SA" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(parsed);
}

function setLanguage(language) {
  pageState.language = language;
  localStorage.setItem("jedjcPortalLanguage", language);
  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  const switcher = document.getElementById("language-switch");
  if (switcher) switcher.textContent = language === "ar" ? "English" : "العربية";
  renderStatic();
  renderCampaigns();
}

function renderStatic() {
  const data = pageState.data;
  if (!data) return;
  document.title = `${localized(data, "pageTitle")} | Holiday Inn Jeddah Corniche`;
  document.getElementById("page-eyebrow").textContent = localized(data, "eyebrow");
  document.getElementById("page-title").textContent = localized(data, "pageTitle");
  document.getElementById("page-title-ar").textContent = data.pageTitleAr || "";
  document.getElementById("page-description").textContent = localized(data, "description");
  document.getElementById("search-input").placeholder = pageState.language === "ar" ? "ابحث في المحتوى" : "Search this page";
  document.getElementById("sales-copy").textContent = pageState.language === "ar"
    ? "يمكن لفريق المبيعات تحديث الصور والمحتوى من مركز إدارة المبيعات."
    : "Sales team members can update photos and content from the Sales Content Center.";
  document.getElementById("sales-link").textContent = pageState.language === "ar" ? "فتح مركز إدارة المبيعات" : "Open Sales Content Center";
  document.getElementById("footer-copy").textContent = pageState.language === "ar"
    ? "قد تتغير العروض والفعاليات دون إشعار مسبق."
    : "Offers and events may change without notice.";
}

function createResponsiveImage(item) {
  const desktop = item.imageDesktop || item.image || item.imageMobile || "../placeholder-desktop.svg";
  const mobile = item.imageMobile || item.image || item.imageDesktop || "../placeholder-mobile.svg";

  const picture = document.createElement("picture");
  const mobileSource = document.createElement("source");
  mobileSource.media = "(max-width: 620px)";
  mobileSource.srcset = mobile;

  const image = document.createElement("img");
  image.loading = "lazy";
  image.decoding = "async";
  image.src = desktop;
  image.alt = localized(item, "imageAlt") || localized(item, "title");
  image.addEventListener("error", () => {
    mobileSource.srcset = "../placeholder-mobile.svg";
    image.src = "../placeholder-desktop.svg";
  }, { once: true });

  picture.append(mobileSource, image);
  return picture;
}

function createCampaignCard(item) {
  const article = document.createElement("article");
  article.className = `campaign-card${item.featured ? " featured" : ""}`;

  const media = document.createElement("div");
  media.className = "campaign-media";
  media.appendChild(createResponsiveImage(item));

  const tagText = localized(item, "tag");
  if (tagText) {
    const tag = document.createElement("span");
    tag.className = "campaign-tag";
    tag.textContent = tagText;
    media.appendChild(tag);
  }

  const body = document.createElement("div");
  body.className = "campaign-body";

  const titleRow = document.createElement("div");
  titleRow.className = "campaign-title-row";
  const titleBox = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = localized(item, "title");
  const arabicName = document.createElement("p");
  arabicName.className = "arabic-name";
  arabicName.dir = "rtl";
  arabicName.textContent = item.titleAr || "";
  titleBox.append(title, arabicName);
  titleRow.appendChild(titleBox);

  const description = document.createElement("p");
  description.className = "campaign-description";
  description.textContent = localized(item, "description");
  body.append(titleRow, description);

  const meta = document.createElement("div");
  meta.className = "campaign-meta";
  if (item.startDate || item.endDate) {
    const date = document.createElement("span");
    const start = formatDate(item.startDate);
    const end = formatDate(item.endDate);
    date.textContent = `📅 ${start}${start && end ? " – " : ""}${end}`;
    meta.appendChild(date);
  }

  const location = localized(item, "location");
  if (location) {
    const row = document.createElement("span");
    row.textContent = `📍 ${location}`;
    meta.appendChild(row);
  }

  const time = localized(item, "time");
  if (time) {
    const row = document.createElement("span");
    row.textContent = `🕒 ${time}`;
    meta.appendChild(row);
  }

  if (meta.childNodes.length) body.appendChild(meta);

  const ctaUrl = safeUrl(item.ctaUrl);
  if (ctaUrl) {
    const actions = document.createElement("div");
    actions.className = "campaign-actions";
    const link = document.createElement("a");
    link.className = "campaign-link";
    link.href = ctaUrl;
    link.target = ctaUrl.startsWith("http") ? "_blank" : "_self";
    link.rel = "noopener";
    link.textContent = localized(item, "ctaLabel") || (pageState.language === "ar" ? "اعرف المزيد" : "Learn more");
    actions.appendChild(link);
    body.appendChild(actions);
  }

  article.append(media, body);
  return article;
}

function renderCampaigns() {
  if (!pageState.data) return;
  const grid = document.getElementById("campaign-grid");
  grid.replaceChildren();
  const query = pageState.search.trim().toLowerCase();
  const visible = (pageState.data.items || [])
    .filter(isCurrentlyVisible)
    .filter(item => {
      if (!query) return true;
      return [
        item.titleEn,
        item.titleAr,
        item.descriptionEn,
        item.descriptionAr,
        item.locationEn,
        item.locationAr,
        item.tagEn,
        item.tagAr
      ].filter(Boolean).join(" ").toLowerCase().includes(query);
    });

  visible.forEach(item => grid.appendChild(createCampaignCard(item)));
  document.getElementById("campaign-count").textContent = pageState.language === "ar"
    ? `${visible.length} عنصر متاح`
    : `${visible.length} available`;
  document.getElementById("hero-count").textContent = String(visible.length);

  if (!visible.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    const strong = document.createElement("strong");
    strong.textContent = pageState.language === "ar" ? "لا يوجد محتوى متاح حالياً" : "No content is available right now";
    const copy = document.createElement("span");
    copy.textContent = pageState.language === "ar"
      ? "يرجى المراجعة لاحقاً أو التواصل مع الاستقبال."
      : "Please check again later or contact Reception.";
    empty.append(strong, copy);
    grid.appendChild(empty);
  }
}

async function loadPage() {
  try {
    const response = await fetch(`data.json?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    pageState.data = await response.json();
    setLanguage(pageState.language);
  } catch (error) {
    console.error(error);
    document.getElementById("campaign-grid").innerHTML = '<div class="empty-state"><strong>Content could not be loaded.</strong><span>Please contact Reception.</span></div>';
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("language-switch").addEventListener("click", () => {
    setLanguage(pageState.language === "ar" ? "en" : "ar");
  });
  document.getElementById("search-input").addEventListener("input", event => {
    pageState.search = event.target.value;
    renderCampaigns();
  });
  loadPage();
});