import React, {Fragment, useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link, redirect, useNavigate } from "react-router-dom";

import {runIfUserExists} from '../hooks/usePocketbase';
import useAuth from '../context/useAuth';

import A02TextInput from '../components/atom/02-text-input/02-text-input';
import T01BrandedAuthForm from '../components/template/01-branded-auth-form';
import A03Alert from '../components/atom/03-alert';

export const loader = async () => {
    console.groupEnd();
	console.group('P03Register');
	// console.info('=== Render: P03Register ===');
    return runIfUserExists(() => redirect('/'));
};

const description = (
    <A03Alert
        type="warning"
        title="Attention needed"
    >
        <p>You will have the opportunity to provide information about your child/children at a later stage of the registration process if applicable.</p>
    </A03Alert>
);

const P03Register = () => {
    const {REGISTER_WITH_PASSWORD} = useAuth();
    const {register, handleSubmit, resetField} = useForm();
    const navigate = useNavigate();

    const {mutate: registerClient, isLoading, isError, isSuccess, error, data} = REGISTER_WITH_PASSWORD;

    const onSubmit = (data) => {
        const newUser = {
            // "username": auto_generate,
            email: data.email,
            emailVisibility: false,
            password: data.password,
            passwordConfirm: data["confirm-password"],
            name: `${data["first-name"]} ${data["last-name"]}`,
            role: "3cy1ykh2x6ni17i", // client by default
        };

        registerClient(newUser);
    }

    useEffect(function resetFormOrRedirectUser() {
        if (isSuccess) {
            navigate("/login");
        } else if (isError) {
            console.error(error);
            resetField('password');
            resetField('confirm-password');
        }
    }, [isSuccess, isError, error])

    return (
        <T01BrandedAuthForm
            title={"Register a new account"}
            description={description}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitBtnDisabled={isLoading}
            submitBtnLabel={isLoading ? "Creating account..." : "Create account"}
            footer={<Link className="font-medium text-indigo-600 hover:text-indigo-500" to="/login">Already have an account?</Link>}
        >
            <div className='flex justify-between flex-wrap gap-4'>
                <A02TextInput
                    label="First Name"
                    type="text"
                    {...register('first-name', { required: true })}
                    autoComplete="given-name"
                    disabled={isLoading}
                    error={error?.data?.data['first-name']?.message}
                    className="flex-grow"
                />
                <A02TextInput
                    label="Last Name"
                    type="text"
                    {...register('last-name', { required: true })}
                    autoComplete="family-name"
                    disabled={isLoading}
                    error={error?.data?.data['last-name']?.message}
                    className="flex-grow"
                />
            </div>
            <A02TextInput
                label="Email address"
                type="email"
                {...register('email', { required: true })}
                autoComplete="email"
                disabled={isLoading}
                error={error?.data?.data?.email?.message}
            />
            <A02TextInput
                label="Password"
                type="password"
                {...register('password', { required: true })}
                disabled={isLoading}
                error={error?.data?.data?.password?.message}
                
            />
            <A02TextInput
                label="Confirm password"
                type="password"
                {...register('confirm-password', { required: true })}
                disabled={isLoading}
                error={error?.data?.data?.passwordConfirm?.message}
            />
        </T01BrandedAuthForm>
    )
}

export default P03Register;