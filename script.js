// The data stays declarative: add a tradition here and the map, filters, and glossary update with it.
const categories = {
  painting: { label: "Painting", color: "#f29bb7", definition: "Narrative and decorative image-making, often rooted in local materials, ritual storytelling, and inherited visual languages." },
  textile: { label: "Textile & Weave", color: "#c1a6f2", definition: "Art made through thread, loom, dye, and surface pattern. Textiles carry memory, status, devotion, and regional identity through everyday use." },
  dance: { label: "Dance", color: "#f2a568", definition: "Embodied storytelling shaped by rhythm, gesture, music, and oral transmission. Dance keeps mythology and community history moving through generations." },
  theatre: { label: "Theatre & Music", color: "#8fc9e9", definition: "Performing traditions that combine voice, instrument, costume, stagecraft, and narrative to turn shared histories into living events." },
  craft: { label: "Craft & Sculpture", color: "#9fcf9b", definition: "Skilled making in clay, metal, wood, stone, and natural materials. These practices connect utility, ceremony, ecology, and hand knowledge." }
};

const traditions = [
  { name: "Madhubani Painting", category: "painting", region: "Mithila, Bihar", coords: [26.35, 86.08], image: "Madhubani", summary: "Madhubani painting grew from ritual wall and floor images made by women of the Mithila region. Its dense lines, flat color, and symbolic fish, birds, and deities create a vivid visual grammar. The form carries domestic knowledge and celebrates festivals, fertility, and local ecology." },
  { name: "Warli Painting", category: "painting", region: "Palghar, Maharashtra", coords: [19.70, 72.77], image: "Warli", summary: "Warli painting comes from the Warli communities of Maharashtra and traditionally appeared on the walls of homes during marriage ceremonies. Simple white figures made from rice paste move through scenes of farming, hunting, music, and ritual. Its geometric visual language turns community life into a shared record." },
  { name: "Kalamkari", category: "painting", region: "Machilipatnam, Andhra Pradesh", coords: [16.18, 81.13], image: "Kalamkari", summary: "Kalamkari means ‘drawing with a pen’ and refers to hand-painted or block-printed cotton. Artisans build intricate mythological scenes with natural dyes, using a bamboo or date-palm pen. The textile tradition remains closely linked to temple storytelling and trade." },
  { name: "Pattachitra", category: "painting", region: "Raghurajpur, Odisha", coords: [19.88, 85.83], image: "Pattachitra", summary: "Pattachitra is a disciplined cloth-based painting tradition from Odisha, known for strong outlines and ornamental borders. Artists prepare a smooth tamarind-seed-coated surface before painting stories of Jagannath and Krishna. Each image is both devotional object and carefully preserved visual narrative." },
  { name: "Gond Art", category: "painting", region: "Dindori, Madhya Pradesh", coords: [22.95, 81.08], image: "Gond Art", summary: "Gond artists translate stories of forests, animals, ancestors, and village life into rhythmic patterns and luminous dots. The contemporary form grows from mural traditions of the Gond people. It expresses a worldview in which humans, animals, and landscape remain deeply interdependent." },
  { name: "Phad Painting", category: "painting", region: "Shahpura, Rajasthan", coords: [25.62, 74.92], image: "Phad", summary: "Phad is a long painted scroll used by itinerant Bhopas to narrate the heroic deeds of folk deities. Its saturated colors and crowded scenes are designed to be read as the story unfolds. Painting, performance, and oral history work together as one tradition." },
  { name: "Pashmina Weaving", category: "textile", region: "Srinagar, Kashmir", coords: [34.08, 74.79], image: "Pashmina", summary: "Pashmina shawls are woven from the fine under-fleece of Himalayan goats, prized for exceptional warmth and softness. Kashmiri artisans spin, weave, dye, and sometimes embroider the fiber with extraordinary patience. The craft reflects mountain ecology, historic trade routes, and generations of specialized skill." },
  { name: "Banarasi Silk", category: "textile", region: "Varanasi, Uttar Pradesh", coords: [25.32, 83.01], image: "Banarasi Silk", summary: "Banarasi silk is famed for brocaded patterns woven with gold and silver zari. Designs often carry floral butis, Mughal-inspired ornament, and ceremonial symbolism. The sari’s elaborate making sustains a living loom culture at the heart of Varanasi." },
  { name: "Kutch Embroidery", category: "textile", region: "Kutch, Gujarat", coords: [23.73, 69.86], image: "Kutch", summary: "Kutch embroidery encompasses distinct stitch and mirror-work traditions practiced by communities across Gujarat. Brilliant geometric surfaces decorate clothing, dowry textiles, and objects for daily life. Motifs act as markers of place, community, celebration, and a maker’s individual hand." },
  { name: "Chikankari", category: "textile", region: "Lucknow, Uttar Pradesh", coords: [26.85, 80.95], image: "Chikankari", summary: "Chikankari is a delicate white-on-white embroidery associated with Lucknow and its refined courtly history. Needleworkers create shadow-like textures, floral jaalis, and fine linear stitches on cotton, silk, or georgette. The quiet surface rewards close looking and preserves a sophisticated textile vocabulary." },
  { name: "Kantha Stitch", category: "textile", region: "Bengal, West Bengal", coords: [22.57, 88.36], image: "Kantha", summary: "Kantha began as a way to layer and reuse worn saris with simple running stitches. Makers transformed practical quilts into expressive surfaces filled with animals, flowers, figures, and remembered scenes. The tradition embodies care, resourcefulness, and women’s domestic storytelling." },
  { name: "Bharatanatyam", category: "dance", region: "Thanjavur, Tamil Nadu", coords: [10.79, 79.14], image: "Bharatanatyam", summary: "Bharatanatyam developed in the temples and courts of Tamil Nadu through a precise language of hand gestures, facial expression, rhythmic footwork, and sculptural poses. Its repertoire draws heavily on devotional poetry and classical music. Today it is both a major stage form and a living link to South Indian ritual culture." },
  { name: "Kathak", category: "dance", region: "Lucknow, Uttar Pradesh", coords: [26.85, 80.95], image: "Kathak", summary: "Kathak grew from the storytelling work of travelling kathakars and later flourished in Mughal and regional courts. Dancers combine rapid spins, intricate footwork, gesture, and expressive narrative with tabla and sarangi. Its layered history makes the form a meeting point of Hindu and Muslim cultural worlds." },
  { name: "Chhau Dance", category: "dance", region: "Mayurbhanj, Odisha", coords: [21.93, 86.73], image: "Chhau", summary: "Chhau is a vigorous masked dance-theatre tradition found across Odisha, Jharkhand, and West Bengal. Its expansive leaps and martial movement bring stories from epics, local legends, and nature to life. The form is performed in seasonal festivals where music, craft, and community gather together." },
  { name: "Ghoomar", category: "dance", region: "Udaipur, Rajasthan", coords: [24.58, 73.68], image: "Ghoomar", summary: "Ghoomar is a graceful communal dance traditionally performed by women in Rajasthan. Long skirts create concentric waves as dancers turn to the pulse of dhol and folk song. It is associated with celebration, welcome, and the social fabric of desert communities." },
  { name: "Yakshagana Theatre", category: "theatre", region: "Udupi, Karnataka", coords: [13.34, 74.75], image: "Yakshagana", summary: "Yakshagana is an overnight dance-theatre tradition from coastal Karnataka, combining sung narration, percussion, dialogue, and spectacular makeup. Performers improvise within stories drawn from the Mahabharata and other epics. Its open-air performances make mythology a communal, highly physical event." },
  { name: "Carnatic Music", category: "theatre", region: "Chennai, Tamil Nadu", coords: [13.08, 80.27], image: "Carnatic Music", summary: "Carnatic music is a classical South Indian tradition organized through raga, tala, and an enormous repertoire of composed and improvised pieces. Voice, veena, violin, and mridangam meet in performances built on deep listening. The music carries devotional poetry while remaining a sophisticated system of creative exploration." },
  { name: "Koodiyattam", category: "theatre", region: "Thrissur, Kerala", coords: [10.52, 76.21], image: "Koodiyattam", summary: "Koodiyattam is one of India’s oldest surviving Sanskrit theatre traditions, performed in Kerala temple theatres. Actors use precise eye movement, hand gestures, chant, and elaborate facial expression to unfold a scene slowly. Its ritual context and demanding training preserve a rare performance language." },
  { name: "Baul Music", category: "theatre", region: "Birbhum, West Bengal", coords: [23.84, 87.62], image: "Baul Music", summary: "Baul singers are itinerant mystics whose songs seek the divine within the human body rather than in institutions. Their music pairs poetic philosophy with an earthy voice, ektara, and hand percussion. The tradition’s radical openness has made it a defining part of Bengal’s cultural imagination." },
  { name: "Dhokra Craft", category: "craft", region: "Bastar, Chhattisgarh", coords: [19.07, 81.95], image: "Dhokra", summary: "Dhokra is a lost-wax metal casting tradition practiced by artisan communities across central and eastern India. A wax model is layered with clay, fired, and replaced by molten brass to create distinctive textured figures. Ritual objects, animals, and musicians connect the craft to folk belief and everyday life." },
  { name: "Blue Pottery", category: "craft", region: "Jaipur, Rajasthan", coords: [26.91, 75.79], image: "Blue Pottery", summary: "Jaipur blue pottery is an unusual low-fired craft made from quartz, glass, and gum rather than ordinary clay. Cobalt blue, turquoise, and floral ornament give its vessels an instantly recognizable surface. The technique reflects a long history of Persian, Central Asian, and Rajasthani exchange." },
  { name: "Wood Carving", category: "craft", region: "Srinagar, Kashmir", coords: [34.08, 74.79], image: "Wood Carving", summary: "Kashmiri wood carving turns walnut and other local woods into panels, furniture, and architectural surfaces of exceptional detail. Artisans use chisels to build floral arabesques, vines, and geometric relief. The craft echoes the region’s gardens, architecture, and centuries of refined handwork." },
  { name: "Terracotta Horses", category: "craft", region: "Bankura, West Bengal", coords: [23.23, 87.07], image: "Terracotta Horses", summary: "Bankura’s elongated terracotta horses are among Bengal’s most recognizable craft forms. Shaped by hand and fired in local kilns, they serve as offerings and emblems of strength, protection, and village identity. Their stylized silhouettes show how ritual objects can become icons of modern design." },
  { name: "Bidriware", category: "craft", region: "Bidar, Karnataka", coords: [17.91, 77.52], image: "Bidriware", summary: "Bidriware is a metal inlay craft from Bidar, made by engraving a dark zinc alloy and filling the grooves with silver. The contrast between blackened metal and luminous inlay gives trays, boxes, and vessels their signature depth. Its technique records the Deccan’s layered Persianate and Indian histories." }
];

