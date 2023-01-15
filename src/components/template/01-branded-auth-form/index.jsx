import {Fragment} from 'react';

import A01Logo from '../../atom/01-logo/01-logo';

const T01BrandedAuthForm = ({
    title,
    description,
    footer,
    onSubmit,
    isSubmitBtnDisabled,
    submitBtnLabel,
    children,
}) => {
    return (
        <Fragment>
            <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <A01Logo className="mx-auto h-12 w-auto" alt="Logoipsum" />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
                    
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {!!description && (
                            <div className='text-sm text-gray-500 mb-4'>
                                {description}
                            </div>
                        )}
                        <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                            {children}
                            <div>
                                <button
                                    disabled={isSubmitBtnDisabled}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    {submitBtnLabel}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                {!!footer && (
                    <div className="sm:mx-auto sm:w-full sm:max-w-md text-sm text-center mt-4">
                        {footer}
                    </div>
                )}
            </div>
        </Fragment>
    )
}

export default T01BrandedAuthForm;