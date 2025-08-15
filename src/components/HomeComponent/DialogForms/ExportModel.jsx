import * as Dialog from '@radix-ui/react-dialog';
import ButtonComponent from '../../../inputs/Button';
import TextField from '../../../inputs/TextField';
import { useRef, useState } from 'react';
import CheckBox from "../../../inputs/Checkbox";

import { X, Download, FileImage, FileText, Layers, AlertTriangle, Check } from "lucide-react";
import CustomScrollArea from '../../../inputs/CustomScrollArea';
import classNames from 'classnames';
import _ from 'lodash';

const exportFormats = [
    { id: "pdf", label: "PDF", icon: FileText, description: "High-quality print-ready format" },
    { id: "png", label: "PNG", icon: FileImage, description: "High-resolution image" },
    { id: "svg", label: "SVG", icon: Layers, description: "Scalable vector format" },
    { id: "jpg", label: "JPG", icon: FileImage, description: "Compressed image format" },
]

const ExportModal = props => {
    const { isOpen, onClose, successMessage, nutritionData, onExportClick, isEmailSending, dualLayoutHookData, aggregateLayoutHookData } = props;

    const [email, setEmail] = useState("")
    const [selectedFormats, setSelectedFormats] = useState(["pdf"]);
    const [errors, setErrors] = useState({ emailError: false, termsError: false });
    const checkboxRef = useRef(null);

    // const [optIn, setOptIn] = useState(false)
    const [agreedToTerms, setAgreedToTerms] = useState(false)

    const handleFormatToggle = (formatId) => {
        setSelectedFormats((prev) => (prev.includes(formatId) ? prev.filter((id) => id !== formatId) : [...prev, formatId]))
    }

    const validateRequiredFields = () => {
        const requiredFields = [
            "servingsPerContainer",
            "servingSizeQuantity",
            "servingSizeQuantityUnits",
            "servingSizeWeight",
            "calories",
            "totalFat",
            "saturatedFat",
            "cholesterol",
            "sodium",
            "totalCarbs",
            "totalSugars",
            "protein",
        ]

        let missingFields = [];
        if (["dual-column", "dual-forms"]?.includes(nutritionData?.labelFormat)) {
            const perServing = requiredFields?.filter((field) => !{ ...dualLayoutHookData?.perServingData, ...dualLayoutHookData?.servingValues }[field]);
            const perContainer = requiredFields?.filter((field) => !{ ...dualLayoutHookData?.perContainerData, ...dualLayoutHookData?.servingValues }[field])
            missingFields = (_.intersection(requiredFields, perServing)?.length > 0 || _.intersection(requiredFields, perContainer)) ? [...perServing, ...perContainer] : [];
        } else if (nutritionData?.labelFormat === "aggregate") {
            missingFields = [];
            _.map(aggregateLayoutHookData?.products, (value) => {
                const VALUES = { ...value, ...aggregateLayoutHookData?.nuteritionFacts };
                const FILTER_VALUES = _.filter(requiredFields, (r) => !VALUES[r])
                missingFields = [...missingFields, ...FILTER_VALUES]
            })
        } else {
            missingFields = requiredFields.filter((field) => !nutritionData[field]);
        }
        return missingFields
    }

    const missingRequiredFields = validateRequiredFields()
    const hasRequiredFields = missingRequiredFields.length === 0

    const handleExport = async (e) => {
        e.preventDefault()
        if (!email) {
            setErrors({ emailError: true });
            return;
        } else if (!agreedToTerms) {
            setErrors({ termsError: true });
            checkboxRef.current.focus();
            return;
        }
        if (selectedFormats.length === 0 && !email) return;
        await onExportClick(selectedFormats, email, () => {
            setEmail('');
            setAgreedToTerms(false);
            setSelectedFormats(['pdf']);
        });
    }

    // const resetModal = () => {
    //     setAgreedToTerms(false)
    //     setOptIn(false)
    // }

    function handleCloseDialog(status) {
        onClose(status);
        setErrors({ emailError: status, termsError: status });
    }


    const buttonCss = "ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";
    return (
        <Dialog.Root open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    handleCloseDialog(open)
                }
            }}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className=" fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-2xl max-h-[90vh] ">
                    <div className="flex items-center justify-between ">
                        <Dialog.Title className="text-[#414142] font-black text-xl">Export Nutrition Label</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="text-gray-500 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <form onSubmit={handleExport} className="flex-1 overflow-hidden flex flex-col">
                        <CustomScrollArea rootClassName="">
                            <div className="space-y-6 p-1">
                                <div>
                                    <TextField
                                        label="Email Address"
                                        id="email"
                                        className={classNames({ "!border-red-500": !!errors?.emailError })}
                                        placeholder="Enter your email address"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (e.target.value) {
                                                setErrors((prv) => ({ ...prv, emailError: false }))
                                            } else {
                                                setErrors((prv) => ({ ...prv, emailError: false }))
                                            }
                                        }}
                                    />
                                    <p className="text-sm text-gray-600 mt-1 font-light">
                                        We’ll email your design files to your email address. This service is completely free.
                                    </p>
                                </div>

                                <div>
                                    <label className="font-semibold text-[#414142] mb-3 block">Export Formats</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {exportFormats.map((format) => (
                                            <div key={format.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50" onClick={() => handleFormatToggle(format.id)}>
                                                <CheckBox
                                                    id={format.id}
                                                    checked={selectedFormats.includes(format.id)}
                                                />
                                                <div className="flex items-center space-x-2 flex-1">
                                                    <format.icon className="w-4 h-4 text-[#2559a9]" />
                                                    <div>
                                                        <label htmlFor={format.id} className="font-medium text-[#414142] cursor-pointer">
                                                            {format.label}
                                                        </label>
                                                        <p className="text-xs text-gray-500 font-light">{format.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Required Fields Validation */}
                                {!hasRequiredFields && (
                                    <div className="border border-red-300 rounded-lg p-4 bg-red-50">
                                        <div className="flex items-start space-x-3">
                                            <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-semibold text-red-700 mb-2">Required Fields Missing</h4>
                                                <p className="text-sm text-red-600 mb-3">
                                                    The following FDA-required fields must be completed before exporting:
                                                </p>
                                                <ul className="text-sm text-red-600 space-y-1">
                                                    {missingRequiredFields.map((field) => (
                                                        <li key={field} className="flex items-center space-x-2">
                                                            <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                                                            <span>{field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <p className="text-sm text-red-600 mt-3">
                                                    Please return to the form and complete these required fields.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Terms and Disclaimer Section */}
                                <div className="border border-[#f05624] rounded-lg p-4 bg-orange-50">
                                    <div className="flex items-start space-x-3 mb-3">
                                        <AlertTriangle className="w-5 h-5 text-[#f05624] flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-[#414142] mb-2">Terms of Use & Disclaimer</h4>
                                            <p className="text-sm text-[#414142] font-light mb-3">
                                                Please read and agree to the following terms before exporting your nutrition label:
                                            </p>
                                        </div>
                                    </div>

                                    <div className="overflow-y-auto h-32 w-full border rounded p-3 bg-white">
                                        <div className="text-xs text-[#414142] space-y-3 font-light">
                                            <div>
                                                <h5 className="font-semibold mb-1">Nutritional Data Accuracy</h5>
                                                <p>
                                                    You are solely responsible for ensuring the accuracy of all nutritional information entered into
                                                    this tool. ePackageSupply does not verify, validate, or guarantee the accuracy of any
                                                    nutritional data provided by users.
                                                </p>
                                            </div>

                                            <div>
                                                <h5 className="font-semibold mb-1">FDA Compliance</h5>
                                                <p>
                                                    While our label formats are designed to meet FDA requirements, you are responsible for ensuring
                                                    your final labels comply with all applicable federal, state, and local regulations. We strongly
                                                    recommend consulting with food safety professionals and having your products analyzed by
                                                    certified laboratories.
                                                </p>
                                            </div>

                                            <div>
                                                <h5 className="font-semibold mb-1">Professional Consultation</h5>
                                                <p>
                                                    This tool is provided for convenience and should not replace professional nutritional analysis
                                                    or regulatory consultation. For commercial use, consult with qualified food scientists,
                                                    nutritionists, and regulatory experts.
                                                </p>
                                            </div>

                                            <div>
                                                <h5 className="font-semibold mb-1">Limitation of Liability</h5>
                                                <p>
                                                    ePackageSupply shall not be liable for any damages, claims, or losses arising from the use of
                                                    nutrition labels generated by this tool, including but not limited to regulatory violations,
                                                    product recalls, or consumer health issues.
                                                </p>
                                            </div>

                                            <div>
                                                <h5 className="font-semibold mb-1">Commercial Use</h5>
                                                <p>
                                                    If using these labels for commercial products, you acknowledge that you have obtained proper
                                                    nutritional analysis from certified laboratories and have consulted with appropriate regulatory
                                                    and legal professionals.
                                                </p>
                                            </div>

                                            <div>
                                                <h5 className="font-semibold mb-1">Updates and Changes</h5>
                                                <p>
                                                    FDA regulations may change over time. You are responsible for ensuring your labels remain
                                                    compliant with current regulations and updating them as necessary.
                                                </p>
                                            </div>
                                            <div>
                                                <h5 className="font-semibold mb-1">Communications Consent</h5>
                                                <p> By using this tool you consent to future email communications and marketing messages from ePackageSupply</p>
                                            </div>

                                            <div className="pt-2 border-t border-gray-200">
                                                <p className="font-medium">
                                                    By proceeding with the export, you acknowledge that you have read, understood, and agree to
                                                    these terms and accept full responsibility for the use of the generated nutrition labels.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <CheckBox
                                            ref={checkboxRef}
                                            id="agreedToTerms"
                                            checked={agreedToTerms}
                                            onChange={(checked) => {
                                                setAgreedToTerms(checked);
                                                setErrors(prv => ({ ...prv, termsError: checked ? false : true }))
                                            }}
                                            className="mt-1"
                                            label="I agree to the Terms of Use & Disclaimer"
                                        />
                                        {errors?.termsError && <span className='text-red-600 text-xs'>Please accept the terms and conditions.</span>}
                                    </div>
                                </div>

                                {/* <div className="flex items-center space-x-2">
                                    <CheckBox
                                        id="export-optin"
                                        checked={optIn}
                                        onChange={(checked) => setOptIn(checked)}
                                        label="Send me updates about new packaging tools and solutions"
                                    />
                                </div> */}

                                <div className="bg-[#acd9ea] bg-opacity-20 p-4 rounded-lg">
                                    <h4 className="font-semibold text-[#414142] mb-2">Export Summary</h4>
                                    <ul className="text-sm text-[#414142] font-light space-y-1">
                                        <li>• Product: {nutritionData.productName || "Untitled Product"}</li>
                                        <li>
                                            • Format:{" "}
                                            {nutritionData.labelFormat.charAt(0).toUpperCase() +
                                                nutritionData.labelFormat.slice(1).replace("-", " ")}
                                        </li>
                                        <li>• File Types: {selectedFormats.map((f) => f.toUpperCase()).join(", ")}</li>
                                    </ul>
                                </div>
                            </div>
                        </CustomScrollArea>

                        {/* Buttons section - outside ScrollArea so always visible */}
                        <div className="border-t pt-4 mt-4 flex-shrink-0">
                            <div className="flex gap-3">
                                <ButtonComponent
                                    type="button"
                                    variant=""
                                    onClick={() => handleCloseDialog(false)}
                                    className={classNames(buttonCss, "border-input bg-background hover:bg-accent hover:text-accent-foreground border h-10 px-4 py-2 flex-1")}
                                    disabled={isEmailSending}
                                >
                                    Cancel
                                </ButtonComponent>
                                <ButtonComponent
                                    variant=''
                                    type="submit"
                                    className={classNames(buttonCss, "h-10 px-4 py-2 flex-1 bg-[#f05624] hover:bg-[#d4461c] text-white", { "!bg-green-600": successMessage?.status === "success" })}
                                    disabled={isEmailSending || selectedFormats.length === 0 || !email || !hasRequiredFields}
                                >
                                    {isEmailSending ? (
                                        <>
                                            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Generating & Sending...
                                        </>
                                    ) :
                                        (successMessage?.status === "success") ? <><Check className="w-4 h-4 mr-2" />Generated & Email Sent</> : (<> <Download className="w-4 h-4 mr-2" /> Generate & Email Labels </>)
                                    }
                                </ButtonComponent>
                            </div>

                            {/* <div className="text-xs text-gray-500 text-center font-light mt-3">
                                Your nutrition labels will be generated and sent to your email within a few minutes - completely free, no
                                credit card required.
                            </div> */}
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}



export default ExportModal;