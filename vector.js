
var _ = require('lodash');

class Vector {
    static factory(data) {
        return new Vector(data);
    }
    static get i() {
        return new Vector([1, 0, 0]);
    }
    static get j() {
        return new Vector([0, 1, 0]);
    }
    static get k() {
        return new Vector([0, 0, 1]);
    }
    static plus(u, v) {
        return u.add(v);
    }
    static minus(u, v) {
        return u.subtract(v);
    }
    static dotProduct(u, v) {
        return u.dotProduct(v);
    }
    static crossProduct(u, v) {
        return u.crossProduct(v);
    }
    static reflectAcross(u, n) {
        return u.reflect(n);
    }
    constructor(data) {
        this.data = data;
    }
    negate() {
        return this.scale(-1);
    }
    scale(factor) {
        var newData = _.map(this.data, a => factor * a);

        return new Vector(newData);
    }
    add(other) {
        var newData = _.zipWith(this.data, other.data, _.add);

        return new Vector(newData);
    }
    subtract(other) {
        return this.add(other.negate());
    }
    manhattan() {
        return _.sum(_.map(this.data, Math.abs));
    }
    length() {
        return Math.sqrt(
           _.chain(this.data)
            .map((x) => x * x)
            .sum()
            .value()
        );
    }
    normalize() {
        return this.scale(1 / this.length());
    }
    dot(other) {
        return _.sum(_.zipWith(this.data, other.data, _.multiply));
    }
    cross(other) {
        var [d, e, f] = this.data,
            [g, h, i] = other.data;

        return new Vector([
            e * i - f * h,
            f * g - d * i,
            d * h - e * g
        ]);
    }
    ccw(other) {
        return this.cross(other).data[2] > 0;
    }
    reflect(normal) {
        var projection = this.dot(normal);

        return normal.scale(2 * projection).subtract(this);
    }
}

module.exports = {Vector};

