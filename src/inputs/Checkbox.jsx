


import { Check } from 'lucide-react';
import React, { forwardRef, useEffect, useState } from 'react';

const Label = ({ label, subLabel, id, onClick, labelIcon, required }) => (
    <div>
        <label className="flex gap-1 items-center leading-[20px] text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold text-textColor" htmlFor={id} onClick={onClick}>
            <>{label}{required && '*'}</>
            {labelIcon}
        </label>
        {subLabel && <p className="text-sm text-gray-600 font-light">{subLabel}</p>}
    </div>
)
const CheckBox = forwardRef(({ label, labelIcon, id, lablePosition = "right", checked, subLabel, required = false, ...props }, ref) => {
    const [checkBox, setCheckbox] = useState(false);

    useEffect(() => {
        setCheckbox(checked);
    }, [checked])

    function onClick() {
        setCheckbox(!checkBox);
        if (props?.onChange) {
            props?.onChange(!checkBox)
        }
    }
    return (
        <div className="" >

            <div className="flex cursor-pointer items-center space-x-2" ref={ref}>
                {(label && lablePosition === "left") && <Label  {...{ required, subLabel, label, id, onClick, labelIcon }} />}
                <button
                    type="button"
                    role="checkbox"
                    aria-checked={checkBox ? "true" : "false"}
                    data-state={checkBox ? "checked" : "unchecked"}
                    value="on"
                    className="peer h-4 w-4 shrink-0  border border-darkBlue rounded-[3px] ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
                    focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-darkBlue data-[state=checked]:text-white"
                    onClick={() => onClick()}
                >
                    {checkBox &&
                        <span data-state="checked" className="flex items-center justify-center text-current" >
                            <Check className='h-4 w-4' />
                        </span>
                    }
                </button>
                {(label && lablePosition === "right") && <Label {...{ required, subLabel, label, id, onClick, labelIcon }} />}
            </div>
        </div>
    );
});

export default CheckBox;