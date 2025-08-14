const fs = require('fs');

// 1. Read the raw scraped file
const raw = JSON.parse(fs.readFileSync('udyam_schema_raw.json', 'utf8'));

// 2. Function to clean IDs and make readable labels
function cleanFieldName(id) {
  if (!id) return "Unknown";
  return id
    .replace(/^txt/, '')      // remove 'txt'
    .replace(/^ctl00.*?\$/, '') // remove long ASP.NET prefixes
    .replace(/([A-Z])/g, ' $1') // add space before capital letters
    .trim();
}

// 3. Map over inputs to create cleaner schema
const cleanedInputs = raw.inputs.map(input => ({
  field: cleanFieldName(input.id) || cleanFieldName(input.name),
  name: input.name,
  type: input.type,
  placeholder: input.placeholder || ""
}));

// 4. Map over selects similarly
const cleanedSelects = raw.selects.map(select => ({
  field: cleanFieldName(select.id) || cleanFieldName(select.name),
  name: select.name,
  options: select.options || []
}));

// 5. Save cleaned schema
const cleanedSchema = {
  inputs: cleanedInputs,
  selects: cleanedSelects,
  buttons: raw.buttons
};

fs.writeFileSync('udyam_schema_clean.json', JSON.stringify(cleanedSchema, null, 2));
console.log("Cleaned schema saved to udyam_schema_clean.json");