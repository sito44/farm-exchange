
const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true, waitTimeOut: 5000 })

nightmare

    .goto('http://localhost:8080/')
    .type('.search-input', '91911')
    .click('#submit')
    .wait('.list-group a.list-group-item')
    .evaluate(() => document.querySelector('.list-group a.list-group-item').href)

    .click('.list-group-item')
    .wait('.infoList #address')
    .evaluate(() => document.querySelector('.infoList #address'))

    .click('.input-submit')
    .evaluate(() => document.querySelector('.item').innerHTML.indexOf('yes') > -1)
    .wait(5000)
    .click('#backButton')
    .wait(5000)
    .evaluate(() => document.querySelector('.list-group a.list-group-item').href)

    .click('.list-group-item')
    .wait('.infoList #address')
    .evaluate(() => document.querySelector('.infoList #address'))

    .click('#main-image')
    .wait(3000)
    .evaluate(() => document.querySelector('#submit'))

    .type('.search-input', '91911')
    .click('#submit')
    .wait('.list-group a.list-group-item')
    .evaluate(() => document.querySelector('.list-group a.list-group-item').href)

    .click('.list-group-item')
    .wait('.infoList #address')
    .evaluate(() => document.querySelector('.infoList #address'))
    .wait(3000)
    .click('.directions')

    .end()
    .then(console.log('Success!'))
    .catch(error => {
        console.error('Search failed:', error)
    })

    