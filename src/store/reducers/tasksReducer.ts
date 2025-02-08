import { TasksAction, TasksActionTypes, TasksState } from "../../types/tasks";

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null
}

export const TasksReducer = (state = initialState, action: TasksAction): TasksState => {
    switch(action.type){
        case TasksActionTypes.FETCH_TASKS:
            return {loading: true, error: null, tasks: []};
        case TasksActionTypes.FETCH_TASKS_SUCCESS:
            return {loading: false, error: null, tasks: action.payload};
        case TasksActionTypes.FETCH_TASKS_ERROR:
            return {loading: false, error: action.payload, tasks: []};
        default:
            return state;
    }
}