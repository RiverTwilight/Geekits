import React from 'react'
import UAParser from 'ua-parser-js'
import Input from '../../utils/Component/Input.tsx'

const parser = new UAParser();

const Result = ({data}) =>{
    if(!data)return null
    const { os, browser, cpu, engine } = data
    return(
        <div className="mdui-table-fluid">
            <table className="mdui-table">
                <tbody>
                    <tr>
                        <td>系统</td>
                        <td>{`${os.name} ${os.version}`}</td>
                    </tr>
                    <tr>
                        <td>浏览器</td>
                        <td>{`${browser.name} ${browser.version}`}</td>
                    </tr>
                    <tr>
                        <td>架构</td>
                        <td>{cpu.architecture}</td>
                    </tr>
                    <tr>
                        <td>引擎</td>
                        <td>{`${engine.name} ${engine.version}`}</td>
                    </tr>
                </tbody>
            </table>
        </div>  
    )
}

class Ui extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            string:"",
            data:null
        };       
    }
    componentDidMount(){    
        this.setState({string: navigator.userAgent}, _=> this.parse())
    }
    parse(){
        parser.setUA(this.state.string);
        this.setState({data: parser.getResult()})
    }
    render(){
        const { string, data } = this.state
        return(
            <>
                <Input
                    autoFocus
                    onValueChange={newText=>{
                        this.setState({
                            string:newText
                        }, _=>this.parse())
                    }}
                    header="UA字符串"
                    icon="link"
                    value={string}
                />         
                <div className="mdui-clearfix"></div>
                <Result data={data}/>
            </>
        )
    }
}

export default Ui