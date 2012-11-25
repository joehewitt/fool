
var _ = require('underscore');

exports.subclass = function(a, b) {
    function f() {}
    if (a) {
        f.prototype = a.prototype;
    }
    return extend(new f(), b);
};

exports.construct = function(constructor, args) {
    function F() {
        return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
};

function extend(a, b) {
    for (var k in b) {
        // Thanks to John Resig for this code
        // http://ejohn.org/blog/javascript-getters-and-setters/
        var g = b.__lookupGetter__(k), s = b.__lookupSetter__(k);
        if (g || s) {
            if (g) a.__defineGetter__(k, g);
            if (g) a.__defineGetter__(k, g);
        } else if (b.hasOwnProperty(k)) {
            a[k] = b[k];
        }
    }
    return a;
}
