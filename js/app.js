 /* =====================================================================
   TUMBLETECH REALTY — app.js
   Ribidu CSV-driven property listings
   ===================================================================== */

let PROPERTIES = [];

const CSV_PATH = "./assets/spsheet/ribidu-propertydb.csv";
const IMAGE_PATH = "./assets/img/properties/";

/* ---------------------------------------------------------------------
   HELPERS
--------------------------------------------------------------------- */

function cleanValue(value) {
  return String(value ?? "").trim();
}

function parseNumber(value) {
  if (!value) return 0;

  const cleaned = String(value)
    .replace(/₱/g, "")
    .replace(/,/g, "")
    .trim();

  const number = Number(cleaned);

  return Number.isFinite(number) ? number : 0;
}

function formatPeso(amount) {
  if (!amount) return "Price on Request";

  return "₱" + Number(amount).toLocaleString("en-PH");
}

function formatArea(area) {
  if (!area) return "";

  return Number(area).toLocaleString("en-PH") + " sqm";
}

/* ---------------------------------------------------------------------
   PROPERTY IMAGES
--------------------------------------------------------------------- */

function getPropertyImages(rowNumber) {
  const number = cleanValue(rowNumber);

  if (!number) return [];

  const images = [];

  /*
   * Supports:
   * 001a.jpg
   * 001b.jpg
   * 001c.jpg
   * 001d.jpg
   *
   * Add more letters here if needed.
   */

  const suffixes = "abcdefghijklmnopqrstuvwxyz";

  for (const suffix of suffixes) {
    images.push(`${IMAGE_PATH}${number}${suffix}.jpg`);
  }

  return images;
}

function getMainImage(rowNumber) {
  const number = cleanValue(rowNumber);

  if (!number) return "";

  return `${IMAGE_PATH}${number}a.jpg`;
}

/* ---------------------------------------------------------------------
   NORMALIZE CSV ROW
--------------------------------------------------------------------- */

function normalizeProperty(row) {

  const rowNumber =
    cleanValue(row["Row Number"]);

  return {

    rowNumber,

    id:
      cleanValue(row["Internal Control Number"]),

    publicListingNumber:
      cleanValue(row["Public Ribidu Listing Number"]),

    title:
      cleanValue(row["Title"]),

    transaction:
      cleanValue(row["Transaction"]),

    type:
      cleanValue(row["Type"]),

    province:
      cleanValue(row["Province"]),

    city:
      cleanValue(row["City"]),

    barangay:
      cleanValue(row["Barangay"]),

    fullAddress:
      cleanValue(row["Full Address"]),

    owner:
      cleanValue(row["Owner"]),

    price:
      parseNumber(row["Price"]),

    lotArea:
      parseNumber(row["Lot Area"]),

    floorArea:
      parseNumber(row["Floor Area"]),

    bedrooms:
      parseNumber(row["Bedrooms"]),

    bathrooms:
      parseNumber(row["Bathrooms"]),

    agent:
      cleanValue(row["Agent"]),

    status:
      cleanValue(row["Status"]),

    image:
      getMainImage(rowNumber),

    images:
      getPropertyImages(rowNumber)

  };
}

/* ---------------------------------------------------------------------
   LOAD CSV
--------------------------------------------------------------------- */

async function loadProperties() {

  try {

    const response =
      await fetch(CSV_PATH);

    if (!response.ok) {
      throw new Error(
        `CSV request failed: ${response.status}`
      );
    }

    const csvText =
      await response.text();

    Papa.parse(csvText, {

      header: true,

      skipEmptyLines: true,

      complete: function(results) {

        console.log(
          "PapaParse rows:",
          results.data.length
        );

        const validRows =
          results.data.filter(row => {

            return cleanValue(
              row["Internal Control Number"]
            ) !== "";

          });

        PROPERTIES =
          validRows.map(
            normalizeProperty
          );

        console.log(
          `Ribidu properties loaded: ${PROPERTIES.length}`
        );

        console.log(PROPERTIES);

        populateFilterOptions();

        renderGrid();

      },

      error: function(error) {

        console.error(
          "PapaParse error:",
          error
        );

      }

    });

  } catch (error) {

    console.error(
      "Error loading Ribidu property database:",
      error
    );

  }

}

