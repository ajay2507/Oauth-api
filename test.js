'use strict';

const expect = require('chai').expect;
const nock = require('nock');
const EbayAuthToken = require('./index');


describe('test EbayAuthToken', () => {
    it('EbayAuthToken is a function', () => {
        expect(EbayAuthToken).to.be.a('function');
    });

    it('test without options', () => {
        expect(() => {
            new EbayAuthToken();
        }).to.throw(Error, 'Invalid options or input');
    });

    it('test with and without grant type', () => {
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

    it('test getAccessToken method', () => {
        const ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            hostname: 'my.test.ebay.com'
        });
        const pathname = '/identity/v1/oauth2/token';
        const hostname = 'my.test.ebay.com';
        const mock = nock(`https://${hostname}`);
        const response = {
            access_token: 'QWESJAHS12323OP'
        };
        mock
            .post(pathname, { grant_type: 'client_credentials', scope: 'https://api.ebay.com/oauth/api_scope' })
            .reply(200, response);
        ebayAuthToken.getClientCredentailsToken().then((data) => {
            expect(data.access_token).to.equal('QWESJAHS12323OP');
        });
    });

    it('test getUserConsentUrl without redirect uri', () => {
        const ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            hostname: 'my.test.ebay.com'
        });

        expect(() => {
            ebayAuthToken.getUserConsentUrl();
        }).to.throw(Error, 'redirect_uri is required for redirection after sign in \n kindly check here https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html');
    });

    it('test getUserConsentUrl without prompt', () => {
        const ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            hostname: 'my.test.ebay.com',
            redirectUri: 'nodeuri'
        });
        expect(ebayAuthToken.getUserConsentUrl()).to.equal('https://auth.ebay.com/oauth2/authorize?client_id=ABC&redirect_uri=nodeuri&response_type=code&scope=https://api.ebay.com/oauth/api_scope&prompt=');
    });

    it('test getUserConsentUrl with prompt', () => {
        const ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            hostname: 'my.test.ebay.com',
            redirectUri: 'nodeuri',
            prompt: 'login'
        });
        expect(ebayAuthToken.getUserConsentUrl()).to.equal('https://auth.ebay.com/oauth2/authorize?client_id=ABC&redirect_uri=nodeuri&response_type=code&scope=https://api.ebay.com/oauth/api_scope&prompt=login');
    });

    it('test getUserConsentUrl with sandbox env', () => {
        const ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            hostname: 'my.test.ebay.com',
            redirectUri: 'nodeuri',
            prompt: 'login',
            env: 'SANDBOX'
        });
        expect(ebayAuthToken.getUserConsentUrl()).to.equal('https://auth.sandbox.ebay.com/oauth2/authorize?client_id=ABC&redirect_uri=nodeuri&response_type=code&scope=https://api.ebay.com/oauth/api_scope&prompt=login');
    });

    it('test getUserConsentUrl with state param', () => {
        const ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            hostname: 'my.test.ebay.com',
            redirectUri: 'nodeuri',
            prompt: 'login',
            env: 'SANDBOX',
            state: 'xyz'
        });
        expect(ebayAuthToken.getUserConsentUrl()).to.equal('https://auth.sandbox.ebay.com/oauth2/authorize?client_id=ABC&redirect_uri=nodeuri&response_type=code&scope=https://api.ebay.com/oauth/api_scope&state=xyz&prompt=login');
    });

    it('test getAuthorizationCodeToken without code', () => {
        const ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            hostname: 'my.test.ebay.com',
            //redirectUri: 'nodeuri',
            prompt: 'login',
            env: 'SANDBOX'
        });
        expect(() => {
            ebayAuthToken.getAuthorizationCodeToken();
        }).to.throw(Error, 'Authorization code is required');
    });

    it('test getAuthorizationCodeToken without code', () => {
        const ebayAuthToken = new EbayAuthToken({
            clientId: 'ABC',
            clientSecret: 'XXX',
            hostname: 'my.test.ebay.com',
            //redirectUri: 'nodeuri',
            prompt: 'login',
            env: 'SANDBOX'
        });
        expect(() => {
            ebayAuthToken.getAuthorizationCodeToken();
        }).to.throw(Error, 'Authorization code is required');
    });
});

