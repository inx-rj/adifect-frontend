import React, { Fragment } from 'react';
import { Link, Navigate, matchPath, useLocation, useMatch, useNavigate } from 'react-router-dom';
import { getAllowedRoutes, isLoggedIn } from 'helper/utility/customFunctions';
import { Button } from '@mui/material';
import { AUTH_ROUTES } from './routes';

const NavBar = ({ routes, prefix, className }) => {
	const navigate = useNavigate();

	function handleLogout() {
		localStorage.removeItem('roles');
		navigate('/');
	}
	return (
		<nav className={className}>
			<div className="">
				{routes.map(({ path, title }) => (
					<Link key={path} className="w3-bar-item" to={`${prefix}${path}`}>
						{title}
					</Link>
				))}
				{isLoggedIn() && <Button onClick={handleLogout}>Logout</Button>}
			</div>
		</nav>
	)
}

const PrivateRoutes = () => {
	const match = useMatch('/app');

	let allowedRoutes = [];

	console.log({ match, allowedRoutes }, 'PVT_Logs');


	if (isLoggedIn()) allowedRoutes = getAllowedRoutes(AUTH_ROUTES);
	else return <Navigate to="/" />;

	return (
		<>
			<NavBar routes={allowedRoutes} prefix={match.pathname} className="bg-white" />
		</>
	);
}

export default PrivateRoutes;
