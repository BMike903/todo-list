import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import * as UserActionCreators from "../store/action-creators/user";
import * as TasksActionCreators from "../store/action-creators/tasks";

export const useUserActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(UserActionCreators, dispatch);
}

export const useTasksActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(TasksActionCreators, dispatch);
}