
import { Info } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { useState } from 'react';



function InfoTooltip({ children }) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Tooltip.Provider>
            <Tooltip.Root open={isOpen} onOpenChange={setIsOpen}>
                <Tooltip.Trigger asChild>
                    <Info
                        className="w-4 h-4 text-darkBlue cursor-pointer ml-1 flex-shrink-0 hover:text-[#1e4a8c] transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    />
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content className="z-50 font-semibold overflow-hidden rounded-md border bg-white text-[#020817] shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 max-w-xs p-3 text-sm" sideOffset={5}>
                        <div>{children}</div>
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    )
}


export default InfoTooltip;