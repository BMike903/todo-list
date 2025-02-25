import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import * as UserActionCreators from "../store/action-creators/user";

export const useUserActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(UserActionCreators, dispatch);
}