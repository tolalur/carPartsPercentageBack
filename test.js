var Horseman = require('node-horseman');
var horseman = new Horseman();

var startURL = 'https://www.exist.ru/Price/?pid=E9705B59';

horseman
    .userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36')
    .open(startURL)
    // .click('#nav-tools>a')
    // .waitForNextPage()
    // .type('form [name=email]', email)
    // .type('form [name=password]', password)
    // .click('#signInSubmit')
    // .waitForNextPage()
    // .cookies()
    .plainText()
    .then((text) => {
        console.log('text :', text);
    })
    .close();