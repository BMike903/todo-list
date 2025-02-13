export type Task = {
	userId: number,
	id: number,
	title: string,
	completed: boolean
};

export enum TasksActionTypes{
    FETCH_TASKS = "FETCH_TASKS",
    FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
    FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR",
    CHANGE_TASKS_STATUS = "CHANGE_TASKS_STATUS"
}

interface FetchTasksAction {
    type: TasksActionTypes.FETCH_TASKS,
}

interface FetchTasksSuccessAction {
    type: TasksActionTypes.FETCH_TASKS_SUCCESS,
    payload: Task[]
}

interface FetchTasksErrorAction {
    type: TasksActionTypes.FETCH_TASKS_ERROR,
    payload: string
}

interface ChangeTaskStatusAction {
    type: TasksActionTypes.CHANGE_TASKS_STATUS,
    payload: number
}

export type TasksAction = FetchTasksAction | FetchTasksSuccessAction | FetchTasksErrorAction | ChangeTaskStatusAction;

export type TasksState = {
    tasks: Task[] | [],
    loading: boolean,
    error: string | null;
};