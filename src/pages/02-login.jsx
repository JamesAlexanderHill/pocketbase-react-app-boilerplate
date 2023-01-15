import React, {Fragment, useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, redirect } from "react-router-dom";

import {runIfUserExists} from '../hooks/usePocketbase';
import useAuth from '../context/useAuth';

import A02TextInput from '../components/atom/02-text-input/02-text-input';
import T01BrandedAuthForm from '../components/template/01-branded-auth-form';

export const loader = async () => {
    console.groupEnd();
	console.group('P02Login');
	// console.info('=== Render: P02Login ===');
    return runIfUserExists(() => redirect('/'));
};

const P02Login = () => {
    const {LOGIN_WITH_PASSWORD} = useAuth();
    const {register, handleSubmit, resetField} = useForm();
    const navigate = useNavigate();

    const {mutate: login, isLoading, isError, isSuccess, error, data} = LOGIN_WITH_PASSWORD;
    const onSubmit = ({email, password}) => {
        login({email, password, cb: () => navigate('/')});
    };

    useEffect(function resetFormOnError() {
        if (isError) {
            resetField('password');
        }
    }, [isError]);

    return (
        <T01BrandedAuthForm
            title={"Sign in to your account"}
            footer={<Link className="font-medium text-indigo-600 hover:text-indigo-500" to="/register">Create new account</Link>}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitBtnDisabled={isLoading}
            submitBtnLabel={isLoading ? "Authenticating..." : "Sign in"}
        >
            <A02TextInput
                label="Email address"
                type="email"
                {...register('email', { required: true })}
                autoComplete="email"
                disabled={isLoading}
                error={error?.data?.message}
            />
            
            <A02TextInput
                label="Password"
                type="password"
                {...register('password', { required: true })}
                disabled={isLoading}
                hint={<Link to="/password-reset" className="font-sm text-indigo-600 hover:text-indigo-500">Forgot your password?</Link>}
            />
        </T01BrandedAuthForm>
    )
}

export default P02Login;