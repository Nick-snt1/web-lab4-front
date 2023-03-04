import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectR, changeR, postPoint, deletePoints } from "../../../api/apiSlice";

import InputLabel  from "@mui/material/InputLabel";
import MenuItem    from "@mui/material/MenuItem";
import Select      from "@mui/material/Select";
import TextField   from "@mui/material/TextField";
import { Button }  from '@mui/material';
import ButtonGroup from "@mui/material/ButtonGroup";
import FormControl from "@mui/material/FormControl";
import "./Form.css"


export const Form = () => {
    const [x, setX] = useState("");
    const [y, setY] = useState("");

    const [errorX,     setErrorX]     = useState(false);
    const [errorY,     setErrorY]     = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    const r = useSelector(selectR);

    const dispatch = useDispatch();

    const handleChangeX = (event) => {
        setErrorX(event.target.value === null || event.target.value === "");
        setIsDisabled(event.target.value === null || event.target.value === "" || errorY);
        setX(event.target.value);
    }
    const handleChangeY = (event) => {
        const isValid = event.target.value === null || event.target.value === "" || isNaN(event.target.value) || event.target.value < -5 || event.target.value > 5
        setErrorY(isValid);
        setIsDisabled(isValid || errorX);
        setY(event.target.value);
    }

    const handleChangeR = (event) => dispatch(changeR(event.target.value));

    const handleSubmit = async () => {
        try {
            await dispatch(postPoint({x: x, y: y, r: r})).unwrap();
        } catch (err) {
            console.error('Failed to save the point', err);
        } 
    };
    const handleReset = async () => { 
        try {
            await dispatch(deletePoints()).unwrap();
            setX(""); setY(""); dispatch(changeR(1));
            setErrorX(false); setErrorY(false);
        } catch (err) {
            console.error('Failed to delete points', err);
        }
    };


    return (
        <section >
            <form className="form">
                <FormControl fullWidth>
                    <InputLabel id="x-label">X</InputLabel>
                    <Select
                        error={errorX}
                        required
                        id="x-select"
                        value={x}
                        name="x-select"
                        label="X"
                        labelId="x-label"
                        helperText={errorX ? "X must not be null" : ""}
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
                        value={y}
                        error={errorY}
                        helperText={errorY ? "Y must be a number between 5 and -5" : ""}
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
                    <Button onClick={handleSubmit} disabled={isDisabled}>Submit</Button>
                    <Button onClick={handleReset}>Reset</Button>
                </ButtonGroup>
            
            </form>
            
        </section>
    );
};
