import { useSelector } from "react-redux";
import { SignUp } from "./Register";
import { Navbar } from "../navbar/Navbar";
import { AppSnackbar } from '../snackbar/AppSnackbar';
import { selectErrorMsg, selectIsError } from "../../api/authSlice";


export const RegisterPage = () => {
    const open     = useSelector(selectIsError);
    const errorMsg = useSelector(selectErrorMsg);

    return (
        <div>
            <Navbar />
            <SignUp />
            <AppSnackbar open={open} errorMsg={errorMsg} />
        </div>
    );
}