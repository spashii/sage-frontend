import { Link, RouteComponentProps } from '@reach/router';

function Index(_props: RouteComponentProps) {
	return (
		<div>
			the index page w/ login and register
			<div>
				<ul>
					<li>
						<Link to="/home">to home</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
export default Index;
