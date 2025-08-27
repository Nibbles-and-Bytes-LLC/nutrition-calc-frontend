import _ from "lodash";
import { useEffect, useState } from "react";


const useDualLayoutHook = ({ layout, selectedLayoutObj, isDecryptionComplete, decryptedData }) => {
    const fields = {
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
        title: ""
    }
    console.log(layout, 'labelFormats')

    const [servingValues, setServingValues] = useState({
        servingsPerContainer: "",
        servingSizeQuantity: "",
        servingSizeQuantityUnits: "",
        servingSizeWeight: "",
        servingSizeUnit: "grams",
    });


    const [perServingData, setPerServingData] = useState(JSON.parse(JSON.stringify({
        ...fields, title: "per Serving"
    })));
    const [perContainerData, setPerContainerData] = useState(JSON.parse(JSON.stringify({
        ...fields, title: "per Container"
    })));

    useEffect(() => {
        if (["dual-forms", "dual-column"]?.includes(layout)) {
            if (isDecryptionComplete && decryptedData && decryptedData.layout?.value === layout) {
                // Restore data from decrypted data
                setServingValues(decryptedData.data?.servingValues || servingValues);
                setPerServingData(decryptedData.data?.perServingData || perServingData);
                setPerContainerData(decryptedData.data?.perContainerData || perContainerData);
            } else {
                // Set default values
                const perServing = _.cloneDeep({ ...fields, title: "per Serving" });
                const perCotaienr = _.cloneDeep({ ...fields, title: "per Container" });
                setPerServingData({ ...perServing, title: (layout === "dual-forms") ? "per 1/4 cup dry mix" : "per Serving" });
                setPerContainerData({ ...perCotaienr, title: (layout === "dual-forms") ? "Per baked portion" : "per Container" });
            }
        }
    }, [layout, isDecryptionComplete, decryptedData]);



    console.log(perServingData, perContainerData, 'perServingData')

    const handleDualFormChange = (field, value, section = "perServing") => {
        if (section === "perServing") {
            setPerServingData({ ...perServingData, [field]: value });
        } else if (section === "servingField") {
            setServingValues({ ...servingValues, [field]: value })
        } else if (section === "dualForm") {
            if (field === "first_label") {
                setPerServingData({ ...perServingData, title: value });
            } else {
                setPerContainerData({ ...perContainerData, title: value });
            }
        } else {
            setPerContainerData({ ...perContainerData, [field]: value })
        }
    }


    return ({
        layout,
        servingValues,
        perServingData,
        perContainerData,
        handleDualFormChange
    })

}

export default useDualLayoutHook;