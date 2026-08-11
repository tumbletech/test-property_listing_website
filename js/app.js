/* =====================================================================
   TUMBLETECH REALTY — app.js
   Phase 1 frontend MVP. All data below is fictional and lives in a
   plain JS array so it can later be swapped for a fetch() call to a
   real API/database with minimal changes elsewhere in this file.
   ===================================================================== */

/* ---------------------------------------------------------------------
   1. DATA LAYER
   In a future phase, PROPERTIES would instead be populated by:
     const PROPERTIES = await fetch('/api/properties').then(r => r.json());
   Every function below only depends on this array's shape, so the
   swap is localized to this one block.
--------------------------------------------------------------------- */
const PROPERTIES = [
  {
    id: 1,
    title: "Modern Corner House and Lot",
    location: "Bayanihan Heights, Dasmariñas",
    city: "Dasmariñas",
    province: "Cavite",
    type: "House and Lot",
    listingType: "For Sale",
    price: 6850000,
    bedrooms: 4,
    bathrooms: 3,
    lotArea: 150,
    floorArea: 132,
    image: "https://picsum.photos/seed/tt-house-1/900/650",
    description: "A two-storey corner unit with a private garden strip and covered carport, tucked inside a gated Dasmariñas subdivision close to schools and the CAVITEX interchange.",
    fullDescription: "This two-storey corner house and lot sits on a wide 150 sqm lot inside a gated subdivision in Dasmariñas, Cavite. The ground floor opens to a receiving area, dining space, and modular kitchen, while the second floor holds four bedrooms including a master suite with a walk-in closet. A covered carport fits two vehicles, and the corner position allows for a generous side garden. The subdivision has 24-hour security, a clubhouse, and is a short drive from CAVITEX and nearby schools.",
    featured: true,
    agent: "Marisol Domingo",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-08-05"
  },
  {
    id: 2,
    title: "Riverside Farm Lot, Titled",
    location: "Brgy. San Isidro, Calamba",
    city: "Calamba",
    province: "Laguna",
    type: "Lot Only",
    listingType: "For Sale",
    price: 4200000,
    bedrooms: 0,
    bathrooms: 0,
    lotArea: 800,
    floorArea: 0,
    image: "https://picsum.photos/seed/tt-lot-2/900/650",
    description: "An 800 sqm titled agricultural-residential lot bordering a creek, suited for a weekend farm, orchard, or future subdivision.",
    fullDescription: "This 800 sqm titled lot in San Isidro, Calamba borders a shallow creek and is currently planted with mango and calamansi trees. Zoned agricultural-residential, it suits a weekend farm, a small orchard business, or future residential development once the area's conversion permits are secured. Road access is via a barangay road passable by sedan, roughly 15 minutes from the Calamba exit.",
    featured: false,
    agent: "Renato Cabrera",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-07-22"
  },
  {
    id: 3,
    title: "2BR Condo Unit near Ayala Alabang",
    location: "Filinvest City, Muntinlupa",
    city: "Muntinlupa",
    province: "Metro Manila",
    type: "Condominium",
    listingType: "For Rent",
    price: 38000,
    priceUnit: "month",
    bedrooms: 2,
    bathrooms: 2,
    lotArea: 0,
    floorArea: 62,
    image: "https://picsum.photos/seed/tt-condo-3/900/650",
    description: "A move-in ready 2-bedroom unit on the 18th floor with pool and BGC-style skyline views, walking distance to Filinvest City offices.",
    fullDescription: "Located on the 18th floor of a Filinvest City residential tower, this 62 sqm two-bedroom unit comes semi-furnished with built-in cabinetry, a split-type aircon in each room, and a balcony facing the Muntinlupa skyline. Building amenities include a lap pool, gym, and 24-hour lobby security. Walking distance to Filinvest corporate offices and a short ride to Alabang Town Center.",
    featured: true,
    agent: "Katrina Buenaflor",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-08-01"
  },
  {
    id: 4,
    title: "Beachfront Vacation Lot",
    location: "Brgy. Calubcub, Laiya",
    city: "San Juan",
    province: "Batangas",
    type: "Lot Only",
    listingType: "For Sale",
    price: 9500000,
    bedrooms: 0,
    bathrooms: 0,
    lotArea: 300,
    floorArea: 0,
    image: "https://picsum.photos/seed/tt-lot-4/900/650",
    description: "A 300 sqm beachfront parcel in Laiya with direct sand access, ideal for a vacation home or short-term rental build.",
    fullDescription: "This 300 sqm beachfront lot in Laiya, San Juan sits along a quiet stretch of white-sand coastline with direct beach access from the property line. Electricity and water connections are available at the road. Popular among buyers planning a vacation home or a small beach rental business, with several resorts and dive shops already operating nearby.",
    featured: true,
    agent: "Renato Cabrera",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-06-30"
  },
  {
    id: 5,
    title: "Townhouse Unit near Antipolo Church",
    location: "Brgy. San Roque, Antipolo",
    city: "Antipolo",
    province: "Rizal",
    type: "Townhouse",
    listingType: "For Sale",
    price: 5450000,
    bedrooms: 3,
    bathrooms: 2,
    lotArea: 60,
    floorArea: 88,
    image: "https://picsum.photos/seed/tt-town-5/900/650",
    description: "A compact three-storey townhouse with a rooftop deck and city view, minutes from Antipolo Cathedral and Ynares Center.",
    fullDescription: "This three-storey townhouse in San Roque, Antipolo offers 88 sqm of floor area on a 60 sqm lot, with a small rooftop deck framing views toward Metro Manila on clear days. The layout includes a ground-floor garage and powder room, second-floor living and dining, and third-floor bedrooms. Minutes from Antipolo Cathedral, Ynares Center, and the Sumulong Highway.",
    featured: false,
    agent: "Marisol Domingo",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-07-10"
  },
  {
    id: 6,
    title: "Pre-Selling House and Lot, Corner Unit",
    location: "Brgy. Malagasang, Imus",
    city: "Imus",
    province: "Cavite",
    type: "House and Lot",
    listingType: "For Sale",
    price: 3980000,
    bedrooms: 3,
    bathrooms: 2,
    lotArea: 90,
    floorArea: 70,
    image: "https://picsum.photos/seed/tt-house-6/900/650",
    description: "A pre-selling single-attached unit in a new Imus development, with flexible in-house financing terms available.",
    fullDescription: "This pre-selling single-attached house and lot in Malagasang, Imus is part of a new phase of development with paved roads, a perimeter fence, and a dedicated basketball court. The unit offers three bedrooms and two toilet-and-bath layouts across 70 sqm of floor area. In-house and bank financing terms are both available, with turnover expected within 18 months of reservation.",
    featured: false,
    agent: "Katrina Buenaflor",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-08-08"
  },
  {
    id: 7,
    title: "Studio Loft Near UST",
    location: "España Blvd, Sampaloc",
    city: "Manila",
    province: "Metro Manila",
    type: "Condominium",
    listingType: "For Rent",
    price: 16500,
    priceUnit: "month",
    bedrooms: 1,
    bathrooms: 1,
    lotArea: 0,
    floorArea: 24,
    image: "https://picsum.photos/seed/tt-condo-7/900/650",
    description: "A compact fully-furnished studio a five-minute walk from UST, popular with students and young professionals.",
    fullDescription: "A fully-furnished 24 sqm studio loft along España Boulevard, a five-minute walk from the University of Santo Tomas. Includes a bed frame, study desk, mini fridge, and window-type aircon. The building has a shared laundry area and 24-hour guard. Popular with students, medical residents, and young professionals working nearby.",
    featured: false,
    agent: "Katrina Buenaflor",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-05-18"
  },
  {
    id: 8,
    title: "Hillside House with Lake View",
    location: "Brgy. Tagaytay-Silang Rd, Tagaytay",
    city: "Tagaytay",
    province: "Cavite",
    type: "House and Lot",
    listingType: "For Sale",
    price: 14200000,
    bedrooms: 5,
    bathrooms: 4,
    lotArea: 320,
    floorArea: 240,
    image: "https://picsum.photos/seed/tt-house-8/900/650",
    description: "A five-bedroom hillside home with a partial Taal Lake view, wraparound porch, and mature pine landscaping.",
    fullDescription: "Set on a 320 sqm hillside lot along the Tagaytay-Silang Road, this 240 sqm home offers a partial view of Taal Lake from its wraparound porch and second-floor bedrooms. The property includes five bedrooms, a family lounge with a fireplace, and mature pine and bougainvillea landscaping. A short drive from Tagaytay Picnic Grove and the main strip of restaurants along Aguinaldo Highway.",
    featured: true,
    agent: "Marisol Domingo",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-07-28"
  },
  {
    id: 9,
    title: "Industrial Warehouse Lot",
    location: "Brgy. Real, Calamba",
    city: "Calamba",
    province: "Laguna",
    type: "Commercial",
    listingType: "For Sale",
    price: 18750000,
    bedrooms: 0,
    bathrooms: 1,
    lotArea: 1200,
    floorArea: 900,
    image: "https://picsum.photos/seed/tt-comm-9/900/650",
    description: "A 1,200 sqm titled warehouse property with a loading bay, near the Calamba exit of the South Luzon Expressway.",
    fullDescription: "This titled 1,200 sqm commercial property in Barangay Real, Calamba includes a 900 sqm pre-engineered steel warehouse with an 8-meter clear ceiling height, a truck loading bay, and an attached two-storey office block. Three-phase power is already connected. Located within 10 minutes of the SLEX Calamba exit, making it suited for light manufacturing, logistics, or storage use.",
    featured: false,
    agent: "Renato Cabrera",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-06-14"
  },
  {
    id: 10,
    title: "Garden Duplex near Nuvali",
    location: "Brgy. Canlalay, Biñan",
    city: "Biñan",
    province: "Laguna",
    type: "Duplex",
    listingType: "For Rent",
    price: 28000,
    priceUnit: "month",
    bedrooms: 3,
    bathrooms: 2,
    lotArea: 110,
    floorArea: 95,
    image: "https://picsum.photos/seed/tt-duplex-10/900/650",
    description: "A three-bedroom duplex half unit with a small front garden, a 10-minute drive from Nuvali's business and lifestyle hub.",
    fullDescription: "This half of a duplex in Canlalay, Biñan comes with a small fenced front garden and a covered single-car carport. The three-bedroom layout includes a maid's room convertible to a home office, and the unit is unfurnished apart from kitchen counters and cabinetry. A 10-minute drive from Nuvali's business park, schools, and lifestyle strip.",
    featured: false,
    agent: "Marisol Domingo",
    agency: "Tumbletech Realty Partners",
    dateAdded: "2026-07-02"
  }
];

