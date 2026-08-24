/* =========================================================
   RIBIDU — AGENT DASHBOARD
   agentdashboard.js

   Demo property management
   Uses localStorage for now.

   Production version:
   localStorage → Supabase Database + Storage
========================================================= */


/* ---------------------------------------------------------
   LOGIN
--------------------------------------------------------- */

const agentLoggedIn =
  sessionStorage.getItem("ribiduAgentLoggedIn");

if (agentLoggedIn !== "true") {

  window.location.href =
    "./agentdashboardlogin.html";

}


/* ---------------------------------------------------------
   CURRENT AGENT
--------------------------------------------------------- */

const CURRENT_AGENT = {
  name: "Juan Dela Cruz",
  role: "Property Agent"
};


/* ---------------------------------------------------------
   STORAGE
--------------------------------------------------------- */

const STORAGE_KEY =
  "ribiduAgentProperties";


function getProperties() {

  const stored =
    localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {

    return JSON.parse(stored);

  } catch (error) {

    console.error(
      "Error reading Ribidu properties:",
      error
    );

    return [];

  }

}


function saveProperties(properties) {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(properties)
  );

}


/* ---------------------------------------------------------
   LISTING NUMBER
--------------------------------------------------------- */

function generateListingNumber() {

  const year =
    new Date().getFullYear();

  const properties =
    getProperties();

  const number =
    String(properties.length + 1)
      .padStart(5, "0");

  return `RIB-${year}-${number}`;

}


/* ---------------------------------------------------------
   READ PROPERTY FORM
--------------------------------------------------------- */

function getPropertyFormData() {

  return {

    id:
      crypto.randomUUID(),

    listingNumber:
      generateListingNumber(),

    title:
      document
        .getElementById("propertyTitle")
        ?.value
        .trim(),

    transaction:
      document
        .getElementById("transaction")
        ?.value
        .trim(),

    type:
      document
        .getElementById("propertyType")
        ?.value
        .trim(),

    price:
      Number(
        document
          .getElementById("propertyPrice")
          ?.value || 0
      ),

    status:
      document
        .getElementById("propertyStatus")
        ?.value
        .trim(),

    province:
      document
        .getElementById("province")
        ?.value
        .trim(),

    city:
      document
        .getElementById("city")
        ?.value
        .trim(),

    barangay:
      document
        .getElementById("barangay")
        ?.value
        .trim(),

    address:
      document
        .getElementById("address")
        ?.value
        .trim(),

    lotArea:
      Number(
        document
          .getElementById("lotArea")
          ?.value || 0
      ),

    floorArea:
      Number(
        document
          .getElementById("floorArea")
          ?.value || 0
      ),

    bedrooms:
      Number(
        document
          .getElementById("bedrooms")
          ?.value || 0
      ),

    bathrooms:
      Number(
        document
          .getElementById("bathrooms")
          ?.value || 0
      ),

    description:
      document
        .getElementById("propertyDescription")
        ?.value
        .trim(),

    agent:
      CURRENT_AGENT.name,

    submittedAt:
      new Date().toISOString(),

    reviewStatus:
      "Pending Review",

    views:
      0

  };

}


/* ---------------------------------------------------------
   FORMAT PRICE
--------------------------------------------------------- */

function formatPeso(amount) {

  if (!amount) {
    return "Price on Request";
  }

  return (
    "₱" +
    Number(amount).toLocaleString("en-PH")
  );

}


/* ---------------------------------------------------------
   RENDER MY PROPERTIES
--------------------------------------------------------- */

function renderMyProperties() {

  const properties =
    getProperties();

  const propertiesSection =
    document.getElementById("properties");

  if (!propertiesSection) {
    return;
  }

  const tableBody =
    propertiesSection.querySelector("tbody");

  if (!tableBody) {
    return;
  }


  /*
   * If no properties have been submitted,
   * keep the existing demonstration rows.
   */

  if (properties.length === 0) {
    return;
  }


  tableBody.innerHTML = "";


  properties.forEach(
    function(property) {

      const row =
        document.createElement("tr");


      row.innerHTML = `

        <td>

          <div
            class="d-flex align-items-center gap-3"
          >

            <div
              class="property-thumbnail
                     d-flex
                     align-items-center
                     justify-content-center"
            >

              <i class="bi bi-image text-muted"></i>

            </div>

            <div>

              <div class="fw-semibold">
                ${escapeHTML(property.title)}
              </div>

              <small class="text-muted">

                ${escapeHTML(property.city || "")}

                ${
                  property.province
                    ? ", " +
                      escapeHTML(property.province)
                    : ""
                }

              </small>

            </div>

          </div>

        </td>


        <td>
          ${escapeHTML(property.type)}
        </td>


        <td>
          ${formatPeso(property.price)}
        </td>


        <td>

          <span class="badge bg-warning text-dark">

            ${escapeHTML(property.reviewStatus)}

          </span>

        </td>


        <td>
          ${property.views}
        </td>


        <td>

          <button
            class="btn btn-sm btn-outline-secondary"
            title="Edit"
            data-edit-property="${property.id}"
          >

            <i class="bi bi-pencil"></i>

          </button>


          <button
            class="btn btn-sm btn-outline-danger"
            title="Remove"
            data-delete-property="${property.id}"
          >

            <i class="bi bi-trash"></i>

          </button>

        </td>

      `;


      tableBody.appendChild(row);

    }
  );

}


