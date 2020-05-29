import React from 'react'
import FileRead from '../../components/fileread'

export default () => {
    return (
        <center>
            <FileRead
                multiple={false}
                onFileChange={(_, file) => {
                    console.log(file)
                    this.setState({
                        file: file
                    })
                }}
                webkitdirectory="true"
            />
        </center>
    )
}