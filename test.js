var Horseman = require('node-horseman');
var horseman = new Horseman({ loadImages: false });

var startURL = 'https://www.exist.ru/Price/?pid=E9705B59';

// horseman
//     .userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36')
//     .open(startURL)
//     .evaluate(function (selector) {
//         const res = {target:'', original:[], alternateMaterial: []}
//         res.target = $(selector.target).html();
//         $(selector).each(function (i, elem) {
//             res.original.push($(selector.original).html())
//         })
//         return res
//     }, { target: '.row-container[attr="-10"]', original: '.row-container[attr="-10"]'})

//     // .html('.row-container')
//     .then((text) => {
//         console.log('text :', text);
//     })
//     .close();

const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: false })
const selector = '.row-container';
nightmare
    .goto(startURL)
    // .wait('.row-container')
    .evaluate(selector => {
        const res = { target: '', original: [], alternateMaterial: [] };
        const getNeedData = (html) => ({ 
            artikul: $(html).find('div.art').text(), 
            partno: $(html).find('div.partno').text() 
        });
        res.target = getNeedData($('.row-container[attr="-10"] > a > div.name-container'));
        $('.row-container[attr="-1"] > a > div.name-container').each((i, elem) => {
            res.original.push(getNeedData(elem));
        })
        return res.original.length;
    }, { target: '.row-container[attr="-10"]', original: '.row-container[attr="-1"]', alternateMaterial: '.row-container[attr="0"]' })
    .end()
    .then(console.log)
    .catch(error => {
        console.error('Search failed:', error)
    })