const map = L.map("map", { zoomControl: false, minZoom: 4, maxBounds: [[5, 65], [38, 99]], maxBoundsViscosity: .8 }).setView([22.5, 80], 5);
L.control.zoom({ position: "bottomleft" }).addTo(map);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 18, attribution: "© OpenStreetMap contributors" }).addTo(map);

const markerLayers = new Map();
const activeCategories = new Set(Object.keys(categories));
const searchInput = document.querySelector("#global-search");
const pills = document.querySelector("#category-pills");
const resultCount = document.querySelector("#result-count");
document.querySelector("#location-count").textContent = `${traditions.length} locations`;

function placeholderImage(tradition) {
  return `https://placehold.co/600x260/273538/f2f0e9?text=${encodeURIComponent(tradition.image)}`;
}

function popupMarkup(tradition) {
  const category = categories[tradition.category];
  return `<article class="tradition-popup" style="--category-color:${category.color}"><img class="popup-image" src="${placeholderImage(tradition)}" alt="Representative placeholder for ${tradition.name}" loading="lazy"><div class="popup-content"><p class="popup-category">${category.label}</p><h2 class="popup-name">${tradition.name}</h2><p class="popup-region">${tradition.region}</p><p class="popup-description">${tradition.summary}</p><span class="popup-tag">Traditional practice</span></div></article>`;
}

