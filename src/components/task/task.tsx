import { useState } from "react";

import { Card, IconButton, Input, Stack } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank, Edit, Done, Undo } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { taskByIdSelector } from "../../store/selectors/tasksSelectors";
import { Task as TaskType } from "../../types/tasks";

type TaskProps = {
    id: number,
    changeTaskStatus: (task: TaskType) => void,
}

export function Task({id, changeTaskStatus}: TaskProps) {
    const task = useTypedSelector(state => taskByIdSelector(id, state));

    const [title, setTitle] = useState(task.title);
    const [isEdited, setIsEdited] = useState(false);
    const toggleEdited = () => setIsEdited(!isEdited);

    const onUndoClick = () => {
        toggleEdited();
        setTitle(task.title);
    }
    
    return (
        <Card sx={{margin: "5px"}}>
            <Stack  direction="row" sx={{ justifyContent: "space-evenly" }}>
                <IconButton sx={{flex: "5", maxHeight: "40px"}} color="primary" onClick={() => changeTaskStatus(task)}>
                    {task.completed ? <CheckBoxOutlineBlank/> : <CheckBox/>}
                </IconButton>

                <Input disableUnderline multiline sx={{flex: "85"}} value={title}
                    onChange={e => setTitle(e.target.value)} disabled={!isEdited} />

                <Stack direction="row" sx={{flex: "10"}}>
                    {!isEdited ? 
                        <IconButton sx={{maxHeight: "40px"}} color="secondary"
                            onClick={toggleEdited}
                        >
                            <Edit/>
                        </IconButton>
                    :
                        <>
                        <IconButton sx={{maxHeight: "40px"}} color="secondary">
                            <Done/>
                        </IconButton>
                        <IconButton sx={{maxHeight: "40px"}} color="secondary"
                            onClick={onUndoClick}
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