/* ---------------------------------------------------------------------
   2. STATE
--------------------------------------------------------------------- */
let activeFilters = {
  location: "",
  type: "",
  maxPrice: "",
  minBedrooms: "",
  listingType: ""
};
let activeSort = "newest";

/* ---------------------------------------------------------------------
   3. HELPERS
--------------------------------------------------------------------- */
function formatPeso(amount, unit) {
  const formatted = "\u20B1" + Number(amount).toLocaleString("en-PH");
  return unit === "month" ? formatted + " /mo" : formatted;
}

function populateFilterOptions() {
  const locationSelect = document.getElementById("fLocation");
  const typeSelect = document.getElementById("fType");

  const provinces = [...new Set(PROPERTIES.map(p => p.province))].sort();
  provinces.forEach(prov => {
    const opt = document.createElement("option");
    opt.value = prov;
    opt.textContent = prov;
    locationSelect.appendChild(opt);
  });

  const types = [...new Set(PROPERTIES.map(p => p.type))].sort();
  types.forEach(t => {
    const opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    typeSelect.appendChild(opt);
  });
}

/* ---------------------------------------------------------------------
   4. FILTER + SORT PIPELINE
--------------------------------------------------------------------- */
function getFilteredProperties() {
  return PROPERTIES.filter(p => {
    if (activeFilters.location && p.province !== activeFilters.location) return false;
    if (activeFilters.type && p.type !== activeFilters.type) return false;
    if (activeFilters.maxPrice && p.price > Number(activeFilters.maxPrice)) return false;
    if (activeFilters.minBedrooms && p.bedrooms < Number(activeFilters.minBedrooms)) return false;
    if (activeFilters.listingType && p.listingType !== activeFilters.listingType) return false;
    return true;
  });
}

