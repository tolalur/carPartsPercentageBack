interface generalSearch {
    id: number;
    manufacturerName: string;
    partName: string;
}

const request = require('request-promise');

exports.generalSearch = async (str: string) => {
    const url1 = `https://webapi.autodoc.ru/api/manufacturers/${str}?showAll=false`
    try {
        let resp = await request(url1);
        let respPars: generalSearch[] = JSON.parse(resp);

        console.log('respPars :', respPars);
        
        if (!respPars || respPars.length == 0) {
            return null;
        }
        if (respPars && respPars.length > 1) {
            return respPars;
        }

        console.log('resp', respPars);
        const url2 = `https://webapi.autodoc.ru/api/spareparts/analogs/${respPars[0].id}/${str}/null`;

        let resp2 = await request(url2);
        console.log('resp2', resp2);
        let respPars2 = JSON.parse(resp2);
        

        return respPars2;
    } catch (e) {
        console.log('e :', e);
    }

};
exports.targetSearch = async (str: string) => {
    const url1 = `https://webapi.autodoc.ru/api/manufacturers/${str}?showAll=false`
    try {
        let resp = await request(url1);
        let respPars: generalSearch[] = JSON.parse(resp);

        console.log('respPars :', respPars);
        
        if (!respPars || respPars.length == 0) {
            return null;
        }
        if (respPars && respPars.length > 1) {
            return respPars;
        }

        console.log('resp', respPars);
        const url2 = `https://webapi.autodoc.ru/api/spareparts/analogs/${respPars[0].id}/${str}/null`;

        let resp2 = await request(url2);
        console.log('resp2', resp2);
        let respPars2 = JSON.parse(resp2);
        

        return respPars2;
    } catch (e) {
        console.log('e :', e);
    }

};