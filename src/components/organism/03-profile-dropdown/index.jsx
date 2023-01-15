import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {
    ChevronUpDownIcon,
} from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { noop } from 'lodash/noop'

import A04UserDisc from '../../atom/04-user-disc'
import A05Skeleton from '../../atom/05-skeleton'

const O03ProfileDropdown = ({
    name = '',
    role = '',
    dropDownItems = [],
    logoutFunc = noop,
}) => {
    const initials = name.split(' ').map((word) => word[0]).join('');
    return (
        <Menu as="div" className="relative inline-flex flex-col-reverse text-left w-full">
            <div>
                <Menu.Button className="group w-full rounded-md bg-white px-3.5 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                    <span className="flex w-full items-center justify-between gap-2">
                        <span className="flex min-w-0 items-center justify-between space-x-3 flex-grow">
                            <A04UserDisc initials={initials} className="bg-pink-600 h-full" />
                            <span className="flex min-w-0 flex-1 flex-col">
                                <span className="truncate text-sm font-medium text-gray-900">{name}</span>
                                {!!role
                                    ? (<span className="truncate text-sm text-gray-500">{role}</span>)
                                    : (<A05Skeleton className={"h-4 my-0.5"} />)
                                }
                            </span>
                        </span>
                        <ChevronUpDownIcon
                            className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                        />
                    </span>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 left-0 bottom-full z-10 my-1 origin-bottom divide-y divide-gray-200 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {dropDownItems.length > 0 && (
                        <div className="py-1">
                            {dropDownItems.map(({ label, props }, index) => {
                                return (
                                    <Menu.Item
                                        key={`dropdown-item-${label}-${index}`}
                                    >
                                        {({ active }) => (
                                            <Link

                                                className={classNames(
                                                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                    'block px-4 py-2 text-sm'
                                                )}
                                                {...props}
                                            >
                                                {label}
                                            </Link>
                                        )}
                                    </Menu.Item>
                                );
                            })}
                        </div>
                    )}
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={logoutFunc}
                                    className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'w-full text-left px-4 py-2 text-sm'
                                    )}
                                >
                                    Logout
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}

export default O03ProfileDropdown;