function getSortedProperties(list) {
  const sorted = [...list];
  switch (activeSort) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "lot-desc":
      sorted.sort((a, b) => b.lotArea - a.lotArea);
      break;
    case "newest":
    default:
      sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      break;
  }
  return sorted;
}

/* ---------------------------------------------------------------------
   5. RENDERING
--------------------------------------------------------------------- */
function renderCard(p) {
  const specTag = p.type === "Lot Only" || p.type === "Commercial"
    ? `${p.lotArea.toLocaleString()} sqm lot`
    : `${p.floorArea.toLocaleString()} sqm floor`;

  const bedBathHtml = (p.bedrooms > 0 || p.bathrooms > 0) ? `
        <span><i class="bi bi-door-closed"></i> ${p.bedrooms} Bed</span>
        <span><i class="bi bi-droplet"></i> ${p.bathrooms} Bath</span>` : "";

  return `
  <div class="col-12 col-sm-6 col-lg-4 tt-property-col">
    <article class="tt-card" data-id="${p.id}">
      <div class="tt-card-media">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        ${p.featured ? `<span class="tt-card-badge"><i class="bi bi-star-fill"></i> Featured</span>` : ""}
        <span class="tt-card-status">${p.listingType}</span>
        <span class="tt-card-tag">${specTag}</span>
      </div>
      <div class="tt-card-body">
        <div class="tt-card-price">${formatPeso(p.price, p.priceUnit)} <small>${p.type}</small></div>
        <h3 class="tt-card-title">${p.title}</h3>
        <div class="tt-card-location"><i class="bi bi-geo-alt"></i> ${p.location}, ${p.province}</div>
        <p class="tt-card-desc">${p.description}</p>
        <div class="tt-spec-row">
          ${bedBathHtml}
          <span><i class="bi bi-bounding-box"></i> ${p.lotArea.toLocaleString()} sqm lot</span>
        </div>
        <div class="tt-card-actions">
          <button class="btn tt-btn-view" data-view-id="${p.id}">View Property</button>
          <button class="btn tt-btn-contact" data-contact-id="${p.id}">Contact Agent</button>
        </div>
      </div>
    </article>
  </div>`;
}

