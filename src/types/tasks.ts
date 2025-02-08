export type Task = {
	userId: number,
	id: number,
	title: string,
	completed: boolean
};

export enum TasksActionTypes{
    FETCH_TASKS = "FETCH_TASKS",
    FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
    FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR"
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

export type TasksAction = FetchTasksAction | FetchTasksSuccessAction | FetchTasksErrorAction;

export type TasksState = {
    tasks: Task[] | [],
    loading: boolean,
    error: string | null;
};