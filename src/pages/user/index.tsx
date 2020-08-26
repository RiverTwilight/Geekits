import React from 'react';
// @ts-expect-error ts-migrate(6142) FIXME: Module './dashboard/' was resolved to '/mnt/h/Bob/... Remove this comment to see the full error message
import Logined from './dashboard/'
import { getUserInfo } from '../../utils/Services/UserInfo'

export default () => {
    window.globalRef.title.innerText = '我的账户'
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 1 arguments, but got 0.
    if (!getUserInfo()) window.location.href = '/user/login'
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <Logined />
}
