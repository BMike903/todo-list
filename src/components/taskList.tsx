import { useEffect, useState } from "react";

import { Task } from "../lib/types";
import { useHttp } from "../hooks/useHttp";

function TaskList(){
	const [tasks, setTasks] = useState<Array<Task>>([]);

    const {request, loading, error, clearError} = useHttp();
    const loadTasks = async () => {
		const res = await request();
		setTasks(res);
	}

	useEffect(() => {
		loadTasks();
	}, []);

    const renderTasks = () => {
        if(error){
            return(
                <div>
                    <div>Error occured while loading tasks</div>
                    <button onClick={loadTasks}>Try to load again</button>
                </div>
            ) 
        }
		if(loading){
			return <div>Loading</div>
		}
		else{
            return (
                <ul>
                    {tasks.map(item => <li key={item.id}>{item.title}</li>)}
                </ul>
            )
        }
    }

    return(
        <ul>
            {renderTasks()}
        </ul>
    )
}

export default TaskList;