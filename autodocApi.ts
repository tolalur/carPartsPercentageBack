interface generalSearch {
    id: number;
    manufacturerName: string;
    partName: string;
}
interface targetSearch {
    id: number;
    manufacturerName: string;
    partName: string;

    displayPartNumber: string;
    minimalPrice: number;
    name: string;
    partNumber: number;
    manufacturer: {
        id: number;
        name: string;
    }
}

const request = require('request-promise');

exports.generalSearch = async (str: string) => {
    const url = `https://webapi.autodoc.ru/api/manufacturers/${str}?showAll=false`
    try {
        const resp = await request(url);
        const respParse: generalSearch[] = JSON.parse(resp);

        console.log('generalSearch respParse:', respParse);

        if (respParse && respParse.length > 1) {
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
        const url = `https://webapi.autodoc.ru/api/spareparts/analogs/${id}/${str}/null?isrecross=false`;

        const resp = await request(url);
        console.log('targetSearch resp', resp);
        const respParse = JSON.parse(resp);        

        if (respParse && respParse.length > 1) {
            return respParse;
        } else {
            return null;
        }  
    } catch (e) {
        console.log('e :', e);
    }

};