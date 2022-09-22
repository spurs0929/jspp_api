const Crawler = require('../libs/crawler'),
      { crawler } = require('../config/config');

Crawler({
  url: crawler.url.main,
  callback(){
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
        title: $elLink.prop('title'),
        imgKey: ''
      }
      
      data.push(dataItem);
    });

    return data;
  }
});