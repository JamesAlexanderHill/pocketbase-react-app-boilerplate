import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";

import { AuthProvider } from './context/useAuth';

import App, {loader as AppLoader} from './App'
import P02Login, {loader as P02Loader} from './pages/02-login';
import P03Register, {loader as P03Loader} from './pages/03-register';
import './index.css'
import P04PasswordReset, {loader as P04Loader} from './pages/04-password-reset';
import P05Settings from './pages/05-settings';
import P06SettingsAccount from './pages/06-settings-account';

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        // errorElement: /* <ErrorPage />*/ "Error on <App />",
        loader: AppLoader,
        children: [
            {
                errorElement: /*<ErrorPage />*/ <div>Error from child</div>,
                children: [
                    { index: true, element: /*<P01Dashboard />*/ <div>Dashboard</div> },
                    { path: '/my-schedule', element: <div>My Schedule</div> },
                    {
                        path: '/settings',
                        element: <P05Settings />,
                        children: [
                            { index: true, element: <Navigate to="/settings/account" replace />},
                            {path: '/settings/account', element: <P06SettingsAccount />}
                        ]
                    },
                ],
            }
        ],
    },
    {
        path: "/login",
        element: <P02Login />,
        loader: P02Loader,
    },
    {
        path: "/register",
        element: <P03Register />,
        loader: P03Loader,
    },
    {
        path: "/password-reset",
        element: <P04PasswordReset />,
        loader: P04Loader,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RouterProvider router={router} />
                </AuthProvider>
            </QueryClientProvider>
    </React.StrictMode>
)
