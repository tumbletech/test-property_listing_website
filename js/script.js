// =========================================================
// RIBIDU PROPERTY DATABASE
// =========================================================

let ribiduProperties = [];

// Load property database
async function loadProperties() {
  try {
    const response = await fetch('./assets/spsheet/ribidu-propertydb.csv');

    if (!response.ok) {
      throw new Error(`Failed to load CSV: ${response.status}`);
    }

    const csvText = await response.text();

    const result = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    });

    if (result.errors.length) {
      console.warn('CSV parsing warnings:', result.errors);
    }

    ribiduProperties = result.data;

    populateLocationFilter(ribiduProperties);

    console.log(
      'Ribidu properties loaded:',
      ribiduProperties.length,
      ribiduProperties
    );

  } catch (error) {
    console.error('Error loading Ribidu property database:', error);
  }
}

// =========================================================
// SIMPLE CSV PARSER
// =========================================================

function parseCSV(csv) {
    const lines = csv.trim().split(/\r?\n/);

    const headers = lines[0].split(',').map(header => header.trim());

    return lines.slice(1).map(line => {
        const values = line.split(',');

        const property = {};

        headers.forEach((header, index) => {
            property[header] =  values[index]?.trim() || '';
        });

        return property;
    });
}

// =========================================================
// LOCATION FILTER
// =========================================================

function populateLocationFilter(properties) {

    const locationSelect = document.getElementById('fLocation');

    if(!locationSelect) {
        console.error('Location filter #fLocation not found.');
        return;
    }

    const locations = [
        ...new Set(
            properties
                .map(property => property['Province'])
                .filter(Boolean)
        )
    ];

    locations.sort();

    locations.forEach(location => {
        
        const option = document.createElement('option');

        option.value = location;
        option.textContent = location;

        locationSelect.appendChild(option);
    });
}

// =========================================================
// INITIALIZE RIBIDU
// =========================================================

document.addEventListener('DOMContentLoaded', () => {
    loadProperties();
});