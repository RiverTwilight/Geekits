import * as React from 'react'
import { ListProps } from './types/development'

export default ({ text }: ListProps) => (
    <li className="mdui-col mdui-list-item mdui-ripple">
        <div className="mdui-list-item-content">
            <div className="mdui-list-item-title mdui-list-item-one-line">
                {text}
            </div>
        </div>
    </li>
)