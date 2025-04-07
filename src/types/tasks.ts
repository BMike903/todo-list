export type Task = {
	userId: number,
	id: number,
	title: string,
	completed: boolean,
    updatingPending: boolean,
    deletingPending: boolean
};

export type TaskTitleUpdate = {
    id: number,
    newTitle: string
};

export enum TaskActionTypes{
    CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
    CHANGE_TASK_STATUS_SUCCESS = "CHANGE_TASK_STATUS_SUCCESS",
    CHANGE_TASK_STATUS_ERROR = "CHANGE_TASK_STATUS_ERROR",
    DELETE_TASK = "DELETE_TASK",
    DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS",
    DELETE_TASK_ERROR = "DELETE_TASK_ERROR",
    CHANGE_TASK_TITLE = "CHANGE_TASK_TITLE",
    CHANGE_TASK_TITLE_SUCESS = "CHANGE_TASK_TITLE_SUCESS",
    CHANGE_TASK_TITLE_ERROR = "CHANGE_TASK_TITLE_ERROR",

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

interface ChangeTaskTitleAction {
    type: TaskActionTypes.CHANGE_TASK_TITLE,
    payload: TaskTitleUpdate
}
interface ChangeTaskTitleSuccessAction {
    type: TaskActionTypes.CHANGE_TASK_TITLE_SUCESS,
    payload: Task
}
interface ChangeTaskTitleErrorAction {
    type: TaskActionTypes.CHANGE_TASK_TITLE_ERROR,
    payload: string
}


export type TaskAction = ChangeTaskStatusAction |
                            ChangeTaskStatusSuccessAction |
                            ChangeTaskStatusErrorAction |
                            DeleteTaskAction |
                            DeleteTaskSuccessAction |
                            DeleteTaskErrorAction |
                            ChangeTaskTitleAction |
                            ChangeTaskTitleSuccessAction |
                            ChangeTaskTitleErrorAction;


export type TasksState = {
    tasks: Task[] | [],
    loading: boolean,
    error: string | null,
    addingTask: boolean,
    addingTaskError: string | null,
    updatingTaskError: string | null,
    updatingTaskTitleError: string | null,
    deletingTaskError: string | null,
};

export enum TasksActionTypes{
    FETCH_TASKS = "FETCH_TASKS",
    FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS",
    FETCH_TASKS_ERROR = "FETCH_TASKS_ERROR",
    CLEAR_UPDATING_TASK_ERROR = "CLEAR_UPDATING_TASK_ERROR",
    CLEAR_DELETING_TASK_ERROR = "CLEAR_DELETING_TASK_ERROR",
    CLEAR_UPDATING_TASK_TITLE_ERROR = "CLEAR_UPDATING_TASK_TITLE_ERROR",
    ADD_TASK = "ADD_TASK",
    ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS",
    ADD_TASK_ERROR = "ADD_TASK_ERROR",
    CLEAR_ADD_TASK_ERROR = "CLEAR_ADD_TASK_ERROR",
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
interface ClearUpdatingTaskTitleError {
    type: TasksActionTypes.CLEAR_UPDATING_TASK_TITLE_ERROR,
}

interface AddTaskAction {
    type: TasksActionTypes.ADD_TASK,
}
interface AddTaskSuccessAction {
    type: TasksActionTypes.ADD_TASK_SUCCESS,
    payload: Task
}
interface AddTaskErrorActon {
    type: TasksActionTypes.ADD_TASK_ERROR,
    payload: string,
}
interface ClearAddTaskErrorAction {
    type: TasksActionTypes.CLEAR_ADD_TASK_ERROR,
}

export type TasksAction = FetchTasksAction |
                            FetchTasksSuccessAction |
                            FetchTasksErrorAction |
                            ClearUpdatingTaskError |
                            ClearDeletingTaskError |
                            ClearUpdatingTaskTitleError |
                            AddTaskAction |
                            AddTaskSuccessAction |
                            AddTaskErrorActon |
                            ClearAddTaskErrorAction;
