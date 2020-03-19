import React from 'react';
import Loadable from 'react-loadable';

const Loading = props => {
    if (props.pastDelay) {
        return (
            <p className="center-panel">
                <h2 className="mdui-text-center">首次加载可能消耗较长时间，请稍后</h2>
                <p>
                大家在追逐梦想的过程中，可能会遭遇各种困境，
                诸如疾病的缠绕，贫穷的重负。但是不应该放弃，应该坚持下去。
                </p>
                <button onClick={_=>{
                    window.open(window.location.href);
                    window.open("about:blank","_self").close()
                }} className="mdui-color-theme mdui-btn mdui-btn-raised">等不及了！</button>
            </p>
        )
    }
    return null;
}

export default loader => {
    return Loadable({
        loader,
        loading: Loading,
        delay: 1000
    });
}