import { generalSearch, targetSearchAnalogs, targetSearch, autodocTargetSearch} from './types'
const request = require('request-promise');

exports.generalSearch = async (str: string) => {
    const url = `https://webapi.autodoc.ru/api/manufacturers/${str}?showAll=false`
    try {
        const resp = await request(url);
        const respParse: generalSearch[] = JSON.parse(resp);

        console.log('generalSearch respParse:', respParse);

        if (respParse && respParse.length > 0) {
            return respParse;
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