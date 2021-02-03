import React, { FunctionComponent } from "react";

import ReactDOM from "react-dom";

const App: FunctionComponent = () => {
    const env = process.env.NODE_ENV
    return(
        <div>
            <h1>{env} Mr Robot</h1>
        </div>
    )
}

ReactDOM.render(
    <App/>, document.getElementById('root')
)