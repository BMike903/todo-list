import { useEffect } from "react";

import { Button, Typography, Stack, Box, Snackbar, Grid2, Collapse, Skeleton, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import { CheckBox, CheckBoxOutlineBlank, Delete } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchTasks, changeTaskStatus, clearUpdateTaskStatusError, deleteTask, clearDeletingTaskError } from "../../store/action-creators/tasks";

function TaskList(){
    const {user, loading: userLoading, error: userError} = useTypedSelector(state => state.user);
    const {tasks, loading: tasksLoading, error: tasksError, updatingTaskError, deletingTaskError} = useTypedSelector(state => state.tasks);
    const dispatch = useDispatch();

    const loadTasks = async () => {
        if(userLoading){
            return;
        }
        if(!userError && user !== null && (typeof user.id === "number")){
            dispatch(fetchTasks(user.id));
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
                        <Box sx={{ border: '1px solid', textAlign: "left", display: "flex" }} >
                            <IconButton onClick={() => dispatch(changeTaskStatus(task))} loading={task.updatingPending} disabled={task.deletingPending}>
                                {task.completed ? <CheckBox/> : <CheckBoxOutlineBlank/>}
                            </IconButton>
                            <Typography>{task.title}</Typography>
                            <IconButton onClick={() => dispatch(deleteTask(task))} loading={task.deletingPending}>
                                <Delete/>
                            </IconButton>
                        </Box>
                    </Collapse>))
                }
            </TransitionGroup>
        )
    }

    const renderUpdatingTaskStatusError = () => {
        if(updatingTaskError){
            return(
                <Snackbar open={true} onClose={() => dispatch(clearUpdateTaskStatusError())} 
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
                <Snackbar open={true} onClose={() => dispatch(clearDeletingTaskError())} 
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
                <Grid2 container spacing={1}>
                    <Grid2 sx={{width: "550px"}}>
                        <Typography variant="h4" textAlign={"center"}>Unfinished tasks</Typography>
                        <Stack spacing={2}>
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