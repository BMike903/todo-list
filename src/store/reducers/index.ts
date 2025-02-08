import { combineReducers } from "@reduxjs/toolkit";
import { TasksReducer } from "./tasksReducer";

export const rootReducer = combineReducers({
    tasks: TasksReducer
})