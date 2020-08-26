class num2chinese {
    constructor(str: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'chinese' does not exist on type 'num2chi... Remove this comment to see the full error message
        this.chinese = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'beforeDot' does not exist on type 'num2c... Remove this comment to see the full error message
        this.beforeDot = this.splitBySpace((/\./).test(str) ? str.split('\.')[0] : str, 4);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterDot' does not exist on type 'num2ch... Remove this comment to see the full error message
        this.afterDot = this.__num2cn((/\./).test(str) ? str.split('\.')[1] : null);      
    }
    __num2cn(num: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'chinese' does not exist on type 'num2chi... Remove this comment to see the full error message
        if(num)return num.split('').map((a: any) => this.chinese[parseInt(a)]).join('');        
    }
    __read(){
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'beforeDot' does not exist on type 'num2c... Remove this comment to see the full error message
        console.log(this.beforeDot, this.afterDot)
    }
    deleteAfterZero(cnStr: any) {       
        const pattern = /(\S+)?零$/;
        console.log(pattern.test(cnStr))
        if (pattern.test(cnStr)) {
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            return pattern.exec(cnStr)[1]
        }
        return cnStr
    }
    deleteContinuityZero(cnStr: any) {
        var pattern = /(零{2,4})/
        if (pattern.test(cnStr)) {
            return cnStr.replace(pattern, "零");
        }
        return cnStr
    }
    calDirect(){
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'beforeDot' does not exist on type 'num2c... Remove this comment to see the full error message
        var partCn = this.beforeDot.map((fourNum: any) => this.addBeforeUnit(fourNum))
        console.log(partCn)
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterDot' does not exist on type 'num2ch... Remove this comment to see the full error message
        var afterDot = (this.afterDot)?this.deleteContinuityZero(this.deleteAfterZero(this.addAfterUnit().join(''))):''
        var beforeDot = partCn.reverse().map((fourCn: any,i: any)=>{
            if(fourCn === '')return fourCn
            switch(i){
                case(3):fourCn+='兆';break
                case(2):fourCn+='亿';break
                case(1):fourCn+='万';break
            }
            return fourCn
        }).reverse().join('')
        return `${beforeDot}元${afterDot === ''?'整':''}${afterDot}`
    }
    calMoney(){

    }
    splitBySpace(str: any, space: any){
        var toSplit = str.split('').reverse().map((num: any,i: any)=>((i!==0 && i%space === 0)?`${num},`:num))
        var toSplit = toSplit.reverse().join('');
        return toSplit.split(',')
    }
    addBeforeUnit(fourNum: any) {
        var reverse_arr = this.__num2cn(fourNum).split('').reverse();
        if (reverse_arr[1] && reverse_arr[1] !== "零") {
            reverse_arr.splice(1, 0, "拾");
        } else {
            reverse_arr.splice(1, 0, "");
        }
        if (reverse_arr[3] && reverse_arr[3] !== "零") {
            reverse_arr.splice(3, 0, "佰");
        } else {
            reverse_arr.splice(3, 0, "");
        }
        if (reverse_arr[5] && reverse_arr[5] !== "零") {
            reverse_arr.splice(5, 0, "仟");
        } else {
            reverse_arr.splice(5, 0, "");
        }
        return this.deleteAfterZero(this.deleteContinuityZero(reverse_arr.reverse().join('')))
    }
    addAfterUnit(cnStr: any) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'afterDot' does not exist on type 'num2ch... Remove this comment to see the full error message
        var reverse_arr = this.afterDot.split('')
        if (reverse_arr[0]) {
            reverse_arr.splice(1, 0, "角");
        }
        if (reverse_arr[2]) {
            reverse_arr.splice(3, 0, "分");
        }
        return reverse_arr
    }
}

export default num2chinese