//const puppeteer = require('puppeteer')
const puppeteer = require('puppeteer'); 
//import StealthPlugin from 'puppeteer-extra-plugin-stealth';
//import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

//puppeteer.use(StealthPlugin());
//puppeteer.use(AdblockerPlugin({ blockTrackers: true }))

const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36';
const link = "https://www.linkedin.com/jobs/search/?keywords=Software%20Developer&location=Belgium&geoId=100565514&f_TPR=r604800&position=1&pageNum=0";
const fs = require("fs/promises");


const scraper = async () => {
    const browser = await puppeteer.launch({
        ignoreDefaultArgs: ['--disable-extensions'],
      });
    const page = await browser.newPage();
    await page.goto(link);
    page.setUserAgent(ua);


    const jobTitles = await page.$$eval("#main-content > section.two-pane-serp-page__results-list > ul > li > div > div.base-search-card__info > h3", titles => {
        return titles.map(title => title.textContent.replace(/^\s+|\s+$/g, ''));
    });

    await fs.writeFile("titles.txt", jobTitles.join("\r\n"));

    const jobs = await page.$$eval("#main-content > section.two-pane-serp-page__results-list > ul > li", offers => {
      return offers.map(listElement => {
        const titleElement = listElement.querySelector("div > div.base-search-card__info > h3");
        const title = titleElement.textContent.trim();

        const companyElement = listElement.querySelector("div > div.base-search-card__info > h4");
        const company = companyElement.textContent.trim();

        const locationElement = listElement.querySelector("div > div.base-search-card__info > div > span");
        const location = locationElement.textContent.trim();
        
        const timeElement = listElement.querySelector("div > div.base-search-card__info > div > time");
        const time = timeElement.dateTime.trim();

        const linkElement = listElement.querySelector("div > a");
        const url = linkElement.href.toString();

        return title + ';' + company + ';' + location + ';' + time + ';' + url + ';';
      })
    });


    await fs.writeFile("jobs.txt", jobs.join("\r\n"));

    browser.close();
};

scraper();