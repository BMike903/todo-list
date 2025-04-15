import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../reducers";

export const allTasksSelector = (state: RootState) => state.tasks.tasks;

export const completedTasksSelector = createSelector(
    [allTasksSelector],
    (tasks) => {
        return tasks.filter(task => task.completed);
    }
);

export const uncompletedTasksSelector = createSelector(
    [allTasksSelector],
    (tasks) => {
        return tasks.filter(task => !task.completed);
    }
);