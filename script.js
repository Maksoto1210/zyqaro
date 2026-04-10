const MIN_RESULTS = 20;
const STORAGE_KEY = "name-generator-saved";

document.documentElement.classList.add("js");

const STYLE_PROFILES = {
  modern: {
    label: "Modern",
    prefixes: ["nova", "luma", "vanta", "cove", "north", "signal", "form", "kind", "vera", "clear", "alto", "merit"],
    suffixes: ["forge", "nest", "lane", "mark", "line", "haus", "well", "loft", "spring", "field", "frame", "craft"],
    adjectives: ["Clear", "North", "Prime", "Bright", "Open", "Quiet", "Modern", "Fresh", "True", "Urban"],
    inventedLead: ["av", "lum", "vel", "nor", "ca", "me", "so", "ta", "ver", "alu", "cor", "za"],
    inventedCore: ["ra", "lo", "vi", "na", "vo", "re", "mi", "sa", "ta", "ria", "len", "vara"],
    inventedTail: ["ra", "va", "ro", "lo", "na", "is", "en", "a", "io", "ora", "on", "elle"],
  },
  luxury: {
    label: "Luxury",
    prefixes: ["aure", "vel", "sore", "celes", "valen", "marais", "monte", "belle", "noble", "atelier", "coter"],
    suffixes: ["elle", "ique", "ora", "vienne", "maison", "house", "atelier", "noir", "gold", "velvet", "line"],
    adjectives: ["Rare", "Velvet", "Golden", "Private", "Fine", "Grand", "Pure", "Signature", "Soft", "Elegant"],
    inventedLead: ["au", "sor", "bel", "cel", "val", "mon", "el", "vi", "mar", "ora"],
    inventedCore: ["re", "lia", "ora", "ette", "velle", "ine", "ari", "el", "isse", "ona"],
    inventedTail: ["elle", "ique", "ora", "ise", "ine", "a", "ette", "ria", "on"],
  },
  minimal: {
    label: "Minimal",
    prefixes: ["plain", "mono", "line", "form", "calm", "bare", "true", "kind", "still", "pure", "fold"],
    suffixes: ["co", "set", "mark", "base", "studio", "lab", "grid", "house", "lane", "press"],
    adjectives: ["Clean", "Simple", "Quiet", "Still", "Plain", "Light", "Soft", "Minimal", "Open", "Neat"],
    inventedLead: ["li", "mo", "nu", "ba", "sa", "ta", "re", "va", "no", "fo"],
    inventedCore: ["na", "lo", "ri", "ta", "mi", "va", "li", "ro", "no", "el"],
    inventedTail: ["a", "o", "en", "ra", "ro", "co", "is", "on", "al"],
  },
  creative: {
    label: "Creative",
    prefixes: ["bloom", "craft", "spark", "story", "wild", "muse", "echo", "color", "loft", "paper", "shape", "thread"],
    suffixes: ["works", "loom", "studio", "canvas", "nest", "party", "foundry", "collective", "circle", "spring"],
    adjectives: ["Bold", "Curious", "Vivid", "Bright", "Playful", "Open", "Artful", "Woven", "Lively", "Warm"],
    inventedLead: ["blo", "mu", "cra", "sto", "ec", "co", "ar", "ve", "pa", "lu"],
    inventedCore: ["ra", "via", "lo", "ta", "mi", "na", "ver", "ori", "elle", "ica"],
    inventedTail: ["ra", "ia", "elle", "ora", "lo", "na", "tica", "a", "on"],
  },
  tech: {
    label: "Tech",
    prefixes: ["flux", "quant", "byte", "proto", "cloud", "vector", "signal", "syn", "nex", "data", "code", "grid"],
    suffixes: ["labs", "stack", "grid", "base", "pilot", "logic", "cloud", "forge", "ops", "flow", "pulse"],
    adjectives: ["Swift", "Signal", "Smart", "Vector", "Sharp", "Adaptive", "Clear", "Fast", "Neural", "Digital"],
    inventedLead: ["nu", "cy", "ve", "q", "si", "da", "syn", "pro", "tek", "xa"],
    inventedCore: ["vo", "ra", "ni", "ta", "ly", "za", "tri", "gen", "bit", "ver"],
    inventedTail: ["io", "iq", "sy", "ra", "is", "on", "ly", "a", "os", "ic"],
  },
  playful: {
    label: "Playful",
    prefixes: ["sprout", "pebble", "pico", "mello", "happy", "bop", "jolly", "sunny", "zippy", "bloom", "bubbly"],
    suffixes: ["berry", "buddy", "hop", "loop", "spark", "pop", "joy", "nest", "club", "beam"],
    adjectives: ["Sunny", "Happy", "Snappy", "Peppy", "Bright", "Cheerful", "Fresh", "Easy", "Merry", "Warm"],
    inventedLead: ["pi", "me", "zo", "bu", "la", "jo", "su", "po", "pe", "mi"],
    inventedCore: ["la", "mo", "ra", "bi", "zi", "lo", "na", "vi", "ta", "ro"],
    inventedTail: ["o", "a", "berry", "la", "ly", "na", "ro", "i", "boo"],
  },
};