/* ---------------------------------------------------------------------
   FILTER OPTIONS
--------------------------------------------------------------------- */

function populateFilterOptions() {

  const locationSelect =
    document.getElementById("fLocation");

  const typeSelect =
    document.getElementById("fType");

  if (!locationSelect || !typeSelect) return;

  const provinces = [
    ...new Set(
      PROPERTIES
        .map(p => p.province)
        .filter(Boolean)
    )
  ].sort();

  provinces.forEach(province => {

    const option =
      document.createElement("option");

    option.value =
      province;

    option.textContent =
      province;

    locationSelect.appendChild(
      option
    );

  });

  const types = [
    ...new Set(
      PROPERTIES
        .map(p => p.type)
        .filter(Boolean)
    )
  ].sort();

  types.forEach(type => {

    const option =
      document.createElement("option");

    option.value =
      type;

    option.textContent =
      type;

    typeSelect.appendChild(
      option
    );

  });

}

/* ---------------------------------------------------------------------
   FILTER STATE
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
   FILTER
--------------------------------------------------------------------- */

function getFilteredProperties() {

  return PROPERTIES.filter(property => {

    if (
      activeFilters.location &&
      property.province !==
      activeFilters.location
    ) {
      return false;
    }

    if (
      activeFilters.type &&
      property.type !==
      activeFilters.type
    ) {
      return false;
    }

    if (
      activeFilters.maxPrice &&
      property.price >
      Number(activeFilters.maxPrice)
    ) {
      return false;
    }

    if (
      activeFilters.minBedrooms &&
      property.bedrooms <
      Number(activeFilters.minBedrooms)
    ) {
      return false;
    }

    if (
      activeFilters.listingType &&
      property.transaction !==
      activeFilters.listingType
    ) {
      return false;
    }

    return true;

  });

}

/* ---------------------------------------------------------------------
   SORT
--------------------------------------------------------------------- */

function getSortedProperties(list) {

  const sorted =
    [...list];

  switch (activeSort) {

    case "price-asc":

      sorted.sort(
        (a, b) =>
          a.price - b.price
      );

      break;

    case "price-desc":

      sorted.sort(
        (a, b) =>
          b.price - a.price
      );

      break;

    case "lot-desc":

      sorted.sort(
        (a, b) =>
          b.lotArea - a.lotArea
      );

      break;

    case "newest":

    default:

      break;

  }

  return sorted;
}

/* ---------------------------------------------------------------------
   PROPERTY CARD
--------------------------------------------------------------------- */

function renderCard(property) {

  const location = [
    property.barangay,
    property.city,
    property.province
  ]
    .filter(Boolean)
    .join(", ");

  let specs = "";

  if (property.bedrooms > 0) {

    specs += `
      <span>
        <i class="bi bi-door-closed"></i>
        ${property.bedrooms} Bed
      </span>
    `;

  }

  if (property.bathrooms > 0) {

    specs += `
      <span>
        <i class="bi bi-droplet"></i>
        ${property.bathrooms} Bath
      </span>
    `;

  }

  if (property.lotArea > 0) {

    specs += `
      <span>
        <i class="bi bi-bounding-box"></i>
        ${formatArea(property.lotArea)}
      </span>
    `;

  }

  if (property.floorArea > 0) {

    specs += `
      <span>
        <i class="bi bi-house"></i>
        ${formatArea(property.floorArea)} floor
      </span>
    `;

  }

  return `

    <div class="col-12 col-sm-6 col-lg-4 tt-property-col">

      <article
        class="tt-card"
        data-id="${property.id}"
      >

        <div class="tt-card-media">

          <img
            src="${property.image}"
            alt="${property.title}"
            loading="lazy"
            onerror="this.src='./assets/img/property-placeholder.jpg';"
          >

          <span class="tt-card-status">
            ${property.transaction}
          </span>

          ${
            property.status
              ? `
                <span class="tt-card-badge">
                  ${property.status}
                </span>
              `
              : ""
          }

        </div>

        <div class="tt-card-body">

          <div class="tt-card-price">

            ${formatPeso(property.price)}

            <small>
              ${property.type}
            </small>

          </div>

          <h3 class="tt-card-title">
            ${property.title}
          </h3>

          <div class="tt-card-location">

            <i class="bi bi-geo-alt"></i>

            ${location}

          </div>

          <div class="tt-spec-row">

            ${specs}

          </div>

          <div class="tt-card-listing-number">

            ${property.publicListingNumber}

          </div>

          <div class="tt-card-actions">

            <button
              class="btn tt-btn-view"
              data-view-id="${property.id}"
            >
              View Property
            </button>

            <button
              class="btn tt-btn-contact"
              data-contact-id="${property.id}"
            >
              Contact Agent
            </button>

          </div>

        </div>

      </article>

    </div>

  `;

}

