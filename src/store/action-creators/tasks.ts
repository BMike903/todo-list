import { Dispatch } from "@reduxjs/toolkit"
import { TasksAction, TasksActionTypes, Task } from "../../types/tasks"

export const fetchTasks = (id: number): any => {
    return async (dispatch: Dispatch<TasksAction>) => {
        try{
            dispatch({type: TasksActionTypes.FETCH_TASKS});
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/todos`);

            if(!response.ok){
                throw new Error(`Failed to fetch, status: ${response.status}`);
            }

            const data = await response.json();
            dispatch({type: TasksActionTypes.FETCH_TASKS_SUCCESS, payload: data})
        }catch(e){
            console.log(e);
            dispatch({type: TasksActionTypes.FETCH_TASKS_ERROR, 
                payload: "Error occured while loading tasks"
            })
        }
    }
}

export const clearUpdateTaskStatusError = (): any => {
    return {type: TasksActionTypes.CLEAR_UPDATING_TASK_ERROR};
}


export const clearUpdateTaskTitleError = () => {
    return {type: TasksActionTypes.CLEAR_UPDATING_TASK_TITLE_ERROR};
}

export const addTaskActon = () => {return {type: TasksActionTypes.ADD_TASK}};
export const addTaskSuccessActon = (data: Task) => {return {type: TasksActionTypes.ADD_TASK_SUCCESS, payload: data}};
export const addTaskErrorAction = (error: string) => {return {type: TasksActionTypes.ADD_TASK_ERROR, payload: error}};
export const clearAddTaskErrorActon = () => {return {type: TasksActionTypes.CLEAR_ADD_TASK_ERROR}}