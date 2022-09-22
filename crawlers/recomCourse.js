const Crawler = require('../libs/crawler'),
      { crawler } = require('../config/config');

Crawler({
  url: crawler.url.main,
  callback(){
    const $ = window.$,
          $item = $('.spread-course-ul li')
          mainTitle = $('.agency-spread-wrap h4').text();

    const data = [];
    
    $item.each((index, item) => {
      const $el = $(item),
            $itemLink = $el.find('a');
      
      const dataItem = {
        cid: $el.attr('report-tdw').match(/\&(.+?)\&/)[1].split('=')[1],
        href: $itemLink.prop('href'),
        mainTitle,
        title: $itemLink.prop('title'),
        posterUrl: $itemLink.find('.spread-course-cover').prop('src').replace('webp', ''),
        description: $item.find('.spread-course-des').text(),
        teacherImg: $el.find('.spread-course-face img').prop('src').replace('webp', ''),
      	teacherName: $el.find('.spread-course-face span').eq(0).text(),
      	studentCount: parseInt($el.find('.spread-course-face span').eq(1).text().replace(/[^0-9]/ig, '')),
      	price: parseInt($el.find('.spread-course-price').text().replace(/(\\n|\s+)/g, '').slice(1)),
        posterKey: '',
        teacherImgKey: ''
      };
      
      data.push(dataItem);
    });
    return data;
  }
});      