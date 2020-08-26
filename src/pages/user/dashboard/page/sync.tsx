import React from 'react'
import Axios from '../../../../utils/axios';
import fiv from '../../../../utils/Services/fiv'
import { snackbar } from 'mdui'
import { getUserInfo } from '../../../../utils/Services/UserInfo'

type State = any;

export default class extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            mode: 'upload'
        }
    }
    sync() {
        const { mode } = this.state
        window.loadShow();
        Axios({
            method: 'post',
            url: '/ygktool/user/sync',
            withCredentials: false,
            data: {
                fivData: mode === 'upload' ? JSON.stringify(fiv.getAll()) : false,
                // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
                username: getUserInfo().username
            }
        }).then(response => {
            var json = JSON.parse(response.request.response);
            if (mode === 'download') {
                let cloudData = json.data[0].fiv;
                localStorage.setItem('fiv', cloudData.substring(1, cloudData.length - 1))//去掉首尾的双引号
                window.location.href = "/"
            }
            switch (json.code) {
                case 500:
                    snackbar({ message: '同步失败' });
                    break;
                case 666:
                    snackbar({ message: '同步成功' });
                    break;
            }
        }).then(_ => {
            window.loadHide()
        })
    }
    render() {
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-col-md-8">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="mdui-row-xs-2">
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-col">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button
                            onClick={_ => {
                                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(_: any) => void' is not assigna... Remove this comment to see the full error message
                                this.setState({ mode: 'upload' }, (_: any) => this.sync());
                            }}
                            className="mdui-btn-raised mdui-btn mdui-btn-block mdui-color-theme">
                            上传到云端
                        </button>
                    </div>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <div className="mdui-col">
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <button
                            onClick={() => {
                                this.setState({ mode: 'download' }, () => this.sync());
                            }}
                            className="mdui-btn-raised mdui-btn mdui-btn-block mdui-color-theme">
                            从云端下载
                        </button>
                    </div>
                </div>
            </div>
        </>;
    }
}
