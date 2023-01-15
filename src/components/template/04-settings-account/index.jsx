import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { formatRelative } from 'date-fns'

// import useAuth from '../../../hooks/usePocketbase';
import useAuth from '../../../context/useAuth';
import {FORM_TIMEOUT_SEC} from '../../../constants';

import A02TextInput from '../../atom/02-text-input/02-text-input';
import A03Alert from '../../atom/03-alert';
import { useNavigate } from 'react-router-dom';



const A06EditableInfo = ({ label, id, value, onSubmit, error, ...rest }) => {
    const defaultValues = {
        [id]: value,
    };
    const { register, handleSubmit, setFocus, reset } = useForm({defaultValues});

    const [isEditable, setIsEditable] = useState(false);
    // this is since errors are controled by the parent
    // we dont want to show an error if we cancel edit, so set to false, and true when we resubmit
    const [ignoreError, setIgnoreError] = useState(false);

    useEffect(() => {
        if (isEditable) {
            setFocus(id);
        }
    }, [isEditable, setFocus, id]);

    if (isEditable) {
        return (
            <form className="px-6 py-4 flex" onSubmit={handleSubmit((data) => {
                setIgnoreError(false);

                return onSubmit(data, () => setIsEditable(false))
            })}>
                <dt className='w-1/3 text-sm font-medium text-gray-500 flex items-center'>{label}</dt>
                <dd className='flex flex-grow justify-between gap-4'>
                    <A02TextInput
                        error={ignoreError ? null : error?.data?.data[id]?.message}
                        // className = '',
                        // hint,
                        {...register(id, { required: true })}
                        {...rest}
                    />
                    <div className="flex flex-shrink-0 items-center gap-4 h-10">
                        <button
                            onClick={() => {
                                reset(defaultValues);
                                setIgnoreError(true);
                                setIsEditable(false);
                            }}
                            type="button"
                            className="rounded-md bg-white font-medium text-red-600 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Update
                        </button>
                    </div>
                </dd>
            </form>
        );
    }

    return (
        <div className="px-6 py-4 flex">
            <dt className='w-1/3 text-sm font-medium text-gray-500 flex items-center'>
                <label htmlFor={id} >{label}</label>
            </dt>
            <dd className='flex flex-grow justify-between'>
                <span className="flex flex-grow items-center">{value}</span>
                <span className="ml-4 flex flex-shrink-0 items-center h-10">
                    <button
                        onClick={() => setIsEditable(true)}
                        type="button"
                        className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Edit
                    </button>
                </span>
            </dd>
        </div>
    );
}


