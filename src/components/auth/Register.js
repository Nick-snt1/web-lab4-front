import * as React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { 
    Button,    
    CssBaseline, 
    Avatar,
    TextField, 
    Link,       
    Grid, 
    Box,       
    Typography, 
    Container,
} from '@mui/material';
import { register } from "../../api/authSlice";


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
    const [errorName,     setErrorName]     = React.useState(false);
    const [errorPassword, setErrorPassword] = React.useState(false);
    const [isDisabled,    setIsDisabled]    = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsername = (e) => { 
        const isValid = e.target.value.length < 3 || e.target.value.length > 30;
        setErrorName(isValid);
        setIsDisabled(isValid || errorPassword);
    }
    const handlePassword = (e) => { 
        const isValid = e.target.value.length < 6;
        setErrorPassword(isValid);
        setIsDisabled(errorName || isValid);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            await dispatch(register({ name: data.get('email'), password: data.get('password') })).unwrap();
            navigate("/");
        } catch (err) { console.error("Failed to register: ", err); }
    };

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
            </Container>
        </ThemeProvider>
    );
}