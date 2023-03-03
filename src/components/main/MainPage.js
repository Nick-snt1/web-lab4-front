import { useSelector } from "react-redux";

import { Navbar }    from "../navbar/Navbar"
import { Form }      from "./form/Form"
import { MainTable } from "./table/MainTable"
import { Graf }      from "./graf/Graf"

import { AppSnackbar } from '../snackbar/AppSnackbar';
import { selectErrorMsg, selectIsError } from "../../api/apiSlice";


export const MainPage = () => {
    const open     = useSelector(selectIsError);
    const errorMsg = useSelector(selectErrorMsg);

    return (
        <div>
            <Navbar isLoggedIn={true}/>
            <br />
            <Graf />
            <Form />
            <MainTable />
            <AppSnackbar open={open} errorMsg={errorMsg} />
        </div>
    );
}