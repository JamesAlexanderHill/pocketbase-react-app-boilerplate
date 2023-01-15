import classNames from "classnames";

const A04UserDisc = ({initials, className}) => {
    return (
        <div className={classNames(className, "flex-shrink-0 flex items-center justify-center w-10 h-10 text-white text-sm font-medium rounded-full")}>
            {initials}
        </div>
    );
}

export default A04UserDisc;