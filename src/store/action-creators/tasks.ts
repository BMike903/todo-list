import { Dispatch } from "@reduxjs/toolkit"
import { TasksAction, TasksActionTypes, TaskActionTypes, TaskAction, Task } from "../../types/tasks"

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

export const changeTaskStatus = (task: Task): any => {
    return async (dispatch: Dispatch<TaskAction>) => {
        try{
            dispatch({type: TaskActionTypes.CHANGE_TASK_STATUS, payload: task});
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`,
                {
                    method: "PATCH",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({"completed": !task.completed})
                } 
            );

            if(!response.ok){
                throw new Error(`Failed to update task, status: ${response.status}`);
            }

            const data = await response.json();
            dispatch({type: TaskActionTypes.CHANGE_TASK_STATUS_SUCCESS, payload: data})
        }
        catch{
            dispatch({type: TaskActionTypes.CHANGE_TASK_STATUS_ERROR, 
                payload: "Error occured while loading tasks"
            })
        }
    }
}