import * as React from 'react'
import { ListProps } from './types/development'

/**
 * 列表组件
 * @TODO 头像/副标题
 */

export default ({ text }: ListProps) => (
    <li className="mdui-col mdui-list-item mdui-ripple">
        <div className="mdui-list-item-content">
            <div className="mdui-list-item-title mdui-list-item-one-line">
                {text}
            </div>
        </div>
    </li>
)