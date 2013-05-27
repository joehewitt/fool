
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

exports.createClass = function(implementation, base) {
    function cons() {
        if (this instanceof cons) {
            cons.cls.instantiate(this, arguments);
        } else {
            var subclassCons = exports.createClass(implementation, cons.cls);
            var definition = subclassCons.cls.subclass.apply(subclassCons.cls, arguments);
            extend(subclassCons.prototype, definition);
            if (subclassCons.prototype.ready) {
                subclassCons.prototype.ready.apply(subclassCons.prototype, [subclassCons]);
            }
            return subclassCons;
        }
    }
    
    cons.cls = new implementation(base);
    cons.cls.cons = cons;
    if (base) {
        cons.prototype = exports.subclass(base.cons);
    } else {
        cons.prototype = {};
    }
    return cons;
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

exports.extend = extend;
