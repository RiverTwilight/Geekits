import React from 'react';
import Logined from './dashboard/'
import { getUserInfo } from '../../utils/Services/UserInfo'

export default () => {
    if (!getUserInfo()) window.location.href = '/'
    window.globalRef.title.innerText = '我的账户'
    return <Logined />
}
