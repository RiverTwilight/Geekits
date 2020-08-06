import React from 'react'
import Axios from '../../../../utils/axios';
import fiv from '../../../../utils/fiv'
import { snackbar } from 'mdui'
import { getUserInfo } from '../../../../utils/UserInfo'

export default class extends React.Component {
    constructor(props) {
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
        return (
            <>
                <div className="mdui-col-md-8">
                    <div className="mdui-row-xs-2">
                        <div className="mdui-col">
                            <button
                                onClick={_ => {
                                    this.setState({ mode: 'upload' }, _ => this.sync());
                                }}
                                className="mdui-btn-raised mdui-btn mdui-btn-block mdui-color-theme">
                                上传到云端
                            </button>
                        </div>
                        <div className="mdui-col">
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
            </>
        )
    }
}
