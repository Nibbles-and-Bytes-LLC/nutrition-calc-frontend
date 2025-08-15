import classNames from "classnames";
import { ChevronRight, X } from "lucide-react";
import { useState } from "react";

const CommonListHtml = ({ children, link, title, setIsOverlay, isResponsivehide, setIsResponsiveHide }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isResSubMenu, setIsResSubMenu] = useState(false);

    const handleMouseEnter = () => {
        setIsOpen(true);
        setIsOverlay(true)
    };

    const handleMouseLeave = () => {
        setIsOpen(false);
        setIsOverlay(false)
    };

    return (
        <>
            <li className="hidden xl:!block relative cursor-pointer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <a
                    className="flex items-center justify-between text-grayColor100 text-lg font-semibold -tracking-[0.36px] py-3  xl:font-normal xl:p-2 xl:-tracking-[0.16px] xl:text-base "
                    href={link}
                >
                    <span>{title}</span>
                    <div className="mt-1 ml-2  xl:hidden">
                        <ChevronRight className="icon icon-chevron-right fill-n-90 w-6 h-6  xl:hidden" />
                    </div>
                </a>

                {
                    isOpen &&
                    <div className={classNames("bg-white absolute h-auto w-screen inset-0 flex flex-col justify-between md:max-w-sm xl:max-w-max xl:max-h-[450px] xl:h-fit xl:shadow xl:right-auto")} style={{ top: "2.8rem" }}>
                        <span className="decoration absolute left-5 xl:z-10 -top-2 w-4 h-4 bg-white rotate-45"></span>
                        <div className="overflow-auto menu-scroll xl:z-20">
                            {children}
                        </div>
                    </div>
                }
            </li >

            {/* mobile responsive */}
            <li className="xl:hidden" >
                {!isResponsivehide &&
                    <button className="w-full flex items-center justify-between text-grayColor100 text-lg font-semibold -tracking-[0.36px] py-3  xl:font-normal xl:p-2 xl:-tracking-[0.16px] xl:text-base "
                        onClick={() => {
                            setIsResponsiveHide(true);
                            setIsResSubMenu(true);
                        }}
                    >
                        <span>{title}</span>
                        <div className="mt-1 ml-2  ">
                            <ChevronRight className="icon icon-chevron-right fill-n-90 w-6 h-6 " />
                        </div>
                    </button>
                }
                {isResSubMenu && <div className={classNames("bg-white fixed h-auto w-screen inset-0 flex flex-col justify-between md:max-w-sm xl:max-w-max xl:max-h-[450px] xl:h-fit xl:shadow xl:right-auto")} >
                    <div className="overflow-auto menu-scroll xl:z-20">
                        <div className="mobile flex items-baseline justify-between xl:hidden">
                            <button className="flex items-center -tracking-[0.4px] text-xl font-semibold py-8 px-4" onClick={() => {
                                setIsResSubMenu(false);
                                setIsResponsiveHide(false);
                            }}>
                                <ChevronRight className="icon icon-chevron-right fill-n-90 w-6 h-6 rotate-180 mr-3" />
                                {title}
                            </button>
                            <button className="rounded-full p-2 bg-n-10 absolute top-2 right-2.5" onClick={() => {
                                setIsResSubMenu(false);
                                setIsResponsiveHide(false);
                            }}>
                                <X />
                            </button>
                        </div>
                        {children}
                    </div>
                </div>}
            </li >
        </>


    )
}

export default CommonListHtml;
