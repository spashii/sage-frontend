import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';
import useAxios from '../lib/useAxios';
import { AxiosResponse } from 'axios';
import FullPageLoading from '../components/FullPageLoading';
import jwtDecode from 'jwt-decode';
import config from '../config';

export type TAuthContext = {
	accessToken: string | null;
	id: string | null;
	login: (payload: TLogin) => void;
	register: (payload: TRegister) => void;
	logout: () => void;
};

export type TLogin = {
	email: string;
	password: string;
};

export type TRegister = {
	username: string;
	email: string;
	password: string;
};

const AuthContext = createContext<TAuthContext>({
	accessToken: null,
	id: null,
	login: (_payload: TLogin) => {},
	register: (_payload: TLogin) => {},
	logout: () => {},
});

const AuthProvider = (props: PropsWithChildren<{}>) => {
	const [axios] = useAxios();

	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [id, setId] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	const login = async (payload: TLogin) => {
		try {
			const response = await axios.post('/api/user/login', payload);
			console.log(response.data.message);
			setAccessToken(response.headers.authorization);
		} catch (err) {
			const { response }: { response: AxiosResponse } = err;
			console.log(response.data.message);
		}
	};

	const register = async (payload: TRegister) => {
		try {
			const response = await axios.post('/api/user/register', payload);
			console.log(response.data.message);
			setAccessToken(response.headers.authorization);
		} catch (err) {
			const { response }: { response: AxiosResponse } = err;
			console.log(response.data.message);
		}
	};

	const logout = async () => {
		setLoading(true);
		try {
			await axios.post('/api/user/logout');
		} catch (err) {
			const { response }: { response: AxiosResponse } = err;
			console.log(response.data.message);
		} finally {
			setLoading(false);
			setId(null);
			setAccessToken(null);
			// redirects to login
		}
	};

	useEffect(() => {
		async function refreshToken() {
			try {
				const response = await axios.post('/api/user/refresh-token');
				setAccessToken(response.headers.authorization);
			} catch (err) {
				const { response }: { response: AxiosResponse } = err;
				console.log(response.data.message);
				logout();
			}
		}

		(async () => {
			setLoading(true);

			// if not authenticated
			if (accessToken === null) {
				setId(null);
				await refreshToken();
			}

			// if authenticated checking validity
			else {
				const { id, exp } = jwtDecode<{
					id: string;
					// in seconds
					exp: number;
				}>(accessToken);

				if (new Date(exp * 1000).getTime() < new Date().getTime()) {
					await refreshToken();
				} else {
					// refresh token asynchronously
					setId(id);
					setTimeout(async () => {
						await refreshToken();
					}, config.jwtExpirationInterval);
				}
			}

			setLoading(false);
		})();
	}, [accessToken, axios]);

	if (loading) {
		return <FullPageLoading />;
	}

	return (
		<AuthContext.Provider
			value={{ accessToken, id, login, register, logout }}
			{...props}
		/>
	);
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

export default AuthProvider;
