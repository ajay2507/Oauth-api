'use strict';

const expect = require('chai').expect;
const nock = require('nock');
const EbayAuthToken = require('./index');


describe("test EbayAuthToken", () => {
    it("EbayAuthToken is a function", () => {
        expect(EbayAuthToken).to.be.a('function');
    });

    it("test without options", () => {
        expect(EbayAuthToken).to.be.a('function');
    });
});

