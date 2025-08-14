const fs = require("fs");
const puppeteer = require("puppeteer");

const schema = JSON.parse(fs.readFileSync("udyam_schema_raw.json", "utf-8"));

const formData = {
  "ctl00$ContentPlaceHolder1$txtadharno": "123456789012",
  "ctl00$ContentPlaceHolder1$txtownername": "Test",
  "ctl00$ContentPlaceHolder1$chkDecarationA": true
};

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });

  const page = await browser.newPage();

  console.log("Opening Udyam site...");
  await page.goto("https://udyamregistration.gov.in/UdyamRegistration.aspx", {
    waitUntil: "domcontentloaded"
  });

  for (const input of schema.inputs) {
    if (!input.name) continue;

    if (formData.hasOwnProperty(input.name)) {
      if (input.type === "checkbox") {
        if (formData[input.name]) {
          await page.evaluate((name) => {
            document.querySelector(`[name="${name}"]`).checked = true;
          }, input.name);
        }
      } else {
        await page.type(`[name="${input.name}"]`, formData[input.name].toString());
      }
    }
  }

  console.log("Clicking the Validate & Generate OTP button...");
  await page.click('[name="ctl00$ContentPlaceHolder1$btnValidateAadhaar"]');

  console.log("✅ Filled form and clicked button.");
  console.log("Browser will stay open — press Enter in the terminal to close.");

  // Wait until user presses Enter before closing
  process.stdin.resume();
  process.stdin.on("data", async () => {
    await browser.close();
    process.exit(0);
  });
})();

