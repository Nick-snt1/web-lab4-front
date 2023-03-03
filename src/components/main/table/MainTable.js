import React, {useEffect, useRef }    from "react";
import { useSelector, useDispatch }   from "react-redux";
import { selectAllPoints, getPoints } from "../../../api/apiSlice";
import { styled }     from '@mui/material/styles';
import Table          from '@mui/material/Table';
import TableBody      from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead      from '@mui/material/TableHead';
import TableRow       from '@mui/material/TableRow';
import Paper          from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "blueviolet",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#cb9ff4",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const MainTable = () => {
    const dispatch = useDispatch()
    
    const points  = useSelector(selectAllPoints);
    const mounted = useRef(false);

    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            dispatch(getPoints());
        }   
    }, [dispatch]);

    return (
        <section>
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>X</StyledTableCell>
                        <StyledTableCell align="right">Y</StyledTableCell>
                        <StyledTableCell align="right">R</StyledTableCell>
                        <StyledTableCell align="right">Hit Result</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        {points.map((row) => (
                            <StyledTableRow key={row.id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.x}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.y}</StyledTableCell>
                                <StyledTableCell align="right">{row.r}</StyledTableCell>
                                <StyledTableCell align="right">{row.hit}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
        </section>
    );
}