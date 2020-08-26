import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-loadable` if it exis... Remove this comment to see the full error message
import Loadable from 'react-loadable';

const Loading = (props: any) => {
    if (props.pastDelay) {
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className="center-panel mdui-text-color-theme-text">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h3 className="mdui-text-center">精彩即将到来...</h3>
            </div>
        )
    }
    return null;
}

export default (loader: any) => {
    return Loadable({
        loader,
        loading: Loading,
        delay: 1000
    });
};