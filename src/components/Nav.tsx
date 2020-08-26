import React from 'react'

export default ({
    page,
    onPageChange,
    items
}: any) => (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <div className="mdui-shadow-17 mdui-text-color-theme mdui-bottom-nav-scroll-hide mdui-color-white mdui-bottom-nav">
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {items.map((item: any) => <a
            key={item.name}
            onClick={() => {
                onPageChange(item.page);
                window.location.hash = `#${item.page}`
            }}
            title={item.name}
            className={`mdui-ripple ${(page === item.page) ? "mdui-bottom-nav-active" : ""}`}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <i className="mdui-icon material-icons">{item.icon}</i>
        </a>)}
    </div>
)