function renderGrid() {
  const grid = document.getElementById("propertyGrid");
  const emptyState = document.getElementById("emptyState");
  const filtered = getSortedProperties(getFilteredProperties());

  document.getElementById("resultsCount").textContent = filtered.length;

  if (filtered.length === 0) {
    grid.innerHTML = "";
    emptyState.classList.remove("d-none");
    return;
  }

  emptyState.classList.add("d-none");
  grid.innerHTML = filtered.map(renderCard).join("");
}

/* ---------------------------------------------------------------------
   6. MODAL
--------------------------------------------------------------------- */
function openPropertyModal(id) {
  const p = PROPERTIES.find(x => x.id === id);
  if (!p) return;

  const modalBody = document.getElementById("modalBody");
  const bedBathBlock = (p.bedrooms > 0 || p.bathrooms > 0) ? `
        <div><span class="label">Bedrooms</span><span class="value">${p.bedrooms}</span></div>
        <div><span class="label">Bathrooms</span><span class="value">${p.bathrooms}</span></div>` : "";
  const floorAreaBlock = p.floorArea > 0 ? `<div><span class="label">Floor Area</span><span class="value">${p.floorArea.toLocaleString()} sqm</span></div>` : "";

  modalBody.innerHTML = `
    <img src="${p.image.replace('/900/650', '/1000/560')}" alt="${p.title}" class="tt-modal-img">
    <div class="tt-modal-price">${formatPeso(p.price, p.priceUnit)}</div>
    <div class="tt-modal-location"><i class="bi bi-geo-alt"></i> ${p.location}, ${p.city}, ${p.province}</div>
    <p class="tt-modal-desc">${p.fullDescription}</p>
    <div class="tt-modal-specs">
      ${bedBathBlock}
      <div><span class="label">Lot Area</span><span class="value">${p.lotArea.toLocaleString()} sqm</span></div>
      ${floorAreaBlock}
      <div><span class="label">Type</span><span class="value">${p.type}</span></div>
      <div><span class="label">Listing</span><span class="value">${p.listingType}</span></div>
    </div>
    <div class="tt-modal-agent">
      <div class="tt-modal-agent-info">
        <strong>${p.agent}</strong>
        ${p.agency}
      </div>
      <button class="btn tt-btn-accent" id="modalContactBtn" data-contact-id="${p.id}">
        <i class="bi bi-telephone"></i> Contact Agent
      </button>
    </div>
  `;

  document.getElementById("propertyModalLabel").textContent = p.title;
  const modal = bootstrap.Modal.getOrCreateInstance(document.getElementById("propertyModal"));
  modal.show();
}

