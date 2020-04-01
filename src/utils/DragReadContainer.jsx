import React from 'react'

class Container extends React.Component{
    componentDidMount(){
        const { dropBox } = this;
        const { cb } = this.props
        document.ondrop = e=> {
            e.preventDefault()
        }
        document.ondragover = e=> {
            e.preventDefault()
        }
        dropBox.ondragenter = () => {
            //dropBox.style.background = '#888888'
        }
        dropBox.ondragleave = () => {
            //dropBox.style.background = null
        }
        dropBox.ondrop = e => {
            var dataFile = e.dataTransfer.files[0];
            var fr = new FileReader();
            fr.readAsText(dataFile, "gb2312");
            fr.onload = () => {
                cb && cb(fr.result)                
            }
        }
    }
    render(){
        return(
            <div 
                ref={r => this.dropBox = r}>
                {this.props.children}
            </div>
        )
    }
}

export default Container
