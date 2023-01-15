import React from 'react';
import classNames from 'classnames/bind';
import {ExclamationCircleIcon} from '@heroicons/react/20/solid';

const styles = {
    baseClassName: 'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
    errorClassName: 'border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500',
};
const InputClassNames = classNames.bind(styles);

const A02TextInput = React.forwardRef(({
    label,
    type = 'text',
    error,
    className = '',
    hint,
    // onChange,
    // onBlur,
    // name,
    // ref,
    ...rest
}, ref) => {

    return (
        <div className={classNames('A02TextInput', className)}>
            
            {(!!label || !!hint) && (
                <div className="flex justify-between">
                    <label htmlFor={rest.name} className="block text-sm font-medium text-gray-700">
                        {label}
                    </label>
                    <div className="text-sm">
                        {hint}
                    </div>
                </div>
            )}
            <div className={classNames("relative rounded-md shadow-sm", {
                 'mt-1': !!label || !!hint
            })}>
                <input
                    id={rest.name}
                    label={label}
                    type={type}
                    className={InputClassNames('baseClassName', { errorClassName: !!error })}
                    aria-invalid={!!error}
                    aria-describedby={`${name}-error`}
                    ref={ref}
                    {...rest}
                />
                {!!error && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                    </div>
                )}
            </div>
            {!!error && (
                <p className="mt-2 text-sm text-red-600" id={`${rest.name}-error`}>
                    {error}
                </p>
            )}
        </div>
    )
});

export default A02TextInput;