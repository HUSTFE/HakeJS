import chai from 'chai';
import Hake from '../lib/Hake.min.js';

chai.expect();

const expect = chai.expect;

var lib;

describe('Given an instance of my library', function () {
  before(function () {
    lib = new Hake();
  });

  describe('when I need the name', function () {
    it('should return the name', (done) => {
      expect(lib._name).to.be.equal('Hake');
      done();
    });
  });

});