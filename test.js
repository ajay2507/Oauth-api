'use strict';

const expect = require('chai').expect;
const nock = require('nock');
const EbayAuthToken = require('./index');


describe("test EbayAuthToken", () => {
    it("EbayAuthToken is a function", () => {
        expect(EbayAuthToken).to.be.a('function');
    });

    it("test without options", () => {
        expect(() => {
            new EbayAuthToken();
        }).to.throw(Error, "Invalid options or input");
    });

    it("test with and without grant type", () => {
        let ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            grantType: 'Authorization_grant'
        });
        expect(ebayAuthToken.grantType).to.equal('Authorization_grant');
        ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX'
        });
        expect(ebayAuthToken.grantType).to.equal('client_credentials');
    });

    it("test getAccessToken method", () => {
        const ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            hostname: 'my.test.ebay.com'
        });
        const pathname = '/identity/v1/oauth2/token';
        const hostname = 'my.test.ebay.com';
        const mock = nock(`https://${hostname}`);
        const response = {
            access_token: "QWESJAHS12323OP"
        }
        mock
            .post(pathname, { grant_type: 'client_credentials', scope: 'https://api.ebay.com/oauth/api_scope' })
            .reply(200, response);
        ebayAuthToken.getAccessToken().then((data) => {
            expect(data.access_token).to.equal('QWESJAHS12323OP');
        });
    });
});

