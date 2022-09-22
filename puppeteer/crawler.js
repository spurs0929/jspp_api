const pt = require('puppeteer');

;(async () => {
  const browser = await pt.launch(),
        url = "https://msiwei.ke.qq.com/?tuin=304a784b#category=-1&tab=0";
        page = await browser.newPage();

  await page.goto(url, {
    timeout: 30 * 1000,
    waitUtil: 'networkidle2'
  });
  
  const result = await page.evaluate(() => {
    
    const $ = window.$,
          $item = $('.agency-big-banner-ul .agency-big-banner-li');

    let data = [];
    
    $item.each((index, item) => {
      const $el = $(item),
            $elLink = $el.find('.js-banner-btnqq');
      
      const dataItem = {
        cid: $elLink.attr('data-id'),
        href: $elLink.prop('href'),
        imgUrl: $elLink.find('img').prop('src'),
        title: $elLink.prop('title')
      }
      
      data.push(dataItem);
    });

    return data;

  });
  
  await browser.close();

  process.send(result);

  setTimeout(() => {
    process.exit(0);
  }, 1500);
})();
