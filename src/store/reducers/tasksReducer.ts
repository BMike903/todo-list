import { TaskAction, TasksAction, TasksActionTypes, TasksState, TaskActionTypes } from "../../types/tasks";

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null,
    addingTask: false,
    addingTaskError: null,
    updatingTaskError: null,
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
        case TasksActionTypes.CLEAR_UPDATING_TASK_TITLE_ERROR:
            return {...state, updatingTaskTitleError: null}
        case TasksActionTypes.ADD_TASK:
            return {...state, addingTask: true};
        case TasksActionTypes.ADD_TASK_SUCCESS:
            return {...state, addingTask: false, tasks: [...state.tasks, action.payload]}
        case TasksActionTypes.ADD_TASK_ERROR:
            return {...state, addingTask: false, addingTaskError: action.payload}
        case TasksActionTypes.CLEAR_ADD_TASK_ERROR:
            return {...state, addingTaskError: null}
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
                return {...task, updating: false, updatingPending: false}
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