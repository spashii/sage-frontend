import { Router } from '@reach/router';

import Index from './pages/Index';
import Home from './pages/Home';

function App() {
	return (
		<Router>
			<Index path="/" />
			<Home path="/home" />
		</Router>
	);
}

export default App;
