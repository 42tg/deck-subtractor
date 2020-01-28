import React from "react"
import logo from "./logo.svg"
import "./App.css"
import { Button, TextField } from "@material-ui/core"

const App: React.FC = () => {
    return (
        <div className="App">
            <div>
                <TextField
                    label="Base"
                    multiline
                    rows="10"
                    defaultValue=""
                    variant="outlined"
                ></TextField>
                <Button>Sutract</Button>
                <TextField
                    label="Subtract"
                    multiline
                    rows="10"
                    defaultValue=""
                    variant="outlined"
                ></TextField>
            </div>
        </div>
    )
}

export default App
