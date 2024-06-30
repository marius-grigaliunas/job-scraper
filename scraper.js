//const puppeteer = require('puppeteer')
const puppeteer = require('puppeteer'); 
//import StealthPlugin from 'puppeteer-extra-plugin-stealth';
//import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

//puppeteer.use(StealthPlugin());
//puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';
link = "https://www.linkedin.com/jobs/search/?keywords=Software%20Developer&location=Belgium&geoId=100565514&f_TPR=r604800&position=1&pageNum=0";
const fs = require("fs/promises");
const { title } = require('process');

const scraper = async () => {
    const browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
      });
    const page = await browser.newPage();
    await page.goto(link);
    page.setUserAgent(ua);


    //await scrollToBottom(page);

    const jobTitles = await page.$$eval("#main-content > section.two-pane-serp-page__results-list > ul > li > div > div.base-search-card__info > h3", titles => {
        return titles.map(title => title.textContent.replace(/^\s+|\s+$/g, ''));
    });

    await fs.writeFile("titles.txt", jobTitles.join("\r\n"));

    const jobs = await page.$$eval("#main-content > section.two-pane-serp-page__results-list > ul > li")

    for(const job of jobs) {
      let title = job.
    } 

    await fs.writeFile("jobs.txt", jobTitles.join("\r\n"));


    /*
    const jobs = await page.$$eval("#main-content > section.two-pane-serp-page__results-list > ul > li", offers => {
      return offers.map(offer => {
        title = page.evaluate("div.base-search-card__info > h3", title => title.textContent);
        //title = titleElement.textContent.replace(/^\s+|\s+$/g, '');
      })
    });

    await fs.writeFile("jobs.txt", jobs.join("\r\n"));

    */

    browser.close();
};

/*async function scrollToBottom(page) {
    const distance = 100; // should be less than or equal to window.innerHeight
    while (await page.evaluate(() => document.scrollingElement.scrollTop + window.innerHeight < document.scrollingElement.scrollHeight)) {
      await page.evaluate((y) => { document.scrollingElement.scrollBy(0, y); }, distance);
    }
  }*/

scraper();