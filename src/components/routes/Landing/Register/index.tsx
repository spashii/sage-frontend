import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../context/auth';

import styles from './Register.module.scss';

type FormData = {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
};

const Register: React.FC<{ setState }> = ({ setState }) => {
	const { register, handleSubmit } = useForm<FormData>();
	const { register: registerAuth } = useAuth();

	const onSubmit = handleSubmit((data) => {
		if (data.password === data.confirmPassword) {
			registerAuth({
				username: data.username,
				email: data.email,
				password: data.password,
			});
		} else {
			console.log('passwords arent the same');
		}
	});

	return (
		<div className={styles.root}>
			<h1>Register</h1>
			<form onSubmit={onSubmit}>
				<input
					placeholder="Email"
					{...register('email', {
						required: true,
					})}
				/>
				<input
					placeholder="Username"
					{...register('username', {
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
				<input
					placeholder="Confirm Password"
					type="password"
					{...register('confirmPassword', {
						required: true,
					})}
				/>
				<button type="submit">Go!</button>
				<small>
					<a onClick={() => setState('login')}>Click here to login</a>
				</small>
			</form>
		</div>
	);
};

export default Register;
