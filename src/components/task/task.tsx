import { useState } from "react";
import { useDispatch } from "react-redux";

import { Card, IconButton, Input, Stack } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank, Edit, Done, Undo } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { taskByIdSelector } from "../../store/selectors/tasksSelectors";
import { Task as TaskType, TaskTitleUpdate } from "../../types/tasks";
import { TaskActionTypes } from "../../types/tasks";

type TaskProps = {
    id: number
}

export function Task({id}: TaskProps) {
    const task = useTypedSelector(state => taskByIdSelector(id, state));
    const dispatch = useDispatch();

    const [title, setTitle] = useState(task.title);
    const [isEdited, setIsEdited] = useState(false);
    const toggleEdited = () => setIsEdited(!isEdited);

    const onEditClick = () => {
        toggleEdited();
    }
    const onUndoClick = () => {
        toggleEdited();
        setTitle(task.title);
    }
    const onDoneClick = async () => {
        if(title === task.title) return;
        toggleEdited();
        changeTaskTitle({id: task.id, newTitle: title});
    }

    const changeTaskTitle = async (taskUpdate: TaskTitleUpdate) => {
        try {
            dispatch({type: TaskActionTypes.CHANGE_TASK_TITLE, payload: {...taskUpdate}});

            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${taskUpdate.id}`,
                {
                    method: "PATCH",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({"title": taskUpdate.newTitle})
                } 
            );

            if(!response.ok){
                throw new Error(`Failed to update task title, status: ${response.status}`);
            }

            let data = await response.json();

            if(!("id" in data)) {
                data = {...data, id: 201}
            }
            
            dispatch({type: TaskActionTypes.CHANGE_TASK_TITLE_SUCESS, payload: data})
        }
        catch {
            setTitle(task.title);
            dispatch({type: TaskActionTypes.CHANGE_TASK_TITLE_ERROR, 
                payload: "Error occured while updating task title"
            })
        }
    }

    const changeTaskStatus = async (task: TaskType) => {
        try{
            dispatch({type: TaskActionTypes.CHANGE_TASK_STATUS, payload: task});
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${task.id}`,
                {
                    method: "PATCH",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({"completed": !task.completed})
                } 
            );

            if(!response.ok){
                throw new Error(`Failed to update task, status: ${response.status}`);
            }

            let data = await response.json();

            if(!("id" in data)) {
                data = {...data, id: 201}
            }

            dispatch({type: TaskActionTypes.CHANGE_TASK_STATUS_SUCCESS, payload: data})
        }
        catch{
            dispatch({type: TaskActionTypes.CHANGE_TASK_STATUS_ERROR, 
                payload: "Error occured while loading tasks"
            })
        }
    }
    
    return (
        <Card sx={{margin: "5px"}}>
            <Stack  direction="row" sx={{ justifyContent: "space-evenly" }}>
                <IconButton sx={{flex: "5", maxHeight: "40px"}} color="primary" 
                    onClick={() => changeTaskStatus(task)} 
                    disabled={isEdited || task.updatingPending}
                >
                    {task.completed ? <CheckBox/> : <CheckBoxOutlineBlank/>}
                </IconButton>

                <Input disableUnderline={!isEdited} multiline sx={{flex: "85"}} value={title}
                    onChange={e => setTitle(e.target.value)} 
                    disabled={!isEdited || task.updatingPending}
                    inputRef={input => input && input.focus()} 
                />

                <Stack direction="row" sx={{flex: "10", justifyContent: "right"}}>
                    {!isEdited ? 
                        <IconButton sx={{maxHeight: "40px"}} color="secondary"
                            onClick={() => onEditClick()}
                            disabled={task.updatingPending} 
                        >
                            <Edit/>
                        </IconButton>
                    :
                        <>
                        <IconButton sx={{maxHeight: "40px"}} color="secondary" onClick={onDoneClick}
                            disabled={task.updatingPending} 
                        >
                            <Done/>
                        </IconButton>
                        <IconButton sx={{maxHeight: "40px"}} color="secondary" onClick={onUndoClick} 
                            disabled={task.updatingPending} 
                        >
                            <Undo/>
                        </IconButton>
                        </>
                    }
                </Stack>
            </Stack>
        </Card>
    )
}