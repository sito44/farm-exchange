const Nightmare = require('nightmare')
const assert = require('assert')


//test page load
describe('Load a Page', function () {
    this.timeout('30s')

    let nightmare = null
    beforeEach(() => {
        nightmare = new Nightmare()
    })

    describe('/ (Home Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:8080/')
                .end()
                .then(function (result) { done() })
                .catch(done)
        })
    })
})

//test form submit -- ONCE ALEX HAS SET UP LOGIN ----------------------------------------------

// describe('Login Page', function () {
//     this.timeout('30s')

//     let nightmare = null
//     beforeEach(() => {
//         // show true lets you see wth is actually happening :)
//         nightmare = new Nightmare({ show: true })
//     })

//     describe('given bad data', () => {
//         it('should fail', done => {
//             nightmare
//                 .goto('http://localhost:8080/auth')
//                 .on('page', (type, message) => {
//                     if (type == 'alert') done()
//                 })
//                 .type('.login-email-input', 'notgonnawork')
//                 .type('.login-password-input', 'invalid password')
//                 .click('.login-submit')
//                 .wait(2000)
//                 .end()
//                 .then()
//                 .catch(done)
//         })
//     })
// })



//test user input-- ONCE FRONTEND IS READY ----------------------------------------------
// describe('Using the App', function () {
//     describe('signing up and finishing setup', () => {
//         it('should work without timing out', done => {
//             nightmare
//                 .goto('http://localhost:8080/auth')
//                 .type('.signup-email-input', 'test+' + Math.round(Math.random() * 1000000) + '@test.com')
//                 .type('.signup-password-input', 'valid password')
//                 .type('.signup-password-confirm-input', 'valid password')
//                 .click('.signup-submit')
//                 .wait(2000)
//                 .select('.sizes-jeans-select', '30W x 30L')
//                 .select('.sizes-shoes-select', '9.5')
//                 .click('.sizes-submit')
//                 .wait('.shipit') // this selector only appears on the catalog page
//                 .end()
//                 .then(result => { done() })
//                 .catch(done)
//         })
//     })
// })
