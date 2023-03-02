import { useSelector, useDispatch } from "react-redux";
import { selectIsLogged, changeIsLogged } from "../../api/authSlice";

import { Navbar }    from "../navbar/Navbar"
import { Form }      from "./form/Form"
import { MainTable } from "./table/MainTable"
import { Graf }      from "./graf/Graf"
import { SignIn }    from "../auth/SignIn";



export const MainPage = () => {
    const dispatch  = useDispatch();
    dispatch(changeIsLogged(localStorage.getItem("WebLab4_Jwt") != null));
    const isLogged = useSelector(selectIsLogged);

    const logInOrMain = () => {
        return isLogged ? (<div><br/><Graf/><Form/><MainTable/></div>) : (<div><SignIn /></div>)
    }

    return (
        <div>
            <Navbar isLoggedIn={isLogged}/>
            {logInOrMain()}
        </div>
    );
}