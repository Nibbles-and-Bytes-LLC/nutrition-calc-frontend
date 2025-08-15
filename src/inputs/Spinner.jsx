import React from 'react';

const Spinner = ({ size = 'md' }) => {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-10 w-10',
    };

    return (
        <div
            className={`animate-spin rounded-full border-4 border-gray-300 border-t-blue-500 ${sizes[size]}`}
            role="status"
        />
    );
};

export default Spinner;