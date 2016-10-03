'use strict';

const Promise = require('bluebird');
const request = require('request');
const Utils = require('fwsp-jsutils');

/**
* @name _pRequest
* @summary Promised based request.
* @param {object} options - request options
* @param {string} body - body payload for post and put operations
* @return {object} promise - which always resolves if successful, rejects if not
*/
function pRequest(options, body) {
  return new Promise((resolve, reject) => {
    let opts = Object.assign({
      headers: {
        'User-Agent': 'prequest'
      },
      method: 'get'
    }, options);
    opts.method = opts.method.toLowerCase();
    if (!opts.body && (opts.method === 'post' || opts.method === 'put')) {
      opts.body = body || {};
    }
    if (Utils.isObject(opts.body)) {
      opts.body = Utils.safeJSONStringify(opts.body);
    }
    request(opts, (error, response, body) => {
      if (!error) {
        // if payload is JSON then stringify, else send full headers and body
        if (response.headers['content-type'] && response.headers['content-type'].indexOf('json') > -1) {
          resolve(Utils.safeJSONParse(body));
        } else {
          resolve({
            headers: response.headers,
            body,
            statusCode: response.statusCode
          });
        }
      } else {
        reject(error);
      }
    });
  });
}

module.exports = pRequest;
