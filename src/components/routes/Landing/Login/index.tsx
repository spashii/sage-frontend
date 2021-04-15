import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../context/auth';
import { stateT } from '../IndexLayout';

import styles from './Login.module.scss';

type FormData = {
	email: string;
	password: string;
};

const Login: React.FC<{ setState }> = ({ setState }) => {
	const { register, handleSubmit } = useForm<FormData>();
	const { login } = useAuth();

	const onSubmit = handleSubmit((data) => login(data));

	return (
		<div className={styles.root}>
			<h1>Login</h1>
			<form onSubmit={onSubmit}>
				<input
					placeholder="Email or Username"
					{...register('email', {
						required: true,
					})}
				/>
				<input
					placeholder="Password"
					type="password"
					{...register('password', {
						required: true,
					})}
				/>
				<button type="submit">Go!</button>
				<small>
					<a onClick={() => setState('register')}>Click here to register</a>
				</small>
			</form>
		</div>
	);
};

export default Login;
