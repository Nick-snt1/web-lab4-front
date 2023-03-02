import * as React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import { Button, Snackbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';


import { register } from "../../api/authSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                WebLab4
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export const SignUp = () => {
    const [errorName, setErrorName]         = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [isDisabled, setIsDisabled]       = React.useState(false);

    const [open, setOpen]                   = React.useState(false);
    const [errorMsg, setErrorMsg]           = React.useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsername = (e) => { 
        setErrorName(e.target.value.length < 3 || e.target.value.length > 30);
        setIsDisabled((e.target.value.length < 3 || e.target.value.length > 30) || errorPassword);
    }
    const handlePassword = (e) => { 
        setErrorPassword(e.target.value.length < 6);
        setIsDisabled(errorName || e.target.value.length < 6);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            await dispatch(register({ name: data.get('email'), password: data.get('password') })).unwrap();
            navigate("/");
        } catch (err) {
            if (err.code && err.code === 'ERR_BAD_REQUEST') {
                setErrorMsg('Username ' + data.get('email')+ ' has already taken');
            } else if (err.code) {
                setErrorMsg("Not valid username or password");
            } else {
                setErrorMsg('ServerError: unknown error');
            }
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpen(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'blueviolet' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" validate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Username"
                                    name="email"
                                    autoComplete="email"
                                    error={errorName}
                                    onChange={handleUsername}
                                    helperText={errorName ? "Username must be between 3 and 30 characters" : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    error={errorPassword}
                                    onChange={handlePassword}
                                    helperText={errorPassword ? "Password must be at least 6 characters long" : ""}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={isDisabled}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal:'center' }}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {errorMsg}
                    </Alert>
                </Snackbar>

            </Container>
        </ThemeProvider>
    );
}