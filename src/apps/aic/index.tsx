/* eslint-disable react/prop-types */
import React from 'react'
import { snackbar } from 'mdui'
import { FileInput, ListControlMenu, BottomAlert } from 'mdui-in-react'
import axios from '../../utils/axios'
// @ts-expect-error ts-migrate(6142) FIXME: Module '../../utils/Cropper' was resolved to '/mnt... Remove this comment to see the full error message
import Cropper from '../../utils/Cropper'
import ImgCompress from '../img_compress/engine'

const Result = ({
    result
}: any) => {
    if (!result) return null
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <>
        {result.map(({
            keyword,
            baike_info,
            score
        }: any, i: any) => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div key={i} className="mdui-col mdui-card">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-card-media">
                        {/*baike_info?<img src={baike_info.image_url}/>:""*/}
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-card-primary">
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className="mdui-card-primary-title">{keyword}</div>
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <div className="mdui-card-primary-subtitle">相似度:{score}</div>
                        </div>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div className="mdui-card-content">
                            {baike_info.description ? baike_info.description : '暂无介绍'}
                        </div>
                    </div>
                </div>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <br></br>
            </>
        ))}
    </>;
}

const aic_types = [{
    name: '通用物体和场景',
    value: 'normal'
}, {
    name: '动物',
    value: 'animal'
}, {
    name: '植物',
    value: 'plant'
}, {
    name: '车型',
    value: 'car'
}, {
    name: '菜品',
    value: 'dish'
}]

type AICState = any;

class AIC extends React.Component<{}, AICState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            aic_type: 0,
            image: null,
            defaultImage: null,
            data: null,
            ifShow: false,
            ifShowCropper: false
        }
    }
    loadDataFromServer() {
        const { image } = this.state
        window.loadShow()
        axios.post('/api/aic', {
            image: image.split('base64,')[1]
        }).then(response => {
            var json = JSON.parse(response.request.response);
            this.setState({
                data: json.result,
                ifShow: true
            })
        }).catch(error => {
            snackbar({ message: error })
        }).then(() => {
            window.loadHide()
        })
    }
    handleFileUpdate(file: any) {
        this.setState({
            ifShowCropper: true,
            image: file,
            defaultImage: file
        })
    }
    render() {
        const { image, defaultImage, ifShow, data, aic_type, ifShowCropper } = this.state
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div style={{ display: ifShowCropper ? 'none' : 'block' }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-shadow-0 mdui-card">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-card-content">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        {image && <img
                            style={{
                                display: 'block',
                                margin: '0 auto',
                                maxHeight: '200px'
                            }}
                            alt="预览"
                            src={image} />}
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <ListControlMenu
                            icon="language"
                            title="识别类型"
                            checked={aic_type}
                            onCheckedChange={checked => {
                                this.setState({ aic_type: checked })
                            }}
                            items={aic_types}
                        />
                    </div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-card-actions">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button
                            onClick={() => {
                                this.setState({
                                    ifShowCropper: true,
                                    image: defaultImage
                                })
                            }}
                            style={{
                                display: image ? 'inline-block' : 'none'
                            }}
                            className="mdui-ripple mdui-btn">
                            重新裁剪
                        </button>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <FileInput
                            fileType="image/*"
                            readbydrag
                            onFileChange={(file, fileObj) => {
                                console.log(fileObj)
                                const cb = this.handleFileUpdate.bind(this)
                                // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
                                if (fileObj.size >= 1.4 * 1024 * 1024) {
                                    // @ts-expect-error ts-migrate(2554) FIXME: Expected 4 arguments, but got 3.
                                    ImgCompress(file, 0.1, cb)
                                    //cb(file)
                                } else {
                                    cb(file)
                                }
                            }}
                        />
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button
                            onClick={() => {
                                image && this.loadDataFromServer()
                            }}
                            className="loadBtn mdui-btn-raised mdui-ripple mdui-color-theme mdui-btn">
                            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                            <i className="mdui-icon mdui-icon-left material-icons">&#xe5ca;</i>识别
                        </button>
                    </div>
                </div>
            </div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <BottomAlert
                onClose={() => {
                    this.setState({ ifShow: false })
                }}
                height={500}
                title="识别结果"
                ifShow={ifShow}
            >
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Result result={data} />
            </BottomAlert>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Cropper
                ifShow={ifShowCropper}
                img={image}
                onClose={() => {
                    this.setState({ ifShowCropper: false })
                }}
                onConfirm={(img: any) => {
                    this.setState({ ifShowCropper: false, image: img })
                }}
                title=""
            />
        </>;
    }
}

export default AIC
