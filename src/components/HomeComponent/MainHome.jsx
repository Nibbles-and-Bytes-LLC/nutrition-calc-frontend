

import { LivePreview } from './components/LivePreview';
import { FAQSection } from './components/FAQSection';
import { ProfessionalNutrition } from './components/ProfessionalNutrition';
import { WhyChooseSupply } from './components/WhyChooseSupply';
import { MainNuteritionForm } from './components/MainNuteritionForm';
import { FDAComplience } from './components/FDAComplience';
import { LabelFormat } from './components/LabelFormat';
import EmailCaptureModal from './DialogForms/EmailCaptureModal';
import ExportModal from './DialogForms/ExportModel';
import useHomeHook from './hooks/useHomeHook';
import { CustomToaster } from '../../inputs/CustomToaster';
import useDualLayoutHook from './components/DualLayoutSection/useDualLayoutHook';
import useAggregateLayoutHook from './components/AggregateLayoutSection/useAggregateLayoutHook';

const MainHome = () => {
    const {
        divRef,
        labelFormats,
        selectedLayoutObj,
        showEmailCapture, setShowEmailCapture,
        showExportModal, setShowExportModal,
        nutritionData,
        isEmailSending,
        successMessage, setSuccessMessage,

        handleSave,
        sendEmailWithLink,
        handleExport,
        handleChange,
        handleExportOnSelectedFormat,
        decryptFunction
    } = useHomeHook();
    console.log(nutritionData, 'nutritionData')

    const dualLayoutHookData = useDualLayoutHook({ layout: nutritionData?.labelFormat, selectedLayoutObj, decryptFunction });
    const aggregateLayoutHookData = useAggregateLayoutHook({ layout: nutritionData?.labelFormat, selectedLayoutObj, decryptFunction });

    return (
        <>
            <div className="container mx-auto px-4 py-8 xl:!container">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        ✨ 100% FREE • No Credit Card Required • FDA-Compliant Labels
                    </div>
                    <h1 className="text-4xl font-black text-textColor mb-4">Free Nutrition Label Generator</h1>
                    <p className="text-lg text-textColor font-light max-w-4xl mx-auto mb-6">
                        Create professional, FDA-compliant nutrition labels for your products completely free. Choose from multiple
                        formats and customize every detail - no hidden costs, no credit card required.
                    </p>
                </div>
                {/* rid lg:grid-cols-12 gap-8 */}
                <div className=" grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-12 gap-4 sm:gap-6 md:gap-8">
                    <div className="lg:col-span-5 space-y-6">
                        <FDAComplience />
                        <LabelFormat {...{ labelFormats, data: nutritionData, handleChange }} />
                        <MainNuteritionForm {...{ data: nutritionData, handleChange, dualLayoutHookData, aggregateLayoutHookData }} />
                    </div>

                    <div className="lg:col-span-7">
                        <div className="lg:sticky lg:top-[10rem]">
                            <LivePreview
                                divRef={divRef}
                                showExportModal={showExportModal}
                                data={nutritionData}
                                onSave={handleSave}
                                onExport={handleExport}
                                dualLayoutHookData={dualLayoutHookData}
                                aggregateLayoutHookData={aggregateLayoutHookData}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ compnent */}
            <FAQSection />
            {/* Professional Nutrition Component*/}
            <ProfessionalNutrition />
            {/* Why Choose Supply component*/}
            <WhyChooseSupply />

            <EmailCaptureModal
                {...{ successMessage, sendEmailWithLink, selectedLayoutObj, nutritionData, dualLayoutHookData, aggregateLayoutHookData, isEmailSending }}
                isOpen={showEmailCapture}
                onClose={() => setShowEmailCapture(false)}
            />

            <ExportModal
                {...{ successMessage, isEmailSending, nutritionData, dualLayoutHookData, aggregateLayoutHookData }}
                onExportClick={handleExportOnSelectedFormat}
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
            />
            <CustomToaster
                open={!!successMessage?.status}
                title={successMessage?.message}
                onClose={() => setSuccessMessage({ status: '', message: '' })}
                className={successMessage?.status === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}
            />
        </>
    )
}

export default MainHome;
