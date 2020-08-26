import React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/ua-parser-js` if it exists... Remove this comment to see the full error message
import UAParser from 'ua-parser-js'
import { Input } from 'mdui-in-react'

const parser = new UAParser();

const Result = ({
    data
}: any) =>{
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

type ComponentState = any;

export default class extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            string:"",
            data:null
        };       
    }
    componentDidMount(){    
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(_: any) => void' is not assigna... Remove this comment to see the full error message
        this.setState({string: navigator.userAgent}, (_: any) => this.parse())
    }
    parse(){
        parser.setUA(this.state.string);
        this.setState({data: parser.getResult()})
    }
    render(){
        const { string, data } = this.state
        
        return <>
            
            <Input
                // @ts-expect-error ts-migrate(2322) FIXME: Property 'autoFocus' does not exist on type 'Intri... Remove this comment to see the full error message
                autoFocus
                onValueChange={newText=>{
                    this.setState({
                        string:newText
                    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(_: any) => void' is not assigna... Remove this comment to see the full error message
                    }, (_: any) => this.parse())
                }}
                header="UA字符串"
                icon="link"
                value={string}
            />         
            
            <div className="mdui-clearfix"></div>
            
            <Result data={data}/>
        </>;
    }
}
