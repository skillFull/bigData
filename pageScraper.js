const { rejects } = require("assert");
const { count } = require("console");
const fs = require("fs");
const { resolve } = require("path");

const scraperObject = {
    url: 'https://hh.ru/search/vacancy?L_is_autosearch=false&area=1&clusters=true&enable_snippets=true&no_magic=true&specialization=1.221&page=',
    async scraper(browser){
        let count = 0;
        let urlsPages = [];
        let Interval = setInterval(async () => {
            let page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            await page.goto(`${this.url + count} `);
            await page.waitForSelector('.vacancy-serp', {timeout: 600000});
          
            let urls = await page.$$eval('.vacancy-serp > .vacancy-serp-item', links => {
                let obj = {};
                obj.href = links.map(el => el.querySelector('.g-user-content > a').href);
                obj.spec = links.map(el => el.querySelector('.g-user-content > a').textContent);
                obj.money = links.map(el => el.querySelector('.vacancy-serp-item__sidebar').textContent);
                return obj;
        });


        urlsPages.push(urls);


        console.log(count)
        count++;
        console.log(urlsPages);


        if (count === 39){
            let doc = JSON.stringify(urlsPages);
             fs.writeFileSync('urlsVacancy.json', doc, 'utf8', (err) => {
                if(err) throw err
            });
            clearInterval(Interval);
            }


        }, 60*1000);

        

    },
   
}

module.exports = scraperObject;