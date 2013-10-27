/* global describe: true, it: true */

var JSONC    = require('../jsonc.js');

require('should');

describe('JSONC', function() {

    'use strict';

    describe('utility', function() {

        describe('getCyclicProperties', function() {

            it('should get cylic properties', function() {
                var structure = {
                    a: {
                        b: {
                            c: 'd'
                        }
                    }
                };

                structure.a.b.e = structure.a.b;

                JSONC.utility.getCyclicProperties(structure).should.eql([
                    'a.b.e'
                ]);
            });

            it('should get return empty array when not cyclic', function() {
                var structure = {
                    a: {
                        b: {
                            c: 'd'
                        }
                    }
                };

                structure.a.b.e = structure.a.b;

                JSONC.utility.getCyclicProperties(structure).should.eql([
                    'a.b.e'
                ]);
            });

        });

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

                JSONC.utility.isCyclic(structure).should.eql(true);

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