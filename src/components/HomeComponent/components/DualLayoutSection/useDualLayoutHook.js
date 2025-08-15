import _ from "lodash";
import { useEffect, useState } from "react";


const useDualLayoutHook = ({ layout, decryptFunction }) => {
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
            decryptFunction((data, dataLayout) => {
                console.log(data, ':::::::::::::::::::::::::::::')
                if (data && dataLayout === layout) {
                    setServingValues(data?.servingValues)
                    setPerServingData(data?.perServingData);
                    setPerContainerData(data?.perContainerData);
                } else {
                    const perServing = _.cloneDeep({ ...fields, title: "per Serving" });
                    const perCotaienr = _.cloneDeep({ ...fields, title: "per Container" });
                    setPerServingData({ ...perServing, title: (layout === "dual-forms") ? "per 1/4 cup dry mix" : "per Serving" });
                    setPerContainerData({ ...perCotaienr, title: (layout === "dual-forms") ? "Per baked portion" : "per Container" });
                }
            }, layout)
        }

    }, [layout]);



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