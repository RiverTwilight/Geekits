const save = (fileObj, filename, type ) => {
    const url = URL.createObjectURL(fileObj)
    //没有文件名使用日期
    const name = filename || new Date().toISOString().slice(0, 19).replace('T', ' ').replace(" ", "_").replace(/:/g, "-") + '.' +type
    const a = document.createElement('a')
    a.style = 'display: none'
    a.download = name
    a.href = url
    document.body.appendChild(a)
    a.click()
}

async function blobToDataURI(blob, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = e => {
        callback(dataURLtoFile(e.target.result))
    }
}

function dataURLtoFile(dataurl, filename) {
    //将base64转换为文件
    var arr = dataurl.split(',')
      , mime = arr[0].match(/:(.*?);/)[1]
      , bstr = atob(arr[1])
      , n = bstr.length
      , u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr],filename,{
        type: mime
    });
}

const saveFile = async (config) => {
     //统一转换成fileObj后保存
    const { file, filename, type } = config;
    if(typeof file === 'object'){
        //switch(/\[object\s(\S+)\]/.exec(file.toString())[1]){
        blobToDataURI(file, fileObj => {
            save(fileObj, filename, type)
        })
    }else{
        save(dataURLtoFile(file, filename), filename, type)
    }
}

export { dataURLtoFile, saveFile }
export default saveFile