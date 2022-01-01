const puppeteer = require('puppeteer');

async function browse(email) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
  );

  try {
    const response = await page.goto(
      `https://haveibeenpwned.com/unifiedsearch/${email}`,
      {
        waitUntil: 'load',
      }
    );
    if (response.status() === 200) {
      const data = await page.evaluate(() => {
        //   eslint-disable-next-line no-undef
        return JSON.parse(document.querySelector('body').innerText);
      });
      await browser.close();
      return { data, status: 'warning' };
    } else {
      await browser.close();
      return { status: 'Good news — no pwnage found!' };
    }
  } catch (err) {
    console.error(err.message);
    await browser.close();
    return { status: 'error', data: 'internal server error' };
  }
}

const pawned_index_all = async (req, res) => {
  const results = {};
  const emails = req.body.emails;

  if (emails && Array.isArray(emails)) {
    for (const email of emails) {
      if (email) results[email] = await browse(email);
    }
    res.json(results);
  } else {
    res.status(404).json({
      status: 'fail',
      data: 'resource not found',
    });
  }
};

module.exports = { pawned_index_all };
