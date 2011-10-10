
var _ = require('underscore');

exports.subclass = function(a, b) {
    function f() {}
    if (a) {
        f.prototype = a.prototype;
    }
    return _.extend(new f(), b);
};
