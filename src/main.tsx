import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux';
import { store } from './store/index.ts';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import mainTheme from './themes/mainTheme.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={mainTheme}>
				<CssBaseline/>
				<App/>
			</ThemeProvider>
		</Provider>
	</StrictMode>,
)