const CATEGORY_PROFILES = {
  business: {
    label: "Business Name",
    nouns: ["Studio", "Works", "Collective", "Foundry", "Agency", "Partners", "House", "Supply", "Office", "Hub"],
    suffixes: ["studio", "works", "foundry", "agency", "house", "supply", "collective", "partners", "hub"],
    starterWords: ["Harbor", "Summit", "Copper", "Corner", "Bridge", "Paper", "Oak", "Field", "Stone"],
  },
  brand: {
    label: "Brand Name",
    nouns: ["Atelier", "Label", "Goods", "House", "Edit", "Line", "Collection", "Studio", "Co", "Market"],
    suffixes: ["label", "goods", "house", "edit", "line", "atelier", "co", "studio", "loom"],
    starterWords: ["Velvet", "Soft", "Amber", "Rare", "Kind", "Sunday", "Elm", "Petal", "Morrow"],
  },
  startup: {
    label: "Startup Name",
    nouns: ["Labs", "Base", "Stack", "Grid", "Pilot", "Cloud", "Forge", "Launch", "Ops", "Systems"],
    suffixes: ["labs", "base", "stack", "grid", "pilot", "cloud", "forge", "ops", "logic"],
    starterWords: ["Signal", "Vector", "Orbit", "Frame", "Layer", "Shift", "Current", "Kernel", "Pulse"],
  },
  username: {
    label: "Username",
    nouns: ["daily", "notes", "mode", "loop", "signals", "club", "space", "files", "journal", "hq"],
    suffixes: ["daily", "notes", "mode", "loop", "signals", "club", "space", "journal", "hq"],
    starters: ["hey", "its", "madeby", "join", "hello", "the"],
  },
};

const DESCRIPTOR_NOTES = {
  keywordCompound: "Keyword-led compound",
  businessExtension: "Clear category-aligned direction",
  prefixKeyword: "Directional blend",
  adjectiveNoun: "Readable two-part name",
  invented: "Invented brand word",
  compressed: "Compressed startup-style build",
  descriptorCompound: "Polished editorial construction",
  startupNeologism: "Product-ready tech construction",
  handleKeyword: "Username-ready handle",
  handleBlend: "Compact handle blend",
  handleDescriptor: "Readable social handle",
  inventedHandle: "Distinctive handle direction",
};

