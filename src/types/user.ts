export type User = {
    id: number | null,
    name: string,
    username: string
    email: string
}

export enum UserActionTypes {
    FETCH_USER = "FETCH_USER",
    FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
    FETCH_USER_ERROR = "FETCH_USER_ERROR"
}

interface FetchUserAction {
    type: UserActionTypes.FETCH_USER,
}

interface FetchUserSuccessAction {
    type: UserActionTypes.FETCH_USER_SUCCESS,
    payload: User
}

interface FetchUserErrorAction {
    type: UserActionTypes.FETCH_USER_ERROR,
    payload: string
}

export type UserAction = FetchUserAction | FetchUserSuccessAction | FetchUserErrorAction;

export type UserState = {
    user: User| null,
    loading: boolean,
    error: string | null;
};