(function (root, factory) {

    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['lodash'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('lodash'));
    } else {
        root.JSONC = factory(root._);
    }
}(this, function (_) {

    'use strict';

    var JSONC = {

        utility: {

            getObjectValues: function(structure) {
                return _.chain(structure)
                    .keys()
                    .filter(function(key) {
                        return typeof structure[key] === 'object';
                    })
                    .map(function(key) {
                        return [key, structure[key]];
                    })
                    .object()
                .value();
            },

            getCyclicProperties: function(structure, seen, parent) {
                seen = seen || [];
                parent = parent || '';

                var cyclic = [];

                _.chain(structure)
                    .keys()
                    .filter(function(key) {
                        return typeof structure[key] === 'object';
                    })
                    .map(function(key) {
                        return [key, {
                            key: key,
                            path: parent + key,
                            value: structure[key]
                        }];
                    })
                    .each(function(pair) {
                        var object = pair[1].value;

                        var isCyclic = seen.indexOf(object) > -1;

                        seen.push(object);

                        if (isCyclic) {
                            cyclic.push(pair[1].path);
                        } else {
                            cyclic.concat(
                                JSONC.utility.getCyclicProperties(
                                    object, seen, pair[1].path + '.'
                                )
                            );
                        }
                    });

                return cyclic;
            },

            isCyclic: function(structure) {
                return JSONC.utility.getCyclicProperties(structure).length > 0;
            }

        }

    };

    return JSONC;

}));