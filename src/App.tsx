import React, { useState } from "react"
import {
    Button,
    TextField,
    ThemeProvider,
    createMuiTheme,
} from "@material-ui/core"
import "./App.css"
import { produce } from "immer"

// eslint-disable-next-line import/no-webpack-loader-syntax
import Base from "!raw-loader!./examples/Base.txt"
// eslint-disable-next-line import/no-webpack-loader-syntax
import Subtract from "!raw-loader!./examples/Subtract.txt"

const CONSTANT_ROWS = 20

const toObject = produce((txtFile: string) =>
    txtFile
        .split("\n")
        .map((line: string) => line.split(" "))
        .map(([count, ...name]: string[]) => [count, name.join(" ")])
        .filter((line: string[]) => parseInt(line[0], 10))
        .reduce(
            (prev: {}, [count, name]: string[]) => ({
                ...prev,
                [name]: parseInt(count, 10),
            }),
            {},
        ),
)

const App: React.FC = () => {
    const [base, setBase] = useState(Base)
    const [subtract, setSubstract] = useState(Subtract)
    const [result, setResult] = useState({})

    const getDiff = () => {
        const baseObj = toObject(base)
        const subtractObj = toObject(subtract)

        setResult(
            produce(() => {
                const obj = Object.entries(baseObj).reduce(
                    (prev, [key, value]: [string, number]) => ({
                        ...prev,
                        [key]: value,
                    }),
                    {},
                )
                Object.entries(subtractObj).forEach(
                    ([key, value]: [string, number]) => {
                        if (obj[key]) {
                            obj[key] = obj[key] - value
                        }
                    },
                )
                return obj
            }),
        )
    }
    return (
        <ThemeProvider theme={createMuiTheme()}>
            <div>
                <div className="App">
                    <TextField
                        label="To Buy"
                        multiline
                        rows={CONSTANT_ROWS}
                        defaultValue={base}
                        onChange={e => setBase(produce(() => e.target.value))}
                        variant="outlined"
                        style={{ width: "100%" }}
                    ></TextField>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={getDiff}
                        style={{ margin: "20px" }}
                    >
                        Calculate Buylist
                    </Button>
                    <TextField
                        label="Already Own"
                        multiline
                        rows={CONSTANT_ROWS}
                        onChange={e =>
                            setSubstract(produce(() => e.target.value))
                        }
                        defaultValue={subtract}
                        variant="outlined"
                        style={{ width: "100%" }}
                    ></TextField>
                </div>
                {Object.entries(result).length > 0 && (
                    <div className="App column">
                        {Object.entries(result).map(([key, value]) => (
                            <div
                                key={key}
                                className={value > 0 ? "green" : "red"}
                            >
                                {value} {key}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ThemeProvider>
    )
}

export default App
