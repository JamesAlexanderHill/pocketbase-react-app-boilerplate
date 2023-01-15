import classNames from 'classnames'

const A05Skeleton = ({className}) => (<div role="status" aria-label="User role" className={classNames(className, "bg-gray-100 w-full animate-pulse")}>
    <span className="sr-only">Loading...</span>
</div>)

export default A05Skeleton;