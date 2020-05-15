function regularTextCreate(config: {
    template: string,
    length: number,
    func: number,
    arrayType: 0 | 1
}): string[] {
    const { template, length, func, arrayType } = config
    const reg = /\$\{(\d)\}/g
        , result = []
        , temExec = reg.exec(template) || { index: 0, 1: '0' }
        , temIndex = temExec.index
        , origin = parseInt(temExec[1]);
    const cleanTemplate = template.replace(reg, '')
    for (let index = 0; index < length; index ++) {
        let element = arrayType === 0 ? (origin + index * func) : (origin * Math.pow(func, index));
        let str = cleanTemplate.substring(0, temIndex) + element + cleanTemplate.substring(temIndex + 1)
        result.push(str)
    }
    return result

}

export { regularTextCreate }