// Draw each tradition as a color-coded circle marker and attach its full context popup.
traditions.forEach((tradition) => {
  const color = categories[tradition.category].color;
  const marker = L.circleMarker(tradition.coords, { radius: 7, color: "#111315", weight: 2, fillColor: color, fillOpacity: 1 }).bindPopup(popupMarkup(tradition), { maxWidth: 310, className: "dark-popup" });
  marker.addTo(map);
  markerLayers.set(tradition.name, marker);
});

function matchingTraditions() {
  const query = searchInput.value.trim().toLowerCase();
  return traditions.filter((tradition) => !query || `${tradition.name} ${tradition.region} ${categories[tradition.category].label}`.toLowerCase().includes(query));
}

function renderPills() {
  const matches = matchingTraditions();
  pills.innerHTML = Object.entries(categories).map(([key, category]) => {
    const count = matches.filter((tradition) => tradition.category === key).length;
    const active = activeCategories.has(key);
    return `<button class="category-pill ${active ? "active" : "inactive"}" style="--category-color:${category.color}" data-category="${key}" type="button" aria-pressed="${active}"><span class="category-dot"></span>${category.label}<span class="category-count">${count}</span></button>`;
  }).join("");
  resultCount.textContent = `${matches.length} / ${traditions.length} forms`;
}

