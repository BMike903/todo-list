import { useState } from "react";
import { useDispatch } from "react-redux";

import { Button, Typography, Stack, Modal, Box, TextField, IconButton } from "@mui/material";
import { AddTask } from "@mui/icons-material";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { addTaskActon, addTaskSuccessActon, addTaskErrorAction } from "../../store/action-creators/tasks";

export function AddTaskModal() {
    const dispatch = useDispatch();
    const {addingTask} = useTypedSelector(state => state.tasks);

    const [title, setTitle] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => {
        if(addingTask) {
            return
        };
        setIsModalOpen(false)
    };

    const handleAddTask = async () => {
        try {
            dispatch(addTaskActon());
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`,
                {
                    method: "POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({
                        "userId": 4,
                        "title": title,
                        "completed": false
                    })
                } 
            );
            if(!response.ok) {
                throw new Error("Error occured while adding new task");
            }
            setTitle("");
            const data = await response.json();           
            dispatch(addTaskSuccessActon(data));
        }catch{
            dispatch(addTaskErrorAction("Error occured while trying to add task"));
        }
        handleModalClose();
    }

    return(
        <>
        <IconButton loading={addingTask} color="secondary" onClick={handleModalOpen}><AddTask/></IconButton>

        <Modal keepMounted open={isModalOpen} onClose={handleModalClose} >
            <Box sx={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    width: 800, height: 150,  bgcolor: 'background.paper', border: '2px solid #000',
                    boxShadow: 24, p: 4}}
            >
                <Typography variant="h5">Add new task</Typography>
                <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
                    <TextField onChange={e => setTitle(e.target.value)} 
                        multiline fullWidth value={title} />
                    <Button onClick={handleAddTask} variant="contained" color="secondary">AddTask</Button>
                </Stack>
            </Box>
        </Modal>
        </>
    )
}