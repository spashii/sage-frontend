import { useAuth } from '../context/auth';

const AuthenticatedApp = () => {
	const { id, accessToken, logout } = useAuth();
	return (
		<>
			SAGE HOME <button onClick={logout}>logout</button>
		</>
	);
};

export default AuthenticatedApp;
