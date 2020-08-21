import React from 'react';
import Logined from './dashboard/'
import { getUserInfo } from '../../utils/Services/UserInfo'

export default () => {
    window.globalRef.title.innerText = '我的账户'
    if (!getUserInfo()) window.location.href = '/user/login'
    return <Logined />
}
