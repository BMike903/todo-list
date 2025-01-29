import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import TaskList from './components/taskList/taskList';
function App() {
	return (
		<>
			<AppBar>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Todo list
					</Typography>
				</Toolbar>
			</AppBar>
			<Container>
				<TaskList />
			</Container>
		</>
	)
}

export default App;
