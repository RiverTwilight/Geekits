import Loadable from 'react-loadable';

const Loading = (props: any) => {
    if (props.pastDelay) {
        return (
            <div className="center-panel mdui-text-color-theme-text">             
                <div className="mdui-spinner mdui-spinner-colorful"></div>
            </div>
        )
    }
    return null;
}

export default (loader: any) => {
    return Loadable({
        loader,
        loading: Loading,
        delay: 500
    });
};
