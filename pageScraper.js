const { rejects } = require("assert");
const { count } = require("console");
const fs = require("fs");
const { resolve } = require("path");


const scraperObject = {
    async scraper(browser){
        let data = fs.readFileSync('sortVacancy.json');
        data = JSON.parse(data);
        let count = 0;
        let urlsPages = [];
        let Interval = setInterval(async () => {
            if (count === data.length){
                let doc = JSON.stringify(urlsPages);
                 fs.writeFileSync('claim.json', doc, 'utf8');
                clearInterval(Interval);
                }
    
            if(count !== 0){
                count++;
            }
            let page = await browser.newPage();
            console.log(`Navigating to ${data[count].href}...`);
            page.setDefaultNavigationTimeout(60*1000);
            await page.goto(`${data[count].href}`);
            if(count === 0){
                count++;
            }
            await page.waitForSelector('.vacancy-description', {timeout: 600000});
          
            let urls = await page.$eval('.vacancy-description', elem => {
                let obj = {};
                obj.skill = elem.querySelectorAll('.bloko-gap_bottom > p')[0].textContent;
                obj.dayJob = elem.querySelectorAll('.bloko-gap_bottom > p')[1].textContent;
                return obj;
        });
        page.close()
        urlsPages.push(urls);
        console.log(count)
        }, 15*1000);

        

    },
   
}

module.exports = scraperObject;