import { generalSearch, targetSearchAnalogs, targetSearch, autodocTargetSearch } from './types'

interface generalSearchResp {
    href: string,
    manufacturerName: string,
    partName: string
}
const request = require('request-promise');
const cheerio = require('cheerio');

exports.generalSearch = async (str: string) => {
    const url = `https://www.exist.ru/Price/?pcode=${str}`
    try {
        const text = await request(url);
        console.log('данные загружены');
        const $ = cheerio.load(text);
        console.log('данные загружены в парсер');

        let response: Array<generalSearchResp> = [];

        $('ul.catalogs > li > a').each(function (i: number, elem: any) {
            response.push({
                href: $(elem).attr('href').slice(12), // удаляем /Price/?pid= из строки адреса, оставляем только нужную информацию
                manufacturerName: $(elem).find('span > b').text(),
                partName: $(elem).find('dd').text()
            });
        });
        console.log('response :', response);

        if (response.length > 0) {
            return response;
        } else {
            return null;
        }
    } catch (e) {
        console.log('e :', e);
    }

};

exports.targetSearch = async (str: string) => {
    const url = `https://www.exist.ru/Price/?pid=${str}`;
    try {
        const text = await request(url);
        console.log('данные загружены');
        const $ = cheerio.load(text);
        console.log('данные загружены в парсер');

        let response: generalSearchResp[] = [];

        $('ul.catalogs > li > a').each(function (i: number, elem: any) {
            response.push({
                href: $(elem).attr('href').slice(12),
                manufacturerName: $(elem).find('span > b').text(),
                partName: $(elem).find('dd').text()
            });
        });
        console.log('response :', response);

        if (response.length > 0) {
            return response;
        } else {
            return null;
        }
    } catch (e) { console.log('e :', e) }

};