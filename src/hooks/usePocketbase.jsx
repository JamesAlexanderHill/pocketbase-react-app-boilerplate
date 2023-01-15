import React, {useState, useEffect, useReducer } from 'react';
import PocketBase from 'pocketbase';
import {useMutation} from 'react-query';
import noop from 'lodash/noop';

const pb = new PocketBase('http://localhost:5000');

export const runIfUserExists = (func) => {
    console.log('runIfUserExists', {user: pb.authStore.isValid, func})
    if (pb.authStore.isValid && typeof func === 'function') {
        console.info(func);
        return func();
    }
    return null;
}
export const runIfUserDoesNotExists = (func) => {
    console.log('runIfUserDoesNotExists', {user: pb.authStore.isValid, func})
    if (!pb.authStore.isValid && typeof func === 'function') {
        console.info(func);
        return func();
    }
    return null;
}

// export default useAuth;
const usePocketbase = () => {
    const [user, setUser] = useState(pb.authStore.model);
    const [isSignedIn, setIsSignedIn] = useState(pb.authStore.isValid);

    const updateState = () => {
        setUser(pb.authStore.model);
        setIsSignedIn(pb.authStore.isValid);
    }

    useEffect(() => {
        pb.authStore.onChange(() => {
            updateState();
        });
    }, []);

    return {
        user,
        isSignedIn,
        // AUTH METHODS
        LOGIN_WITH_PASSWORD: useMutation(({email, password, cb}) => {
            return pb.collection('users').authWithPassword(email, password)
                .then(() => {
                    console.info('Login Success');
                    console.info(cb);
                    cb();
                });
        }),
        LOGOUT: (cb = noop) => {
            pb.authStore.clear();
            console.info('Logout Success');
            console.info(cb);
            cb();
        },
        REGISTER_WITH_PASSWORD: useMutation(({username, email, emailVisibility, password, passwordConfirm, name, role}) => {
            const newUser = {
                // username, // dont pass through so we auto-generate this
                email,
                emailVisibility,
                password,
                passwordConfirm,
                name,
                role: "3cy1ykh2x6ni17i", // client by default
            }

            return pb.collection('users').create(newUser)
                .then(() => {
                    console.info('New client account created');
                    // Send user verification email
                    pb.collection('users').requestVerification(email).then(() => {
                        console.info('Email verification sent')
                    });
                });
        }),
        SEND_RESET_PASSWORD_EMAIL: useMutation((email) => {
            return pb.collection('users').requestPasswordReset(email);
        }),
        // CURRENT USER METHODS
        GET_CURRENT_USER_ROLE: useMutation(() => {
            console.log('GET_CURRENT_USER_ROLE', user)
            return pb.collection('user_roles').getOne(user.role);
        }),
        UPDATE_CURRENT_USER_DETAILS: useMutation(({cb = noop, ...data}) => {
            const updatedUser = {
                // username: "test_username_update", // auto generated so we dont want to change this
                // emailVisibility: false, // dont want them to change this either
                // password: "87654321", // we will update passwords in another call
                // passwordConfirm: "87654321",
                // oldPassword: "12345678",
                // name: data.name,
                role: user?.role // required, so we will just keep this the same
            };
            if (data.hasOwnProperty('first-name')) {
                if (data['first-name'].includes(' ')) {
                    return Promise.reject({
                        data: {
                                data: {
                                    'first-name': {
                                        error: "Invalid request",
                                        message: "Name cannot contain spaces."
                                    }
                                },
                            }
                        }
                    )
                }
                // first-name has changed
                updatedUser.name = `${data['first-name']} ${user.name.split(" ")[1]}`;

            } else if (data.hasOwnProperty('family-name')) {
                if (data['family-name'].includes(' ')) {
                    return Promise.reject({
                        data: {
                                data: {
                                    'family-name': {
                                        error: "Invalid request",
                                        message: "Name cannot contain spaces."
                                    }
                                },
                            }
                        }
                    )
                }
                // last-name has changed
                updatedUser.name = `${user.name.split(" ")[0]} ${data['family-name']}`;
            }

            // check if our account is valid
            console.log('update', updatedUser)

            return pb.collection('users').update(user.id, updatedUser).then(() => cb());
        }),
        DELETE_CURRENT_USER_ACCOUNT: useMutation((cb = noop) => {
            return pb.collection('users').delete(user.id)
                .then(() => {
                    updateState();
                    cb();
                })
        })
    }
}

export default usePocketbase;