// interface generalSearchResp {
//     href: string,
//     manufacturerName: string,
//     partName: string
// }
// const request = require('request-promise');
// const cheerio = require('cheerio');

// (async () => {
//     try {
//         const url = 'https://www.exist.ru/Price/?pcode=W20EPR-U';
//         const text = await request(url);
//         console.log('данные загружены');
//         const $ = cheerio.load(text);
//         console.log('данные загружены в парсер');
        
//         let response: Array<generalSearchResp> = [];

//         $('ul.catalogs > li > a').each(function (i: number, elem: any) {
//             response.push({
//                 href: $(elem).attr('href'),
//                 manufacturerName: $(elem).find('span > b').text(),
//                 partName: $(elem).find('dd').text()
//             });
//             // console.log($(this).attr('href'));
//             // console.log($(this).find('span > b').text());
//             // console.log($(this).find('dd').text());
//         });
//         console.log('response :', response);

//     } catch(e){ console.log('e :', e);}
        

// })()