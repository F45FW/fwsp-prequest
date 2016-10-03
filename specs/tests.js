'use strict';

require('./helpers/chai.js');
const prequest = require('../index.js') ;

describe('pRequest', () => {
  it('should return a valid response', (done) => {
    prequest({
      url: 'https://api.github.com/repos/cjus/umf',
      method: 'GET'
    })
      .then((response) => {
        expect(response).to.be.an('object');
        expect(response).to.have.property('full_name', 'cjus/umf');
        expect(response).to.have.deep.property('owner.login', 'cjus');
        done();
      });
  });
  it('should return a valid error object on bad request', () => {
    let promise = prequest({
      url: 'httpd://nowhere.com',
      method: 'GET'
    });
    expect(promise).to.be.rejected;
    expect(promise).to.be.rejectedWith(Error);
  });
});
