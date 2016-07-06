var linear = require('../../build/index.bundle');

describe('vectors', function() {
    var Vector = linear.Vector;

    var u = new Vector([3, 5, 7]),
        v = new Vector([0, -2, 8]);

    it('negates a vector', function() {
        var w = u.negate();

        expect(w.data).toEqual([-3, -5, -7]);
    });
    it('scales a vector', function() {
        var w = u.scale(2);

        expect(w.data).toEqual([6, 10, 14]);
    });
    it('adds two vectors', function() {
        var w = u.add(v);

        expect(w.data).toEqual([3, 3, 15]);
    });
    it('subtracts two vectors', function() {
        var w = u.subtract(v);

        expect(w.data).toEqual([3, 7, -1]);
    });
    it('calculates distances', function() {
        expect(v.manhattan()).toBe(10);
        expect(u.length()).toBeCloseTo(9.11, 2);
    });
    it('normalizes a vector', function() {
        var w = u.normalize();

        expect(w.data[0]).toBeCloseTo(0.3292, 3);
        expect(w.data[1]).toBeCloseTo(0.5488, 3);
        expect(w.data[2]).toBeCloseTo(0.7683, 3);
    });
    it('multiplies two vector', function() {
        // TODO(chpipis): Test dot, cross, and ccw
    });
    it('reflects a vector over a plane', function() {
        // TODO(chpipis): Test vector reflection
    });
    it('provides unit vectors', function() {
        expect(Vector.i.data).toEqual([1, 0, 0]);
        expect(Vector.j.data).toEqual([0, 1, 0]);
        expect(Vector.k.data).toEqual([0, 0, 1]);
    });
    it('obeys dot product theorems', function() {
        expect(u.dot(v)).toEqual(v.dot(u));

        expect(Vector.i.dot(Vector.j)).toBe(0);
        expect(Vector.i.dot(Vector.k)).toBe(0);
        expect(Vector.j.dot(Vector.k)).toBe(0);
    });
    it('obeys cross product theorems', function() {
        expect(u.cross(v)).toEqual(v.cross(u).negate());

        expect(Vector.i.cross(Vector.j)).toEqual(Vector.k);
        expect(Vector.j.cross(Vector.k)).toEqual(Vector.i);
        expect(Vector.k.cross(Vector.i)).toEqual(Vector.j);
    });
});

describe('matrices', function() {
    var Matrix = linear.Matrix;

    var a = new Matrix(
        [
            [1, 2],
            [3, 4]
        ]
    );
    var b = new Matrix(
        [
            [3,  7],
            [0, -5]
        ]
    );
    it('adds two matrices', function() {
        expect(a.add(b).data).toEqual([
            [4,  9],
            [3, -1]
        ]);
    });
});
