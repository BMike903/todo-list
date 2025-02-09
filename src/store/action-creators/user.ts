import { Dispatch } from "@reduxjs/toolkit";
import { UserAction, UserActionTypes } from "../../types/user";

export const fetchUser = (id: number): any =>{
    return async (dispatch: Dispatch<UserAction>) => {
        try{
            dispatch({type: UserActionTypes.FETCH_USER});
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

            if(!response.ok){
                throw new Error(`Failed to fetch, status: ${response.status}`);
            }

            const data = await response.json();
            dispatch({type: UserActionTypes.FETCH_USER_SUCCESS, payload: data})
        }catch{
            dispatch({type: UserActionTypes.FETCH_USER_ERROR, 
                payload: "Error occured while loading user"})
        }
    }
}