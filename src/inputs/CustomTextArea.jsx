import React from 'react';


const CustomTextArea = ({ label, id, rows = 3, note, required = false, labelIcon, ...props }) => {
    return (
        <div className="w-full">
            {label && (
                <label className="flex gap-1 items-center mb-2 text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold text-primaryTextColor" htmlFor={id}>
                    <>{label}{required && '*'}</>
                    {labelIcon}
                </label>
            )}
            <textarea
                id={id}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background 
                placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 
                focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                rows={rows}
                {...props}
            >

            </textarea>
            {note &&
                <p class="tracking-[1px] text-xs text-gray-600 mt-1 font-light">{note}</p>
            }
        </div>
    );
};

export default CustomTextArea;