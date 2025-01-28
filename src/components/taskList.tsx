import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";

import "./taskList.css"
import { Task } from "../lib/types";
import useTaskService from "../services/taskService";

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
                    <div>Error occured while loading tasks</div>
                    <Button variant="contained" onClick={loadTasks}>Try to load again</Button>
                </div>
            ) 
        }
		if(loading){
			return <div>Loading</div>
		}
		else{
            return (
                <>
                    {tasks.map(item => (
                        <Box key={item.id} sx={{ border: '1px solid' }}>
                            <Checkbox checked={item.completed} onChange={() => changeTaskStatus(item.id)}/>
                            {item.title}
                        </Box>))
                    }
                </>
            )
        }
    }

    return(
        <Stack spacing={2}>
            {renderTasks()}
        </Stack>
    )
}

export default TaskList;