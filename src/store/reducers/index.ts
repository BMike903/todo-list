import { combineReducers } from "@reduxjs/toolkit";

import { TasksReducer } from "./tasksReducer";
import { UserReducer } from "./userReducer";

export const rootReducer = combineReducers({
    user: UserReducer,
    tasks: TasksReducer
})

export type RootState = ReturnType<typeof rootReducer>;