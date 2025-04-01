import { TaskAction, TasksAction, TasksActionTypes, TasksState, TaskActionTypes } from "../../types/tasks";

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
    updatingTaskError: null,
    deletingTaskError: null,
    updatingTaskTitleError: null
}

export const TasksReducer = (state = initialState, action: TasksAction | TaskAction): TasksState => {
    switch(action.type){
        case TasksActionTypes.FETCH_TASKS:
            return {...state, loading: true};
        case TasksActionTypes.FETCH_TASKS_SUCCESS:
            return {...state, loading: false, error: null, tasks: action.payload};
        case TasksActionTypes.FETCH_TASKS_ERROR:
            return {...state, loading: false, error: action.payload};
        case TasksActionTypes.CLEAR_UPDATING_TASK_ERROR:
            return {...state, updatingTaskError: null}
        case TasksActionTypes.CLEAR_DELETING_TASK_ERROR:
            return {...state, deletingTaskError: null}
        case TasksActionTypes.CLEAR_UPDATING_TASK_TITLE_ERROR:
            return {...state, updatingTaskTitleError: null}
        case TaskActionTypes.CHANGE_TASK_STATUS: {
            let taskToUpdate = action.payload;
            taskToUpdate = {...taskToUpdate, updatingPending: true}
            const newTasks = state.tasks.map((task) => {
                if(task.id !== taskToUpdate.id) { return task;}
                return taskToUpdate;
            });
           return {...state, tasks: newTasks};
        }
        case TaskActionTypes.CHANGE_TASK_STATUS_SUCCESS: {
            const updatedTask = action.payload;
            const oldTask = state.tasks.filter(task => task.id === updatedTask.id)[0];
            const newTask = {...oldTask, updatingPending: false, completed: updatedTask.completed};
            const newTasks = state.tasks.map((task) => {
                if(task.id !== oldTask.id) { return task;}
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
        case TaskActionTypes.DELETE_TASK: {
            let pendingTask = action.payload;
            pendingTask = {...pendingTask, deletingPending: true}
            const newTasks = state.tasks.map((task) => {
                if(task.id !== pendingTask.id) { return task;}
                return pendingTask;
            });
            return {...state, tasks: newTasks}
        }
        case TaskActionTypes.DELETE_TASK_SUCCESS: {
            const deletedTask = action.payload;
            const newTasks = state.tasks.filter((task) => task.id !== deletedTask.id)
            return {...state, tasks: newTasks}
        }
        case TaskActionTypes.DELETE_TASK_ERROR: {
            const newTasks = state.tasks.map((task) => {
                return {...task, updatingPending: false, deletingPending: false}
            })
            return {...state, tasks: newTasks, updatingTaskError: action.payload};
        }
        case TaskActionTypes.CHANGE_TASK_TITLE: {
            const taskUpdate = action.payload;
            let taskToUpdate = state.tasks.filter(task => task.id === taskUpdate.id)[0];
            taskToUpdate = {...taskToUpdate, updatingPending: true}
            const newTasks = state.tasks.map((task) => {
                if(task.id !== taskToUpdate.id) { return task;}
                return taskToUpdate;
            });
           return {...state, tasks: newTasks};
        }
        case TaskActionTypes.CHANGE_TASK_TITLE_SUCESS: {
            const updatedTask = action.payload;
            const oldTask = state.tasks.filter(task => task.id === updatedTask.id)[0];
            const newTask = {...oldTask, updatingPending: false, title: updatedTask.title};
            const newTasks = state.tasks.map((task) => {
                if(task.id !== oldTask.id) { return task;}
                return newTask;
            });
            return {...state, tasks: newTasks}
        }
        case TaskActionTypes.CHANGE_TASK_TITLE_ERROR: {
            const newTasks = state.tasks.map((task) => {
                return {...task, updatingPending: false}
            })
            return {...state, tasks: newTasks, updatingTaskError: action.payload};
        }
        default:
            return state;
    }
}