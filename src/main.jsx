import React from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";

import './index.css'
import P00Error from './pages/00-error';
import P01Login from './pages/01-login';

const redirectLoginLoader = () => {
	return redirect('/login');
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Dashboard</div>,
		loader: redirectLoginLoader,
		errorElement: <P00Error />,
	},
	{
		path: "/login",
		element: <P01Login />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
