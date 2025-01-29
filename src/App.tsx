import Container from '@mui/material/Container';

import Header from './components/header/Header';
import TaskList from './components/taskList/taskList';

function App() {
	return (
		<>
			<Header/>
			<Container>
				<TaskList />
			</Container>
		</>
	)
}

export default App;
