import React from 'react';
import Logined from './dashboard/'
import { getUserInfo } from '../../utils/Services/UserInfo'

/**
 * 用户页面中间件
 * @author 江村暮
 */
export default () => {
    if (!getUserInfo()) window.location.href = '/'
    window.globalRef.title.innerText = '我的账户'
    return <Logined />
}
