import { useSelector } from "react-redux";
import { SignIn } from "./SignIn";
import { Navbar } from "../navbar/Navbar";
import { AppSnackbar } from '../snackbar/AppSnackbar';
import { selectErrorMsg, selectIsError } from "../../api/authSlice";


export const SignInPage = () => {
    const open     = useSelector(selectIsError);
    const errorMsg = useSelector(selectErrorMsg);

    return (
        <div>
            <Navbar />
            <SignIn />
            <AppSnackbar open={open} errorMsg={errorMsg} />
        </div>
    );
}