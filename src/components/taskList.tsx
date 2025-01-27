import { useEffect, useState } from "react";

import "./taskList.css"
import { Task } from "../lib/types";
import { useHttp } from "../hooks/useHttp";

function TaskList(){
	const [tasks, setTasks] = useState<Array<Task>>([]);

    const {request, loading, error, clearError} = useHttp();
    const loadTasks = async () => {
        clearError();
		const res = await request();
		setTasks(res);
	}

	useEffect(() => {
		loadTasks();
	}, []);

    const checkTaskStatus = (id: number) => {
        console.log(id);
    }

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
                    {tasks.map(item => (
                        <li key={item.id}>
                            <input type="checkbox" checked={item.completed} onChange={() => checkTaskStatus(item.id)}/>
                            {item.title}
                        </li>))}
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