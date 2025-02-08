import { Dispatch } from "@reduxjs/toolkit"
import { TasksAction, TasksActionTypes } from "../../types/tasks"

export const fetchTasks = (): any => {
    return async (dispatch: Dispatch<TasksAction>) => {
        try{
            dispatch({type: TasksActionTypes.FETCH_TASKS});
            const response = await fetch("https://jsonplaceholder.typicode.com/users/4/todos");

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