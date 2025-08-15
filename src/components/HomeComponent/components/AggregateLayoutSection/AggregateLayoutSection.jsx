import { BoldTitleAndValue, CommonDualContenLayout, DuelColumnCalerioes, dvValues, OptionalVitaminData } from "../Common"
import _ from "lodash";

export function AggregateLabelPreview({
    children,
    products,
    nuteritionFacts,
    formatNutrientValue,
    calculateDV,
    formatServingsPerContainer,
}) {

    const shouldShowDV = (nutrient, value) => {
        const numValue = Number.parseFloat(value) || 0;
        if (!dvValues[nutrient]) return false;
        const percentDV = (numValue / dvValues[nutrient]) * 100;
        // Don't show DV if less than 1% (insignificant amount)
        return percentDV >= 1;
    };

    const formatServingSize = () => {
        if (nuteritionFacts.servingSizeQuantity) {
            return `${nuteritionFacts.servingSizeQuantity}${nuteritionFacts.servingSizeQuantityUnits}`
        }
    };

    function servingQuantityUnit(servingValues) {
        if (servingValues.servingSizeWeight && servingValues.servingSizeUnit) {
            let unit = servingValues.servingSizeUnit;

            switch (servingValues.servingSizeUnit) {
                case "grams":
                    unit = "g";
                    break;
                case "ounces":
                    unit = "oz";
                    break;
                case "milliliters":
                    unit = "mL";
                    break;
                case "fluid-ounces":
                    unit = "fl oz";
                    break;
                case "pounds":
                    unit = "lb";
                    break;
                case "kilograms":
                    unit = "kg";
                    break;
                default:
                    unit = servingValues.servingSizeUnit;
                    break;
            }
            return `(${servingValues.servingSizeWeight}${unit})`;
        }
    }

    return (
        <div className="w-full lg:w-max md:w-max mx-auto">
            <div className="border-2 border-black px-3 py-1">

                <div className="flex mt-2 gap-2 divide-x-[2px] divide-gray-300">
                    <div>
                        <div className="border-b-[0.1rem] border-black">
                            <div className="border-b border-black pb-2">
                                <span className="text-5xl whitespace-nowrap leading-[4rem] font-black ">Nutrition Facts</span>
                            </div>
                        </div>

                        <div className="font-thin text-3xl pt-1">{formatServingsPerContainer(nuteritionFacts.servingsPerContainer || "0")} servings per container</div>
                        <div className="border-b-[1.2rem] border-black">
                            <div className="border-b border-black pb-2 flex justify-between">
                                <span className="font-extrabold text-3xl">Serving size</span>
                                <span className="font-extrabold text-3xl">{formatServingSize() || "1 box"}</span>
                            </div>

                        </div>
                        <DuelColumnCalerioes
                            aggregate
                            titleStyle="!pt-[0]"
                            subtitle="Amount per serving"
                            data={products?.find(r => r?.addedSugars) || {}}
                            formatNutrientValue={formatNutrientValue}
                            extraVitamins={_.uniq(
                                _.flatMapDeep(
                                    products,
                                    (productValue) =>
                                        _.map(
                                            _.filter(OptionalVitaminData, ({ value }) => productValue?.[value]),
                                            'label'
                                        )
                                ))}
                        />
                    </div>
                    <div className="flex grow gap-2 divide-x-[2px] divide-gray-300">
                        {_.map(products, (row, idx) => {
                            const OPTIONAL_VITAMINS = _.map(OptionalVitaminData, ({ label, value, unit }) => ({
                                label,
                                value: shouldShowDV(value, row?.[value]) ? `${calculateDV(value, row?.[value])}%` : "",
                                isVisible: !!row?.[value],
                                key: value,
                                unit,
                            }));

                            return (
                                <CommonDualContenLayout
                                    key={idx + 'aggregateDetails'}
                                    className="min-w-[257px]"
                                    count={row?.calories || '0'}
                                    aggregate aggregateTitle={row?.productName}
                                    servingUnit={servingQuantityUnit(row)}
                                >
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("totalFat", row.totalFat || "0", "g") + 'g'}
                                        value={shouldShowDV("totalFat", row.totalFat || "0") ? `${calculateDV("totalFat", row.totalFat || "0")}%` : ""}
                                        titleClass="!font-thin" rootClass="!py-1"
                                    />
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("saturatedFat", row.saturatedFat || "0", "g") + 'g'}
                                        value={shouldShowDV("saturatedFat", row.saturatedFat || "0") ? `${calculateDV("saturatedFat", row.saturatedFat || "0")}%` : ""}
                                        titleClass="!font-thin" rootClass="!py-1" />
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("transFat", row.transFat || "0", "g") + 'g'}
                                        titleClass="!font-thin"
                                        rootClass="!py-1" />
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("cholesterol", row.cholesterol || "0", "g") + 'mg'}
                                        value={shouldShowDV("cholesterol", row.cholesterol || "0") ? `${calculateDV("cholesterol", row.cholesterol || "0")}%` : ""}
                                        titleClass="!font-thin" rootClass="!py-1" />
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("sodium", row.sodium || "0", "g") + 'mg'}
                                        value={shouldShowDV("sodium", row.sodium || "0") ? `${calculateDV("sodium", row.sodium || "0")}%` : ""}
                                        titleClass="!font-thin" rootClass="!py-1" />
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("totalCarbs", row.totalCarbs || "0", "g") + 'g'}
                                        value={shouldShowDV("totalCarbs", row.totalCarbs || "0") ? `${calculateDV("totalCarbs", row.totalCarbs || "0")}%` : ""}
                                        titleClass="!font-thin" rootClass="!py-1" />
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("dietaryFiber", row.dietaryFiber || "0", "g") + 'g'}
                                        value={shouldShowDV("dietaryFiber", row.dietaryFiber || "0") ? `${calculateDV("dietaryFiber", row.dietaryFiber || "0")}%` : ""}
                                        titleClass="!font-thin" rootClass="!py-1" />
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("totalSugars", row.totalSugars || "0", "g") + 'g'}
                                        titleClass="!font-thin" rootClass="!py-1" />

                                    {row.addedSugars && (
                                        <BoldTitleAndValue
                                            title={formatNutrientValue("addedSugars", row.addedSugars || "0", "g") + 'g'}
                                            value={shouldShowDV("addedSugars", row.addedSugars || "0") ? `${calculateDV("addedSugars", row.addedSugars || "0")}%` : ""}
                                            titleClass="!font-thin" rootClass="!py-1" />
                                    )}
                                    <div className="border-b-[1.2rem] border-black">
                                        <BoldTitleAndValue
                                            title={formatNutrientValue("protein", row.protein || "0", "g") + 'g'}
                                            titleClass="!font-thin" rootClass="!py-1"
                                        />
                                    </div>
                                    <BoldTitleAndValue title={<>{row.vitaminD}mcg</>} value={shouldShowDV("vitaminD", row.vitaminD || "0") ? `${calculateDV("vitaminD", row.vitaminD || "0")}%` : "0%"} sizeStyle="!font-thin" rootClass="!py-1" />
                                    <BoldTitleAndValue title={<>{row.calcium}mg</>} value={shouldShowDV("calcium", row.calcium) ? `${calculateDV("calcium", row.calcium)}%` : ""} sizeStyle="!font-thin" rootClass="!py-1" />
                                    <BoldTitleAndValue title={<>{row.iron}mg</>} value={shouldShowDV("iron", row.iron) ? `${calculateDV("iron", row.iron)}%` : ""} sizeStyle="!font-thin" rootClass="!py-1" />
                                    <BoldTitleAndValue title={<>{row.potassium}mg</>} value={shouldShowDV("potassium", row.potassium) ? `${calculateDV("potassium", row.potassium)}%` : ""} sizeStyle="!font-thin" rootClass="!py-1" />
                                    {_.map(_.filter(OPTIONAL_VITAMINS, (row => row.isVisible)), ({ label, key, value, unit }) => (
                                        <BoldTitleAndValue
                                            key={"aggregate" + label}
                                            title={<>{row?.[key]}{unit}</>}
                                            value={value} sizeStyle="!font-thin" rootClass="!py-1"
                                        />

                                    ))}
                                </CommonDualContenLayout>
                            )
                        })}
                    </div>
                </div>
                <div className="border-t-[0.5rem] mt-2 border-black max-w-[72%] ml-auto" />
            </div>
            {children}
        </div>
    )
}
