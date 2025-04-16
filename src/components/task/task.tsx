import { Card, IconButton, Input, Stack } from "@mui/material";
import { CheckBox, CheckBoxOutlineBlank, Delete, Edit, Done, Undo } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { taskByIdSelector } from "../../store/selectors/tasksSelectors";

type TaskProps = {
    id: number,
    changeTaskStatus: Function
}

export function Task({id, changeTaskStatus}: TaskProps) {
    const task = useTypedSelector(state => taskByIdSelector(id, state));
    
    return (
        <Card sx={{margin: "5px"}}>
            <Stack  direction="row" sx={{ justifyContent: "space-evenly" }}>
                <IconButton sx={{flex: "5", maxHeight: "40px"}} color="primary" onClick={() => changeTaskStatus(task)}>
                    {task.completed ? <CheckBoxOutlineBlank/> : <CheckBox/>}
                </IconButton>

                <Input disableUnderline multiline sx={{flex: "85"}} value={task.title}>
                </Input>

                <Stack direction="row" sx={{flex: "10"}}>
                    <IconButton sx={{maxHeight: "40px"}} color="secondary">
                        <Edit/>
                    </IconButton>
                    <IconButton sx={{maxHeight: "40px"}} color="secondary">
                        <Delete/>
                    </IconButton>
                </Stack>
            </Stack>
        </Card>
    )
}