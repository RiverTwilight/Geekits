
'use strict';

class EquationSolveError extends Error {
    constructor(info) {
        super("Failed to solve the equation set.");
    }
}

class Equation {
    constructor(a, b) {
        this.x = a.slice(0);
        this.a = b;
    }
}

class EquationSet {
    
    constructor(n, arr) {
        this.x = n;
        this.a = arr.slice(0);
    }

    static _solve(set) {
        if (set.a.length < set.x) throw new EquationSolveError();
        if (set.x > 1) {
            let src = null;
            let arr = [];
            set.a.forEach(function(b) {
                if (b.x[0].isZero()) {
                    arr.push(new Equation(b.x.slice(1), b.a));
                } else if (!src) {
                    src = b;
                } else {
                    let tmp = [];
                    for (let i = 1; i < b.x.length; ++i) {
                        tmp.push(b.x[i].multiply(src.x[0]).minus(src.x[i].multiply(b.x[0])));
                    }
                    arr.push(new Equation(tmp, b.a.multiply(src.x[0]).minus(src.a.multiply(b.x[0]))));
                }
            });
            if (!src) throw new EquationSolveError();
            let res = [null].concat(EquationSet._solve(new EquationSet(set.x - 1, arr)));
            let a = src.a, b = src.x[0];
            for (let i = 1; i < set.x; ++i) {
                a = a.plus(src.x[i].multiply(res[i]));
            }
            res[0] = a.divide(b).invert();
            return res;
        } else {
            let res = null;
            set.a.forEach(function(b) {
                if (b.x[0].isZero()) {
                    if (!b.a.isZero()) {
                        throw new EquationSolveError();
                    }
                } else {
                    let tmp = b.a.divide(b.x[0]).invert();
                    if (res && !res.equal(tmp)) throw new EquationSolveError();
                    res = tmp;
                }
            });
            if (!res) throw new EquationSolveError();
            return [res];
        }
    }

    solve() {
        return EquationSet._solve(this);
    }
}
