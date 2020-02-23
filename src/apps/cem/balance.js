/* eslint-disable */


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


class CalcError extends Error {
    constructor(...arg) {
        super(...arg);
    }
}

class Chemical {
    constructor(str, count) {
        this.str = str;
        this.count = count;
    }
    get(element) {
        return this.count.has(element) ? this.count.get(element) : 0;
    }
}

class ChemicalSet extends Array {

    constructor(...arg) {
        super(...arg);
    }

    
}


function init(_this, str) {
    // let _this = this;
    str.replace(/\s/g, '').split('+').forEach(function(s) {
        if (!s) throw new CalcError("化学式不能为空");
        let stack = [[]];
        for (let i = 0; i < s.length; ) {
            if (s[i] === '(') {
                stack.push([]);
                ++i;
            } else if (s[i] === ')') {
                if (stack.length < 2) throw new CalcError("括号不匹配");
                if (s[i - 1] === '(') throw new CalcError("括号内不能为空");
                let tmp = s.slice(i + 1).match(/^[0-9]+/);
                let count = 1;
                if (tmp) {
                    count = parseInt(tmp[0]);
                    i += tmp[0].length;
                }
                let arr = stack.pop();
                arr.forEach(function(o) {
                    stack[stack.length - 1].push({
                        element: o.element,
                        count: o.count * count
                    });
                });
                ++i;
            } else {
                let tmp = s.slice(i).match(/^([A-Z][a-z]*)(\d*)/);
                if (!tmp) throw new CalcError("化学式书写错误");
                let element = tmp[1];
                let count = parseInt(tmp[2] || 1);
                stack[stack.length - 1].push({
                    element: element,
                    count: count
                });
                i += tmp[0].length;
            }
        }
        if (stack.length > 1) throw new CalcError("括号不匹配");
        let map = new Map();
        stack[0].forEach(function(item) {
            if (!map.has(item.element)) {
                map.set(item.element, item.count);
            } else {
                map.set(item.element, map.get(item.element) + item.count);
            }
        });
        console.log('_s', s)
        console.log('map', map)
        _this.push(new Chemical(s, map));
    });
    return _this
}


class ChemicalEquation {

    constructor(l, r) {
        // this.l = new ChemicalSet();
        
        this.l = init([], l)
        this.r = init([], r)
        console.log('left', this.l)
        // this.r.init(r);
    }

    balance() {
        let _this = this;
        this.elements = [];
        [].concat(this.l, this.r).forEach(function(a) {
            a.count.forEach(function(count, element) {
                if (_this.elements.indexOf(element) === -1) {
                    _this.elements.push(element);
                }
            });
        });
        console.log('this.elements', this.elements)
        let cntUnknowns = this.l.length + this.r.length - 1;
        console.log('cntUnknowns', cntUnknowns)
        let set = new EquationSet(cntUnknowns, this.elements.map(function(element) {
            console.log('====element', element)
            let a = [].concat(_this.l.slice(1).map(function(b) {
                return b.get(element);
            }), _this.r.map(function(b) {
                return -b.get(element);
            })).map(function(x) {
                return new RationalNumber(x);
            });
            let b = new RationalNumber(_this.l[0].get(element));
            console.log('a,b', a, b)
            return new Equation(a, b);
        }));
        let res;
        console.log('set', set)
        let table = set.a.map(item => {
            return [item.a.a].concat(item.x.map(item => item.a))
        })
        console.log('table', table)

        try {
            res = set.solve();
        } catch (err) {
            throw new CalcError("无法配平方程式");
        }
        console.log('方程解', res)
        let k = 1;
        for (let i = 0; i < res.length; ++i) {
            if (res[i].a <= 0) throw new CalcError("无法配平方程式");
            k = lcm(k, res[i].b);
        }
        let ans = [k];
        for (let i = 0; i < res.length; ++i) {
            ans.push(res[i].a * (k / res[i].b));
        }
        return {
            ans,
            table
        }
    }
}

function getResult(textl, textr) {
    try {
        let eq = new ChemicalEquation(textl, textr);
        let {ans,table} = eq.balance();
        console.log('ans', ans)
        let res = '';
        for (let i = 0; i < eq.l.length; ++i) {
            if (i) res += '+';
            if (ans[i] !== 1) res += ans[i];
            res += eq.l[i].str.replace(/\d+/g, function(a) {
                return '<sub>' + a + '</sub>';
            });
        }
        for (let i = 0; i < eq.r.length; ++i) {
            res += i ? '+' : '==';
            if (ans[i + eq.l.length] !== 1) res += ans[i + eq.l.length];
            res += eq.r[i].str.replace(/\d+/g, function(a) {
                return '<sub>' + a + '</sub>';
            });
        }
        console.log('res', res)
        return {
            ans,
            exp: res,
            table,
        };
    } catch (err) {
        console.error('err', err)
        if (err instanceof CalcError) {
            return '<span class="error-info">' + err.message + '</span>';
        } else {
            return '<span class="error-info">' + err.stack + '</span>';
        }
    }
}


let table = [
    [2, 0, -1, 0, 0],
    [1, 0, 0, 0, -1],
    [3, 0, 0, -1, -2],
    [0, 1, 0, -2, 0],
    [0, 1, -1, 0, 0]
]

function calTable(table) {
    let set = new EquationSet(table[0].length - 1, table.map(row => {
        return new Equation(row.slice(1).map(item => new RationalNumber(item)), new RationalNumber(row[0]))
    }))
    console.log('==set', set)
    let res = set.solve()
    let k = 1;
    for (let i = 0; i < res.length; ++i) {
        if (res[i].a <= 0) throw new CalcError("无法配平方程式");
        k = lcm(k, res[i].b);
    }
    let ans = [k];
    for (let i = 0; i < res.length; ++i) {
        ans.push(res[i].a * (k / res[i].b));
    }
    return ans;
}
//console.log('==table', table)
console.log('==result', calTable(table))

//export { getResult }
export default calTable