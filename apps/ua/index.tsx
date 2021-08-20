import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Try `npm install @types/ua-parser-js` if it exists... Remove this comment to see the full error message
import UAParser from "ua-parser-js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

const parser = new UAParser();

const Result = ({ data }: any) => {
    if (!data) return null;
    const { os, browser, cpu, engine } = data;
    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableBody>
                    <TableRow>
                        <TableCell>系统</TableCell>
                        <TableCell>{`${os.name} ${os.version}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>浏览器</TableCell>
                        <TableCell>{`${browser.name} ${browser.version}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>架构</TableCell>
                        <TableCell>{cpu.architecture}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>引擎</TableCell>
                        <TableCell>{`${engine.name} ${engine.version}`}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

type ComponentState = any;

export default class Ua extends React.Component<{}, ComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            string: "",
            data: null,
        };
    }
    componentDidMount() {
        this.parse(navigator.userAgent);
    }
    parse = (newText: string) => {
        this.setState(
            {
                string: newText,
            },
            () => {
                parser.setUA(this.state.string);
                this.setState({ data: parser.getResult() });
            }
        );
    };
    render() {
        const { string, data } = this.state;
        return (
            <>
                <FormControl fullWidth>
                    <InputLabel htmlFor="ua">UA字符串</InputLabel>
                    <Input
                        id="ua"
                        autoFocus
                        onChange={e => {
                            this.parse(e.target.value)
                        }}
                        value={string}
                    />
                </FormControl>
                <br />
                <br />
                <Result data={data} />
            </>
        );
    }
}
