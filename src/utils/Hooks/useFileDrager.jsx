import { useEffect } from 'react'

function deepClone(obj) {
    if (obj === null) return null; //null 的情况
    if (obj instanceof RegExp) return new RegExp(obj); //正则表达式的情况
    if (obj instanceof Date) return new Date(obj); //日期对象的情况
    if (typeof obj == 'Function') return new function (obj) { }; //函数的情况
    if (typeof obj != "object") {
        //非复杂类型,直接返回 也是结束递归的条件
        return obj
    }
    //[].__proto__.constructor=Array()
    //{}.__proto__.constructor=Object()
    //因此处理数组的情况时,可以取巧用这个办法来new新对象
    var newObj = new obj.__proto__.constructor;
    for (var key in obj) {
        newObj[key] = deepClone(obj[key])
    }
    return newObj;
}


const signListener = (cb, getEventCb) => {
    document.ondragover = e => {
        e.preventDefault()
    }
    document.ondragenter = () => {
        //dropBox.style.background = '#888888'
    }
    document.ondragleave = () => {
        //dropBox.style.background = null
    }
    document.ondrop = e => {
        e.preventDefault()
        var dataFile = e.dataTransfer.files[0];
        var fr = new FileReader();
        if (e.dataTransfer.files[0].type.match(/text\/.+/)) {
            fr.readAsText(dataFile, "gb2312");
        } else {
            fr.readAsDataURL(dataFile);
        }
        getEventCb && getEventCb(e)
        fr.onload = () => {
            cb && cb(fr.result, dataFile, e.dataTransfer.files)
        }
    }
}

const removeListener = () => {
    document.ondrop = null
    document.ondragleave = null
    document.ondragenter = null
    document.ondragenter = null
}

const useFileDrager = (cb) => {
    useEffect(() => {
        signListener(cb)
        return removeListener
    }, [cb])
}

export default useFileDrager

export {
    signListener, removeListener,
}
