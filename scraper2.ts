import puppeteer from 'puppeteer';

async function scrapePropertyTaxInformation() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const url = 'https://www.illuminationholidaylighting.com/';

  try {
    // Navigate to the TCAD website
    await page.goto(url);

    // Extract property tax information (modify selectors accordingly)
    // Extract property tax information for the ten most valuable properties (modify selectors accordingly)
    const propertyData = await page.evaluate(() => {
      const propertyInfo = [];

      const propertyRows = document.querySelectorAll('[href="https://www.illuminationholidaylighting.com/residential-1/"]');
//      propertyRows[0].style.backgroundColor = "red";
      return propertyRows;
/*
      for (let i = 1; i < 10 && i < propertyRows.length; i++) {
        const row = propertyRows[i];
        const ownerName = row.querySelector('[col-id="name"]');
        const ownerName = row.querySelector('[col-id="name"]')!.textContent!.trim();
        const propType = row!.querySelector('[col-id="propType"]')!.textContent!.trim();
        const city = row!.querySelector('[col-id="city"]')!.textContent!.trim();
        const propertyAddress = row!.querySelector('[col-id="streetPrimary"]')!.textContent!.trim();
        const assessedValue = row!.querySelector('.assessedValue')!.textContent!.trim();
        const propertyID = row!.querySelector('[col-id="pid"]')!.textContent!.trim();
        const appraisedValue = row!.querySelector('[col-id="appraisedValue"]')!.textContent!.trim();
        const description = row!.querySelector('[col-id="legalDescription"]')!.textContent!.trim();


        propertyInfo.push({
            ownerName,
          propertyAddress,
          assessedValue,
          propertyID,
        });
      }

      return propertyInfo;
*/
    });

      console.log("test");
      console.log(propertyData);


//      console.log('Size', propertyData.length);
    console.log('Property Tax Information:');
//    console.log('Owner Name:', propertyData[0].ownerName);
//    console.log('Property Address:', propertyData[0].propertyAddress);
//    console.log('Assessed Value:', propertyData[0].assessedValue);
//    console.log('Property ID:', propertyData[0].propertyID);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

// Call the scraping function
scrapePropertyTaxInformation();
