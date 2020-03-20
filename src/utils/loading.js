import React from 'react';
import Loadable from 'react-loadable';

const Loading = props => {
    if (props.pastDelay) {
        return (
            <p className="center-panel">
                <h4 className="mdui-text-center">Loading</h4>
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