import React from 'react';
import Loadable from 'react-loadable';

const Loading = props => {
    if (props.pastDelay) {
        return (
            <div className="center-panel mdui-text-color-theme-text">
                <h3 className="mdui-text-center">精彩即将到来...</h3>
            </div>
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