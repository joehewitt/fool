
var _ = require('underscore');

exports.subclass = function(a, b) {
    function f() {}
    if (a) {
        f.prototype = a.prototype;
    }
    return _.extend(new f(), b);
};

exports.construct = function(constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
};
