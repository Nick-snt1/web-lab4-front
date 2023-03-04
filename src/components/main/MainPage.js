import { useSelector } from "react-redux";

import { Navbar }    from "../navbar/Navbar"
import { Form }      from "./form/Form"
import { MainTable } from "./table/MainTable"
import { Graf }      from "./graf/Graf"

import { AppSnackbar } from '../snackbar/AppSnackbar';
import { selectErrorMsg, selectIsError } from "../../api/apiSlice";
import "./MainPage.css";


export const MainPage = () => {
    const open     = useSelector(selectIsError);
    const errorMsg = useSelector(selectErrorMsg);

    return (
        <div className="mainPage">
            <Navbar isLoggedIn={true}/>
            <div className="inLine">
                <div className="graf-cont"><Graf /></div> <div className="form-cont"><Form /></div>
            </div>
            <MainTable/>
            <AppSnackbar open={open} errorMsg={errorMsg} />
        </div>
    );
}