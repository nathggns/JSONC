var JSONC  = require('../jsonc.js');
var should = require('should');

describe('JSONC', function() {

  describe('utility', function() {

    describe('isCyclic', function() {

      it('should return true for cyclic structures', function() {

        var structure = {
          a: {
            b: {
              c: 'd'
            }
          }
        };

        structure.a.b.e = structure.a.b;

        JSONC.utility.isCylcic(structure).should.eql(true);

      });

      it('should return false for non-cyclic structures', function() {

        var structure = {
          a: {
            b: {
              c: 'd'
            }
          }
        };

        JSONC.utility.isCyclic(structure).should.eql(false);

      });

    });

  });

});