const form = document.querySelector("#generator-form");
const keywordInput = document.querySelector("#keyword");
const categorySelect = document.querySelector("#category");
const styleSelect = document.querySelector("#style");
const lengthSelect = document.querySelector("#length");
const resultsGrid = document.querySelector("#results-grid");
const resultsEmpty = document.querySelector("#results-empty");
const resultsSummary = document.querySelector("#results-summary");
const resultsCount = document.querySelector("#results-count");
const generateMoreButton = document.querySelector("#generate-more");
const resetButton = document.querySelector("#reset-button");
const seedButtons = Array.from(document.querySelectorAll(".seed-button"));
const savedList = document.querySelector("#saved-list");
const savedEmpty = document.querySelector("#saved-empty");
const clearSavedButton = document.querySelector("#clear-saved");
const toast = document.querySelector("#toast");
const dialogTriggers = Array.from(document.querySelectorAll("[data-dialog-target]"));
const closeDialogButtons = Array.from(document.querySelectorAll("[data-close-dialog]"));

let lastFilters = null;
let toastTimer = null;
let savedNames = loadSavedNames();

function init() {
  bindEvents();
  renderSavedNames();
  observeSections();
  generateFromCurrentFilters({ autoscroll: false, initial: true });
}

function bindEvents() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    generateFromCurrentFilters({ autoscroll: true });
  });

  generateMoreButton.addEventListener("click", () => {
    if (!lastFilters) {
      return;
    }

    generateAndRender(lastFilters, { autoscroll: true });
  });

  resetButton.addEventListener("click", () => {
    form.reset();
    keywordInput.value = "";
    categorySelect.value = "business";
    styleSelect.value = "modern";
    lengthSelect.value = "mixed";
    generateFromCurrentFilters({ autoscroll: false });
    keywordInput.focus();
  });

  seedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      keywordInput.value = button.dataset.seed || "";
      generateFromCurrentFilters({ autoscroll: true });
    });
  });

  clearSavedButton.addEventListener("click", () => {
    savedNames = [];
    persistSavedNames();
    renderSavedNames();
    if (lastFilters?.currentResults) {
      renderResults(lastFilters.currentResults);
    }
    showToast("Saved shortlist cleared");
  });

  resultsGrid.addEventListener("click", async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const actionButton = target.closest("[data-action]");

    if (!(actionButton instanceof HTMLButtonElement)) {
      return;
    }

    const name = actionButton.dataset.name;
    const note = actionButton.dataset.note;

    if (!name) {
      return;
    }

    if (actionButton.dataset.action === "copy") {
      const copied = await copyText(name);

      if (copied) {
        actionButton.classList.add("is-success");
        actionButton.textContent = "Copied";
        showToast(`Copied ${name}`);

        window.setTimeout(() => {
          actionButton.classList.remove("is-success");
          actionButton.textContent = "Copy";
        }, 1400);
      }
    }

    if (actionButton.dataset.action === "save") {
      toggleSavedName({
        name,
        category: CATEGORY_PROFILES[lastFilters.category].label,
        style: STYLE_PROFILES[lastFilters.style].label,
        note: note || "",
      });
      renderResults(lastFilters.currentResults || []);
    }
  });

  savedList.addEventListener("click", async (event) => {
    const target = event.target;

    if (!(target instanceof HTMLElement)) {
      return;
    }

    const button = target.closest("[data-saved-action]");

    if (!(button instanceof HTMLButtonElement)) {
      return;
    }

    const name = button.dataset.name;

    if (!name) {
      return;
    }

    if (button.dataset.savedAction === "copy") {
      const copied = await copyText(name);

      if (copied) {
        showToast(`Copied ${name}`);
      }
    }

    if (button.dataset.savedAction === "remove") {
      savedNames = savedNames.filter((entry) => entry.name !== name);
      persistSavedNames();
      renderSavedNames();
      if (lastFilters?.currentResults) {
        renderResults(lastFilters.currentResults);
      }
      showToast(`Removed ${name}`);
    }
  });

  dialogTriggers.forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = document.getElementById(button.dataset.dialogTarget || "");

      if (!(dialog instanceof HTMLDialogElement)) {
        return;
      }

      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "open");
      }
    });
  });

  closeDialogButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const dialog = button.closest("dialog");

      if (dialog instanceof HTMLDialogElement) {
        dialog.close();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

    document.querySelectorAll("dialog[open]").forEach((dialog) => {
      if (dialog instanceof HTMLDialogElement) {
        dialog.close();
      }
    });
  });
}

