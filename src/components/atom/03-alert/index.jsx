import { useState } from "react";
import classNames from "classnames/bind";
import {
    InformationCircleIcon,
    CheckCircleIcon,
    ExclamationTriangleIcon,
    XCircleIcon,
    XMarkIcon,
} from '@heroicons/react/20/solid'



const styles = {
    'info-bg': 'bg-blue-50',
    'info-icon': 'text-blue-400',
    'info-title': 'text-blue-800',
    'info-text': 'text-blue-700',
    'info-btn': 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50',
    'success-bg': 'bg-green-50',
    'success-icon': 'text-green-400',
    'success-title': 'text-green-800',
    'success-text': 'text-green-700',
    'success-btn': 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50',
    'warning-bg': 'bg-yellow-50',
    'warning-icon': 'text-yellow-400',
    'warning-title': 'text-yellow-800',
    'warning-text': 'text-yellow-700',
    'warning-btn': 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50',
    'error-bg': 'bg-red-50',
    'error-icon': 'text-red-400',
    'error-title': 'text-red-800',
    'error-text': 'text-red-700',
    'error-btn': 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50',
};
const alertClassNames = classNames.bind(styles);
const icons = {
    info: InformationCircleIcon,
    success: CheckCircleIcon,
    warning: ExclamationTriangleIcon,
    error: XCircleIcon,
}

const A03Alert = ({
    id,
    type = 'info',// info || success || warning || error
    title,
    canDismiss = false,
    children,
}) => {
    const [isVisible, setIsVisible] = useState(true);

    const Icon = icons[type];
    const handleDismissClick = () => {
        setIsVisible(false);
    }

    // If we dismiss then dont show the alert
    if(!isVisible) { return null }

    return (
        <div className={alertClassNames("rounded-md p-4", `${type}-bg`)}>
          <div className="flex">
            <div className="flex-shrink-0">
              <Icon className={alertClassNames("h-5 w-5", `${type}-icon`)} aria-hidden="true" />
            </div>
            <div className="ml-3 flex flex-col gap-2">
              {!!title && (<h3 className={alertClassNames("text-sm font-medium", `${type}-title`)}>{title}</h3>)}
              <div className={alertClassNames("text-sm", `${type}-text`)}>
                {children}
              </div>
            </div>
            {canDismiss && (
            <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                    <button
                        onClick={handleDismissClick}
                        type="button"
                        className={alertClassNames("inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2", `${type}-btn`)}
                    >
                        <span className="sr-only">Dismiss</span>
                        <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>
            </div>
          )}
          </div>
        </div>
    );
}

export default A03Alert;