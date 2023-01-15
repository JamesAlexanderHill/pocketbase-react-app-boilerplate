import React, {useState, useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, redirect } from "react-router-dom";

import useAuth from '../context/useAuth';
import {FORM_TIMEOUT_SEC} from '../constants';

import A02TextInput from "../components/atom/02-text-input/02-text-input";
import A03Alert from '../components/atom/03-alert';
import T01BrandedAuthForm from "../components/template/01-branded-auth-form";

export const loader = async () => {
    console.groupEnd();
	console.group('P04PasswordReset');
    return null;
};

const description = (
    <A03Alert
        type="info"
    >
        <p>If we have an account associated with this email we will send you a password reset link.</p>
    </A03Alert>
);

const P04PasswordReset = () => {
    const [disableCount, setDisableCount] = useState(FORM_TIMEOUT_SEC);
    const [isCountingDown, setIsCountingDown] = useState(false)
    const {SEND_RESET_PASSWORD_EMAIL} = useAuth();
    const {register, handleSubmit} = useForm();
    
    const {mutate: sendPasswordResetEmail, isLoading, isError, isSuccess, error, data} = SEND_RESET_PASSWORD_EMAIL;

    useEffect(function preventFormResubmission() {
        if (isSuccess) {
            setIsCountingDown(true);
        } else if (isError) {
            console.error(error.data)
        }
    }, [isSuccess, isError, data])

    useEffect(() => {
        if (disableCount <= 0) {
            setIsCountingDown(false);
            setDisableCount(FORM_TIMEOUT_SEC);
        }
        if(isCountingDown) {
            const interval = setInterval(() => {
                setDisableCount(disableCount - 1)
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [isCountingDown, setIsCountingDown, disableCount, setDisableCount])

    const onSubmit = ({email}) => {
        sendPasswordResetEmail(email);
    }

    const submitButtonLabel = isLoading ? "Sending email..." : "Send password reset email"
    const countdownButtonLabel = isCountingDown ? `Email sent - please wait ${disableCount}s` : submitButtonLabel;

    return (
        <T01BrandedAuthForm
            title={"Reset your password"}
            description={description}
            onSubmit={handleSubmit(onSubmit)}
            isSubmitBtnDisabled={isLoading || isCountingDown}
            submitBtnLabel={countdownButtonLabel}
        >
            <A02TextInput
                label="Email address"
                type="email"
                {...register('email', { required: true })}
                autoComplete="email"
                disabled={isLoading}
                error={error?.data?.message}
            />
        </T01BrandedAuthForm>
    );
}

export default P04PasswordReset;