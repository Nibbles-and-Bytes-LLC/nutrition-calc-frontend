import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'

export const CustomAccordian = ({
    Question,
    Answer
}) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" onClick={() => setIsActive(!isActive)}>
                <h3 className="font-semibold text-primaryTextColor pr-4">{Question}</h3>
                {isActive ? <ChevronUp className='w-5 h-5 text-darkBlue flex-shrink-0' /> : <ChevronDown className='w-5 h-5 text-darkBlue flex-shrink-0' />}

            </button>
            {isActive &&
                <div className="px-6 pb-4">
                    <p className="text-primaryTextColor font-light leading-relaxed">
                        {Answer}
                    </p>
                </div>
            }
        </div>
    )
}