function updateMarkers() {
  const matches = new Set(matchingTraditions().map((tradition) => tradition.name));
  traditions.forEach((tradition) => {
    const marker = markerLayers.get(tradition.name);
    const shouldShow = activeCategories.has(tradition.category) && matches.has(tradition.name);
    if (shouldShow && !map.hasLayer(marker)) marker.addTo(map);
    if (!shouldShow && map.hasLayer(marker)) map.removeLayer(marker);
  });
  renderPills();
}

pills.addEventListener("click", (event) => {
  const pill = event.target.closest(".category-pill");
  if (!pill) return;
  const key = pill.dataset.category;
  activeCategories.has(key) ? activeCategories.delete(key) : activeCategories.add(key);
  updateMarkers();
});
searchInput.addEventListener("input", updateMarkers);

document.querySelector("#random-button").addEventListener("click", () => {
  const choices = matchingTraditions().filter((tradition) => activeCategories.has(tradition.category));
  const pool = choices.length ? choices : matchingTraditions();
  if (!pool.length) return;
  const tradition = pool[Math.floor(Math.random() * pool.length)];
  activeCategories.add(tradition.category);
  updateMarkers();
  map.flyTo(tradition.coords, 7, { duration: 1 });
  markerLayers.get(tradition.name).openPopup();
});

document.querySelector("#clear-button").addEventListener("click", () => {
  searchInput.value = "";
  Object.keys(categories).forEach((key) => activeCategories.add(key));
  updateMarkers();
  map.flyTo([22.5, 80], 5, { duration: .8 });
});

const glossaryPanel = document.querySelector("#glossary-panel");
function setGlossary(open) {
  glossaryPanel.classList.toggle("open", open);
  glossaryPanel.setAttribute("aria-hidden", String(!open));
  document.querySelector("#glossary-toggle").setAttribute("aria-expanded", String(open));
}
document.querySelector("#glossary-toggle").addEventListener("click", () => setGlossary(true));
document.querySelector("#glossary-close").addEventListener("click", () => setGlossary(false));
document.querySelector("#glossary-backdrop").addEventListener("click", () => setGlossary(false));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") setGlossary(false); });

document.querySelector("#glossary-content").innerHTML = Object.entries(categories).map(([key, category]) => {
  const entries = traditions.filter((tradition) => tradition.category === key).map((tradition) => `<div class="glossary-item"><h3>${tradition.name}</h3><p>${tradition.region} · ${tradition.summary.split(".")[0]}.</p></div>`).join("");
  return `<section class="glossary-category" style="--category-color:${category.color}"><h2><span class="category-dot"></span>${category.label}</h2><p class="category-definition">${category.definition}</p>${entries}</section>`;
}).join("");

renderPills();
