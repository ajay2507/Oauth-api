'use strict';

const https = require('https');
const consts = require('./constants');
const queryString = require('querystring');
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
        if (options.env === SANDBOX_ENV) {
            this.baseUrl = consts.SANDBOX_BASE_URL;
        }
        if (options.hostname) {
            this.baseUrl = options.hostname;
        }
        this.grantType = (!options.grantType) ? consts.DEFAULT_GRANT_TYPE : options.grantType;
        this.scope = (!options.scope) ? consts.DEFAULT_SCOPE : options.scope;
    }

    getAccessToken() {
        const encodedStr = base64Encode(this.clientId + ':' + this.clientSecret);
        const auth = 'Basic ' + encodedStr;
        const data = queryString.stringify({
            grant_type: this.grantType,
            scope: this.scope
        });
        return new Promise((resolve, reject) => {
            const request = https.request({
                headers: {
                    'Content-Length': data.length,
                    'content-type': 'application/x-www-form-urlencoded',
                    'authorization': auth
                },
                path: '/identity/v1/oauth2/token',
                hostname: this.baseUrl,
                method: 'POST'
            });
            request.on('response', response => {
                let body = '';
                response.setEncoding('utf8');
                response.on('data', (chunk) => body += chunk);
                response.on('end', () => {
                    body = JSON.parse(body);
                    if (body.error) {
                        reject(body);
                    }
                    resolve(body);
                });
            });

            request.on('error', (error) => {
                reject(error);
            });
            request.end(data);
        });
    }
}

const base64Encode = (encodeData) => {
    const buff = new Buffer(encodeData);
    return buff.toString('base64');
};

module.exports = EbayOauthToken;
