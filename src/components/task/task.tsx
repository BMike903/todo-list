import { useState, useRef } from "react";

import { Card, IconButton, Input, Stack } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank, Edit, Done, Undo } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { taskByIdSelector } from "../../store/selectors/tasksSelectors";
import { Task as TaskType, TaskTitleUpdate } from "../../types/tasks";

type TaskProps = {
    id: number,
    changeTaskStatus: (task: TaskType) => void,
    changeTaskTitle: (taskUpdate: TaskTitleUpdate) => void
}

export function Task({id, changeTaskStatus, changeTaskTitle}: TaskProps) {
    const task = useTypedSelector(state => taskByIdSelector(id, state));

    const [title, setTitle] = useState(task.title);
    const [isEdited, setIsEdited] = useState(false);
    const toggleEdited = () => setIsEdited(!isEdited);
    const ref = useRef<HTMLInputElement>();

    const onEditClick = async () => {
        await toggleEdited();
        ref.current?.focus();
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
    
    return (
        <Card sx={{margin: "5px"}}>
            <Stack  direction="row" sx={{ justifyContent: "space-evenly" }}>
                <IconButton sx={{flex: "5", maxHeight: "40px"}} color="primary" 
                    onClick={() => changeTaskStatus(task)} disabled={isEdited}
                >
                    {task.completed ? <CheckBoxOutlineBlank/> : <CheckBox/>}
                </IconButton>

                <Input disableUnderline multiline sx={{flex: "85"}} value={title}
                    onChange={e => setTitle(e.target.value)} 
                    disabled={!isEdited || task.updatingPending || task.deletingPending}
                    inputRef={ref} 
                />

                <Stack direction="row" sx={{flex: "10"}}>
                    {!isEdited ? 
                        <IconButton sx={{maxHeight: "40px"}} color="secondary"
                            onClick={() => onEditClick()}
                            disabled={task.updatingPending || task.deletingPending} 
                        >
                            <Edit/>
                        </IconButton>
                    :
                        <>
                        <IconButton sx={{maxHeight: "40px"}} color="secondary" onClick={onDoneClick}
                            disabled={task.updatingPending || task.deletingPending} 
                        >
                            <Done/>
                        </IconButton>
                        <IconButton sx={{maxHeight: "40px"}} color="secondary" onClick={onUndoClick} 
                            disabled={task.updatingPending || task.deletingPending} 
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