/* ---------------------------------------------------------------------
   GRID
--------------------------------------------------------------------- */

function renderGrid() {

  const grid =
    document.getElementById(
      "propertyGrid"
    );

  const emptyState =
    document.getElementById(
      "emptyState"
    );

  if (!grid) return;

  const filtered =
    getSortedProperties(
      getFilteredProperties()
    );

  const resultsCount =
    document.getElementById(
      "resultsCount"
    );

  if (resultsCount) {

    resultsCount.textContent =
      filtered.length;

  }

  if (filtered.length === 0) {

    grid.innerHTML = "";

    if (emptyState) {

      emptyState.classList.remove(
        "d-none"
      );

    }

    return;

  }

  if (emptyState) {

    emptyState.classList.add(
      "d-none"
    );

  }

  grid.innerHTML =
    filtered
      .map(renderCard)
      .join("");

}

/* ---------------------------------------------------------------------
   PROPERTY MODAL
   Carousel appears ONLY inside the property modal.
--------------------------------------------------------------------- */

function buildPropertyCarousel(property) {

  const images =
    property.images || [];

  const validImages = [];

  /*
   * We cannot know from the CSV how many files exist.
   * Therefore we test the image files and remove missing ones
   * before displaying the carousel.
   */

  return new Promise(resolve => {

    if (!images.length) {

      resolve(`
        <img
          src="${property.image}"
          alt="${property.title}"
          class="tt-modal-img"
        >
      `);

      return;

    }

    let checked = 0;

    images.forEach((src, index) => {

      const img =
        new Image();

      img.onload = function() {

        validImages[index] =
          src;

        checked++;

        if (
          checked === images.length
        ) {

          const finalImages =
            validImages.filter(Boolean);

          if (!finalImages.length) {

            resolve(`
              <img
                src="${property.image}"
                alt="${property.title}"
                class="tt-modal-img"
              >
            `);

            return;

          }

          const carouselId =
            `propertyCarousel-${property.rowNumber}`;

          const slides =
            finalImages.map(
              (image, i) => `
                <div
                  class="carousel-item ${
                    i === 0
                      ? "active"
                      : ""
                  }"
                >

                  <img
                    src="${image}"
                    class="d-block w-100 tt-modal-img"
                    alt="${property.title} photo ${i + 1}"
                  >

                </div>
              `
            ).join("");

          const indicators =
            finalImages.map(
              (image, i) => `
                <button
                  type="button"
                  data-bs-target="#${carouselId}"
                  data-bs-slide-to="${i}"
                  ${
                    i === 0
                      ? 'class="active" aria-current="true"'
                      : ""
                  }
                  aria-label="Photo ${i + 1}"
                ></button>
              `
            ).join("");

          const controls =
            finalImages.length > 1
              ? `
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#${carouselId}"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>

                  <span class="visually-hidden">
                    Previous
                  </span>
                </button>

                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#${carouselId}"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>

                  <span class="visually-hidden">
                    Next
                  </span>
                </button>
              `
              : "";

          resolve(`

            <div
              id="${carouselId}"
              class="carousel slide"
              data-bs-interval="false"
            >

              ${
                finalImages.length > 1
                  ? `
                    <div class="carousel-indicators">
                      ${indicators}
                    </div>
                  `
                  : ""
              }

              <div class="carousel-inner">

                ${slides}

              </div>

              ${controls}

            </div>

          `);

        }

      };

      img.onerror = function() {

        checked++;

        if (
          checked === images.length
        ) {

          const finalImages =
            validImages.filter(Boolean);

          if (!finalImages.length) {

            resolve(`
              <img
                src="${property.image}"
                alt="${property.title}"
                class="tt-modal-img"
              >
            `);

            return;

          }

          const carouselId =
            `propertyCarousel-${property.rowNumber}`;

          const slides =
            finalImages.map(
              (image, i) => `
                <div
                  class="carousel-item ${
                    i === 0
                      ? "active"
                      : ""
                  }"
                >

                  <img
                    src="${image}"
                    class="d-block w-100 tt-modal-img"
                    alt="${property.title} photo ${i + 1}"
                  >

                </div>
              `
            ).join("");

          const indicators =
            finalImages.map(
              (image, i) => `
                <button
                  type="button"
                  data-bs-target="#${carouselId}"
                  data-bs-slide-to="${i}"
                  ${
                    i === 0
                      ? 'class="active" aria-current="true"'
                      : ""
                  }
                  aria-label="Photo ${i + 1}"
                ></button>
              `
            ).join("");

          const controls =
            finalImages.length > 1
              ? `
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#${carouselId}"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                </button>

                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#${carouselId}"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                </button>
              `
              : "";

          resolve(`

            <div
              id="${carouselId}"
              class="carousel slide"
              data-bs-interval="false"
            >

              ${
                finalImages.length > 1
                  ? `
                    <div class="carousel-indicators">
                      ${indicators}
                    </div>
                  `
                  : ""
              }

              <div class="carousel-inner">
                ${slides}
              </div>

              ${controls}

            </div>

          `);

        }

      };

      img.src = src;

    });

  });

}

