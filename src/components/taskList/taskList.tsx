import { useEffect, useState } from "react";

import { Button, Typography, Stack, Box, Snackbar, Grid2, Collapse, Skeleton, IconButton, Card, Input } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { CheckBox, CheckBoxOutlineBlank, Delete, Edit, Done, Undo } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTasksActions } from "../../hooks/useActions";


function TaskList(){
    const {user, loading: userLoading, error: userError} = useTypedSelector(state => state.user);
    const {tasks, loading: tasksLoading, error: tasksError, updatingTaskError, deletingTaskError} = useTypedSelector(state => state.tasks);
    const {fetchTasks, changeTaskStatus, clearUpdateTaskStatusError, deleteTask, clearDeletingTaskError, changeTaskTitle} = useTasksActions();

    const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
    const [editedTaskTitle, setEditedTaskTitle] = useState("");
    const isTaskEdited = (taskId: number) => editedTaskId !== taskId;

    const onEditClick = (id: number, title: string) => {
        setEditedTaskId(id);
        setEditedTaskTitle(title);
    }

    const handleUndoEditTask = () => {
        setEditedTaskId(null);
        setEditedTaskTitle("");
    }

    const handleEditTask = () => {
        console.log("ID - ",editedTaskId, " new title - ", editedTaskTitle);
        changeTaskTitle({id: editedTaskId as number, newTitle: editedTaskTitle});
        setEditedTaskId(null);
        setEditedTaskTitle("");
    }

    const loadTasks = async () => {
        if(userLoading){
            return;
        }
        if(!userError && user !== null && (typeof user.id === "number")){
            fetchTasks(user.id);
        }
	}

	useEffect(() => {
		loadTasks();
	}, [user]);

    const renderTasksByCompletion = (completed = true) => {
        const filteredTasks = tasks.filter(task => task.completed === completed);
        if(filteredTasks.length === 0){
            const message = completed ? "No completed tasks" : "No uncompleted tasks"
            return <Typography textAlign={"center"} sx={{fontSize: "1.5rem"}}>{message}</Typography>
        }
        return(
            <TransitionGroup>
                {filteredTasks.map(task => (
                    <Collapse key={task.id}>
                        <Card sx={{margin: "5px"}}>
                            <Box sx={{ display: "flex", justifyContent: "space-between"}}>
                                <Box sx={{ textAlign: "left", display: "flex" }} >
                                    <IconButton onClick={() => changeTaskStatus(task)} 
                                            loading={task.updatingPending} color="primary"
                                            disabled={task.deletingPending || !isTaskEdited(task.id)}>
                                        {task.completed ? <CheckBox/> : <CheckBoxOutlineBlank/>}
                                    </IconButton>
                                    <Input value={isTaskEdited(task.id) ? task.title : editedTaskTitle }
                                            onChange={e => setEditedTaskTitle(e.target.value)} 
                                            disableUnderline 
                                            disabled={isTaskEdited(task.id) ? true : false}>
                                    </Input>
                                </Box>
                                <Stack direction="row">
                                    {editedTaskId !== task.id
                                    ? 
                                    <>
                                        <IconButton color="secondary" onClick={() => onEditClick(task.id, task.title)}
                                                disabled={task.deletingPending || task.updatingPending}>
                                            <Edit/>
                                        </IconButton>
                                        <IconButton onClick={() => deleteTask(task)} disabled={task.updatingPending}
                                                    loading={task.deletingPending} color="secondary">
                                            <Delete/>
                                        </IconButton>
                                    </>
                                    :
                                    <>
                                        <IconButton color="secondary" onClick={() => handleEditTask()}>
                                            <Done/>   
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleUndoEditTask()}>
                                            <Undo/>   
                                        </IconButton>
                                    </>}
                                </Stack>
                            </Box>
                        </Card>
                    </Collapse>))
                }
            </TransitionGroup>
        )
    }

    const renderUpdatingTaskStatusError = () => {
        if(updatingTaskError){
            return(
                <Snackbar open={true} onClose={() => clearUpdateTaskStatusError()} 
                                message={updatingTaskError} autoHideDuration={3000} />
            )
        }
        else{
            return null;
        }
    }

    const renderDeletingTaskError = () => {
        if(deletingTaskError){
            return(
                <Snackbar open={true} onClose={() => clearDeletingTaskError()} 
                                message={deletingTaskError} autoHideDuration={3000} />
            )
        }
        else{
            return null;
        }
    }

    const renderTasks = () => {
        const renderTasksSkeleton = (count = 8) => {
            const skeletons = [];
            for(let i = 0; i < count; i++){
                skeletons.push(<Skeleton key={i} animation="wave" variant="rectangular" width={500} height={50}/>)
            }
            return skeletons;
        }

        if(tasksError){
            return(
                <div>
                    <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                        Error occured while loading tasks
                    </Typography>
                    <Button variant="contained" onClick={loadTasks}>Try to load again</Button>
                </div>
            ) 
        }
		else{
            return(
                <Grid2 container spacing={1} sx={{flexDirection: {lg: "row", md: "column", sm: "column"}}}>
                    <Grid2 sx={{width: "550px"}}>
                        <Typography variant="h4" textAlign={"center"}>Unfinished tasks</Typography>
                        <Stack>
                            {(tasksLoading || userLoading) ? renderTasksSkeleton() : 
                                renderTasksByCompletion(false)}
                        </Stack>
                    </Grid2>
                    <Grid2 sx={{width: "550px"}}>
                        <Typography variant="h4" textAlign={"center"}>Finished tasks</Typography>
                        <Stack spacing={2}>
                        {(tasksLoading || userLoading) ? renderTasksSkeleton() : 
                            renderTasksByCompletion(true)}
                        </Stack>
                    </Grid2>
                </Grid2>
            )
        }
    }

    return(
        <>
            {renderUpdatingTaskStatusError()}
            {renderDeletingTaskError()}
            {renderTasks()}
        </>
    )
}

export default TaskList;