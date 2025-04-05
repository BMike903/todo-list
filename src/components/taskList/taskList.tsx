import { useEffect, useState, useRef } from "react";

import { Button, Typography, Stack, Snackbar, Grid2, Collapse, Skeleton, IconButton, Card, Input, Modal, Box, TextField } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import { CheckBox, CheckBoxOutlineBlank, Delete, Edit, Done, Undo, AddTask } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useTasksActions } from "../../hooks/useActions";


function TaskList(){
    const {user, loading: userLoading, error: userError} = useTypedSelector(state => state.user);
    const {tasks, loading: tasksLoading, error: tasksError, updatingTaskError, deletingTaskError, updatingTaskTitleError} = useTypedSelector(state => state.tasks);
    const {fetchTasks, changeTaskStatus, clearUpdateTaskStatusError, deleteTask, clearDeletingTaskError, changeTaskTitle, clearUpdateTaskTitleError} = useTasksActions();

    const [editedTaskId, setEditedTaskId] = useState<number | null>(null);
    const [editedTaskTitle, setEditedTaskTitle] = useState("");
    const isTaskEdited = (taskId: number) => editedTaskId !== taskId;
    const clearEditedTask = () => {setEditedTaskId(null); setEditedTaskTitle("")};
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const onEditClick = async (id: number, title: string) => {
        setEditedTaskId(id);
        await setEditedTaskTitle(title);
        inputRefs.current[id].focus();
    }

    const handleUndoEditTask = () => {
        clearEditedTask();
    }

    const handleEditTask = () => {
        const oldTitle = tasks.filter(task => task.id === editedTaskId)[0].title;
        if(editedTaskTitle !== oldTitle){
            changeTaskTitle({id: editedTaskId as number, newTitle: editedTaskTitle});
        }
        clearEditedTask();
    }

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = () => {
        console.log("Task with title: ", newTaskTitle, " should be added");
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
                            <Stack  direction="row" sx={{ justifyContent: "space-evenly" }}>
                                <IconButton onClick={() => changeTaskStatus(task) } sx={{flex: "5", maxHeight: "40px"}}
                                        loading={task.updatingPending} color="primary"
                                        disabled={task.deletingPending || !isTaskEdited(task.id)}>
                                        {task.completed ? <CheckBox/> : <CheckBoxOutlineBlank/>}
                                </IconButton>
                                <Input value={isTaskEdited(task.id) ? task.title : editedTaskTitle }
                                        onChange={e => setEditedTaskTitle(e.target.value)} 
                                        disableUnderline sx={{flex: "85"}} multiline
                                        disabled={isTaskEdited(task.id) ? true : false}
                                        inputRef={el => inputRefs.current[task.id] = el}>
                                </Input>
                                <Stack direction={"row"} sx={{flex: "10"}}>
                                    {editedTaskId !== task.id
                                    ? 
                                    <>
                                        <IconButton sx={{maxHeight: "40px"}} color="secondary" onClick={() => onEditClick(task.id, task.title)}
                                                disabled={task.deletingPending || task.updatingPending}>
                                            <Edit/>
                                        </IconButton>
                                        <IconButton onClick={() => deleteTask(task)} disabled={task.updatingPending}
                                                    loading={task.deletingPending} color="secondary" sx={{maxHeight: "40px"}}>
                                            <Delete/>
                                        </IconButton>
                                    </>
                                    :
                                    <>
                                        <IconButton color="secondary" onClick={() => handleEditTask()} sx={{maxHeight: "40px"}}>
                                            <Done/>   
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => handleUndoEditTask()} sx={{maxHeight: "40px"}}>
                                            <Undo/>   
                                        </IconButton>
                                    </>}
                                </Stack>
                            </Stack>
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

    const renderUpdatingTaskTitleError = () => {
        if(updatingTaskTitleError){
            return(
                <Snackbar open={true} onClose={() => clearUpdateTaskTitleError()} 
                                message={updatingTaskTitleError} autoHideDuration={3000} />
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
                        <Button onClick={addTask} variant="contained" color="secondary">AddTask</Button>
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
                            <IconButton color="secondary" onClick={handleModalOpen}><AddTask/></IconButton>
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
            {renderUpdatingTaskStatusError()}
            {renderUpdatingTaskTitleError()}
            {renderDeletingTaskError()}
            {renderTasks()}
        </>
    )
}

export default TaskList;