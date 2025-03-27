import { useEffect } from "react";

import { Button, Typography, Stack, Box, Snackbar, Grid2, Collapse, Skeleton, IconButton, Card } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { CheckBox, CheckBoxOutlineBlank, Delete, Edit } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTasksActions } from "../../hooks/useActions";

function TaskList(){
    const {user, loading: userLoading, error: userError} = useTypedSelector(state => state.user);
    const {tasks, loading: tasksLoading, error: tasksError, updatingTaskError, deletingTaskError} = useTypedSelector(state => state.tasks);
    const {fetchTasks, changeTaskStatus, clearUpdateTaskStatusError, deleteTask, clearDeletingTaskError} = useTasksActions();

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
                                            loading={task.updatingPending} disabled={task.deletingPending}
                                            color="primary">
                                        {task.completed ? <CheckBox/> : <CheckBoxOutlineBlank/>}
                                    </IconButton>
                                    <Typography sx={{paddingTop: "5px"}}>{task.title}</Typography>
                                </Box>
                                <Stack direction="row">
                                    <IconButton color="secondary"
                                            disabled={task.deletingPending || task.updatingPending}>
                                        <Edit/>
                                    </IconButton>
                                    <IconButton onClick={() => deleteTask(task)} 
                                                loading={task.deletingPending} color="secondary">
                                            <Delete/>
                                    </IconButton>
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