import React from 'react'

export default ({ page, onPageChange, items }) => (
    <div className="mdui-shadow-17 mdui-text-color-theme mdui-bottom-nav-scroll-hide mdui-color-white mdui-bottom-nav">
        {items.map(item => (
            <a
                key={item.name}
                onClick={() => {
                    onPageChange(item.page);
                    window.location.hash = `#${item.page}`
                }}
                title={item.name}
                className={`mdui-ripple ${(page === item.page) ? "mdui-bottom-nav-active" : ""}`}>
                <i className="mdui-icon material-icons">{item.icon}</i>
            </a>
        ))}
    </div>
)