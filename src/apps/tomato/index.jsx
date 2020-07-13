import React from 'react'

const UsedTomato = () => {
    return null
}

export default class extends React.Component {
    constructor(){
        this.state = {
            min: 25
        }
    }
    render() {
        return (
            <>
                <svg width="200" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/>
                </svg>
                <button
                    onClick={() => { }}
                    className="mdui-color-theme mdui-fab mdui-fab-fixed"
                >
                    <i className="mdui-icon material-icons">add</i>
                </button>
            </>
        )
    }
}