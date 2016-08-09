var _ = require('lodash');
var Vector = require('./vector');

class Matrix {
    static fromRowVectors(rowVectors) {
        var data = _.map(rowVectors, 'data');

        return new Matrix(data);
    }
    get rowVectors() {
        if (this.rowVisit) {
            return this.rowMemo;
        }
        this.rowVisit = true;
        return this.rowMemo = _.map(this.data, Vector.factory);
    }
    get colVectors() {
        if (this.colVisit) {
            return this.colMemo;
        }
        this.colVisit = true;
        return this.colMemo = this.transpose().rowVectors;
    }
    get diagonalVector() {
        let ret = [];
        for (let i = 0; i < this.data.length; i++) {
            ret[i] = this.data[i][i];
        }
        return new Vector(ret);
    }
    constructor(data) {
        this.data = data;
        this.rowVisit = false;
        this.colVisit = false;
        this.rowMemo = [];
        this.colMemo = [];
    }
    transpose() {
        var newData = _.zipWith(...this.data, ...params => params);

        return new Matrix(newData);
    }
    add(other) {
        var newRowVectors = _.zipWith(
            this.rowVectors,
            other.rowVectors,
            Vector.plus
        );

        return Matrix.fromRowVectors(newRowVectors);
    }
    multiply(other) {
        var newData = _.map(this.rowVectors, (a) => {
            return _.map(other.colVectors, v => a.dot(v));
        });

        return new Matrix(newData);
    }
    scale(factor) {
        var newData = _.map(this.rowVectors, a => a.scale(factor));

        return Matrix.fromRowVectors(newData);
    }
    negate() {
        return this.scale(-1);
    }
    trace() {
        return _.sum(this.diagonalVector.data);
    }
}

module.exports = {Matrix};

