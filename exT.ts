const request = require('request-promise');
const cheerio = require('cheerio');
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

(async () => {
    try {
        const url = 'https://www.exist.ru/Price/?pcode=W20EPR-U';
        const text = await request(url);
        console.log('данные загружены');
        const $ = cheerio.load(text);
        console.log('данные загружены в парсер');
        // $('ul.catalogs > li').nextAll();
        const links = $('ul.catalogs > li').nextAll();
        const target = {
            href: links[0].children[0].attribs.href,
            name: 123
        }
        $('ul.catalogs > li > a').each(function (i, elem) {
            // console.log(elem.attr('href'), elem.find('span').text());
            console.log($(this).attr('href'));
            console.log($(this).find('span').text());
        });

        // console.log($('ul.catalogs > li > a').nextAll().attr('href'));
    } catch(e){ console.log('e :', e);}
        

})()