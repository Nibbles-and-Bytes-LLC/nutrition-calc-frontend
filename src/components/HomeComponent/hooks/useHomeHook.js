import { useEffect, useState } from "react";
import { useRef } from "react";
import { PDFDocument } from "pdf-lib";
import domtoimage from "dom-to-image";
import _ from "lodash";
import API from "../../../helpers/API";
import { useSearchParams } from "react-router";
import { decryptObjectFromUrl } from "./cryptoCode";

// const [form, setForm] = useState({});
// const svgRef = useRef();

const useHomeHook = () => {
    const [searchParam] = useSearchParams()
    const labelFormats = [
        { value: "standard", label: "Standard Vertical Label" },
        { value: "linear", label: "Linear Display" },
        { value: "tabular", label: "Tabular Display" },
        { value: "tabular-full", label: "Tabular Format (Full Width)" },
        { value: "aggregate", label: "Aggregate Display" },
        { value: "dual-column", label: "Dual Column Display" },
        { value: "dual-forms", label: "Dual Columns, Two Forms" },
        { value: "simplified", label: "Simplified Display" },
        { value: "micronutrients-side", label: "Vertical with Micronutrients Side-by-Side" },
        { value: "infant", label: "Infants through 12 Months" },
        { value: "children", label: "Children 1-3 Years" },
        { value: "bilingual", label: "English/Spanish Bilingual" },
    ]


    const [nutritionData, setNutritionData] = useState({
        productName: "",
        servingsPerContainer: "",
        servingSizeQuantity: "",
        servingSizeQuantityUnits: "",
        servingSizeWeight: "",
        servingSizeUnit: "grams",
        rounding: "default",
        calories: "",
        totalFat: "",
        saturatedFat: "",
        transFat: "",
        cholesterol: "",
        sodium: "",
        totalCarbs: "",
        dietaryFiber: "",
        totalSugars: "",
        addedSugars: "",
        protein: "",
        vitaminD: "",
        calcium: "",
        iron: "",
        potassium: "",
        // New optional nutrients
        vitaminA: "",
        vitaminC: "",
        vitaminE: "",
        thiamin: "",
        riboflavin: "",
        niacin: "",
        vitaminB6: "",
        folate: "",
        vitaminB12: "",
        phosphorus: "",
        magnesium: "",
        zinc: "",
        ingredients: "",
        contains: "",
        showIngredientBorder: true,
        companyName: "",
        companyAddress: "",
        labelFormat: "standard",
        transparentBackground: false,
        addIngredientInfo: true,
        // Spanish translations
        productNameSpanish: "",
        ingredientsSpanish: "",
        containsSpanish: "",
        companyNameSpanish: "",
        companyAddressSpanish: "",
    });

    const [showEmailCapture, setShowEmailCapture] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [selectedLayoutObj, setSelectedLayoutObj] = useState(null);
    const [isEmailSending, setIsEmailSending] = useState(false);
    const [successMessage, setSuccessMessage] = useState({ status: '', message: '' });

    const divRef = useRef(null);
    async function decryptFunction(setNuterition, currentLayout) {
        try {
            const PENDING_PROCESS_DATA = searchParam.get('pp');
            if (PENDING_PROCESS_DATA) {
                const [encrypted, password] = PENDING_PROCESS_DATA.split('^');
                console.log(password, 'PENDING_PROCESS_DATA', PENDING_PROCESS_DATA.split('^'));

                if (encrypted && password) {
                    // Decrypt the data
                    const decrypted = await decryptObjectFromUrl(encrypted, password);
                    if (decrypted) {
                        console.log(decrypted, 'decrypted')
                        setSelectedLayoutObj(decrypted?.layout);
                        setNutritionData({ ..._.omit(decrypted?.data, ["perServingData", "perContainerData", "servingValues"]), labelFormat: currentLayout || decrypted?.layout.value })

                        if (setNuterition) {
                            setNuterition(decrypted?.data, decrypted?.layout.value);
                        }
                    }
                }
            } else {
                if (setNuterition) setNuterition(null);
            }
        } catch (error) {
            console.error("Error decrypting data:", error);
            setSelectedLayoutObj(labelFormats[0]); // Fallback to default layout if decryption fails
        }
    }

    useEffect(() => {
        decryptFunction()
    }, []);


    const handleSave = () => {
        setShowEmailCapture(true)
    }

    const handleExport = () => {
        setShowExportModal(true)
    }


    const handleChange = (field, value) => {
        if (field === "labelFormat") {
            const FIND_LAYOUT = _.find(labelFormats, { value })
            setSelectedLayoutObj(FIND_LAYOUT);
        }
        setNutritionData({ ...nutritionData, [field]: value })
    }


    // Add function to determine if we need "Not a significant source" statement
    const getInsignificantNutrients = (data) => {
        const insignificant = []

        // Check each nutrient against FDA thresholds
        if (Number.parseFloat(data.totalFat || "0") < 0.5) {
            insignificant.push("calories from fat")
        }
        if (Number.parseFloat(data.saturatedFat || "0") < 0.5) {
            insignificant.push("saturated fat")
        }
        if (Number.parseFloat(data.transFat || "0") < 0.5) {
            insignificant.push("trans fat")
        }
        if (Number.parseFloat(data.cholesterol || "0") < 2) {
            insignificant.push("cholesterol")
        }
        if (Number.parseFloat(data.dietaryFiber || "0") < 1) {
            insignificant.push("dietary fiber")
        }
        if (Number.parseFloat(data.totalSugars || "0") < 0.5) {
            insignificant.push("sugars")
        }

        // Check vitamins and minerals (less than 2% DV)
        const vitaminMinerals = [
            { key: "vitaminA", name: "vitamin A", dv: 900 },
            { key: "vitaminC", name: "vitamin C", dv: 60 },
            { key: "calcium", name: "calcium", dv: 1000 },
            { key: "iron", name: "iron", dv: 18 },
            { key: "vitaminD", name: "vitamin D", dv: 20 },
            { key: "potassium", name: "potassium", dv: 3500 },
        ]

        vitaminMinerals.forEach((vm) => {
            const value = Number.parseFloat((data[vm.key]) || "0")
            const percentDV = (value / vm.dv) * 100
            if (percentDV < 2) {
                insignificant.push(vm.name)
            }
        })

        return insignificant
    }


    // export section
    // const exportAsImages = (format = "png") => {
    //     if (!divRef.current) return;

    //     domtoimage.toPng(divRef.current).then((dataUrl) => {
    //         const link = document.createElement("a");
    //         link.download = `nutrition-label.${format}`;
    //         link.href = dataUrl;
    //         link.click();
    //     });
    // };
    // const exportAsSVG = () => {
    //     if (!divRef.current) return;

    //     domtoimage.toSvg(divRef.current).then((dataUrl) => {
    //         const link = document.createElement("a");
    //         link.download = "nutrition-label.svg";
    //         link.href = dataUrl;
    //         link.click();
    //     });
    // };
    // const exportAsPDF = async () => {
    //     const node = divRef.current;
    //     if (!node) return;

    //     const imageDataUrl = await domtoimage.toPng(node);

    //     const pngBytes = await fetch(imageDataUrl).then(res => res.arrayBuffer());

    //     const pdfDoc = await PDFDocument.create();
    //     const pngImage = await pdfDoc.embedPng(pngBytes);

    //     const { width, height } = pngImage.scale(1);
    //     const page = pdfDoc.addPage([width, height]);

    //     page.drawImage(pngImage, { x: 0, y: 0, width, height });

    //     const pdfBytes = await pdfDoc.save();
    //     const blob = new Blob([pdfBytes], { type: "application/pdf" });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement("a");
    //     a.href = url;
    //     a.download = "export.pdf";
    //     a.click();
    //     URL.revokeObjectURL(url);
    // };


    // // Function to send email with link

    async function sendEmailWithLink(toEmail, link, callback) {
        try {
            setIsEmailSending(true);
            if (!toEmail || !link) {
                console.error("toEmail and link are required");
                return;
            }
            const currentUrl = new URL(window.location.href);
            currentUrl.searchParams.delete('pp');
            const newUrl = currentUrl.toString();
            const LinkUrl = `${newUrl}?pp=${link}`;

            const isEmailDone = await API.post(`/send/email`, {
                link: LinkUrl, toEmail,
                productName: nutritionData?.productName || 'N/A',
                labelId: nutritionData?.labelFormat || 'N/A'
            });
            if (isEmailDone.status === 200) {
                setIsEmailSending(false);
                setSuccessMessage({
                    message: `Your nutrition progress link have been sent to ${toEmail}. Please check your email (including spam folder) for the link.`,
                    status: 'success'
                });
                setTimeout(() => {
                    setShowEmailCapture(false);
                    if (callback) callback();
                }, 2000);
                console.log('Email sent!');
            } else {
                console.error('Error sending email:', isEmailDone);
                setIsEmailSending(false);
                setSuccessMessage({
                    message: `somthing went wrong while sending email to ${toEmail}. Please try again later.`,
                    status: 'error'
                });
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsEmailSending(false)
        }
    }


    // send attachemt with email
    const fileToBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result.split(',')[1];
                resolve({
                    filename: file.name,
                    type: file.type,
                    content: base64String,
                });
            };
            reader.onerror = reject;
        });

    const sendPdfImageInEmail = async (selectedFormat, emailTo, callback) => {
        const node = divRef.current;

        const attachments = [];

        try {
            for (const format of selectedFormat) {
                let blob, filename, mimeType;
                node.style.backgroundColor = (nutritionData?.transparentBackground && ['svg', 'png']?.includes(format)) ? "" : "#ffffff"; // Change background (if needed)
                await new Promise((r) => setTimeout(r, 50));

                if (format === 'png' || format === 'jpg') {

                    const dataUrl = await domtoimage.toPng(node);
                    blob = await (await fetch(dataUrl)).blob();
                    filename = `nutrition-label-IMAGE.${format}`;
                    mimeType = 'image/png';
                }

                if (format === 'svg') {
                    const svgString = await domtoimage.toSvg(node);
                    // blob = new Blob([svgString], { type: 'image/svg+xml' });
                    blob = await (await fetch(svgString)).blob();
                    filename = 'nutrition-label-SVG.svg';
                    mimeType = 'image/svg+xml';
                }

                if (format === 'pdf') {
                    const dataUrl = await domtoimage.toPng(node);
                    const imageBytes = await fetch(dataUrl).then(res => res.arrayBuffer());

                    const pdfDoc = await PDFDocument.create();
                    const image = await pdfDoc.embedPng(imageBytes);
                    const page = pdfDoc.addPage([image.width, image.height]);
                    page.drawImage(image, { x: 0, y: 0 });

                    const pdfBytes = await pdfDoc.save();
                    blob = new Blob([pdfBytes], { type: 'application/pdf' });
                    filename = 'nutrition-label-PDF.pdf';
                    mimeType = 'application/pdf';
                }

                if (blob && filename && mimeType) {
                    const file = new File([blob], filename, { type: mimeType });
                    const base64File = await fileToBase64(file);
                    attachments.push(base64File);
                }
            }

            const formData = {
                toEmail: emailTo,
                selectdFormats: selectedFormat?.join(', '),
                ProductName: nutritionData?.productName || 'N/A',
                attachments: attachments
            }

            const isEmailDone = await API.post(`/send/attachments`, { ...formData }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log(isEmailDone, 'isEmailDone')

            if (isEmailDone.status === 200) {
                setSuccessMessage({
                    message: `Your nutrition labels have been generated and download links have been sent to ${emailTo}. Please check your email (including spam folder).`,
                    status: 'success'
                });
                setTimeout(() => {
                    setShowExportModal(false);
                    if (callback) callback();
                }, 2000);
            } else {
                setSuccessMessage({
                    message: `Something went wrong while sending email to ${emailTo}. Please try again later.`,
                    status: 'error'
                });
            }
        } catch (err) {
            console.error(err);
            setSuccessMessage({
                message: `Something went wrong while processing your request.`,
                status: 'error'
            });
        } finally {
            setIsEmailSending(false);
        }
    };

    function handleExportOnSelectedFormat(selectedFormat, email, callback) {
        setIsEmailSending(true)
        if (selectedFormat?.length > 0) {
            if (email) {
                sendPdfImageInEmail(selectedFormat, email, callback);
            }
        }
    }




    return {
        divRef,
        successMessage, setSuccessMessage,
        labelFormats,
        isEmailSending,
        selectedLayoutObj,
        showEmailCapture, setShowEmailCapture,
        showExportModal, setShowExportModal,
        nutritionData, setNutritionData,


        handleSave,
        sendEmailWithLink,
        handleExport,
        handleChange,
        getInsignificantNutrients,
        decryptFunction,
        handleExportOnSelectedFormat
    }
}


export default useHomeHook;