require("./chaisetup.js");
var expect = require("chai").expect;
var assert = require("assert");

const { linkInformation } = require("../src/linkinformation.js");

describe("LinkInformation component", function() {
  describe("#linkInformation()", function() {
    describe("with a broken link", function() {
      const brokenLink = "https://broken";
      const brokenLinkInformation = linkInformation({
        link: brokenLink
      });

      it("should return the link itself as the title", function() {
        return expect(brokenLinkInformation).to.eventually.deep.include({
          title: brokenLink
        });
      });
    });

    describe("with a random chosen proper medium link", function() {
      const testLink = linkInformation({
        link:
          "https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0"
      });

      it("should return the title of the chosen medium link.", function() {
        return expect(testLink).to.eventually.deep.include({
          title: "A Tinder Progressive Web App Performance Case Study"
        });
      });

      it("should contain today's date.", function() {
        return expect(testLink).to.eventually.deep.include({
          date: new Date().toDateString()
        });
      });
    });
  });
});

describe("Date created now", function() {
  var first = new Date();
  describe("and Date created a lil'bit later.", function() {
    it("should be not the same when comparing using #getTime()", function() {
      new Date().getTime().should.not.equal(first.getTime());
    });

    it("should be the same when comparing using #toDateString().", function() {
      new Date().toDateString().should.equal(first.toDateString());
    });
  });
});
