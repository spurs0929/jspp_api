const Crawler = require('../libs/crawler'),
      { crawler } = require('../config/config');

Crawler({
  url: crawler.url.course,
  callback(){
    const $ = window.$,
          $item = $('.course-tab-filter li');

    let data = [];
    
    $item.each((index, item) => {
      const $el = $(item),
            $itemLK = $el.find('.course-tab-filter-item'),
            title = $itemLK.text().replace('促', '');
      if(title !== '全部'){
        const dataItem = {
          cid: $itemLK.attr('data-id'),
          title
        }      
  
        data.push(dataItem);
      }
    });

    return data;
  }
})      