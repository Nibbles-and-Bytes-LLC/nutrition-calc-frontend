import * as Toast from '@radix-ui/react-toast';
import classNames from 'classnames';
import { X } from 'lucide-react';
import React, { createContext, } from 'react';

const ToastContext = createContext();


export const CustomToaster = ({ children, open, onClose, title = "", description = "", className }) => {


    return (
        <Toast.Provider swipeDirection="up" duration={4000}>
            {children}
            <Toast.Root
                className={classNames("bg-white flex justify-between items-center border px-4 py-5 rounded shadow fixed bottom-4 right-4 w-[500px]", className)}
                open={open}
                onOpenChange={onClose}
            >
                <Toast.Title className="font-semibold">{title}</Toast.Title>
                <Toast.Description className="text-sm text-gray-600" asChild>
                    {description}
                </Toast.Description>
                <Toast.Action
                    className="ToastAction"
                    asChild
                    altText="Goto schedule to undo"
                >
                    <button type='button' className="border rounded-[30px] bg-gray-100 p-1 h-max" onClick={() => onClose(false)}><X /></button>
                </Toast.Action>
            </Toast.Root>
            <Toast.Viewport className="fixed bottom-4 right-4 z-50" />
        </Toast.Provider>
    );
};