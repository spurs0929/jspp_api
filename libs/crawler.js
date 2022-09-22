const pt = require('puppeteer');
const { bufferToString } = require('sqlstring');

module.exports = async function(options){
  
  try {
    const browser = await pt.launch({
      // headless: false
      args: ['--no-sandbox', '--disable-setuid-sandbox'], //沙盒
      handleSIGINT: false,
      ignoreDefaultArgs: ['--disable-extensions'],
      executablePath: '/root/.chromium-browser-snapshots/linux-722234/chrome-linux/chrome'
    }),
      page = await browser.newPage(),
      url = options.url;
    
    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 0
    });

    let result = await page.evaluate(options.callback);

    if(result && options.field === 'course'){
      await page.waitForSelector('.page-btn.page-last');
      await page.click('.page-btn.page-last');
      await page.waitFor(2000);
      const res = await page.evaluate(options.callback);
      await page.waitFor(2000);
      for(var i = 0; i < res.length; i++){
        await result.push(res[i]);
      }
    }

    await browser.close();
    process.send(result);

    setTimeout(() => {
      process.exit(0);
    }, 1000);

  } catch (error) {
    console.log(error);
  }
} 