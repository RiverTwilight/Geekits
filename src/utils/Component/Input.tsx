import * as React from 'react'
import mduiInReact from './types/development'

export default ({ capsLock, error, helper, icon, rows, header, placeholder, value, onValueChange, ...others }: mduiInReact.InputProps) => {
    const TagType = rows ? 'textarea' : 'input';
    const [isUpper, setUpper] = React.useState(false)
    React.useEffect(() => {
        window.addEventListener('keydown', e => {
            var keyCode = e.keyCode || e.which; // 按键的keyCode
            var isShift = e.shiftKey || (keyCode == 16) || false; // shift键是否按住
            if (
                ((keyCode >= 65 && keyCode <= 90) && !isShift) // Caps Lock 打开，且没有按住shift键
                || ((keyCode >= 97 && keyCode <= 122) && isShift)// Caps Lock 打开，且按住shift键
            ) { 
                setUpper(true)
            }else {
                setUpper(false)
            }
        })
        return window.removeEventListener('keydown',()=>{})
    }, [])
    return (
        <div className={`${error ? "mdui-textfield-invalid" : ""}mdui-textfield ${(placeholder) ? '' : 'mdui-textfield-floating-label'}`}>
            {icon &&
                <i className="mdui-icon material-icons">{icon}</i>
            }
            {header &&
                <label className="mdui-textfield-label">{header}</label>
            }
            <TagType
                {...others}
                placeholder={placeholder}
                rows={rows}
                onChange={(e: { target: { value: any; }; }) => {
                    onValueChange && onValueChange(e.target.value)
                }}
                value={value}
                className="mdui-textfield-input">
            </TagType>
            {error &&
                <div className="mdui-textfield-error">{error}</div>
            }
            {(helper && (!isUpper || !capsLock)) &&
                <div className="mdui-textfield-helper">{helper}</div>
            }
            {(isUpper && !helper && capsLock) &&
                <div className="mdui-textfield-helper">大写锁定已打开</div>
            }
        </div>
    )
}