function handleContactClick(id) {
  const p = PROPERTIES.find(x => x.id === id);
  if (!p) return;
  alert(`Contact request sent for "${p.title}".\nAgent: ${p.agent} (${p.agency})\n\nThis is a demo action — no message has actually been sent yet.`);
}

/* ---------------------------------------------------------------------
   7. EVENT WIRING
--------------------------------------------------------------------- */
function readFiltersFromForm() {
  activeFilters.location = document.getElementById("fLocation").value;
  activeFilters.type = document.getElementById("fType").value;
  activeFilters.maxPrice = document.getElementById("fMaxPrice").value;
  activeFilters.minBedrooms = document.getElementById("fBedrooms").value;
}

function clearAllFilters() {
  activeFilters = { location: "", type: "", maxPrice: "", minBedrooms: "", listingType: "" };
  document.getElementById("searchForm").reset();
  renderGrid();
}

function initEvents() {
  document.getElementById("searchForm").addEventListener("submit", e => {
    e.preventDefault();
    readFiltersFromForm();
    renderGrid();
    document.getElementById("listings").scrollIntoView({ behavior: "smooth" });
  });

  document.getElementById("sortSelect").addEventListener("change", e => {
    activeSort = e.target.value;
    renderGrid();
  });

  document.getElementById("clearFilters").addEventListener("click", clearAllFilters);
  document.getElementById("emptyClearBtn").addEventListener("click", clearAllFilters);

  // quick filter links in navbar (For Sale / For Rent)
  document.querySelectorAll("[data-quick-filter]").forEach(link => {
    link.addEventListener("click", () => {
      activeFilters.listingType = link.dataset.quickFilter;
      renderGrid();
    });
  });

  // event delegation for dynamically rendered card buttons
  document.getElementById("propertyGrid").addEventListener("click", e => {
    const viewBtn = e.target.closest("[data-view-id]");
    if (viewBtn) {
      openPropertyModal(Number(viewBtn.dataset.viewId));
      return;
    }
    const contactBtn = e.target.closest("[data-contact-id]");
    if (contactBtn) {
      handleContactClick(Number(contactBtn.dataset.contactId));
    }
  });

  // contact button inside the modal (rebuilt each time modal opens)
  document.getElementById("modalBody").addEventListener("click", e => {
    const contactBtn = e.target.closest("[data-contact-id]");
    if (contactBtn) {
      handleContactClick(Number(contactBtn.dataset.contactId));
    }
  });
}

/* ---------------------------------------------------------------------
   8. INIT
--------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  populateFilterOptions();
  initEvents();
  renderGrid();
});