async function openPropertyModal(id) {

  const property =
    PROPERTIES.find(
      p => p.id === id
    );

  if (!property) return;

  const modalBody =
    document.getElementById(
      "modalBody"
    );

  if (!modalBody) return;

  modalBody.innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">
          Loading photos...
        </span>
      </div>
    </div>
  `;

  const location = [
    property.fullAddress,
    property.city,
    property.province
  ]
    .filter(Boolean)
    .join(", ");

  const carousel =
    await buildPropertyCarousel(property);

  modalBody.innerHTML = `

    ${carousel}

    <div class="tt-modal-price">

      ${formatPeso(property.price)}

    </div>

    <div class="tt-modal-location">

      <i class="bi bi-geo-alt"></i>

      ${location}

    </div>

    <div class="tt-modal-specs">

      <div>

        <span class="label">
          Lot Area
        </span>

        <span class="value">
          ${
            property.lotArea > 0
              ? formatArea(property.lotArea)
              : "—"
          }
        </span>

      </div>

      ${
        property.floorArea > 0
          ? `
            <div>

              <span class="label">
                Floor Area
              </span>

              <span class="value">
                ${formatArea(property.floorArea)}
              </span>

            </div>
          `
          : ""
      }

      ${
        property.bedrooms > 0
          ? `
            <div>

              <span class="label">
                Bedrooms
              </span>

              <span class="value">
                ${property.bedrooms}
              </span>

            </div>
          `
          : ""
      }

      ${
        property.bathrooms > 0
          ? `
            <div>

              <span class="label">
                Bathrooms
              </span>

              <span class="value">
                ${property.bathrooms}
              </span>

            </div>
          `
          : ""
      }

      <div>

        <span class="label">
          Type
        </span>

        <span class="value">
          ${property.type || "—"}
        </span>

      </div>

      <div>

        <span class="label">
          Status
        </span>

        <span class="value">
          ${property.status || "—"}
        </span>

      </div>

    </div>

    <div class="tt-modal-agent">

      <div class="tt-modal-agent-info">

        <strong>
          ${property.agent || "Ribidu"}
        </strong>

        Ribidu Property Listing

      </div>

      <button
        class="btn tt-btn-accent"
        id="modalContactBtn"
        data-contact-id="${property.id}"
      >

        <i class="bi bi-telephone"></i>

        Contact Agent

      </button>

    </div>

  `;

  const modalTitle =
    document.getElementById(
      "propertyModalLabel"
    );

  if (modalTitle) {

    modalTitle.textContent =
      property.title;

  }

  const modalElement =
    document.getElementById(
      "propertyModal"
    );

  if (modalElement) {

    const modal =
      bootstrap.Modal.getOrCreateInstance(
        modalElement
      );

    modal.show();

  }

}

/* ---------------------------------------------------------------------
   PROPERTY INQUIRY MODAL
--------------------------------------------------------------------- */

function openInquiryModal(id) {

  const property =
    PROPERTIES.find(
      p => p.id === id
    );

  if (!property) return;

  const inquiryModal =
    document.getElementById(
      "propertyInquiryModal"
    );

  if (!inquiryModal) {
    console.error(
      "Property inquiry modal not found in index.html"
    );
    return;
  }

  const agentName =
    property.agent || "Ribidu Agent";

  const recipientField =
    document.getElementById(
      "inquiryRecipient"
    );

  const propertyField =
    document.getElementById(
      "inquiryProperty"
    );

  const emailField =
    document.getElementById(
      "inquiryEmail"
    );

  const messageField =
    document.getElementById(
      "inquiryMessage"
    );

  if (recipientField) {

    recipientField.value =
      agentName;

  }

  if (propertyField) {

    propertyField.value =
      `${property.title} — ${property.publicListingNumber}`;

  }

  if (emailField) {

    emailField.value = "";

    emailField.classList.remove(
      "is-invalid"
    );

  }

  if (messageField) {

    messageField.value =
      `Hello ${agentName},

I am interested in the property "${property.title}" (${property.publicListingNumber}). I would like to know more about the property and arrange a viewing.

Thank you.`;

    messageField.classList.remove(
      "is-invalid"
    );

  }

  const modal =
    bootstrap.Modal.getOrCreateInstance(
      inquiryModal
    );

  modal.show();

}

/* ---------------------------------------------------------------------
   CONTACT
--------------------------------------------------------------------- */

function sendInquiry() {

  const emailInput =
    document.getElementById("inquiryEmail");

  const messageInput =
    document.getElementById("inquiryMessage");

  if (!emailInput || !messageInput) {
    return;
  }

  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!email) {
    emailInput.focus();
    emailInput.classList.add("is-invalid");
    return;
  }

  if (!emailInput.checkValidity()) {
    emailInput.classList.add("is-invalid");
    emailInput.focus();
    return;
  }

  emailInput.classList.remove("is-invalid");

  if (!message) {
    messageInput.focus();
    messageInput.classList.add("is-invalid");
    return;
  }

  messageInput.classList.remove("is-invalid");

  /*
   * DEMO ONLY
   *
   * No message is actually sent yet.
   */

  const inquiryModalElement =
    document.getElementById("propertyInquiryModal");

  if (inquiryModalElement) {

    const inquiryModal =
      bootstrap.Modal.getOrCreateInstance(
        inquiryModalElement
      );

    inquiryModal.hide();
  }

  setTimeout(function() {

    alert("Your message has been sent.");

  }, 350);
}


/* ---------------------------------------------------------------------
   CONTACT
--------------------------------------------------------------------- */

function handleContactClick(id) {

  openInquiryModal(id);

}

/* ---------------------------------------------------------------------
   FORM
--------------------------------------------------------------------- */

function readFiltersFromForm() {

  const location =
    document.getElementById(
      "fLocation"
    );

  const type =
    document.getElementById(
      "fType"
    );

  const maxPrice =
    document.getElementById(
      "fMaxPrice"
    );

  const bedrooms =
    document.getElementById(
      "fBedrooms"
    );

  activeFilters.location =
    location
      ? location.value
      : "";

  activeFilters.type =
    type
      ? type.value
      : "";

  activeFilters.maxPrice =
    maxPrice
      ? maxPrice.value
      : "";

  activeFilters.minBedrooms =
    bedrooms
      ? bedrooms.value
      : "";

}

function clearAllFilters() {

  activeFilters = {

    location: "",

    type: "",

    maxPrice: "",

    minBedrooms: "",

    listingType: ""

  };

  activeSort =
    "newest";

  const form =
    document.getElementById(
      "searchForm"
    );

  if (form) {

    form.reset();

  }

  const sortSelect =
    document.getElementById(
      "sortSelect"
    );

  if (sortSelect) {

    sortSelect.value =
      "newest";

  }

  renderGrid();

}

/* ---------------------------------------------------------------------
   EVENTS
--------------------------------------------------------------------- */

function initEvents() {

  const searchForm =
    document.getElementById(
      "searchForm"
    );

  if (searchForm) {

    searchForm.addEventListener(
      "submit",
      function(e) {

        e.preventDefault();

        readFiltersFromForm();

        renderGrid();

        const listings =
          document.getElementById(
            "listings"
          );

        if (listings) {

          listings.scrollIntoView({
            behavior: "smooth"
          });

        }

      }
    );

  }

  const sortSelect =
    document.getElementById(
      "sortSelect"
    );

  if (sortSelect) {

    sortSelect.addEventListener(
      "change",
      function(e) {

        activeSort =
          e.target.value;

        renderGrid();

      }
    );

  }

  const clearFilters =
    document.getElementById(
      "clearFilters"
    );

  if (clearFilters) {

    clearFilters.addEventListener(
      "click",
      clearAllFilters
    );

  }

  const emptyClearBtn =
    document.getElementById(
      "emptyClearBtn"
    );

  if (emptyClearBtn) {

    emptyClearBtn.addEventListener(
      "click",
      clearAllFilters
    );

  }

  document
    .querySelectorAll(
      "[data-quick-filter]"
    )
    .forEach(function(link) {

      link.addEventListener(
        "click",
        function(e) {

          e.preventDefault();

          activeFilters.listingType =
            link.dataset.quickFilter;

          renderGrid();

          const listings =
            document.getElementById(
              "listings"
            );

          if (listings) {

            listings.scrollIntoView({
              behavior: "smooth"
            });

          }

        }
      );

    });

  const propertyGrid =
    document.getElementById(
      "propertyGrid"
    );

  if (propertyGrid) {

    propertyGrid.addEventListener(
      "click",
      function(e) {

        const viewButton =
          e.target.closest(
            "[data-view-id]"
          );

        if (viewButton) {

          openPropertyModal(
            viewButton.dataset.viewId
          );

          return;

        }

        const contactButton =
          e.target.closest(
            "[data-contact-id]"
          );

        if (contactButton) {

          handleContactClick(
            contactButton.dataset.contactId
          );

        }

      }
    );

  }

  const modalBody =
    document.getElementById(
      "modalBody"
    );

  if (modalBody) {

    modalBody.addEventListener(
      "click",
      function(e) {

        const contactButton =
          e.target.closest(
            "[data-contact-id]"
          );

        if (contactButton) {

          handleContactClick(
            contactButton.dataset.contactId
          );

        }

      }
    );

  }

  const sendInquiryBtn =
  document.getElementById("sendInquiryBtn");

  if (sendInquiryBtn) {

    sendInquiryBtn.addEventListener(
      "click",
      sendInquiry
    );

  }

}

/* ---------------------------------------------------------------------
   INITIALIZATION
--------------------------------------------------------------------- */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    initEvents();

    loadProperties();

  }
);