export type Task = {
	userId: number,
	id: number,
	title: string,
	completed: boolean,
    updating: boolean
};

export enum TaskActionTypes{
    CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
    CHANGE_TASK_STATUS_SUCCESS = "CHANGE_TASK_STATUS_SUCCESS",
    CHANGE_TASK_STATUS_ERROR = "CHANGE_TASK_STATUS_ERROR",
}

interface ChangeTaskStatusAction {
    type: TaskActionTypes.CHANGE_TASK_STATUS,
    payload: Task
}
interface ChangeTaskStatusSuccessAction {
    type: TaskActionTypes.CHANGE_TASK_STATUS_SUCCESS,
    payload: Task
}
interface ChangeTaskStatusErrorAction {
    type: TaskActionTypes.CHANGE_TASK_STATUS_ERROR,
    payload: string
}

export type TaskAction = ChangeTaskStatusAction | 
                            ChangeTaskStatusSuccessAction | 
                            ChangeTaskStatusErrorAction;


export type TasksState = {
    tasks: Task[] | [],
    loading: boolean,
    error: string | null,
    updatingTaskError: string | null
};

export enum TasksActionTypes{
    FETCH_TASKS = "FETCH_TASKS",
    FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
    FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR",
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
export type TasksAction = FetchTasksAction | 
                            FetchTasksSuccessAction | 
                            FetchTasksErrorAction;
