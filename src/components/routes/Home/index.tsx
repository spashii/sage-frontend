import { Link, RouteComponentProps } from '@reach/router';

function Home(_props: RouteComponentProps) {
	return (
		<div>
			the main page w/ all the listings and shit
			<div>
				<ul>
					<li>
						<Link to="/">to login</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default Home;

// this is a special co
