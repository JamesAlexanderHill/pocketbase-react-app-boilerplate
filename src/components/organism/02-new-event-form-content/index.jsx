import { Fragment } from "react";
import capitalize from 'lodash/capitalize';

const O02NewEventFormContent = ({types = []}) => {
    return (
        <Fragment>
            {/* type */}
            {types.length > 0 && (
                <div className="px-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                        Type
                    </label>
                    <select
                        id="type"
                        name="type"
                        className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        defaultValue="lesson"
                    >
                        {types.map(({id, title}) => (<option key={id} value={id}>{capitalize(title)}</option>))}
                    </select>
                </div>
            )}
            {/* title */}
            <div className="px-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title
                </label>
                <div className="mt-1">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="you@example.com "
                    />
                </div>
            </div>
            {/* coach */}
            {/* clients */}
        </Fragment>
    )
}

export default O02NewEventFormContent;