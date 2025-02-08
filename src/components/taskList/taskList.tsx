import { useEffect } from "react";

import { Button, CircularProgress, Typography, Stack, Box, Checkbox } from "@mui/material";
import { useDispatch } from "react-redux";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import { fetchTasks } from "../../store/action-creators/tasks";


function TaskList(){
    const {tasks, loading, error} = useTypedSelector(state => state.tasks);
    const dispatch = useDispatch();
	/* const [tasks, setTasks] = useState<Array<Task>>([]); */

    /* const {getTasksByUser, loading, error, clearError} = useTaskService(); */
    /* const loadTasks = async () => {
        if(error) clearError();
		const res = await getTasksByUser(4);
		setTasks(res);
	} */

	useEffect(() => {
		/* loadTasks(); */
        dispatch(fetchTasks());
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
                    {/* <Button variant="contained" onClick={loadTasks}>Try to load again</Button> */}
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