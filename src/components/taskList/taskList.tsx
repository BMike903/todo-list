import { useEffect, useState } from "react";

import { Button, CircularProgress, Typography, Stack, Box, Checkbox } from "@mui/material";

import { Task } from "../../lib/types";
import useTaskService from "../../services/taskService";

function TaskList(){
	const [tasks, setTasks] = useState<Array<Task>>([]);

    const {getTasksByUser, loading, error, clearError} = useTaskService();
    const loadTasks = async () => {
        if(error) clearError();
		const res = await getTasksByUser(4);
		setTasks(res);
	}

	useEffect(() => {
		loadTasks();
	}, []);

    const changeTaskStatus = (id: number) => {
        console.log(id);
    }

    const renderTasks = () => {
        if(error){
            return(
                <div>
                    <Typography variant="subtitle1" component="div" sx={{ flexGrow: 1 }}>
                        Error occured while loading tasks
                    </Typography>
                    <Button variant="contained" onClick={loadTasks}>Try to load again</Button>
                </div>
            ) 
        }
		if(loading){
            return <CircularProgress/>;
		}
		else{
            return (
                <Stack spacing={2}>
                    {tasks.map(item => (
                        <Box key={item.id} sx={{ border: '1px solid' }}>
                            <Checkbox checked={item.completed} onChange={() => changeTaskStatus(item.id)}/>
                            {item.title}
                        </Box>))
                    }
                </Stack>
            )
        }
    }

    return(
        <>
            {renderTasks()}
        </>
    )
}

export default TaskList;