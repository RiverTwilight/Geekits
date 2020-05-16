function regularTextCreate(config: {
    template: string,
    length: number,
    func: number,
    arrayType: 0 | 1
}): string[] {
    const { template, length, func, arrayType } = config;
    const regGlobal = /\$\{(\d)\}/g;
    const reg = /\$\{(\d)\}/;
    const replace = (str: string, index: number, type: 0 | 1) => {
        const temExec = reg.exec(str) || { index: 0, 1: '0' }
            , temIndex = temExec.index//出现标识符的下标
            , origin = parseInt(temExec[1])//匹配首项
            , element = type === 0 ? (origin + index * func) : (origin * Math.pow(func, index))
            , cleanTemplate = str.replace(reg, '');                  
        return cleanTemplate.substring(0, temIndex) + element + cleanTemplate.substring(temIndex)
    }
    var result = [];
    for (let index = 0; index < length; index ++) {
        let res = '';
        do{
            res = replace(template, index, arrayType)
        }while(regGlobal.test(res)){
            res = replace(res, index, arrayType)
        }
        result.push(res)
    }
    return result
}

function templateTextCreate(config: {
    template: string,
    func: string
}): string[]{
    const { template, func } = config
    const reg = /\$\{()\}/g;
    return [template.replace(reg, func)]
}

export { regularTextCreate, templateTextCreate }
