var expect = require('chai').expect;
var messageController = require('../controllers/message_controller');

describe("Phone numbers splitting", function () {
    it("splits comma separated string and check it's length", function () {
        let number_string = "09074919556, 09068009045";
        let arr = messageController.splitNumbers(number_string);
        expect(arr.length).to.equal(2);
    })
})