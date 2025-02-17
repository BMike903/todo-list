import { useEffect } from "react";

import { Button, Typography, Stack, Box, Checkbox, Snackbar, Grid2, Collapse, Skeleton } from "@mui/material";
import { useDispatch } from "react-redux";
import { TransitionGroup } from "react-transition-group";

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
            const message = completed ? "No completed tasks" : "No uncompleted tasks"
            return <Typography>{message}</Typography>
        }
        return(
            <TransitionGroup>
                {filteredTasks.map(task => (
                    <Collapse key={task.id}>
                        <Box key={task.id} sx={{ border: '1px solid' }} height={50} width={500}>
                            <Checkbox checked={task.completed} disabled={task.updating} 
                                        onChange={() => onTaskStatusClick(task)}/>
                            {task.title}
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
                <Grid2 container spacing={2}>
                    <Grid2 size={6}>
                        <Stack spacing={2}>
                            {(tasksLoading || userLoading) ? renderTasksSkeleton() : 
                                renderTasksByCompletion(false)}
                        </Stack>
                    </Grid2>
                    <Grid2 size={6}>
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
            {renderTasks()}
        </>
    )
}

export default TaskList;