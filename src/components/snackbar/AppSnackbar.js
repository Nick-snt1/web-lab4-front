import * as React from 'react';
import { useDispatch } from "react-redux";
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { setErrorAuth } from "../../api/authSlice";
import { setErrorApi } from "../../api/apiSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AppSnackbar = (props) => {
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        dispatch(setErrorAuth({ isError: false, errorMsg: "" }));
        dispatch(setErrorApi({ isError: false, errorMsg: "" }));
    }

    return (
    <Snackbar open={props.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {props.errorMsg}
        </Alert>
    </Snackbar>)
}