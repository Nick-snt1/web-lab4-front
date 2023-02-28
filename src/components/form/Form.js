import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { changeR } from "../../api/apiSlice";

import InputLabel  from "@mui/material/InputLabel";
import MenuItem    from "@mui/material/MenuItem";
import Select      from "@mui/material/Select";
import TextField   from "@mui/material/TextField";
import Button      from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";

export const Form = () => {
    const [x, setX] = useState("");
    const [y, setY] = useState("");
    const [r, setR] = useState("");

    const dispatch = useDispatch();

    const handleChangeX = (event) => setX(event.target.value);
    const handleChangeY = (event) => setY(event.target.value);
    const handleChangeR = (event) => {
        setR(event.target.value);
        dispatch(changeR(event.target.value));
    };

    return (
        <section>
            <form>
                <br />
                <FormControl fullWidth>
                    <InputLabel id="x-label">X</InputLabel>
                    <Select
                        id="x-select"
                        value={x}
                        name="x-select"
                        label="X"
                        labelId="x-label"
                        onChange={handleChangeX}
                    >
                        <MenuItem value={-3}>-3</MenuItem>
                        <MenuItem value={-2}>-2</MenuItem>
                        <MenuItem value={-1}>-1</MenuItem>
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth>
                    <TextField
                        id="outlined-basic"
                        label="Y"
                        variant="outlined"
                        defaultValue="0"
                        value={y}
                        onChange={handleChangeY}
                    />
                </FormControl>
                <br />
                <br />
                <FormControl fullWidth>
                    <InputLabel id="r-label">R</InputLabel>
                    <Select
                        id="r-select"
                        value={r}
                        name="r-select"
                        label="R"
                        labelId="r-label"
                        onChange={handleChangeR}
                    >
                        <MenuItem value={-3}>-3</MenuItem>
                        <MenuItem value={-2}>-2</MenuItem>
                        <MenuItem value={-1}>-1</MenuItem>
                        <MenuItem value={0}>0</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>
                <br />
                <br />
                <ButtonGroup
                    variant="contained"
                    aria-label="outlined primary button group"
                >
                    <Button>Submit</Button>
                    <Button>Reset</Button>
                </ButtonGroup>
            </form>
            <br />
        </section>
    );
};
