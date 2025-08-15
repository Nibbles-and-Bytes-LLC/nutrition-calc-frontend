import classNames from 'classnames';
import _ from 'lodash';
import ButtonComponent from '../../../inputs/Button';

export const ProfessionalNutrition = () => {
    const CompleteLabelingSolution = [
        { label: "12 FDA-Approved Formats:", text: "Choose from standard, tabular, linear, bilingual, and specialized formats for different product types and package sizes.", color: "bg-darkBlue" },
        { label: "Real-Time Preview:", text: "See your nutrition label update instantly as you enter data, ensuring accuracy before export.", color: "bg-darkOrange" },
        { label: "Professional Export Options:", text: "Download high-resolution files in PDF, PNG, SVG, and JPG formats ready for professional printing.", color: "bg-yellow" },
        { label: "Complete Ingredient Management:", text: "Include ingredient lists, allergen information, and manufacturer details all in one place.", color: "bg-darkBlue" }
    ]


    const CompleteYourProduct = [
        { label: "Custom Design Services:", text: "Professional graphic design team creates eye-catching packaging", color: "bg-darkBlue" },
        { label: "Nutrition Label Integration:", text: "Seamlessly incorporate your FDA-compliant label", color: "bg-darkBlue" },
        { label: "Food-Grade Materials:", text: "Safe, compliant packaging for all food products", color: "bg-darkBlue" },
        { label: "Shelf-Ready Solutions:", text: "Professional packaging that's retail-ready", color: "bg-darkBlue" },
        { label: "Small to Medium Runs:", text: "Perfect for growing businesses and product launches", color: "bg-darkBlue" }

    ]
    return (
        <>

            <section className="bg-lightBlue bg-opacity-20 py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-black text-textColor mb-4">Professional Nutrition Labeling Made Simple</h2>
                            <p className="text-lg text-textColor font-light">
                                Create FDA-compliant nutrition labels that meet professional standards and regulatory requirements
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-2xl font-semibold text-textColor mb-6">Complete Labeling Solution</h3>
                                <div className="space-y-4">
                                    {_.map(CompleteLabelingSolution, (row, idx) => (
                                        <div className="flex items-start space-x-3" key={"solution" + idx}>
                                            <div className={classNames("w-2 h-2 rounded-full mt-2 flex-shrink-0", row?.color)}></div>
                                            <p className="text-primaryTextColor font-light"><strong>{row?.label}</strong> {row?.text}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Important Note - moved here for better balance */}
                                <div className="mt-8 bg-orange-50 border border-darkOrange rounded-lg p-6">
                                    <h4 className="font-semibold text-textColor mb-2">Important Note</h4>
                                    <p className="text-sm text-textColor font-light">
                                        While our nutrition label generator creates FDA-compliant formats, you are responsible for ensuring
                                        the accuracy of nutritional data. We recommend having your products analyzed by a certified
                                        laboratory and consulting with food safety professionals for commercial use.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-darkBlue">
                                <h3 className="text-xl font-semibold text-textColor mb-4">
                                    Complete Your Product with Custom Packaging
                                </h3>
                                <p className="text-textColor font-light mb-6">
                                    Take your nutrition label to the next level! Our custom design team can integrate your nutrition label
                                    into fully custom, shelf-ready food-grade packaging that makes your product stand out on store
                                    shelves.
                                </p>

                                <div className="space-y-4 mb-8">
                                    {_.map(CompleteYourProduct, (row, idx) => (
                                        <div className="flex items-start space-x-3" key={"productComplete" + idx}>
                                            <div className="w-1.5 h-1.5 bg-darkBlue rounded-full mt-2 flex-shrink-0"></div>
                                            <span className="text-sm text-textColor font-light">
                                                <strong>{row?.label}</strong> {row?.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <ButtonComponent variant='' className="w-full bg-darkBlue hover:bg-[#1e4a8c] text-white">
                                    <a href='https://epackagesupply.com/pages/custom-printing-solutions' className="btn btn-outline flex justify-center items-center space-x-2">
                                        Explore Custom Packaging Design
                                    </a>
                                </ButtonComponent>
                            </div>
                        </div>

                        <div className="mt-12 text-center"></div>
                    </div>
                </div>
            </section>
        </>
    )
}