function generateFromCurrentFilters(options = {}) {
  const filters = readFilters();
  generateAndRender(filters, options);
}

function generateAndRender(filters, options = {}) {
  const results = generateNames(filters);

  lastFilters = {
    ...filters,
    currentResults: results,
  };

  renderResults(results);
  updateResultsMeta(filters, results.length);
  generateMoreButton.disabled = false;

  if (options.autoscroll && window.matchMedia("(max-width: 900px)").matches) {
    document.querySelector("#results")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

function readFilters() {
  return {
    keyword: keywordInput.value.trim(),
    category: categorySelect.value,
    style: styleSelect.value,
    length: lengthSelect.value,
  };
}

function generateNames(filters) {
  const keyword = createKeywordProfile(filters.keyword);
  const styleProfile = STYLE_PROFILES[filters.style];
  const categoryProfile = CATEGORY_PROFILES[filters.category];
  const seen = new Set();
  const results = [];
  let attempts = 0;

  while (results.length < MIN_RESULTS && attempts < 800) {
    attempts += 1;
    const candidate = buildCandidate({
      filters,
      keyword,
      styleProfile,
      categoryProfile,
    });

    if (!candidate) {
      continue;
    }

    const formattedName = finalizeCandidate(candidate.name, filters.category);

    if (!isValidCandidate(formattedName, filters, seen)) {
      continue;
    }

    seen.add(normalizeComparison(formattedName));
    results.push({
      name: formattedName,
      note: candidate.note || DESCRIPTOR_NOTES[candidate.pattern] || "Brandable direction",
    });
  }

  if (results.length < MIN_RESULTS) {
    fillFallbacks(results, filters, seen);
  }

  return results.slice(0, MIN_RESULTS);
}

function buildCandidate(context) {
  const { filters, keyword } = context;
  const builders = getBuilderNames(filters.category, keyword.present);
  const selected = pick(builders);

  switch (selected) {
    case "keywordCompound":
      return buildKeywordCompound(context);
    case "businessExtension":
      return buildBusinessExtension(context);
    case "prefixKeyword":
      return buildPrefixKeyword(context);
    case "adjectiveNoun":
      return buildAdjectiveNoun(context);
    case "invented":
      return buildInventedWord(context);
    case "compressed":
      return buildCompressedName(context);
    case "descriptorCompound":
      return buildDescriptorCompound(context);
    case "startupNeologism":
      return buildStartupNeologism(context);
    case "handleKeyword":
      return buildHandleKeyword(context);
    case "handleBlend":
      return buildHandleBlend(context);
    case "handleDescriptor":
      return buildHandleDescriptor(context);
    case "inventedHandle":
      return buildInventedHandle(context);
    default:
      return buildInventedWord(context);
  }
}

function getBuilderNames(category, hasKeyword) {
  const weighted = {
    business: hasKeyword
      ? ["keywordCompound", "businessExtension", "prefixKeyword", "adjectiveNoun", "invented", "descriptorCompound", "keywordCompound"]
      : ["adjectiveNoun", "descriptorCompound", "invented", "businessExtension", "prefixKeyword", "invented"],
    brand: hasKeyword
      ? ["keywordCompound", "prefixKeyword", "invented", "invented", "descriptorCompound", "adjectiveNoun"]
      : ["invented", "invented", "prefixKeyword", "descriptorCompound", "adjectiveNoun"],
    startup: hasKeyword
      ? ["compressed", "startupNeologism", "keywordCompound", "invented", "prefixKeyword", "adjectiveNoun", "compressed"]
      : ["startupNeologism", "invented", "invented", "prefixKeyword", "adjectiveNoun", "descriptorCompound"],
    username: hasKeyword
      ? ["handleKeyword", "handleKeyword", "handleBlend", "handleDescriptor", "inventedHandle"]
      : ["handleBlend", "handleDescriptor", "inventedHandle", "handleKeyword"],
  };

  return weighted[category] || weighted.business;
}

function buildKeywordCompound({ filters, keyword, styleProfile, categoryProfile }) {
  const base = keyword.present ? pick(keyword.fragments) : pick(styleProfile.prefixes);
  const tailPool = [...styleProfile.suffixes, ...categoryProfile.suffixes];
  const tail = pick(tailPool);
  const asTwoWords = filters.category !== "username" && filters.length !== "short" && chance(0.22);

  return {
    name: asTwoWords ? `${toTitleCase(base)} ${toTitleCase(tail)}` : blendWords(base, tail),
    pattern: "keywordCompound",
  };
}

function buildBusinessExtension({ filters, keyword, styleProfile, categoryProfile }) {
  const left = keyword.present
    ? toTitleCase(pick(keyword.displayFragments))
    : pick([...categoryProfile.starterWords, ...styleProfile.adjectives]);
  const right = pick(categoryProfile.nouns);

  if (filters.category === "username") {
    return buildHandleDescriptor({ filters, keyword, styleProfile, categoryProfile });
  }

  return {
    name: `${left} ${right}`,
    pattern: "businessExtension",
  };
}

function buildPrefixKeyword({ filters, keyword, styleProfile, categoryProfile }) {
  const prefix = pick(styleProfile.prefixes);
  const target = keyword.present ? pick(keyword.fragments) : pick(categoryProfile.suffixes);
  const spaced = filters.category === "business" && filters.length === "mixed" && chance(0.18);

  return {
    name: spaced ? `${toTitleCase(prefix)} ${toTitleCase(target)}` : blendWords(prefix, target),
    pattern: "prefixKeyword",
  };
}

function buildAdjectiveNoun({ filters, styleProfile, categoryProfile }) {
  const adjective = pick(styleProfile.adjectives);
  const noun = pick(categoryProfile.nouns);

  if (filters.category === "username") {
    return {
      name: `${normalizeHandle(adjective)}${normalizeHandle(noun)}`,
      pattern: "handleDescriptor",
    };
  }

  return {
    name: `${adjective} ${noun}`,
    pattern: "adjectiveNoun",
  };
}

function buildInventedWord({ filters, keyword, styleProfile, categoryProfile }) {
  const lead = keyword.present && chance(0.38)
    ? pick(keyword.fragments)
    : pick(styleProfile.inventedLead);
  const core = pick(styleProfile.inventedCore);
  const tailPool = filters.category === "startup"
    ? [...styleProfile.inventedTail, ...["io", "iq", "ly", "os"]]
    : styleProfile.inventedTail;
  const tail = pick(tailPool);
  const joined = blendWords(blendWords(lead, core), tail);

  if (filters.category === "business" && filters.length === "mixed" && chance(0.14)) {
    return {
      name: `${toTitleCase(joined)} ${pick(categoryProfile.nouns)}`,
      pattern: "invented",
    };
  }

  return {
    name: joined,
    pattern: "invented",
  };
}

function buildCompressedName({ keyword, styleProfile, categoryProfile }) {
  const base = keyword.present ? compressWord(keyword.base) : compressWord(pick(styleProfile.prefixes));
  const tail = pick([...["io", "ly", "ra", "va", "sy"], ...categoryProfile.suffixes]);

  return {
    name: blendWords(base, tail),
    pattern: "compressed",
  };
}

function buildDescriptorCompound({ filters, styleProfile, categoryProfile }) {
  const left = chance(0.5) ? pick(styleProfile.adjectives) : pick(categoryProfile.starterWords || styleProfile.adjectives);
  const right = chance(0.5) ? pick(categoryProfile.nouns) : toTitleCase(pick(styleProfile.suffixes));

  if (filters.category === "username") {
    return {
      name: `${normalizeHandle(left)}.${normalizeHandle(right)}`,
      pattern: "handleDescriptor",
    };
  }

  return {
    name: `${left} ${right}`,
    pattern: "descriptorCompound",
  };
}

function buildStartupNeologism({ keyword, styleProfile, categoryProfile }) {
  const lead = keyword.present ? pick(keyword.shortFragments) : pick(styleProfile.prefixes);
  const tail = pick(["stack", "base", "grid", "pilot", "forge", "flow", "logic", "labs"]);
  const choice = chance(0.6)
    ? blendWords(lead, tail)
    : blendWords(blendWords(lead, pick(styleProfile.inventedTail)), pick(categoryProfile.suffixes));

  return {
    name: choice,
    pattern: "startupNeologism",
  };
}

function buildHandleKeyword({ keyword, styleProfile, categoryProfile }) {
  const base = normalizeHandle(keyword.present ? keyword.base : pick(styleProfile.prefixes));
  const tail = normalizeHandle(pick(categoryProfile.suffixes));
  const options = [
    `${base}${tail}`,
    `${base}.${tail}`,
    `${base}_${tail}`,
    `${pick(categoryProfile.starters)}${capitalize(base)}`,
  ];

  return {
    name: pick(options),
    pattern: "handleKeyword",
  };
}

function buildHandleBlend({ keyword, styleProfile, categoryProfile }) {
  const left = normalizeHandle(keyword.present ? pick(keyword.fragments) : pick(styleProfile.prefixes));
  const right = normalizeHandle(pick([...categoryProfile.nouns, ...styleProfile.suffixes]));

  return {
    name: chance(0.4) ? `${left}.${right}` : `${left}${right}`,
    pattern: "handleBlend",
  };
}

function buildHandleDescriptor({ styleProfile, categoryProfile }) {
  const left = normalizeHandle(pick([...styleProfile.prefixes, ...styleProfile.adjectives]));
  const right = normalizeHandle(pick(categoryProfile.nouns));

  return {
    name: chance(0.35) ? `${left}_${right}` : `${left}${right}`,
    pattern: "handleDescriptor",
  };
}

function buildInventedHandle({ keyword, styleProfile }) {
  const lead = keyword.present ? normalizeHandle(pick(keyword.shortFragments)) : normalizeHandle(pick(styleProfile.inventedLead));
  const middle = normalizeHandle(pick(styleProfile.inventedCore));
  const tail = normalizeHandle(pick(["notes", "mode", "loop", "hq", "daily", "space"]));

  return {
    name: `${blendWords(lead, middle)}${tail}`,
    pattern: "inventedHandle",
  };
}

function createKeywordProfile(input) {
  const tokens = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  const primary = normalizeWord(tokens[0] || "");
  const secondary = normalizeWord(tokens[1] || "");
  const normalized = normalizeWord(tokens.join(""));

  if (!normalized) {
    return {
      present: false,
      base: "",
      fragments: [],
      shortFragments: [],
      displayFragments: [],
    };
  }

  const clipped = normalized.length > 6 ? normalized.slice(0, 5) : normalized;
  const front = normalized.slice(0, Math.min(4, normalized.length));
  const back = normalized.slice(Math.max(0, normalized.length - 4));
  const center = normalized.slice(0, Math.max(3, Math.ceil(normalized.length / 2)));
  const trimmed = normalized.length > 5 ? normalized.slice(0, normalized.length - 1) : normalized;

  const fragments = uniqueValues([primary, secondary, normalized, clipped, front, back, center, trimmed]).filter(Boolean);
  const shortFragments = fragments.map((fragment) => fragment.slice(0, Math.min(4, fragment.length))).filter(Boolean);
  const displayFragments = fragments.map((fragment) => toTitleCase(fragment));

  return {
    present: true,
    base: normalized,
    fragments,
    shortFragments: uniqueValues(shortFragments),
    displayFragments: uniqueValues(displayFragments),
  };
}

function finalizeCandidate(name, category) {
  if (category === "username") {
    return normalizeHandleOutput(name);
  }

  return titleCaseWords(name);
}

function normalizeHandleOutput(name) {
  const sanitized = name
    .toLowerCase()
    .replace(/[^a-z0-9._]/g, "")
    .replace(/[._]{2,}/g, ".")
    .replace(/^[._]+|[._]+$/g, "");

  return sanitized || "newhandle";
}

function isValidCandidate(name, filters, seen) {
  const normalized = normalizeComparison(name);
  const lettersOnly = normalized.replace(/[^a-z0-9]/g, "");
  const words = name.toLowerCase().split(/\s+/).filter(Boolean);
  const limits = {
    short: [4, 8],
    medium: [6, 11],
    mixed: [4, 14],
  };
  const [min, max] = limits[filters.length] || limits.mixed;

  if (!name || seen.has(normalized)) {
    return false;
  }

  if (lettersOnly.length < min || lettersOnly.length > max + (filters.category === "business" ? 5 : 2)) {
    return false;
  }

  if (/([a-z0-9])\1\1/i.test(name)) {
    return false;
  }

  if (/^(.{2,8})\1+$/.test(normalized)) {
    return false;
  }

  if (words.length > 1 && new Set(words).size !== words.length) {
    return false;
  }

  if (filters.category !== "username" && /[._]/.test(name)) {
    return false;
  }

  if (filters.category === "username" && !/^[a-z0-9._]+$/.test(name)) {
    return false;
  }

  if (filters.category !== "username" && !/^[A-Za-z ]+$/.test(name)) {
    return false;
  }

  if (hasAwkwardSequence(lettersOnly)) {
    return false;
  }

  return true;
}

function hasAwkwardSequence(value) {
  const lowered = value.toLowerCase();
  const blocked = ["aaa", "zzz", "qq", "xzx", "jj", "vvv", "yy", "ww"];

  return blocked.some((fragment) => lowered.includes(fragment));
}

function fillFallbacks(results, filters, seen) {
  const fallbackOptions = [
    "Novara",
    "Pixelforge",
    "LumaNest",
    "Avenza",
    "Formli",
    "Brightora",
    "Craftello",
    "Signal Works",
    "Vanta Studio",
    "fitmode",
    "luma.loop",
  ];

  fallbackOptions.forEach((name) => {
    if (results.length >= MIN_RESULTS) {
      return;
    }

    const finalName = finalizeCandidate(name, filters.category);

    if (!isValidCandidate(finalName, filters, seen)) {
      return;
    }

    seen.add(normalizeComparison(finalName));
    results.push({
      name: finalName,
      note: "Curated fallback direction",
    });
  });
}

function renderResults(results) {
  resultsGrid.innerHTML = "";

  if (!results.length) {
    resultsEmpty.hidden = false;
    return;
  }

  resultsEmpty.hidden = true;

  const markup = results
    .map((result, index) => {
      const saved = isSaved(result.name);

      return `
        <article class="result-card" style="--delay:${index * 28}ms">
          <div class="result-meta">
            <span>${CATEGORY_PROFILES[lastFilters.category].label}</span>
            <span>${STYLE_PROFILES[lastFilters.style].label}</span>
          </div>
          <h3 class="result-name">${escapeHtml(result.name)}</h3>
          <p class="result-note">${escapeHtml(result.note)}</p>
          <div class="result-actions">
            <button
              type="button"
              class="result-action"
              data-action="copy"
              data-name="${escapeAttribute(result.name)}"
              data-note="${escapeAttribute(result.note)}"
            >
              Copy
            </button>
            <button
              type="button"
              class="save-chip ${saved ? "is-saved" : ""}"
              data-action="save"
              data-name="${escapeAttribute(result.name)}"
              data-note="${escapeAttribute(result.note)}"
            >
              ${saved ? "Saved" : "Save"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");

  resultsGrid.innerHTML = markup;
}

function updateResultsMeta(filters, count) {
  const categoryLabel = CATEGORY_PROFILES[filters.category].label;
  const styleLabel = STYLE_PROFILES[filters.style].label;
  const keywordPart = filters.keyword ? ` for "${filters.keyword.trim()}"` : "";
  resultsSummary.textContent = `${count} ${categoryLabel.toLowerCase()} directions${keywordPart} in a ${styleLabel.toLowerCase()} tone.`;
  resultsCount.textContent = `${count} names generated`;
}

function renderSavedNames() {
  savedList.innerHTML = "";
  savedEmpty.hidden = savedNames.length > 0;

  if (!savedNames.length) {
    return;
  }

  const markup = savedNames
    .map((entry) => `
      <li class="saved-item">
        <div class="saved-meta">
          <div class="saved-name">${escapeHtml(entry.name)}</div>
          <div class="saved-context">${escapeHtml(entry.category)} · ${escapeHtml(entry.style)}</div>
        </div>
        <div class="saved-actions">
          <button
            type="button"
            class="result-action"
            data-saved-action="copy"
            data-name="${escapeAttribute(entry.name)}"
          >
            Copy
          </button>
          <button
            type="button"
            class="result-action"
            data-saved-action="remove"
            data-name="${escapeAttribute(entry.name)}"
          >
            Remove
          </button>
        </div>
      </li>
    `)
    .join("");

  savedList.innerHTML = markup;
}

function toggleSavedName(entry) {
  const exists = savedNames.some((saved) => saved.name === entry.name);

  if (exists) {
    savedNames = savedNames.filter((saved) => saved.name !== entry.name);
    showToast(`Removed ${entry.name} from saved names`);
  } else {
    savedNames = [{ ...entry, savedAt: Date.now() }, ...savedNames].slice(0, 24);
    showToast(`Saved ${entry.name}`);
  }

  persistSavedNames();
  renderSavedNames();
}

function isSaved(name) {
  return savedNames.some((entry) => entry.name === name);
}

function loadSavedNames() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function persistSavedNames() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedNames));
  } catch (error) {
    // Ignore storage failures and keep the core tool functional.
  }
}

async function copyText(text) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (error) {
    // Fall through to the manual copy path.
  }

  const helper = document.createElement("textarea");
  helper.value = text;
  helper.setAttribute("readonly", "readonly");
  helper.style.position = "absolute";
  helper.style.left = "-9999px";
  document.body.appendChild(helper);
  helper.select();

  const copied = document.execCommand("copy");
  helper.remove();
  return copied;
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

function observeSections() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
    }
  );

  elements.forEach((element) => observer.observe(element));
}

function normalizeWord(input) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .join("")
    .slice(0, 16);
}

function normalizeHandle(input) {
  return input.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeComparison(value) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function compressWord(input) {
  if (input.length <= 4) {
    return input;
  }

  const kept = input[0] + input.slice(1).replace(/[aeiou]/g, "");
  return kept.slice(0, 5) || input.slice(0, 4);
}

function blendWords(left, right) {
  const first = normalizeHandle(left);
  const second = normalizeHandle(right);

  if (!first) {
    return second;
  }

  if (!second) {
    return first;
  }

  if (first.endsWith(second[0])) {
    return first + second.slice(1);
  }

  if (/[aeiou]$/.test(first) && /^[aeiou]/.test(second)) {
    return first + second.slice(1);
  }

  if (!/[aeiou]$/.test(first) && !/^[aeiou]/.test(second) && first.length > 3) {
    return first.slice(0, -1) + second;
  }

  return first + second;
}

function titleCaseWords(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((part) => toTitleCase(part))
    .join(" ");
}

function toTitleCase(value) {
  if (!value) {
    return "";
  }

  const cleaned = value.toString().replace(/[^A-Za-z0-9]/g, "");
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1).toLowerCase();
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function chance(probability) {
  return Math.random() < probability;
}

function uniqueValues(list) {
  return [...new Set(list)];
}

init();
