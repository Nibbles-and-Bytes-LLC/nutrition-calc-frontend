import React from 'react';
import SubscribeForm from './NewsLetterForm';


const CommonList = ({ href, title }) => (
    <li>
        <a href={href} className="text-grayColor200 text-base ">
            <span>{title}</span>
        </a>
    </li>
)
export const Footer = () => {
    return (
        <div id="shopify-section-footer-newsletter" className="shopify-section"><footer className="bg-white pb-5" data-type="footer_newsletter">
            <hr className="text-n-30 pb-8 lg:pb-16" />

            <div className="container px-4 flex flex-col md:flex-row justify-between gap-8">
                <div className="footer__newsletter flex-1 md:max-w-[14rem] lg:max-w-[15rem] xl:max-w-[21.4375rem]">
                    <div className="footer__newsletter-wrapper bg-[#fffff] py-8 px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto rounded-lg">
                        <h3 className="text-[28px] font-black  mb-2" style={{ fontFamily: "'Proxima Nova', sans-serif" }}>
                            Stay in the Know
                        </h3>
                        <p className="text-[16px] text-primaryTextColor mb-6 max-w-xl mx-auto" style={{ fontFamily: "'Proxima Nova', sans-serif" }}>
                            Sign up for exclusive discounts, expert packaging tips, and product updates designed to help your business grow. No spam—just value.
                        </p>
                        <div className="mt-4">
                            <div className="hs-form-iframe" width="100%"
                                style={{ position: "static", border: "none", display: "block", overflow: "hidden", width: "100%", height: "154px" }} height="154">
                                <SubscribeForm />
                            </div>
                        </div>

                        <script defer="" charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/embed/v2.js"></script>

                    </div>

                    <ul className="flex items-center gap-5 py-5">


                        <li className="lg:mx-1.5 lg:first:ml-0 lg:last:mr-0">
                            <a href="https://www.facebook.com/epackagesupply" aria-describedby="facebook-label" target="_blank">
                                <span id="facebook-label" className="hidden">Facebook</span>
                                <svg width="24" height="24" className="icon icon-facebook w-5 fill-blue-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17.525 9H14V7C14 5.968 14.084 5.318 15.563 5.318H17.431V2.138C16.522 2.044 15.608 1.998 14.693 2C11.98 2 10 3.657 10 6.699V9H7V13L10 12.999V22H14V12.997L17.066 12.996L17.525 9Z" fill="currentColor"></path>
                                </svg>

                            </a>
                        </li>

                        <li className="lg:mx-1.5 lg:first:ml-0 lg:last:mr-0 ">
                            <a href="https://www.instagram.com/epackagesupply/" aria-describedby="instagram-label" target="_blank">
                                <span id="instagram-label" className="hidden">Instagram</span>
                                <svg width="24" height="24" className="icon icon-instagram w-5 fill-blue-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 3C5.243 3 3 5.243 3 8V16C3 18.757 5.243 21 8 21H16C18.757 21 21 18.757 21 16V8C21 5.243 18.757 3 16 3H8ZM8 5H16C17.654 5 19 6.346 19 8V16C19 17.654 17.654 19 16 19H8C6.346 19 5 17.654 5 16V8C5 6.346 6.346 5 8 5ZM17 6C16.7348 6 16.4804 6.10536 16.2929 6.29289C16.1054 6.48043 16 6.73478 16 7C16 7.26522 16.1054 7.51957 16.2929 7.70711C16.4804 7.89464 16.7348 8 17 8C17.2652 8 17.5196 7.89464 17.7071 7.70711C17.8946 7.51957 18 7.26522 18 7C18 6.73478 17.8946 6.48043 17.7071 6.29289C17.5196 6.10536 17.2652 6 17 6ZM12 7C9.243 7 7 9.243 7 12C7 14.757 9.243 17 12 17C14.757 17 17 14.757 17 12C17 9.243 14.757 7 12 7ZM12 9C13.654 9 15 10.346 15 12C15 13.654 13.654 15 12 15C10.346 15 9 13.654 9 12C9 10.346 10.346 9 12 9Z" fill="currentColor"></path>
                                </svg>

                            </a>
                        </li>

                        <li className="lg:mx-1.5 lg:first:ml-0 lg:last:mr-0">
                            <a href="https://www.linkedin.com/company/epackage-supply/" aria-describedby="linkedin-label" target="_blank">
                                <span id="linkedin-label" className="hidden">Linkedin</span>
                                <svg width="24" height="24" className="icon icon-linkedin w-5 fill-blue-100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M19 3H5C3.895 3 3 3.895 3 5V19C3 20.105 3.895 21 5 21H19C20.105 21 21 20.105 21 19V5C21 3.895 20.105 3 19 3ZM9 17H6.477V10H9V17ZM7.694 8.717C6.923 8.717 6.408 8.203 6.408 7.517C6.408 6.831 6.922 6.317 7.779 6.317C8.55 6.317 9.065 6.831 9.065 7.517C9.065 8.203 8.551 8.717 7.694 8.717ZM18 17H15.558V13.174C15.558 12.116 14.907 11.872 14.663 11.872C14.419 11.872 13.605 12.035 13.605 13.174C13.605 13.337 13.605 17 13.605 17H11.082V10H13.605V10.977C13.93 10.407 14.581 10 15.802 10C17.023 10 18 10.977 18 13.174V17Z" fill="currentColor"></path>
                                </svg>

                            </a>
                        </li>

                    </ul>

                    <div className="[&amp;_*]:!text-sm [&amp;_*]:!text-primaryTextColor [&amp;_*]:!m-0 mt-4">

                    </div>
                </div>
                <ul className="flex flex-col md:flex-row gap-6 lg:gap-[7.75rem]">
                    <li className="block">
                        <span className="text-grayColor100 text-lg font-semibold block mb-2">Company</span>
                        <ul className="flex flex-col gap-2">

                            <CommonList href="/pages/about-us" title="About Us" />
                            <CommonList href="/pages/contact-us" title="Contact Us" />

                            <CommonList href="/pages/reviews" title="Customer Reviews" />
                            <CommonList href="/pages/who-we-serve" title="Industries We Serve" />
                            <CommonList href="/pages/storage" title="Warehouse Storage" />
                            <CommonList href="https://referral.epackagesupply.com/" title="Referral Program" />
                            <CommonList href="/policies/terms-of-service" title="Terms of Service" />

                            <CommonList href="/policies/shipping-policy" title="Shipping Policy" />
                            <CommonList href="/policies/privacy-policy" title="Privacy Policy" />
                            <CommonList href="/policies/refund-policy" title="Return/Refund Policy" />


                            <CommonList href="https://acsbace.com/reports/6813776766e53c6a47987066" title="Accessibility Report" />
                            <CommonList href="/products/5-gallon-bucket-bpa-free-food-grade-t40mw" title="5 Gallon Buckets" />

                        </ul>
                    </li>
                    <li className="block">
                        <span className="text-grayColor100 text-lg font-semibold block mb-2">Quick Links</span>
                        <ul className="flex flex-col gap-2">
                            <CommonList href="/blogs/packaging-guide" title="Packaging Blog" />
                            <CommonList href="https://catalog.epackagesupply.com/publication" title="Our Digital Catalog" />
                            <CommonList href="/pages/custom-printing-solutions" title="Custom Printing & Labeling" />
                            <CommonList href="/pages/labeling-resources" title="Labeling Resources" />
                            <CommonList href="https://epackagesupply.com/blogs/packaging-guide/plastic-packaging-symbols-recycling-codes" title="Packaging Symbols" />
                            <CommonList href="/pages/plastics-101" title="Plastics 101" />
                            <CommonList href="/pages/careers" title="Careers (We're Hiring!)" />
                            <CommonList href="/pages/audit" title="Packaging Audit" />
                            <CommonList href="/pages/request-a-sample" title="Request a Sample" />
                            <CommonList href="/pages/tax-exempt-forms" title="Tax Exempt Forms" />
                            <CommonList href="/pages/credit-application" title="Credit Application" />
                            <CommonList href="/pages/made-in-usa" title="Made in America Packaging" />

                        </ul>
                    </li>
                    <li className="block">
                        <span className="text-grayColor100 text-lg font-semibold block mb-2">Customer Service</span>
                        <ul className="flex flex-col gap-2">
                            <CommonList href="/pages/faq" title="FAQs" />
                            <CommonList href="tel:(888) 631-0888" title="(888) 631-0888" />
                            <CommonList href="/pages/contact-us" title="Email us" />
                        </ul>
                    </li>
                </ul>
            </div>

            <hr className="text-n-30 mt-8 lg:mt-16 mb-5" />

            <div className="footer-icons_social-icons container px-4 flex flex-col justify-between md:flex-row gap-5">
                <div className="font-primary font-normal text-sm text-grayColor200">© 2025 <a href="/" title="">epackagesupply.com</a></div>

                <ul className="flex gap-4">
                </ul>
            </div>
        </footer>
        </div>
    )
}



export default Footer;