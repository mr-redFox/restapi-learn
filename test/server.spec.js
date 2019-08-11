const chai = require('chai');
const expect  = require("chai").expect;
const http = require("chai-http");

const app = require('../server');

chai.use(http);

describe('app server', () =>{
    it('should get list of posts with status 200 OK', (done) => {
        chai.request(app).get('/api/posts').end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array');
            
            done();
        })
    });
});
