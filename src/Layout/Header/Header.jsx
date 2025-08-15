import { useState } from 'react'
import SvGComPonent from '../../common/SvgComponets';

import { AlignJustify, Phone, Search, ShoppingCart, Tag, UserRound, X } from 'lucide-react';
import ButtonComponent from '../../inputs/Button';
import classNames from 'classnames';
import _ from 'lodash';
import { LISTING_ARRAY_WITH_STYLE } from './HeaderMethods';
import CommonListHtml from './CommonHeaderList';
import { HomeSearchSection } from '../../components/HomeComponent/components/Common';
import { SearchSection, SideSearchSection } from './SearchSection';


const HeaderUpperSection = ({ isShowSearch, onMobileClick, handleSearchChange }) => {
    return (
        <div className="container p-0 flex justify-between items-center">
            <div className="flex items-center flex-grow">
                <button className="xl:hidden mr-4" onClick={onMobileClick}>
                    <AlignJustify />
                </button>
                <a href="/" className="block" >
                    <SvGComPonent iconName="siteLogo" />
                </a>
                <div className="hidden xl:block ml-8 xl:w-full xl:mr-16 xl:max-w-[518px]">
                    {/* <HomeSearchSection onClick={handleSearchChange} /> */}
                    {isShowSearch && <SearchSection onClose={handleSearchChange} />}
                </div>
            </div>

            <div className="flex items-center gap-1 xl:gap-3 text-[.75rem]">
                <div className="items-center mr-3 p-2 hidden xl:flex xl:mr-0">
                    <Phone className="icon icon-phone !stroke-grayColor100 !w-6 !h-6 mr-2" />
                    <div className="text-xs text-grayColor100">
                        <div className="uppercase font-semibold">Customer service</div>
                        <div>
                            <a href="tel:+(888) 631-0888" className="text-sm">(888) 631-0888</a>
                            &nbsp;or&nbsp;
                            <a href="/pages/contact-us" className="underline">Contact us</a>
                        </div>
                    </div>
                </div>

                <div className="px-3 py-2 xl:p-2">
                    <a className="text-sm uppercase font-bold xl:flex xl:items-end" href="https://epackagesupply.com/customer_authentication/redirect?locale=en&region_country=US" aria-label="Account">
                        <UserRound className='fill-transparent-100 w-6 w-6 mr-2 hidden lg:block' />
                        <span className="leading-3 uppercase text-xs font-bold block text-grayColor100 self-center">Sign in</span>
                    </a>
                </div>

                <div className="p-2">
                    <a className="minicart-button inline-block relative" href="/cart">
                        <span className="sr-only !stroke-grayColor100">Shopping cart</span>
                        <ShoppingCart className='!w-6 !h-6 !stroke-grayColor100 fill-none' />
                        <span className="hidden absolute bottom-2.5 left-3.5 inline-block pt-1 pb-0.5 px-2 text-xs leading-none whitespace-nowrap font-bold text-white bg-orange-100 rounded-full">0</span>
                    </a>
                </div>
            </div>
        </div>

    )
};



const HederLowerSection = ({ isShowSearch, handleSearchChange, showMobileSidebar, setShowMobileSidebar, setIsOverlay }) => {
    const [isResponsivehide, setIsResponsiveHide] = useState(false);

    return (
        <div className={classNames("container  p-4 z-10 fixed bg-white h-screen w-screen inset-0 flex flex-col justify-between   xl:block xl:bg-transparent xl:relative xl:z-40 xl:w-auto xl:h-max xl:px-0 xl:pb-0 xl:pt-4 hidden", { "!block": showMobileSidebar })} >
            <ul className="flex flex-col xl:items-center xl:flex-row xl:justify-between xl:pb-2">
                <div className="mobile mb-6 xl:hidden flex items-center justify-between">
                    <div className="text-2xl font-extrabold mt-2 -tracking-[0.48px]">All Products</div>
                    <button className="rounded-full p-2 bg-n-10" onClick={() => setShowMobileSidebar(false)}><X /></button>
                </div>
                <div className="mobile block mb-4 xl:hidden w-full">
                    {/* <HomeSearchSection onClick={() => handleSearchChange()} /> */}
                    {isShowSearch && <SearchSection onClose={handleSearchChange} />}
                </div>

                {_.map(LISTING_ARRAY_WITH_STYLE, (row) => {

                    return <CommonListHtml link={row?.link} key={row?.title} title={row?.title} setIsOverlay={setIsOverlay} {...{ isResponsivehide, setIsResponsiveHide }}>
                        <ul className="px-4 xl:p-2">
                            {_.map(row?.listArray, (item, idx) => (
                                <li key={row?.title.replace(' ', '') + idx}>
                                    <a href={item.href}
                                        className={classNames(`text-base py-3 inline-block xl:px-3 xl:w-full hover:bg-hoverBlue text-grayColor100`, { "!text-linkColor": item?.isActive })}
                                    >
                                        <span>{item?.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </CommonListHtml>
                })}
                {!isResponsivehide &&
                    <a className="font-semibold text-lg -tracking-[0.36px]  py-3  xl:p-2 -xl:tracking-[0.16px] xl:-tracking-[0.16px] xl:text-base flex items-center" style={{ color: "#2559a9" }} href="#">
                        <Tag size={20} />
                        &nbsp;Sale
                    </a>
                }
            </ul>

        </div>
    );
}

const Header = () => {

    const [showMobileSidebar, setShowMobileSidebar] = useState(false);
    const [isShowOverlay, setIsOverlay] = useState(false);
    const [isShowSearch, setShowSearch] = useState(false);

    function handleSearchChange() {
        setShowSearch(!isShowSearch);
        setIsOverlay(!isShowOverlay)
    }

    return (
        <div className="header-section sticky top-0 z-30 w-full">
            <header className="border-b border-n-30 bg-white block py-4 px-4 xl:px-20 xl:pb-0 menu-bottom">
                <HeaderUpperSection {...{ isShowSearch, handleSearchChange }} onMobileClick={() => setShowMobileSidebar(true)} />
                <div className="p-0 mobile xl:hidden container mt-3 mb-4">
                    {/* <SideSearchSection isOpen={isShowSearch} onClose={() => handleSearchChange()} /> */}
                    <HomeSearchSection onClick={() => handleSearchChange()} />
                </div>

                <div className="mobile p-0 container items-center justify-between text-xs leading-3 text-grayColor100 flex xl:hidden">
                    <div className="flex items-center">
                        <Phone className='!stroke-grayColor100 !w-4 !h-4 mr-2 inline-block' />
                        <span className="uppercase font-semibold mr-2 inline-block">Customer service</span>
                        <span className="inline-block"><a href="tel:(888) 631-0888" className="text-sm">(888) 631-0888</a></span>
                        <a href="#" className="underline inline-block ml-2">Contact us</a>
                    </div>
                </div>

                <HederLowerSection  {...{ isShowSearch, handleSearchChange, showMobileSidebar, setShowMobileSidebar, setIsOverlay }} />
                <div className={classNames("global-overlay hidden", { "!block": isShowOverlay })}></div>
            </header>
        </div>
    )
}

export default Header;