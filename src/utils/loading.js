import React from 'react';
import Loadable from 'react-loadable';

const Loading = props => {
    if (props.pastDelay) {
        return (
            <p className="center-panel">
                <h3 className="mdui-text-center">精彩即将到来...</h3>
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