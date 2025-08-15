import React, { useEffect } from 'react'
import TextField from '../../inputs/TextField'
import { X } from 'lucide-react'
import classNames from 'classnames';

export const SearchSection = ({ onClose }) => {
    const [inputValue, setInputValue] = React.useState('');
    const [products, setProducts] = React.useState([]);
    return (
        <div className="search-bar w-full global-search-bar fixed inset-x-0 top-0 bg-white transition duration-300 block translate-y-0 opacity-100 z-50" aria-hidden="false">
            <div className="p-4 relative ">
                <form action="/search" method="get" role="search" className="flex items-center">
                    <div className="w-full flex justify-center items-center">
                        <div className="w-full max-w-[53.5rem]">
                            <div className="flex gap-3 items-center bg-white sticky top-[10px] pt-[10px]">
                                <div className="relative flex-1">
                                    <TextField
                                        type="search"
                                        name="q"
                                        className="search-bar-input w-full border rounded-[6px] text-base leading-4 pr-4 py-3 pl-10 focus:outline-none active:!border-grayColor200 focus:!border-grayColor200 hover:!border-grayColor200"
                                        placeholder="Search for Buckets, Pails, Lids, Jars..."
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />

                                    <TextField name="options[prefix]" type="hidden" value="last" />

                                    <TextField type="hidden" name="type" value="product" />

                                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                        <button className="p-0 m-0 block hover:bg-transparent shadow-none" type="submit">

                                            <svg width="24" height="24" className="icon icon-search w-4 h-4 !fill-transparent !stroke-grayColor100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                            </svg>

                                            <span className="sr-only">Search</span>
                                        </button>
                                    </div>
                                </div>
                                <button type="button" data-search-close="" className="p-2 rounded-full bg-lightGray !static" onClick={onClose}>
                                    <X />
                                </button>
                            </div>
                            <div className="absolute bg-white w-screen inset-x-0 translate-y-full bottom-[12px] flex justify-center z-40">
                                <div className="w-full max-w-[53.5rem] overflow-y-auto hidden border border-grayColor100 rounded-md p-5 max-h-[calc(100vh_-_120px)] z-[1000] mt-4 mb-6" style={{ display: inputValue ? "block" : "none" }}>
                                    <div className="predictive-search-results-wrapper">
                                        <div className="flex flex-col xl:flex-row xl:gap-16">

                                            <div className="order-1 xl:order-2 flex-1"></div>

                                            <div className="xl:basis-52 order-2 xl:order-1">
                                                {products.length > 0 && (
                                                    <div className="w-full mb-5">
                                                        <span className="block text-xs uppercase text-blue-100 pb-3">Pages</span>
                                                        <ul className="flex flex-col gap-2"><li>
                                                            <a className="no-underline text-grayColor100 common-result-link" href="/pages/who-we-serve?_pos=1&amp;_psq=dd&amp;_ss=e&amp;_v=1.0" aria-label="Who We Serve">
                                                                Who We Serve
                                                            </a>
                                                        </li></ul>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {products.length === 0 && (
                                            <div className="predictive-search-footer">
                                                <p>No results found for “{inputValue}”. Check the spelling or use a different word or phrase.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="bg-black/20 absolute top-[5.625rem] bottom-0 inset-x-0 z-30 h-screen w-full transition-opacity duration-500 opacity-100"></div>
        </div>
    )
}



export const SideSearchSection = ({ onClose, isOpen }) => {
    const [inputValue, setInputValue] = React.useState('');
    const [products, setProducts] = React.useState([]);
    const [closeClicked, setCloseClicked] = React.useState(false);

    function handleClose() {
        setCloseClicked(true);
        onClose();
        setCloseClicked(true);

        setTimeout(() => {
            setCloseClicked(false);
        }, 1000)
    }
    return (
        <div
            id="predictive-search-drawer"
            className={classNames(
                "z-50 side-drawer bg-white h-screen w-[375px] border fixed top-0 right-0",
                { "close": closeClicked, "hidden": !isOpen && !closeClicked, }
            )}
        >
            <div data-overlay=""></div>
            <div>
                <form action="/search" method="get" role="search" className="px-4" data-hs-cf-bound="true" >
                    <div className="py-4 flex gap-3 items-center bg-white sticky top-0">
                        <div className="relative flex-1">
                            <TextField
                                type="search"
                                name="q"
                                className="!font-light  search-bar-input w-full border rounded-[8px] text-base leading-4 pr-4 py-3 pl-10 focus:outline-none active:!border-grayColor200 focus:!border-grayColor200 hover:!border-grayColor200"
                                placeholder="Search for Buckets, Pails, Lids, Jars..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />

                            <TextField name="options[prefix]" type="hidden" value="last" />

                            <TextField type="hidden" name="type" value="product" />

                            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                                <button className="p-0 m-0 block hover:bg-transparent shadow-none" type="submit">

                                    <svg width="24" height="24" className="icon icon-search w-4 h-4 !fill-transparent !stroke-grayColor100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </svg>

                                    <span className="sr-only">Search</span>
                                </button>
                            </div>
                        </div>
                        <button type="button" data-search-close="" className="p-2 rounded-full bg-lightGray !static" onClick={handleClose}>
                            <X />
                        </button>
                    </div>

                    <div>
                        <div className="predictive-search-results-wrapper">
                            <div className="flex flex-col xl:flex-row xl:gap-16">
                                <div className="order-1 xl:order-2 flex-1"></div>
                                <div className="xl:basis-52 order-2 xl:order-1"> </div>
                            </div>

                            <div className="predictive-search-footer font-light text-sm">
                                <p>No results found for “uuu”. Check the spelling or use a different word or phrase.</p>
                            </div>
                        </div></div>
                </form>
            </div>
        </div >
    )
}
