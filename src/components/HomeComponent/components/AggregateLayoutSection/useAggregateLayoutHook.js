import _ from "lodash";
import { useEffect, useState } from "react";


const useAggregateLayoutHook = ({ layout, selectedLayoutObj, isDecryptionComplete, decryptedData }) => {
    const fields = {
        productName: "",
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
        title: ""
    }

    const [products, setProducts] = useState([fields, fields, fields])
    const [productCount, setProductCount] = useState(3);

    const [nuteritionFacts, setNuteritionFact] = useState({
        servingsPerContainer: "",
        servingSizeQuantity: "",
        servingSizeQuantityUnits: "",
    });

    const handleChange = (field, value, index = 0) => {
        const PRODUCTS_CLONE = JSON.parse(JSON.stringify(products));
        if (PRODUCTS_CLONE[index]) {
            PRODUCTS_CLONE[index] = { ...PRODUCTS_CLONE[index], [field]: value };
            setProducts(PRODUCTS_CLONE);
        }
    }

    function handleNuteritionFact(field, value) {
        setNuteritionFact({ ...nuteritionFacts, [field]: value })
    }

    function handleSelectProduct(value) {
        setProductCount(value);

        if (!products || products.length === 0) return;

        const currentCount = products.length;

        if (value > currentCount) {
            const addCount = value - currentCount;
            const extraFields = _.times(addCount, () => _.cloneDeep(fields));
            setProducts([...products, ...extraFields]);
        } else if (value < currentCount) {
            setProducts(products.slice(0, value));
        }

    }

    function addOneMore() {
        if (products?.length < 6) {
            const UPDATE_PRODUCT = [...products, _.cloneDeep(fields)];
            setProducts([...products, _.cloneDeep(fields)]);
            setProductCount(UPDATE_PRODUCT?.length)
        }
    }

    function removeProduct(index) {
        setProducts(prev => {
            const remainData = prev.filter((_, i) => i !== index);
            setProductCount(remainData?.length)
            return remainData
        });
    }


    useEffect(() => {
        if (layout === "aggregate") {
            if (isDecryptionComplete && decryptedData && decryptedData.layout?.value === layout) {
                // Restore data from decrypted data
                setNuteritionFact(decryptedData.data?.nuteritionFacts || nuteritionFacts);
                setProducts(decryptedData.data?.products || products);
                setProductCount(decryptedData.data?.productCount || productCount);
            }
        }
    }, [layout, isDecryptionComplete, decryptedData]);

    return ({
        layout,
        products,
        nuteritionFacts,
        addOneMore,
        handleChange,
        removeProduct,
        handleNuteritionFact,
        productCount, handleSelectProduct
    })

}

export default useAggregateLayoutHook;