/* ---------------------------------------------------------
   ESCAPE HTML
--------------------------------------------------------- */

function escapeHTML(value) {

  const div =
    document.createElement("div");

  div.textContent =
    value ?? "";

  return div.innerHTML;

}


/* ---------------------------------------------------------
   SUBMIT PROPERTY
--------------------------------------------------------- */

function submitProperty() {

  const propertyForm =
    document.getElementById(
      "propertyForm"
    );

  if (!propertyForm) {
    return;
  }


  if (!propertyForm.checkValidity()) {

    propertyForm.reportValidity();

    return;

  }


  const property =
    getPropertyFormData();


  const properties =
    getProperties();


  properties.push(property);


  saveProperties(properties);


  console.log(
    "Ribidu property submitted:",
    property
  );


  renderMyProperties();


  /*
   * Reset form
   */

  propertyForm.reset();


  /*
   * Clear photo preview
   */

  const photoPreview =
    document.getElementById(
      "photoPreview"
    );

  if (photoPreview) {
    photoPreview.innerHTML = "";
  }


  /*
   * Show submission modal
   */

  const modalElement =
    document.getElementById(
      "propertySubmittedModal"
    );


  if (modalElement) {

    const modal =
      bootstrap.Modal.getOrCreateInstance(
        modalElement
      );

    modal.show();

  }

}


/* ---------------------------------------------------------
   DELETE PROPERTY
--------------------------------------------------------- */

function deleteProperty(id) {

  const properties =
    getProperties();


  const property =
    properties.find(
      p => p.id === id
    );


  if (!property) {
    return;
  }


  const confirmed =
    confirm(
      `Remove "${property.title}" from your submitted properties?`
    );


  if (!confirmed) {
    return;
  }


  const remaining =
    properties.filter(
      p => p.id !== id
    );


  saveProperties(remaining);


  renderMyProperties();


  console.log(
    "Property removed:",
    property
  );

}


/* ---------------------------------------------------------
   PROPERTY TABLE EVENTS
--------------------------------------------------------- */

function initPropertyTableEvents() {

  const propertiesSection =
    document.getElementById(
      "properties"
    );


  if (!propertiesSection) {
    return;
  }


  propertiesSection.addEventListener(
    "click",
    function(event) {

      const deleteButton =
        event.target.closest(
          "[data-delete-property]"
        );


      if (deleteButton) {

        deleteProperty(
          deleteButton.dataset.deleteProperty
        );

        return;

      }


      const editButton =
        event.target.closest(
          "[data-edit-property]"
        );


      if (editButton) {

        editProperty(
          editButton.dataset.editProperty
        );

      }

    }
  );

}


/* ---------------------------------------------------------
   EDIT PROPERTY
--------------------------------------------------------- */

function editProperty(id) {

  const properties =
    getProperties();


  const property =
    properties.find(
      p => p.id === id
    );


  if (!property) {
    return;
  }


  /*
   * For now this is only a demo action.
   *
   * The next version can populate the
   * Add Property form with the property's
   * existing information.
   */

  alert(
    `Edit property:\n\n${property.title}\n\nListing Number: ${property.listingNumber}`
  );

}


/* ---------------------------------------------------------
   FORM INITIALIZATION
--------------------------------------------------------- */

function initPropertyForm() {

  const propertyForm =
    document.getElementById(
      "propertyForm"
    );


  if (!propertyForm) {
    return;
  }


  propertyForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();

      submitProperty();

    }
  );

}


/* ---------------------------------------------------------
   PHOTO PREVIEW
--------------------------------------------------------- */

function initPhotoPreview() {

  const propertyPhotos =
    document.getElementById(
      "propertyPhotos"
    );


  const photoPreview =
    document.getElementById(
      "photoPreview"
    );


  if (!propertyPhotos || !photoPreview) {
    return;
  }


  propertyPhotos.addEventListener(
    "change",
    function() {

      photoPreview.innerHTML = "";


      Array.from(this.files).forEach(
        function(file) {

          if (
            !file.type.startsWith("image/")
          ) {
            return;
          }


          const reader =
            new FileReader();


          reader.onload =
            function(event) {

              const img =
                document.createElement("img");

              img.src =
                event.target.result;

              img.alt =
                "Property photo";

              photoPreview.appendChild(
                img
              );

            };


          reader.readAsDataURL(file);

        }
      );

    }
  );

}


/* ---------------------------------------------------------
   INITIALIZATION
--------------------------------------------------------- */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    initPropertyForm();

    initPhotoPreview();

    initPropertyTableEvents();

    renderMyProperties();

  }
);

/* -----------------------------------------------------------
   LOGOUT
----------------------------------------------------------- */

const logoutBtn =
  document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener(
    "click",
    function(e) {

      e.preventDefault();

      sessionStorage.removeItem(
        "ribiduAgentLoggedIn"
      );

      window.location.href =
        "./agentdashboardlogin.html";

    }
  );

}