import React from 'react';
import Logined from './dashboard/'
import { getUserInfo } from '../../utils/Services/UserInfo'

export default () => {
    window.globalRef.title.innerText = '我的账户'
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    if (!getUserInfo()) window.location.href = '/user/login'
    
    return <Logined />
}
