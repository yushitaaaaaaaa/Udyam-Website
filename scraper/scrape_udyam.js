const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: false,   // browser will be visible
    slowMo: 100,       // slow down actions by 100ms for visibility
    defaultViewport: null, // use full browser window size
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');

  const url = 'https://udyamregistration.gov.in/UdyamRegistration.aspx';
  console.log('Going to:', url);
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

  await new Promise(resolve => setTimeout(resolve, 3000));

  try { 
    await page.waitForSelector('form', { timeout: 8000 }); 
  } catch (e) {
    console.log('Form not found quickly, continuing...');
  }

  // Extract schema
  const schema = await page.evaluate(() => {
    function getLabelFor(el) {
      if (!el) return null;
      if (el.id) {
        const lab = document.querySelector(`label[for="${el.id}"]`);
        if (lab) return lab.innerText.trim();
      }
      const parentLabel = el.closest('label');
      if (parentLabel) return parentLabel.innerText.trim();
      const prev = el.previousElementSibling;
      if (prev && prev.tagName.toLowerCase() === 'label') return prev.innerText.trim();
      return null;
    }

    function getInputInfo(el) {
      return {
        tag: el.tagName,
        type: el.type || null,
        name: el.name || null,
        id: el.id || null,
        label: getLabelFor(el),
        placeholder: el.placeholder || null,
        required: el.required || el.getAttribute('aria-required') === 'true' || false,
        pattern: el.getAttribute('pattern') || null,
        maxlength: el.getAttribute('maxlength') || null,
        value: el.value || null
      };
    }

    const inputs = Array.from(document.querySelectorAll('input, textarea')).map(getInputInfo);
    const selects = Array.from(document.querySelectorAll('select')).map(s => {
      const options = Array.from(s.options).map(o => ({ value: o.value, text: o.text }));
      return {
        tag: 'SELECT',
        name: s.name || null,
        id: s.id || null,
        label: getLabelFor(s),
        required: s.required || false,
        options
      };
    });

    const buttons = Array.from(document.querySelectorAll('button, input[type="button"], input[type="submit"]'))
      .map(b => ({ tag: b.tagName, text: b.innerText || b.value || null, id: b.id || null, name: b.name || null }));

    return { timestamp: new Date().toISOString(), inputs, selects, buttons };
  });

  fs.writeFileSync('udyam_schema_raw.json', JSON.stringify(schema, null, 2));
  console.log('Saved udyam_schema_raw.json with', schema.inputs.length, 'inputs and', schema.selects.length, 'selects.');

  // Keep browser open for a while so you can see it before it closes
  console.log('Keeping browser open for 10 seconds...');
  await page.waitForTimeout(10000);

  await browser.close();
  console.log('Done.');
})();
