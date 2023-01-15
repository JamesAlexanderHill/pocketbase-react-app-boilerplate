import React, { Fragment, useEffect } from 'react';
import { Outlet, redirect, useNavigate } from "react-router-dom";
import {
	CalendarDaysIcon,
	HomeIcon,
	QueueListIcon,
} from '@heroicons/react/24/outline'

import useAuth from './context/useAuth';
import { runIfUserDoesNotExists } from './hooks/usePocketbase';
import T02AppShell from './components/template/02-app-shell';

export const loader = async () => {
	console.groupEnd();
	console.group('App');
	// console.info('=== Render: App ===');
	return runIfUserDoesNotExists(() => redirect('/login'));
};

const profileDropdownMenuItems = [
	{label: "Settings", props: {to: '/settings'}},
];
const navMenuItems = [
	{label: "Dashboard", Icon: CalendarDaysIcon, props: {to: '/'}},
	{label: "My Schedule", Icon: QueueListIcon, props: {to: '/my-schedule'}},
];

const App = () => {
	const {user, logout, GET_CURRENT_USER_ROLE} = useAuth();
	const {mutate: getRole, isLoading, data: role} = GET_CURRENT_USER_ROLE;
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			getRole();
		}
	}, [user])

	return (
		<T02AppShell
			name={user?.name}
			role={role?.title}
			menuItems={navMenuItems}
			profileBtnItems={profileDropdownMenuItems}
			logoutFunc={() => logout(() => navigate('/login'))}
		>
			<Outlet />
		</T02AppShell>
	);
}

export default App
