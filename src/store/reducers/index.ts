import { combineReducers } from "@reduxjs/toolkit";
import { TasksReducer } from "./tasksReducer";

export const rootReducer = combineReducers({
    tasks: TasksReducer
})

export type RootState = ReturnType<typeof rootReducer>;
/* export type AppDispatch = typeof store.dispatch; */