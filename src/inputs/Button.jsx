import React from 'react';
import classNames from 'classnames';

const ButtonComponent = ({
    children,
    type = "button",
    variant = 'primary',
    fullWidth = false,
    className,
    ...props
}) => {
    const baseClasses = 'px-4 py-2 rounded-md font-semibold transition-colors duration-200';

    const variants = {
        primary: 'bg-orange-500 hover:bg-orange-600 text-white',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-700',
    };

    const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : '';

    return (
        <button
            type={type}
            className={classNames(
                baseClasses,
                variant && variants[variant],
                fullWidth && 'w-full',
                disabledClasses,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonComponent;