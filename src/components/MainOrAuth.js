import { useSelector, useDispatch } from "react-redux";
import { selectIsLogged, changeIsLogged } from "../api/authSlice";

import { SignInPage } from "./auth/SignInPage";
import { MainPage }   from "./main/MainPage";



export const MainOrAuth = () => {
    const dispatch = useDispatch();
    dispatch(changeIsLogged(localStorage.getItem("WebLab4_Jwt") != null));
    const isLogged = useSelector(selectIsLogged);

    const logInOrMain = () => {
        return isLogged ? <MainPage /> : <SignInPage />;
    }

    return (
        <div>
            {logInOrMain()}
        </div>
    );
}