import React, { useState } from 'react';
import Login from '../Login';
import Register from '../Register';

import styles from './IndexLayout.module.scss';

export type stateT = 'login' | 'register';

const IndexLayout: React.FC = () => {
	const [state, setState] = useState<stateT>('login');
	return (
		<div className={styles.root}>
			<div className={styles.grid}>
				<div>
					<h1>Sage</h1>
					<h2>a safe marketplace for used goods.</h2>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
						eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
						ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
						aliquip ex ea commodo consequat. Duis aute irure dolor in
						reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
						pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
						culpa qui officia deserunt mollit anim id est laborum.
					</p>
				</div>
				{state === 'login' ? (
					<Login setState={setState} />
				) : (
					<Register setState={setState} />
				)}
			</div>
		</div>
	);
};

export default IndexLayout;
