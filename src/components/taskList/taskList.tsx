import { useEffect } from "react";

import { Button, CircularProgress, Typography, Stack, Box, Checkbox, Snackbar, Grid2 } from "@mui/material";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchTasks, changeTaskStatus, clearUpdateTaskStatusError } from "../../store/action-creators/tasks";
import { Task } from "../../types/tasks";

function TaskList(){
    const {user, loading: userLoading, error: userError} = useTypedSelector(state => state.user);
    const {tasks, loading: tasksLoading, error: tasksError, updatingTaskError} = useTypedSelector(state => state.tasks);
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

    const onTaskStatusClick = (task: Task) => {
        dispatch(changeTaskStatus(task));
    }

    const renderTasksByCompletion = (completed = true) => {
        const filteredTasks = tasks.filter(task => task.completed === completed);
        if(filteredTasks.length === 0){
            const message = completed ? "No completed tasks" : "No uncompleted tasks<"
            return <Typography>{message}</Typography>
        }
        return(
            <Stack spacing={2}>
                {filteredTasks.map(task => (
                    <Box key={task.id} sx={{ border: '1px solid' }}>
                        <Checkbox checked={task.completed} disabled={task.updating} onChange={() => onTaskStatusClick(task)}/>
                        {task.title}
                    </Box>))
                }
            </Stack>
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

    const renderTasks = () => {
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
		if(tasksLoading || userLoading){
            return <CircularProgress/>;
		}
		else{
            return(
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        {renderTasksByCompletion(true)}
                    </Grid2>
                    <Grid2 size={6}>
                        {renderTasksByCompletion(false)}
                    </Grid2>
                </Grid2>
            )
        }
    }

    return(
        <>
            {renderUpdatingTaskStatusError()}
            {renderTasks()}
        </>
    )
}

export default TaskList;