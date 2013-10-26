(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.JSONC = factory();
  }
}(this, function () {

    var JSONC = {

    };

    return JSONC;

}));