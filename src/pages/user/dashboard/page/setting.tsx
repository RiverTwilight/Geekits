import React from 'react'

type State = any;

class Ui extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
        }       
	}
    render(){
        return(
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>fdsf</p>
            </>
        )
    }
}

export default Ui