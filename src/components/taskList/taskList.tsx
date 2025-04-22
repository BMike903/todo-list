import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Typography, Stack, Snackbar, Grid2, Collapse, Skeleton, IconButton } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { AddTask } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTasksActions } from "../../hooks/useActions";
import { clearAddTaskErrorActon } from "../../store/action-creators/tasks";
import { completedTasksSelector, uncompletedTasksSelector } from "../../store/selectors/tasksSelectors";
import { Task } from "../task/task";
import { AddTaskModal } from "../addTaskModal/addTaskModal";

function TaskList(){
    const dispatch = useDispatch();

    const completedTasks = useTypedSelector(completedTasksSelector);
    const uncompletedTasks = useTypedSelector(uncompletedTasksSelector);

    const {user, loading: userLoading, error: userError} = useTypedSelector(state => state.user);
    const { loading: tasksLoading, error: tasksError, addingTask, updatingTaskError,
        updatingTaskTitleError, addingTaskError} = useTypedSelector(state => state.tasks);
    const {fetchTasks, clearUpdateTaskStatusError, clearUpdateTaskTitleError} = useTasksActions();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => {
        if(addingTask) {
            return
        };
        setIsModalOpen(false)
    };

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
        const taskArr = completed ? completedTasks : uncompletedTasks;
        if(taskArr.length === 0){
            const message = completed ? "No completed tasks" : "No uncompleted tasks"
            return <Typography textAlign={"center"} sx={{fontSize: "1.5rem"}}>{message}</Typography>
        }
        return(
            <TransitionGroup>
                {taskArr.map(task => (
                    <Collapse key={task.id}>
                        <Task id={task.id} />
                    </Collapse>))
                }
            </TransitionGroup>
        )
    }

    const renderError = (error: string | null, clearErrorAction: typeof clearUpdateTaskStatusError) => {
        if(error){
            return(
                <Snackbar open={true} onClose={() => dispatch(clearErrorAction())} 
                                message={error} autoHideDuration={3000} />
            )
        }
        else{
            return null;
        }
    }

    const renderModal = () => {
        return <AddTaskModal isOpen={isModalOpen} onModalClose={handleModalClose}/>
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
                <Grid2 container spacing={1} sx={{flexDirection: {lg: "row", md: "column", sm: "column"}, width: {lg: "100%", md: "100%"}}}>
                    <Grid2 sx={{width: {lg: "45%", md: "90%"}}}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <Typography variant="h4" textAlign={"center"}>Unfinished tasks</Typography>
                            <IconButton loading={addingTask} color="secondary" onClick={handleModalOpen}><AddTask/></IconButton>
                        </Stack>
                        <Stack>
                            {(tasksLoading || userLoading) ? renderTasksSkeleton() : 
                                renderTasksByCompletion(false)}
                        </Stack>
                    </Grid2>
                    <Grid2 sx={{width: {lg: "45%", md: "90%"}}}>
                        <Stack direction={"row"} justifyContent={"center"}>
                            <Typography variant="h4" textAlign={"center"}>Finished tasks</Typography>
                            <IconButton color="secondary" onClick={handleModalOpen}><AddTask/></IconButton>
                        </Stack>
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
            {renderModal()}
            {renderError(updatingTaskError, clearUpdateTaskStatusError)}
            {renderError(updatingTaskTitleError, clearUpdateTaskTitleError)}
            {renderError(addingTaskError, clearAddTaskErrorActon)}
            {renderTasks()}
        </>
    )
}

export default TaskList;