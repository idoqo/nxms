var expect = require("chai").expect;
var messageController = require('../controllers/message_controller');

describe("Candidate Name generator", function () {
    it("generates a name starting with A", function () {
        var name = messageController.generateName("A");
        expect(name.charAt(0)).to.equal("A");
    });
});