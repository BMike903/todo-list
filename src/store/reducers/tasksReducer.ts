import { TaskAction, TasksAction, TasksActionTypes, TasksState, TaskActionTypes } from "../../types/tasks";

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
    updatingTaskError: null
}

export const TasksReducer = (state = initialState, action: TasksAction | TaskAction): TasksState => {
    switch(action.type){
        case TasksActionTypes.FETCH_TASKS:
            return {loading: true, error: null, tasks: [], updatingTaskError: null};
        case TasksActionTypes.FETCH_TASKS_SUCCESS:
            return {loading: false, error: null, tasks: action.payload, updatingTaskError: null};
        case TasksActionTypes.FETCH_TASKS_ERROR:
            return {loading: false, error: action.payload, tasks: [], updatingTaskError: null};
        case TasksActionTypes.CLEAR_UPDATING_TASK_ERROR:
            return {...state, updatingTaskError: null}
        case TaskActionTypes.CHANGE_TASK_STATUS: {
            let taskToUpdate = action.payload;
            taskToUpdate = {...taskToUpdate, updating: true}
            const newTasks = state.tasks.map((task) => {
                if(task.id !== taskToUpdate.id) { return task;}
                return taskToUpdate;
            });
           return {...state, tasks: newTasks};
        }
        case TaskActionTypes.CHANGE_TASK_STATUS_SUCCESS: {
            let newTask = action.payload;
            newTask = {...newTask, updating: false}
            const newTasks = state.tasks.map((task) => {
                if(task.id !== newTask.id) { return task;}
                return newTask;
            });
            return {...state, tasks: newTasks}
        }
        case TaskActionTypes.CHANGE_TASK_STATUS_ERROR: {
            const newTasks = state.tasks.map((task) => {
                return {...task, updating: false}
            })
            return {...state, tasks: newTasks, updatingTaskError: action.payload};
        }
        default:
            return state;
    }
}