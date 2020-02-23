
'use strict';

function gcd(a, b) {
    let c;
    if (a < 0) a = -a;
    if (b < 0) b = -b;
    while (b) {
        c = b; b = a % b; a = c;
    }
    return a;
}

function lcm(a, b) {
    if (!a && !b) return 0;
    return Math.abs(a * b / gcd(a, b));
}

class RationalNumber {
    
    constructor(a, b) {
        if (b === 0) throw new Error("Denominator must not be zero");
        if (typeof b === 'undefined') b = 1;
        this.a = a;
        this.b = b;
        this.normalize();
    }

    normalize() {
        let k = gcd(this.a, this.b);
        if (k !== 1) {
            this.a /= k;
            this.b /= k;
        }
        if (this.b < 0) {
            this.a = -this.a;
            this.b = -this.b;
        }
    }

    isZero() {
        return this.a === 0;
    }

    plus(b) {
        return new RationalNumber(this.a * b.b + b.a * this.b, this.b * b.b);
    }
    minus(b) {
        return new RationalNumber(this.a * b.b - b.a * this.b, this.b * b.b);
    }
    multiply(b) {
        return new RationalNumber(this.a * b.a, this.b * b.b);
    }
    divide(b) {
        if (b.isZero()) throw new Error("Divisor must not be zero");
        return new RationalNumber(this.a * b.b, this.b * b.a);
    }

    invert() {
        return new RationalNumber(-this.a, this.b);
    }

    equal(b) {
        return this.a * b.b === this.b * b.a;
    }

    toString() {
        return this.b === 1 ? '' + this.a : this.a + '/' + this.b;
    }

    get value() {
        return this.a / this.b;
    }
}
