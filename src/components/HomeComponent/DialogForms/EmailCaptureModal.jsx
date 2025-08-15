import * as Dialog from '@radix-ui/react-dialog';
import ButtonComponent from '../../../inputs/Button';
import TextField from '../../../inputs/TextField';
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { encryptObjectForUrl } from '../hooks/cryptoCode';
import classNames from 'classnames';
import _ from 'lodash';

const buttonCss = "ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

const EmailCaptureModal = props => {
    const { successMessage, isEmailSending, isOpen, onClose, nutritionData, selectedLayoutObj, sendEmailWithLink, dualLayoutHookData, aggregateLayoutHookData } = props;

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState(false);
    // const [optIn, setOptIn] = useState(false)


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email) {
            let layoutData = nutritionData;
            if (["dual-column", "dual-forms"]?.includes(nutritionData?.labelFormat)) {
                layoutData = { ..._.pick(dualLayoutHookData, ["perServingData", "perContainerData", "servingValues"]), ...nutritionData };
            } else if (nutritionData?.labelFormat === "aggregate") {
                layoutData = { ..._.pick(aggregateLayoutHookData, ["products", "nuteritionFacts", "productCount"]), ...nutritionData };
            }
            const original = {
                data: layoutData,
                layout: selectedLayoutObj
            };

            const password = "744y7siduhhsujsu";
            const encrypted = await encryptObjectForUrl(original, password);
            const linkedString = `${encrypted}^${password}`;
            console.log(linkedString, encrypted, 'linkedString');
            await sendEmailWithLink(email, linkedString, () => {
                setEmail('');
            });

        } else {
            setEmailError(true);
        }
    }


    function handleCloseDialog(status) {
        onClose(status);
        setEmailError(status);
    }

    console.log(isOpen, 'isOpen')
    return (
        <Dialog.Root open={isOpen} onOpenChange={handleCloseDialog}>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg sm:max-w-md">
                    <div className="flex items-center justify-between ">
                        <Dialog.Title className="text-lg font-semibold text-gray-900">Save Your Progress</Dialog.Title>
                        <Dialog.Close asChild>
                            <button className="text-gray-500 hover:text-gray-700">
                                <X className="w-5 h-5" />
                            </button>
                        </Dialog.Close>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <TextField
                                label="Email Address"
                                id="email"
                                className={classNames({ "!border-red-500": !!emailError })}
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (e.target.value) {
                                        setEmailError(false)
                                    } else {
                                        setEmailError(true)
                                    }
                                }}
                            />
                            <p className="text-sm text-gray-600 mt-1 font-light">
                                We'll save your nutrition label progress and send you a link to continue editing. By Saving, you consent to receiving emails from ePackageSupply.
                            </p>
                        </div>

                        {/* <CheckBox id="optin" label=" I'd like to receive updates about new packaging tools and solutions from ePackageSupply" checked={optIn} onChange={(checked) => setOptIn(checked)} /> */}
                        <div className="border-t pt-4 mt-4 flex-shrink-0">
                            <div className="flex gap-3">
                                <Dialog.Close asChild>
                                    <ButtonComponent variant="secondary" type="button" className="flex-1">
                                        Cancel
                                    </ButtonComponent>
                                </Dialog.Close>
                                <ButtonComponent
                                    type='submit'
                                    disabled={isEmailSending || !email}

                                    className={classNames(`${buttonCss} h-10 px-4 py-2 flex-1 bg-darkBlue hover:bg-[#1e4a8c] text-white `, { "!bg-green-600": successMessage?.status === "success" })}
                                >
                                    {isEmailSending ?
                                        <>
                                            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                            Saving...
                                        </>
                                        : (successMessage?.status === "success") ? <><Check className="w-4 h-4 mr-2" /> Progress Saved</> : "Save"}
                                </ButtonComponent>
                            </div>
                        </div>
                    </form>

                    {/* <div className="text-xs text-gray-500 font-light">
                        By saving, you agree to our privacy policy. We'll never share your information.
                    </div> */}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}



export default EmailCaptureModal;