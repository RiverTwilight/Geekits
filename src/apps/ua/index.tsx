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
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className="mdui-table-fluid">
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <table className="mdui-table">
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <tbody>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <tr>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <td>系统</td>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <td>{`${os.name} ${os.version}`}</td>
                    </tr>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <tr>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <td>浏览器</td>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <td>{`${browser.name} ${browser.version}`}</td>
                    </tr>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <tr>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <td>架构</td>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <td>{cpu.architecture}</td>
                    </tr>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <tr>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <td>引擎</td>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        return <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="mdui-clearfix"></div>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Result data={data}/>
        </>;
    }
}
