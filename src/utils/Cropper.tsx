import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/react-cropper` if it exist... Remove this comment to see the full error message
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
// @ts-expect-error ts-migrate(2691) FIXME: An import path cannot end with a '.ts' extension. ... Remove this comment to see the full error message
import saveFile from './fileSaver.ts'

type ImgCropperState = any;

class ImgCropper extends React.Component<{}, ImgCropperState> {
    constructor(props: {}) {
        super(props);
        this.state = {
        }
    }
    _crop() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getCroppedCanvas' does not exist on type... Remove this comment to see the full error message
        var img = this.refs.cropper.getCroppedCanvas().toDataURL()
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onCropperChange' does not exist on type ... Remove this comment to see the full error message
        this.props.onCropperChange(img)
    }
    render() {
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Cropper
                ref='cropper'
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'file' does not exist on type 'Readonly<{... Remove this comment to see the full error message
                src={this.props.file}
                style={{ height: 500, width: '100%' }}
                //aspectRatio={1 / 1}
                //guides={true}
                crop={this._crop.bind(this)}
            />
        )
    }
}

type CropWindowState = any;

export default class CropWindow extends React.Component<{}, CropWindowState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            xScaled: false,
            yScaled: false,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'img' does not exist on type '{}'.
            cropperCache: props.img
        }
    }
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'ifShow' does not exist on type '{}'.
    componentWillReceiveProps({ ifShow }: {}) {
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'null' is not assignable to param... Remove this comment to see the full error message
        if (ifShow) window.history.pushState(null, null, '#cropper')
    }
    render() {
        const { xScaled, yScaled, cropperCache } = this.state
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'ifShow' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { ifShow, title, onClose, onConfirm, img } = this.props
        //用return null会每次重载图片
        return (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <span style={{ display: (!ifShow) ? 'none' : 'block' }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <header className="mdui-shadow-0 header mdui-appbar mdui-appbar-fixed">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-shadow-0 mdui-appbar">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-color-white mdui-toolbar">
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <button
                                onClick={() => {
                                    window.history.go(-1)
                                    onClose()
                                }}
                                className="mdui-btn mdui-btn-icon mdui-text-color-theme">
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <i className="mdui-icon material-icons">arrow_back</i>
                            </button>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className="mdui-typo-title mdui-text-color-theme">
                                {title}
                            </div>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className="mdui-toolbar-spacer"></div>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <button
                                mdui-menu="{target: '#scale-menu',covered:false}"
                                className="mdui-text-color-white mdui-btn mdui-btn-icon"
                            >
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <i className="mdui-icon material-icons">flip</i>
                            </button>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <ul className="mdui-menu" id="scale-menu">
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <li className="mdui-menu-item">
                                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <a
                                        onClick={() => {
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'refs' does not exist on type 'Element'.
                                            const { cropper } = this.refs.cropper.refs.cropper
                                            if (xScaled) {
                                                cropper.scaleX(1, -1)
                                            } else {
                                                cropper.scaleX(-1, 1)
                                            }
                                            this.setState({ xScaled: !xScaled })
                                        }}
                                    >水平翻转</a>
                                </li>
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <li className="mdui-menu-item">
                                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                    <a
                                        onClick={() => {
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'refs' does not exist on type 'Element'.
                                            const { cropper } = this.refs.cropper.refs.cropper
                                            if (yScaled) {
                                                cropper.scaleY(1, -1)
                                            } else {
                                                cropper.scaleY(-1, 1)
                                            }
                                            this.setState({ yScaled: !yScaled })
                                        }}
                                    >竖直翻转</a>
                                </li>
                            </ul>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <button
                                onClick={() => {
                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'refs' does not exist on type 'Element'.
                                    this.refs.cropper.refs.cropper.cropper.rotate(90)
                                }}
                                className="mdui-btn mdui-btn-icon mdui-text-color-theme">
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <i className="mdui-icon material-icons">rotate_left</i>
                            </button>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <button
                                onClick={() => {
                                    onConfirm(cropperCache)
                                }}
                                className="mdui-btn mdui-btn-icon mdui-text-color-theme">
                                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                                <i className="mdui-icon material-icons">check</i>
                            </button>
                        </div>
                    </div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-divider"></div>
                </header>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <button
                    onClick={() => {
                        saveFile({
                            filename: 'ygktool-cropper',
                            type: 'png',
                            file: cropperCache
                        })
                    }}
                    className="mdui-fab mdui-color-theme mdui-text-color-white mdui-fab-fixed mdui-fab-mini">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <i className="mdui-icon material-icons">file_download</i>
                </button>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ImgCropper
                    ref="cropper"
                    // @ts-expect-error ts-migrate(2322) FIXME: Property 'getCropper' does not exist on type 'Intr... Remove this comment to see the full error message
                    getCropper={(ref: any) => {
                        this.setState({ cropper: ref })
                    }}
                    onCropperChange={(newImg: any) => {
                        this.setState({ cropperCache: newImg })
                    }}
                    file={img}
                />
            </span>
        );
    }
}
