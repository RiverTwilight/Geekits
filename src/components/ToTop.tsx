import * as React from 'react';

declare global {
    interface Window {
        toTop: any;
    }
}

export default () => {
    const [isHide, setHide] = React.useState(true)
    React.useEffect(()=>{
        window.addEventListener("scroll",() => {
            var t = document.documentElement.scrollTop || document.body.scrollTop;
            if(t <= 148){
                setHide(true)
            }else{
                setHide(false)
            }
        })
        return window.removeEventListener("scroll",()=>{})
    }, [])
    return(
        <button 
            onClick={()=>{
                window.toTop = setInterval(() => {
                    if(document.documentElement.scrollTop === 0)clearInterval(window.toTop)
                    document.documentElement.scrollTop -= 200
                }, 50);
            }}
            className={`mdui-color-theme mdui-fab mdui-fab-fixed ${isHide?'mdui-fab-hide':''}`}>
            <i className="mdui-icon mdui-text-color-white material-icons">&#xe5d8;</i>
        </button>
    )
}
