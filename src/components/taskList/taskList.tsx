import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Typography, Stack, Snackbar, Grid2, Collapse, Skeleton, IconButton, Modal, Box, TextField } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { AddTask } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTasksActions } from "../../hooks/useActions";
import { addTaskErrorAction, clearAddTaskErrorActon } from "../../store/action-creators/tasks";
import { completedTasksSelector, uncompletedTasksSelector } from "../../store/selectors/tasksSelectors";
import { Task } from "../task/task";
import { TaskActionTypes } from "../../types/tasks";
import { Task as TaskType } from "../../types/tasks";


function TaskList(){
    const dispatch = useDispatch();

    const completedTasks = useTypedSelector(completedTasksSelector);
    const uncompletedTasks = useTypedSelector(uncompletedTasksSelector);

    const {user, loading: userLoading, error: userError} = useTypedSelector(state => state.user);
    const { loading: tasksLoading, error: tasksError, addingTask, updatingTaskError,
        deletingTaskError, updatingTaskTitleError, addingTaskError} = useTypedSelector(state => state.tasks);
    const {fetchTasks, clearUpdateTaskStatusError,
        clearDeletingTaskError, clearUpdateTaskTitleError,
        addTaskActon, addTaskSuccessActon} = useTasksActions();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => {
        if(addingTask) {
            return
        };
        setIsModalOpen(false)
    };

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const handleAddTask = async () => {
        setNewTaskTitle("");

        try {
            dispatch(addTaskActon());
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`,
                {
                    method: "POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "userId": 4,
                        "title": newTaskTitle,
                        "completed": false
                    })
                } 
            );

            if(!response.ok) {
                throw new Error("Error occured while adding new task");
            }

            const data = await response.json();           
            dispatch(addTaskSuccessActon(data));
        }catch{
            dispatch(addTaskErrorAction("Error occured while trying to add task"));
        }

        handleModalClose();
    }

    const loadTasks = async () => {
        if(userLoading){
            return;
        }
        if(!userError && user !== null && (typeof user.id === "number")){
            fetchTasks(user.id);
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

            const data = await response.json();
            dispatch({type: TaskActionTypes.CHANGE_TASK_STATUS_SUCCESS, payload: data})
        }
        catch{
            dispatch({type: TaskActionTypes.CHANGE_TASK_STATUS_ERROR, 
                payload: "Error occured while loading tasks"
            })
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
                        <Task id={task.id} changeTaskStatus={changeTaskStatus}/>
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
        return(
            <Modal keepMounted open={isModalOpen} onClose={handleModalClose} >
                <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                        width: 800, height: 150,  bgcolor: 'background.paper', border: '2px solid #000',
                        boxShadow: 24, p: 4}}
                >
                    <Typography variant="h5">Add new task</Typography>
                    <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
                        <TextField onChange={e => setNewTaskTitle(e.target.value)} 
                            multiline fullWidth value={newTaskTitle} />
                        <Button onClick={handleAddTask} variant="contained" color="secondary">AddTask</Button>
                    </Stack>
                </Box>
            </Modal>
        )
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
            {renderError(deletingTaskError, clearDeletingTaskError)}
            {renderError(addingTaskError, clearAddTaskErrorActon)}
            {renderTasks()}
        </>
    )
}

export default TaskList;