import classNames from 'classnames';
import React from 'react';


const TextField = ({ label, labelIcon, id, required = false, labelClass, className, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className={classNames(`flex gap-1 items-center mb-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold text-primaryTextColor ${labelClass}`)} htmlFor={id}>
                    <>{label}{required && '*'}</> {labelIcon}
                </label>
            )}
            <input
                id={id}
                className={classNames(`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background
                  file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
                  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2
                  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`)}
                {...props}
            />
        </div>
    );
};

export default TextField;