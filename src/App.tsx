import React from "react";
import { Button, TextField } from "@material-ui/core";
import "./App.css";

import Base from "./examples/Base.txt";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App-content App">
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
  );
};

export default App;
