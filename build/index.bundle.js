'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ = require('lodash');

var Vector = function () {
    _createClass(Vector, null, [{
        key: 'factory',
        value: function factory(data) {
            return new Vector(data);
        }
    }, {
        key: 'plus',
        value: function plus(u, v) {
            return u.add(v);
        }
    }, {
        key: 'minus',
        value: function minus(u, v) {
            return u.subtract(v);
        }
    }, {
        key: 'dotProduct',
        value: function dotProduct(u, v) {
            return u.dotProduct(v);
        }
    }, {
        key: 'crossProduct',
        value: function crossProduct(u, v) {
            return u.crossProduct(v);
        }
    }, {
        key: 'reflectAcross',
        value: function reflectAcross(u, n) {
            return u.reflect(n);
        }
    }, {
        key: 'i',
        get: function get() {
            return new Vector([1, 0, 0]);
        }
    }, {
        key: 'j',
        get: function get() {
            return new Vector([0, 1, 0]);
        }
    }, {
        key: 'k',
        get: function get() {
            return new Vector([0, 0, 1]);
        }
    }]);

    function Vector(data) {
        _classCallCheck(this, Vector);

        this.data = data;
    }

    _createClass(Vector, [{
        key: 'negate',
        value: function negate() {
            return this.scale(-1);
        }
    }, {
        key: 'scale',
        value: function scale(factor) {
            var newData = _.map(this.data, function (a) {
                return factor * a;
            });

            return new Vector(newData);
        }
    }, {
        key: 'add',
        value: function add(other) {
            var newData = _.zipWith(this.data, other.data, _.add);

            return new Vector(newData);
        }
    }, {
        key: 'subtract',
        value: function subtract(other) {
            return this.add(other.negate());
        }
    }, {
        key: 'manhattan',
        value: function manhattan() {
            return _.sum(_.map(this.data, Math.abs));
        }
    }, {
        key: 'length',
        value: function length() {
            return Math.sqrt(_.chain(this.data).map(function (x) {
                return x * x;
            }).sum().value());
        }
    }, {
        key: 'normalize',
        value: function normalize() {
            return this.scale(1 / this.length());
        }
    }, {
        key: 'dot',
        value: function dot(other) {
            return _.sum(_.zipWith(this.data, other.data, _.multiply));
        }
    }, {
        key: 'cross',
        value: function cross(other) {
            var _data = _slicedToArray(this.data, 3);

            var d = _data[0];
            var e = _data[1];
            var f = _data[2];

            var _other$data = _slicedToArray(other.data, 3);

            var g = _other$data[0];
            var h = _other$data[1];
            var i = _other$data[2];


            return new Vector([e * i - f * h, f * g - d * i, d * h - e * g]);
        }
    }, {
        key: 'ccw',
        value: function ccw(other) {
            return this.cross(other).data[2] > 0;
        }
    }, {
        key: 'reflect',
        value: function reflect(normal) {
            var projection = this.dot(normal);

            return normal.scale(2 * projection).subtract(this);
        }
    }]);

    return Vector;
}();

var Matrix = function () {
    _createClass(Matrix, [{
        key: 'rowVectors',
        get: function get() {
            if (this.rowVisit) return this.rowMemo;
            this.rowVisit = true;
            return this.rowMemo = _.map(this.data, Vector.factory);
        }
    }, {
        key: 'colVectors',
        get: function get() {
            if (this.colVisit) return this.colMemo;
            this.colVisit = true;
            return this.colMemo = this.transpose().rowVectors;
        }
    }], [{
        key: 'fromRowVectors',
        value: function fromRowVectors(rowVectors) {
            var data = _.map(rowVectors, 'data');

            return new Matrix(data);
        }
    }]);

    function Matrix(data) {
        _classCallCheck(this, Matrix);

        this.data = data;
        this.rowVisit = false;
        this.colVisit = false;
    }

    _createClass(Matrix, [{
        key: 'transpose',
        value: function transpose() {
            var args = this.data.concat(function () {
                for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
                    params[_key] = arguments[_key];
                }

                return params;
            });
            var newData = _.zipWith.apply({}, args);

            return new Matrix(newData);
        }
    }, {
        key: 'add',
        value: function add(other) {
            var newRowVectors = _.zipWith(this.rowVectors, other.rowVectors, Vector.plus);

            return Matrix.fromRowVectors(newRowVectors);
        }
    }]);

    return Matrix;
}();

exports.Vector = Vector;
exports.Matrix = Matrix;
