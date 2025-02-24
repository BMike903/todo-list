export type Task = {
	userId: number,
	id: number,
	title: string,
	completed: boolean,
    updating: boolean,
    deletePending: boolean
};

export enum TaskActionTypes{
    CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
    CHANGE_TASK_STATUS_SUCCESS = "CHANGE_TASK_STATUS_SUCCESS",
    CHANGE_TASK_STATUS_ERROR = "CHANGE_TASK_STATUS_ERROR",
    DELETE_TASK = "DELETE_TASK",
    DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS",
    DELETE_TASK_ERROR = "DELETE_TASK_ERROR",
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

interface DeleteTaskAction {
    type: TaskActionTypes.DELETE_TASK
    payload: Task
}
interface DeleteTaskSuccessAction {
    type: TaskActionTypes.DELETE_TASK_SUCCESS
    payload: Task
}
interface DeleteTaskErrorAction {
    type: TaskActionTypes.DELETE_TASK_ERROR
    payload: string
}

export type TaskAction = ChangeTaskStatusAction | 
                            ChangeTaskStatusSuccessAction | 
                            ChangeTaskStatusErrorAction |
                            DeleteTaskAction |
                            DeleteTaskSuccessAction |
                            DeleteTaskErrorAction;


export type TasksState = {
    tasks: Task[] | [],
    loading: boolean,
    error: string | null,
    updatingTaskError: string | null,
    deletingTaskError: string | null,
};

export enum TasksActionTypes{
    FETCH_TASKS = "FETCH_TASKS",
    FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
    FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR",
    CLEAR_UPDATING_TASK_ERROR = "CLEAR_UPDATING_TASK_ERROR",
    CLEAR_DELETING_TASK_ERROR = "CLEAR_DELETING_TASK_ERROR"
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
interface ClearUpdatingTaskError {
    type: TasksActionTypes.CLEAR_UPDATING_TASK_ERROR,
}
interface ClearDeletingTaskError {
    type: TasksActionTypes.CLEAR_DELETING_TASK_ERROR,
}

export type TasksAction = FetchTasksAction | 
                            FetchTasksSuccessAction | 
                            FetchTasksErrorAction | 
                            ClearUpdatingTaskError |
                            ClearDeletingTaskError;
