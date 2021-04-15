import React from 'react';
import { useAuth } from '../context/auth';

import AuthenticatedApp from './AuthenticatedApp';
import UnauthenticatedApp from './UnauthenticatedApp';

function App() {
	const { accessToken } = useAuth();
	return accessToken ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
