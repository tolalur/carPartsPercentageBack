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
                href: $(elem).attr('href'),
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

exports.targetSearch = async (str: string, id: number) => {
    try {
        const urlAnalogs = `https://webapi.autodoc.ru/api/spareparts/${id}/${str}/null`;
        const url = `https://webapi.autodoc.ru/api/spareparts/analogs/${id}/${str}/null?isrecross=false`;

        const analogs = await request(url);
        const analogsJson: targetSearchAnalogs = JSON.parse(analogs);
        
        const item = await request(urlAnalogs);
        const itemJson: targetSearch = JSON.parse(item);
        const autodoc: autodocTargetSearch = {
            item: {
                partNumber: itemJson.partNumber,
                displayPartNumber: itemJson.displayPartNumber,
                name: itemJson.name,
                manufacturer: itemJson.manufacturer,
                minimalPrice: itemJson.minimalPrice,
            },
            analogs: analogsJson.analogs
        }
        console.log('analogsJson itemJson', autodoc);

        return autodoc;
    } catch (e) { console.log('e :', e) }

};