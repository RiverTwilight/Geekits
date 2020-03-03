class num2chinese {
    constructor(str) {
        this.chinese = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]
        this.beforeDot = this.splitBySpace((/\./).test(str) ? str.split('\.')[0] : str, 4);
        this.afterDot = this.__num2cn((/\./).test(str) ? str.split('\.')[1] : null);      
    }
    __num2cn(num) {
        if(num)return num.split('').map(a => (this.chinese[parseInt(a)])).join('')        
    }
    __read(){
        console.log(this.beforeDot, this.afterDot)
    }
    deleteAfterZero(cnStr) {       
        const pattern = /(\S+)?零$/;
        console.log(pattern.test(cnStr))
        if (pattern.test(cnStr)) {
            return pattern.exec(cnStr)[1]
        }
        return cnStr
    }
    deleteContinuityZero(cnStr) {
        var pattern = /(零{2,4})/
        if (pattern.test(cnStr)) {
            return cnStr.replace(pattern, "零");
        }
        return cnStr
    }
    calDirect(){
        var partCn = this.beforeDot.map(fourNum=>(this.addBeforeUnit(fourNum)))
        console.log(partCn)
        var afterDot = (this.afterDot)?this.deleteContinuityZero(this.deleteAfterZero(this.addAfterUnit().join(''))):''
        var beforeDot = partCn.reverse().map((fourCn,i)=>{
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
    splitBySpace(str, space){
        var toSplit = str.split('').reverse().map((num,i)=>((i!==0 && i%space === 0)?`${num},`:num))
        var toSplit = toSplit.reverse().join('');
        return toSplit.split(',')
    }
    addBeforeUnit(fourNum) {
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
    addAfterUnit(cnStr) {
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