import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';



const CustomSelect = ({ options, id, label, labelIcon, required = false, value, onChange }) => {
    return (
        <div>
            {label &&
                <label htmlFor={id} className="flex mb-2 gap-1 items-center text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold text-primaryTextColor">
                    <>{label}{required && '*'}</>
                    {labelIcon}
                </label>
            }
            <Select.Root value={value} onValueChange={onChange}>
                <Select.Trigger
                    className="inline-flex items-center justify-between w-full px-3 py-2 text-sm text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Serving size unit"
                >
                    <Select.Value placeholder="Select a unit" />
                    <Select.Icon>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                    <Select.Content
                        className="z-50 bg-white border border-gray-200 rounded-md shadow-md"
                        sideOffset={5}
                    >
                        <Select.Viewport className="p-1">
                            {options?.map((item) => (
                                <Select.Item
                                    key={item.value}
                                    value={item.value}
                                    className="relative flex items-center px-3 py-2 text-sm text-gray-700 rounded-md cursor-pointer hover:bg-blue-50 focus:outline-none select-none"
                                >
                                    <Select.ItemText className='hello'>{item.label}</Select.ItemText>
                                    <Select.ItemIndicator className="absolute right-3 inline-flex items-center justify-center">
                                        <Check className="w-4 h-4 text-blue-600" />
                                    </Select.ItemIndicator>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
        </div>
    );
};

export default CustomSelect;