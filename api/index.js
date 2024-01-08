const puppeteer = require('puppeteer')
const url = "https://www.linkedin.com/";

const main = async () =>{
    try{
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(url)
        // await page.waitForSelector('.title__text');
        const data = await page.evaluate(() =>{
            const articles = document.querySelectorAll('.feed-shared-update-v2__description-wrappermr2');
            // const articleData = Array.from(articles).map(article => {
            //     const title = article.querySelector('.title-h1').textContent.trim();
            //     const text = article.querySelector('.main__text').textContent.trim().replace(/\s+/g, ' ');
            //     return { title, text };
            // });
            const articleText = Array.from(articles).map(article => article.textContent);
            return articleText
        });
    
        console.log(data)
       await browser.close();
    }
    catch(err){
        console.log(err)
    } 
}

main();