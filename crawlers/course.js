const Crawler = require('../libs/crawler'),
      { crawler } = require('../config/config');

Crawler({
  url: crawler.url.course,
  callback(){
    const $ = window.$,
          $item = $('.course-card-list-multi-wrap .course-card-item')
    
    let data = [];

    $item.each((index, item) => {
      const $el = $(item),
            $itemLK = $el.find('.item-img-link');
            
      const dataItem = {
        cid: $itemLK.attr('data-id'),
      	href: $itemLK.prop('href'),
      	posterUrl: $itemLK.find('.item-img').prop('src').replace('webp', ''),
      	courseName: $itemLK.find('.item-img').prop('title'),
      	price: $el.find('.item-price').text() == '免费' ? '0' : $el.find('.item-price').text().slice(1),
      	description: $el.find('.item-status-step').text(),
      	studentCount: parseInt($el.find('.item-user').text()),
      	posterKey: ''
      }      

      data.push(dataItem);
    });

    return data;
  }
})      