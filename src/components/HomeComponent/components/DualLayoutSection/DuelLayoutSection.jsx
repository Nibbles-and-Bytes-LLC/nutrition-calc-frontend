import React from 'react'
import _ from 'lodash';
import { BoldTitleAndValue, CommonDualContenLayout, DuelColumnCalerioes, dvValues } from '../Common';

const DuelLayoutSection = ({
    children,
    layout,
    perServingData, perContainerData,
    servingValues, formatNutrientValue,
    calculateDV, formatServingsPerContainer
}) => {


    const shouldShowDV = (nutrient, value) => {
        const numValue = Number.parseFloat(value) || 0;
        if (!dvValues[nutrient]) return false;
        const percentDV = (numValue / dvValues[nutrient]) * 100;
        // Don't show DV if less than 1% (insignificant amount)
        return percentDV >= 1;
    };

    const formatServingSize = () => {
        const parts = [];
        if (servingValues.servingSizeQuantity && servingValues.servingSizeQuantityUnits) {
            parts.push(
                `${servingValues.servingSizeQuantity} ${servingValues.servingSizeQuantityUnits}`
            );
        }
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
            parts.push(`(${servingValues.servingSizeWeight}${unit})`);
        }
        return parts.join(" ");
    };

    return (
        <div className='w-full lg:w-[650px] md:w-[650px] mx-auto'>
            <div className="border-2 border-black px-3 py-1">
                <div className="border-b-[0.1rem] border-black">
                    <div className="border-b border-black pb-2">
                        <span className="text-[3rem] sm:text-[3.5rem] md:text-[4.7rem] leading-[4rem] font-black ">Nutrition Facts</span>
                    </div>
                </div>

                <div className="font-thin text-3xl pt-1">{formatServingsPerContainer(servingValues.servingsPerContainer || "0")} servings per container</div>
                <div className="border-b-[1.2rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="font-extrabold text-3xl">Serving size</span>
                        <span className="font-extrabold text-3xl">{formatServingSize() || "0 cup (0g)"}</span>
                    </div>

                </div>
                <div className="flex mt-2 gap-2 divide-x-[2px] divide-gray-300">
                    <DuelColumnCalerioes
                        titleStyle={layout == "dual-forms" ? "!pt-[3rem]" : ""}
                        data={{ protein: perServingData?.protein || perContainerData?.protein, addedSugars: perServingData?.addedSugars || perContainerData?.addedSugars }}
                        formatNutrientValue={formatNutrientValue}
                    />
                    {
                        _.map([perServingData, perContainerData], (r) => (
                            <CommonDualContenLayout smallTitle={r?.title} titleCss={layout == "dual-forms" ? "!h-[40px]" : ""} count={r?.calories || '100'} key={r?.title}>
                                <BoldTitleAndValue
                                    title={formatNutrientValue("totalFat", r.totalFat || "0", "g") + 'g'}
                                    value={shouldShowDV("totalFat", r.totalFat || "0") ? `${calculateDV("totalFat", r.totalFat || "0")}%` : ""}
                                    titleClass="!font-thin" rootClass="!py-1"
                                />
                                <BoldTitleAndValue
                                    title={formatNutrientValue("saturatedFat", r.saturatedFat || "0", "g") + 'g'}
                                    value={shouldShowDV("saturatedFat", r.saturatedFat || "0") ? `${calculateDV("saturatedFat", r.saturatedFat || "0")}%` : ""}
                                    titleClass="!font-thin" rootClass="!py-1" />
                                <BoldTitleAndValue
                                    title={formatNutrientValue("transFat", r.transFat || "0", "g") + 'g'}
                                    titleClass="!font-thin"
                                    rootClass="!py-1" />
                                <BoldTitleAndValue
                                    title={formatNutrientValue("cholesterol", r.cholesterol || "0", "g") + 'mg'}
                                    value={shouldShowDV("cholesterol", r.cholesterol || "0") ? `${calculateDV("cholesterol", r.cholesterol || "0")}%` : ""}
                                    titleClass="!font-thin" rootClass="!py-1" />
                                <BoldTitleAndValue
                                    title={formatNutrientValue("sodium", r.sodium || "0", "g") + 'mg'}
                                    value={shouldShowDV("sodium", r.sodium || "0") ? `${calculateDV("sodium", r.sodium || "0")}%` : ""}
                                    titleClass="!font-thin" rootClass="!py-1" />
                                <BoldTitleAndValue
                                    title={formatNutrientValue("totalCarbs", r.totalCarbs || "0", "g") + 'g'}
                                    value={shouldShowDV("totalCarbs", r.totalCarbs || "0") ? `${calculateDV("totalCarbs", r.totalCarbs || "0")}%` : ""}
                                    titleClass="!font-thin" rootClass="!py-1" />
                                <BoldTitleAndValue
                                    title={formatNutrientValue("dietaryFiber", r.dietaryFiber || "0", "g") + 'g'}
                                    value={shouldShowDV("dietaryFiber", r.dietaryFiber || "0") ? `${calculateDV("dietaryFiber", r.dietaryFiber || "0")}%` : ""}
                                    titleClass="!font-thin" rootClass="!py-1" />
                                <BoldTitleAndValue
                                    title={formatNutrientValue("totalSugars", r.totalSugars || "0", "g") + 'g'}
                                    titleClass="!font-thin" rootClass="!py-1" />

                                {(perServingData.addedSugars || perContainerData?.addedSugars) && (
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("addedSugars", r.addedSugars || "0", "g") + 'g'}
                                        value={shouldShowDV("addedSugars", r.addedSugars || "0") ? `${calculateDV("addedSugars", r.addedSugars || "0")}%` : ""}
                                        titleClass="!font-thin" rootClass="!py-1" />
                                )}
                                <div className="border-b-[1.2rem] border-black">
                                    <BoldTitleAndValue
                                        title={formatNutrientValue("protein", r.protein || "0", "g") + 'g'}
                                        titleClass="!font-thin" rootClass="!py-1"
                                    />
                                </div>
                                <BoldTitleAndValue title={<>{r.vitaminD}mcg</>} value={shouldShowDV("vitaminD", r.vitaminD || "0") ? `${calculateDV("vitaminD", r.vitaminD || "0")}%` : "0%"} sizeStyle="!font-thin" rootClass="!py-1" />
                                <BoldTitleAndValue title={<>{r.calcium}mg</>} value={shouldShowDV("calcium", r.calcium) ? `${calculateDV("calcium", r.calcium)}%` : ""} sizeStyle="!font-thin" rootClass="!py-1" />
                                <BoldTitleAndValue title={<>{r.iron}mg</>} value={shouldShowDV("iron", r.iron) ? `${calculateDV("iron", r.iron)}%` : ""} sizeStyle="!font-thin" rootClass="!py-1" />
                                <BoldTitleAndValue title={<>{r.potassium}mg</>} value={shouldShowDV("potassium", r.potassium) ? `${calculateDV("potassium", r.potassium)}%` : ""} sizeStyle="!font-thin" rootClass="!py-1" />
                            </CommonDualContenLayout>
                        ))
                    }
                </div>
                <div className="border-t-[0.5rem] border-black">
                    <div className="flex gap-2 text-xl mt-2 pt-1">
                        <span> *  </span>
                        <span>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</span>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default DuelLayoutSection;