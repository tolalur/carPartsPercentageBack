const fs = require('fs');
interface targetSearch {
    partNumber: number;
    displayPartNumber: string;
    name: string;
    manufacturer: {
        id: number;
        name: string;
    }
    minimalPrice: number;
}
const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
    const url = `https://www.exist.ru/Price/?pid=E9705B59`;
    try {
        const text: string = await request(url);
        const $ = cheerio.load(text);

        let response: targetSearch[] = [];
        console.log(text.match(/Ремень/));
        fs.writeFileSync("text.html", text);
        const zxq = $('div[class=row-container]').html();
        console.log('object :', zxq);

        // $('ul.catalogs > li > a').each(function (i: number, elem: any) {
        //     response.push({
        //         href: $(elem).attr('href').slice(12),
        //         manufacturerName: $(elem).find('span > b').text(),
        //         partName: $(elem).find('dd').text()
        //     });
        // });
        // console.log('response :', response);

        // if (response.length > 0) {
        //     return response;
        // } else {
        //     return null;
        // }
    } catch (e) { console.log('e :', e) }
        

})()