'use strict';

const queryString = require('querystring');
const consts = require('./constants');
const postRequest = require('./request');
const PROD_ENV = 'PROD';
const SANDBOX_ENV = 'SANDBOX';

class EbayOauthToken {
    constructor(options) {
        if (!options || !options.clientId || !options.clientSecret) {
            throw new Error('Invalid options or input');
        }
        if (!options.env) { this.env = PROD_ENV; };
        this.clientId = options.clientId;
        this.clientSecret = options.clientSecret;
        this.baseUrl = consts.PROD_BASE_URL;
        this.baseConsentUrl = consts.PROD_SIGNIN_ENDPOINT;
        if (options.env === SANDBOX_ENV) {
            this.baseUrl = consts.SANDBOX_BASE_URL;
            this.baseConsentUrl = consts.SANDBOX_SIGNIN_ENDPOINT;
        }
        if (options.hostname) {
            this.baseUrl = options.hostname;
        }
        this.redirectUri = options.redirectUri || '';
        this.grantType = (!options.grantType) ? consts.CLIENT_CRED_GRANT_TYPE : options.grantType;
        this.scope = (!options.scope) ? consts.DEFAULT_SCOPE : options.scope;
        this.prompt = options.prompt || '';
    }

    getClientCredentailsToken() {
        this.grantType = consts.CLIENT_CRED_GRANT_TYPE;
        const data = queryString.stringify({
            grant_type: this.grantType,
            scope: this.scope
        });
        return postRequest(data, this);
    }

    getUserConsentUrl() {
        if (!this.redirectUri) {
            throw new Error('redirect_uri is required for redirection after sign in \n kindly check here https://developer.ebay.com/api-docs/static/oauth-redirect-uri.html');
        }
        let queryParam = 'client_id=' + this.clientId;
        queryParam = queryParam + '&redirect_uri=' + this.redirectUri;
        queryParam = queryParam + '&response_type=code';
        if (Array.isArray(this.scope)) {
            this.scope = this.scope.join('%20');
        }
        queryParam = queryParam + '&scope=' + this.scope;
        queryParam = queryParam + '&prompt=' + this.prompt;
        return `${this.baseConsentUrl}?${queryParam}`;
    }

    getAuthorizationCodeToken(code) {
        if (!code) {
            throw new Error('Authorization code is required');
        }
        const data = `code=${code}&grant_type=${consts.AUTH_CODE_GRANT_TYPE}&redirect_uri=${this.redirectUri}`;
        return postRequest(data, this);
    };
};

module.exports = EbayOauthToken;