const T04SettingsAccount = ({

}) => {
    const { user, UPDATE_CURRENT_USER_DETAILS, SEND_RESET_PASSWORD_EMAIL, DELETE_CURRENT_USER_ACCOUNT } = useAuth();
    const { mutate: updateUserProfile, isLoading, isError, isSuccess, error, data } = UPDATE_CURRENT_USER_DETAILS;
    // password reset
    const { mutate: resetUserPassword, isLoading: isPasswordResetLoading, isError: isPasswordResetError, isSuccess: isPasswordResetSuccess, error:passwordResetError, data:passwordResetData } = SEND_RESET_PASSWORD_EMAIL;
    const [disableCountResetPassword, setDisableCountResetPassword] = useState(FORM_TIMEOUT_SEC);
    const [isCountingDownResetPassword, setIsCountingDownResetPassword] = useState(false)
    // delete account
    const { mutate: deleteUserAccount, deleteAccountIsLoading, deleteAccountIsError, deleteAccountIsSuccess, deleteAccountError, deleteAccountData } = DELETE_CURRENT_USER_ACCOUNT;
    const navigate = useNavigate();

    const accountInfoRows = [
        { label: 'First name', id: 'first-name', value: user?.name.split(" ")[0] },
        { label: 'Last name', id: 'family-name', value: user?.name.split(" ")[1] },
        // {label: 'Street address', id: 'address'},
    ];
    const onSubmit = (data, cb) => {
        console.log('onSubmit', data);
        // pass everything else as a fallback, we will catch dodgy stuff in the hook
        updateUserProfile({...data, cb});
    };
    const handlePasswordResetClick = () => {
        resetUserPassword(user?.email)
    }
    const handleDeleteAccountClick = () => {
        console.log('handleDeleteAccountClick')
        deleteUserAccount(() => navigate('/login'))
    }

    useEffect(function preventPasswordResetFormResubmission() {
        if (isPasswordResetSuccess) {
            setIsCountingDownResetPassword(true);
        } else if (isPasswordResetError) {
            console.error(passwordResetError)
        }
    }, [isPasswordResetSuccess, isPasswordResetError, passwordResetError])

    useEffect(() => {
        if (disableCountResetPassword <= 0) {
            setIsCountingDownResetPassword(false);
            setDisableCountResetPassword(FORM_TIMEOUT_SEC);
        }
        if(isCountingDownResetPassword) {
            const interval = setInterval(() => {
                setDisableCountResetPassword(disableCountResetPassword - 1)
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isCountingDownResetPassword, setIsCountingDownResetPassword, disableCountResetPassword, setDisableCountResetPassword])

    const passwordResetButtonLabel = isPasswordResetLoading ? "Sending email..." : "Send password reset email"
    const countdownPasswordResetButtonLabel = isCountingDownResetPassword ? `Email sent - please wait ${disableCountResetPassword}s` : passwordResetButtonLabel;

    return (
        <div className='m-4 flex flex-col gap-4 justify-center'>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-2xl mx-auto">
                <div className="space-y-6 py-5 sm:space-y-5">
                    <div className='px-5'>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Account Information</h3>
                        {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">{`This account was created ${formatRelative(new Date(user?.created), new Date())}.`}</p> */}
                        {!!user && (<p className="mt-1 max-w-2xl text-sm text-gray-500">{`This account was last updated ${formatRelative(new Date(user.updated), new Date())}.`}</p>)}
                    </div>
                    <div className="mt-5 border-t border-gray-200">
                        <dl className="divide-y divide-gray-200">
                            {accountInfoRows.map(({ label, value, id }, index) => (
                                <A06EditableInfo
                                    key={`account-info-${index}`}
                                    id={id}
                                    label={label}
                                    value={value}
                                    error={error}
                                    onSubmit={onSubmit}
                                />
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-2xl mx-auto">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Reset your password</h3>
                    <div className="mt-2">
                        
                        
                        <A03Alert
                            type="info"
                            title="Please note"
                        >
                            <p>An email with instructions on how to reset your password will be sent to the address associated with your account.</p>
                        </A03Alert>
                    </div>
                    <div className="mt-5">
                        <button
                            onClick={handlePasswordResetClick}
                            disabled={isPasswordResetLoading || isCountingDownResetPassword}
                            type="button"
                            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
                        >
                            {countdownPasswordResetButtonLabel}
                        </button>
                    </div>
                </div>
            </div>
            <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-2xl mx-auto">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">Delete your account</h3>
                    <div className="mt-2">
                        <A03Alert
                            type="warning"
                            title="Please note"
                        >
                            <p>If you have an outstanding balance due, you will be unable to delete your account until this has been resolved.</p>
                        </A03Alert>
                    </div>
                    <div className="mt-5">
                        <button
                            onClick={handleDeleteAccountClick}
                            type="button"
                            disabled={deleteAccountIsLoading}
                            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 font-medium text-red-700 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500"
                        >
                            Delete account
                        </button>
                    </div>
                </div>
            </div>
            {/* <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full max-w-2xl">
                <div className="space-y-6 py-4 sm:space-y-5">
                    <div className='px-4'>
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Account Password</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">Reset your password.</p>
                    </div>
                    <div className="mt-5 border-t border-gray-200">
                        <dl className="divide-y divide-gray-200">
                            
                        </dl>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default T04SettingsAccount;