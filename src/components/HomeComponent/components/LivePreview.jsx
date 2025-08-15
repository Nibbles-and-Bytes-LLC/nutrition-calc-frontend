import { Save, Download, Mail } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { BoldTitleAndValue, CommonDualContenLayout, dvValues, OptionalVitaminData } from "./Common";
import _ from "lodash";
import DuelLayoutSection from "./DualLayoutSection/DuelLayoutSection";
import { AggregateLabelPreview } from "./AggregateLayoutSection/AggregateLayoutSection";

export function LivePreview({ data, onSave, onExport, divRef, dualLayoutHookData, aggregateLayoutHookData, showExportModal }) {

    function renderIngridientSection(values) {
        return (
            <>
                {(data?.ingredients || data?.contains) &&
                    <div className={classNames("w-full  mx-auto mt-4 p-3 ", { "border-2 border-black": values?.showIngredientBorder && values?.ingredients })}>
                        <div class="helvetica text-[1.6rem] tracking-[-0.04em] leading-[32px]" id="ingredients-box">
                            {values?.ingredients &&
                                <p>
                                    <strong class="tracking-[-0.015em]">Ingredients: </strong>
                                    <span class="whitespace-pre-wrap">{values?.ingredients}</span>
                                </p>
                            }
                            {values?.contains &&
                                <p class="mt-5">
                                    <strong class="tracking-[-0.015em]">Contains: </strong>
                                    <span class="whitespace-pre-wrap">{values?.contains}</span>
                                </p>
                            }
                        </div>
                    </div>
                }
                <div class="mt-6 helvetica text-2xl tracking-[-0.04em] leading-[30px] text-center" id="manufacturer">
                    <p>{data?.companyName || ""}</p>
                    <p>{data?.companyAddress || ""}</p>
                </div>
            </>
        )
    }


    // totalFat,calories,
    const calculateDV = (nutrient, value) => {
        const numValue = Number.parseFloat(value) || 0;
        if (!dvValues[nutrient] || numValue === 0) {
            return 0;
        }

        const percentDV = (numValue / dvValues[nutrient]) * 100;
        const nutritionKeys = [
            "calories",
            "totalFat",
            "saturatedFat",
            "transFat",
            "cholesterol",
            "sodium",
            "totalCarbs",
            "dietaryFiber",
            "totalSugars",
            "addedSugars",
            "protein"
        ];
        if (nutritionKeys?.includes(nutrient)) {
            return Math.round(percentDV);
        } else {
            // Apply FDA rounding rules for % DV
            if (percentDV < 1 || percentDV < 2) {
                return 0; // Insignificant amount
            } else if (percentDV <= 10) {
                // Round to nearest 2% increment
                return Math.round(percentDV / 2) * 2;
            } else if (percentDV > 10 && percentDV <= 50) {
                // Round to nearest 5% increment
                return Math.round(percentDV / 5) * 5;
            } else {
                // Round to nearest 10% increment
                return Math.round(percentDV / 10) * 10;
            }
        }
    };

    // unit
    const formatNutrientValue = (nutrient, value) => {
        const numValue = Number.parseFloat(value) || 0;

        // Handle "Not a significant source" cases per FDA rules
        switch (nutrient) {
            case "totalFat":
            case "saturatedFat":
            case "transFat":
                if (numValue < 0.5) return "0";
                if (numValue < 5) return numValue.toFixed(1).replace(/\.0$/, "");
                return Math.round(numValue).toString();

            case "cholesterol":
                if (numValue < 2) return "0";
                if (numValue >= 2 && numValue <= 5) return "less than 5mg";
                return Math.round(numValue / 5) * 5;

            // case "dietaryFiber":
            //     if (numValue < 1) return "0";
            //     return Math.round(numValue).toString();

            case "sodium":
            case "potassium":
                if (numValue < 5) return "0";
                if (numValue <= 140) return Math.round(numValue / 5) * 5;
                return Math.round(numValue / 10) * 10;

            case "totalSugars":
            case "addedSugars":
            case "totalCarbs":
            case "protein":
            case "dietaryFiber":
                if (numValue < 0.5) return "0";
                if (numValue < 1) return "less than 1";
                return Math.round(numValue).toString();

            case "calories":
                if (numValue < 5) return "0";
                if (numValue <= 50) return Math.round(numValue / 5) * 5;
                return Math.round(numValue / 10) * 10;

            case "vitaminA":
            case "calcium":
            case "phosphorus":
                return Math.round(numValue / 10) * 10;
            case "magnesium":
                return Math.round(numValue / 5) * 5;
            case "vitaminC":
                return Math.round(numValue);
            case "iron":
            case "vitaminD":
            case "vitaminE":
            case "niacin":
                return Math.round(numValue / 0.1) * 0.1;
            case "thiamin":
            case "riboflavin":
            case "vitaminB6":
            case "vitaminB12":
                return Math.round(numValue / 0.01) * 0.01;
            case "zinc": return Math.round(numValue / 0.1) * 0.1;

            default:
                // For vitamins and minerals
                if (numValue < 0.1) return "0";
                return numValue.toString();
        }
    };

    // Add function to determine if we need "Not a significant source" statement
    const getInsignificantNutrients = () => {
        const insignificant = [];

        // Check each nutrient against FDA thresholds
        if (data.totalFat && data.totalFat !== "0" && Number.parseFloat(data.totalFat || "0") < 5) {
            insignificant.push("calories from fat");
        }
        if (data.saturatedFat && data.saturatedFat !== "0" && Number.parseFloat(data.saturatedFat || "0") < 0.5) {
            insignificant.push("saturated fat");
        }
        if (data.transFat && data.transFat !== "0" && Number.parseFloat(data.transFat || "0") < 0.5) {
            insignificant.push("trans fat");
        }
        if (data.cholesterol && data.cholesterol !== "0" && Number.parseFloat(data.cholesterol || "0") < 2) {
            insignificant.push("cholesterol");
        }
        if (data.dietaryFiber && data.dietaryFiber !== "0" && Number.parseFloat(data.dietaryFiber || "0") < 1) {
            insignificant.push("dietary fiber");
        }
        if (data.totalSugars && data.totalSugars !== "0" && Number.parseFloat(data.totalSugars || "0") < 0.5) {
            insignificant.push("sugars");
        }

        // Check vitamins and minerals (less than 2% DV)
        if (data.labelFormat !== "simplified") {
            const vitaminMinerals = [
                { key: "vitaminA", name: "vitamin A", dv: 900 },
                { key: "vitaminC", name: "vitamin C", dv: 60 },
                { key: "calcium", name: "calcium", dv: 1000 },
                { key: "iron", name: "iron", dv: 18 },
                { key: "vitaminD", name: "vitamin D", dv: 20 },
                { key: "potassium", name: "potassium", dv: 3500 },
            ];

            vitaminMinerals.forEach((vm) => {
                const value = Number.parseFloat(data[vm.key] || "0");
                const percentDV = (value / vm.dv) * 100;
                if (percentDV < 2 && data[vm.key] && data[vm.key] !== "0") {
                    insignificant.push(vm.name);
                }
            });
        }


        return insignificant;
    };

    const shouldShowDV = (nutrient, value) => {
        const numValue = Number.parseFloat(value) || 0;
        if (!dvValues[nutrient]) return false;

        const percentDV = (numValue / dvValues[nutrient]) * 100;
        // Special rules for infant and children formats
        if (data.labelFormat === "infant") {
            // For infants: No % DV for macronutrients except carbs
            const noPercentNutrients = [
                "totalFat",
                "saturatedFat",
                "cholesterol",
                "sodium",
                "protein",
            ];
            if (noPercentNutrients.includes(nutrient)) {
                return false;
            }
        }

        if (data.labelFormat === "children") {
            // For children 1-3: Show % DV for all nutrients
            return percentDV >= 1;
        }

        // Don't show DV if less than 1% (insignificant amount)
        return percentDV >= 1;
    };

    const formatServingSize = () => {
        const parts = [];
        if (data.servingSizeQuantity && data.servingSizeQuantityUnits) {
            parts.push(
                `${data.servingSizeQuantity} ${data.servingSizeQuantityUnits}`
            );
        }
        if (data.servingSizeWeight && data.servingSizeUnit) {
            let unit = data.servingSizeUnit;

            switch (data.servingSizeUnit) {
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
                    unit = data.servingSizeUnit;
                    break;
            }
            parts.push(`(${data.servingSizeWeight}${unit})`);
        }
        return parts.join(" ");
    };

    const formatServingsPerContainer = (servings) => {
        const numServings = Number.parseFloat(servings) || 0;

        if (numServings === 0) return "";

        // FDA rounding rules for servings per container
        if (numServings < 2) {
            // Below 2 servings: must be "1" or "about 2"
            if (numServings <= 1.5) {
                return "1";
            } else {
                return "about 2";
            }
        } else if (numServings > 2) {
            // Between 2-5 servings: round to nearest 0.5
            return Math.round(numServings * 2) / 2;
        } else {
            // Above 5 servings: round to nearest whole number
            return Math.round(numServings);
        }
    };

    const OPTIONAL_VITAMINS = _.map(OptionalVitaminData, ({ label, value, shortLabel, spanishLabel, unit }) => ({
        title: `${label} ${formatNutrientValue("potassium", data?.[value] || 2)}${unit}`,
        spanishTitle: `${spanishLabel}  ${formatNutrientValue("potassium", data?.[value] || 2)}${unit}`,
        label,
        value: shouldShowDV(value, data?.[value]) ? `${calculateDV(value, data?.[value])}%` : "",
        isVisible: !!data?.[value],
        shortLabel,
        key: value,
        unit
    }));

    //done
    const renderStandardVertical = () => (
        <div className="w-full lg:w-[550px] md:w-[550px] mx-auto">
            <div className="border-2 border-black px-3 py-1 ">
                <div className="border-b-[0.1rem] border-black">
                    <div className="border-b border-black pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                        <span className="helvetica-black text-[3rem] sm:text-6xl md:text-[4.2rem] font-black leading-tight tracking-[-0.05em]">
                            Nutrition
                        </span>
                        <span className="helvetica-black text-[3rem] sm:text-6xl md:text-[4.2rem] font-black leading-tight tracking-[-0.05em]">
                            Facts
                        </span>
                    </div>
                </div>

                <div className="font-thin text-4xl pt-1">{formatServingsPerContainer(data.servingsPerContainer || "0")} servings per container</div>
                <div className="border-b-[1.2rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="font-extrabold text-4xl">Serving size</span>
                        {formatServingSize() && (
                            <span className="font-extrabold text-4xl">{formatServingSize()}</span>
                        )}
                    </div>

                </div>

                <div className="border-b-[0.8rem] border-black">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2 sm:gap-0 font-bold py-2 border-b-[6px] border-black">
                        <div>
                            <span className="text-lg sm:text-xl font-extrabold block">Amount per serving</span>
                            <span className="text-4xl sm:text-6xl font-black">Calories</span>
                        </div>
                        <div className="text-5xl sm:text-7xl font-black">
                            {formatNutrientValue("calories", data.calories || "0", "")}
                        </div>
                    </div>
                </div>
                <div className="border-b border-black py-2">
                    <p className="text-right font-extrabold font-black text-md">% Daily Value*</p>
                </div>

                {/* Total Fat */}
                <BoldTitleAndValue
                    title={`Total Fat ${formatNutrientValue("totalFat", data.totalFat || "0", "g")}g`}
                    value={shouldShowDV("totalFat", data.totalFat || "0") ? `${calculateDV("totalFat", data.totalFat || "0")}%` : "0%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-black text-2xl">Saturated Fat {formatNutrientValue("saturatedFat", data.saturatedFat || "0", "g")}g</span>
                    <span className="font-thin text-black text-2xl">
                        {shouldShowDV("saturatedFat", data.saturatedFat || "0") ? `${calculateDV("saturatedFat", data.saturatedFat || "0")}%` : "0%"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl text-black italic"><em>Trans</em> Fat {formatNutrientValue("transFat", data.transFat || "0", "g")}g</span>
                </div>

                {/* Cholesterol */}
                <BoldTitleAndValue
                    title={`Cholesterol ${formatNutrientValue("cholesterol", data.cholesterol || "0", "mg")}`}
                    value={shouldShowDV("cholesterol", data.cholesterol || "0") ? `${calculateDV("cholesterol", data.cholesterol || "0")}%` : "0%"}
                />
                {/* Sodium */}
                <BoldTitleAndValue
                    title={`Sodium ${formatNutrientValue("sodium", data.sodium || "0", "mg")}mg`}
                    value={shouldShowDV("sodium", data.sodium || "0") ? `${calculateDV("sodium", data.sodium || "0")}%` : "0%"}
                />
                {/* Carbohydrate */}
                <BoldTitleAndValue
                    title={`Total Carbohydrate ${formatNutrientValue("totalCarbs", data.totalCarbs || "", "g")}g`}
                    value={shouldShowDV("totalCarbs", data.totalCarbs || "0") ? `${calculateDV("totalCarbs", data.totalCarbs || "0")}%` : "0%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Dietary Fiber {formatNutrientValue("dietaryFiber", data.dietaryFiber || "0", "g")}g</span>
                    <span className="font-thin text-2xl">
                        {shouldShowDV("dietaryFiber", data.dietaryFiber || "0") ? `${calculateDV("dietaryFiber", data.dietaryFiber || "0")}%` : "0%"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Total Sugars {formatNutrientValue("totalSugars", data.totalSugars || "0", "g")}g</span>
                    <span className="font-thin text-2xl">-</span>
                </div>
                {data.addedSugars && (
                    <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                        <span className="pl-6 font-thin text-2xl">Includes {formatNutrientValue("addedSugars", data.addedSugars || "0", "g")}g Added Sugars</span>
                        <span className="font-thin text-2xl">
                            {shouldShowDV("addedSugars", data.addedSugars) ? `${calculateDV("addedSugars", data.addedSugars)}%` : "0%"}
                        </span>
                    </div>
                )}
                {/* Protein */}
                <div className="border-b-[1.2rem] border-black">
                    <BoldTitleAndValue
                        title={`Protein ${formatNutrientValue("protein", data?.protein || "0", "g")}g`}
                    // value={shouldShowDV("protein", data.protein || "0") ? `${calculateDV("protein", data.protein || "0")}%` : ""}
                    />
                </div>

                {/* Vitamins */}
                <div className="border-b-[0.5rem] border-black">
                    {_.map(_.filter([
                        { title: `Vitamin D ${data?.vitaminD || 0}mcg`, value: shouldShowDV("vitaminD", data?.vitaminD) ? `${calculateDV("vitaminD", data?.vitaminD)}%` : "", isVisible: !!data?.vitaminD },
                        { title: `Calcium ${data?.calcium || 0}mg`, value: shouldShowDV("calcium", data?.calcium) ? `${calculateDV("calcium", data?.calcium)}%` : "", isVisible: !!data?.calcium },
                        { title: `Iron ${data?.iron || 0}mg`, value: shouldShowDV("iron", data?.iron) ? `${calculateDV("iron", data?.iron)}%` : "", isVisible: !!data?.calcium },
                        { title: `Potassium ${formatNutrientValue("potassium", data?.potassium || "0", "mg")}mg`, value: shouldShowDV("potassium", data.potassium) ? `${calculateDV("potassium", data.potassium)}%` : "", isVisible: !!data?.potassium },
                        ...OPTIONAL_VITAMINS

                    ], (row) => row?.isVisible),
                        ({ title, value }) => (
                            <div key={title} className="flex justify-between border-b border-gray-400 py-2">
                                <span className="font-thin text-2xl">{title}</span>
                                <span className="font-thin text-2xl">{value}</span>
                            </div>
                        ))}
                </div>
                {/* Add "Not a significant source" statement */}
                {(() => {
                    const insignificantNutrients = getInsignificantNutrients();
                    if (insignificantNutrients.length > 0) {
                        return (
                            <div className="py-2 border-b border-black">
                                <p className="text-sm">
                                    * Not a significant source of{" "}
                                    {insignificantNutrients.join(", ")}.
                                </p>
                            </div>
                        );
                    }
                    return null;
                })()}

                <div className="flex gap-2 text-xl mt-2 pt-1">
                    <span> *  </span>
                    <span>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</span>
                </div>
            </div>
            {renderIngridientSection(data)}
        </div>
    );
    //done
    const renderLinearDisplay = () => (
        <div className="w-[1024px]">
            <div className="bg-white border-2 border-black p-3 " >
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-4xl font-black">Nutrition Facts</h2>
                        <span className="text-4xl font-thin">
                            Servings:{" "}
                            {formatServingsPerContainer(data.servingsPerContainer || "0")},
                        </span>

                        <span className="font-extrabold text-4xl">
                            Serv. size: {formatServingSize()},
                        </span>
                    </div>
                    <div className="text-3xl">
                        <span>Amount per serving: </span>
                        <span className="font-extrabold text-4xl">
                            Calories <small className="text-5xl">{formatNutrientValue("calories", data.calories || "0", "")}</small>
                            ,&nbsp;
                        </span>
                        <span>
                            <span className="font-extrabold text-3xl">Total Fat{" "}</span>
                            {formatNutrientValue("totalFat", data.totalFat || "0", "g")}g
                        </span>
                        {shouldShowDV("totalFat", data.totalFat || "0") && (
                            <span> ({calculateDV("totalFat", data.totalFat || "0")}% DV)</span>
                        )}
                        <span>, Sat. Fat{" "} {formatNutrientValue("saturatedFat", data.saturatedFat || "0", "g")}g</span>
                        {shouldShowDV("saturatedFat", data.saturatedFat || "0") && (
                            <span>{" "}({calculateDV("saturatedFat", data.saturatedFat || "0")}% DV)</span>
                        )}
                        <span>, </span>
                        <span className="italic">Trans</span>
                        <span>{" "}Fat {formatNutrientValue("transFat", data.transFat || "0", "g")}g,{" "}</span>
                        <span className="font-extrabold text-3xl">Cholest. </span>
                        <span>{formatNutrientValue("cholesterol", data.cholesterol || "0", "mg")}mg</span>
                        {shouldShowDV("cholesterol", data.cholesterol || "0") && (
                            <span> ({calculateDV("cholesterol", data.cholesterol || "0")}% DV)</span>
                        )}
                        <span>, </span>
                        <span className="font-extrabold text-3xl">Sodium </span>
                        <span>{formatNutrientValue("sodium", data.sodium || "0", "mg")}mg</span>
                        {shouldShowDV("sodium", data.sodium || "0") && (
                            <span> ({calculateDV("sodium", data.sodium || "0")}% DV)</span>
                        )}
                        <span>, </span>
                        <span className="font-extrabold text-3xl">Total Carb. </span>
                        <span>{formatNutrientValue("totalCarbs", data.totalCarbs || "0", "g")}g</span>
                        {shouldShowDV("totalCarbs", data.totalCarbs || "0") && (
                            <span>{" "} ({calculateDV("totalCarbs", data.totalCarbs || "0")}% DV)</span>
                        )}
                        <span>, Fiber{" "} {formatNutrientValue("dietaryFiber", data.dietaryFiber || "0", "g")}g</span>
                        {shouldShowDV("dietaryFiber", data.dietaryFiber || "0") && (
                            <span> {" "} ({calculateDV("dietaryFiber", data.dietaryFiber || "0")}% DV)</span>
                        )}
                        <span>, Total Sugars{" "}{formatNutrientValue("totalSugars", data.totalSugars || "0", "g")}g
                        </span>
                        {data.addedSugars && (
                            <>
                                <span>{" "}(Incl. {formatNutrientValue("addedSugars", data.addedSugars, "g")}g  Added Sugars</span>
                                {shouldShowDV("addedSugars", data.addedSugars) && (<span>, {calculateDV("addedSugars", data.addedSugars)}% DV</span>)}
                                <span>)</span>
                            </>
                        )}
                        <span>, </span>
                        <span className="font-extrabold text-3xl">Protein</span>
                        <span>{" "}{formatNutrientValue("protein", data.protein || "0", "g")}g, Vit. D</span>
                        {shouldShowDV("vitaminD", data.vitaminD || "0") && (
                            <span> ({calculateDV("vitaminD", data.vitaminD || "0")}% DV)</span>
                        )}
                        <span>, Calcium</span>
                        {shouldShowDV("calcium", data.calcium || "0") && (
                            <span> ({calculateDV("calcium", data.calcium || "0")}% DV)</span>
                        )}
                        <span>, Iron</span>
                        {shouldShowDV("iron", data.iron || "0") && (
                            <span> ({calculateDV("iron", data.iron || "0")}% DV)</span>
                        )}
                        <span>, Potas.</span>
                        {shouldShowDV("potassium", data.potassium || "0") && (
                            <span>{" "} ({calculateDV("potassium", data.potassium || "0")}% DV)</span>
                        )}

                        {_.map(_.filter(OPTIONAL_VITAMINS, (row => row.isVisible)), ({ shortLabel, key, ...row }) => (
                            <React.Fragment key={"linear" + row?.label}>
                                <span>, {shortLabel}.</span>
                                {shouldShowDV(key, data?.[key] || "0") && (
                                    <span>{" "} ({calculateDV(key, data?.[key] || "0")}% DV)</span>
                                )}
                            </React.Fragment>
                        ))}
                        <span>.</span>
                    </div>
                </div>
            </div >
            {renderIngridientSection(data)}
        </div>
    );


    // tabular section done
    const renderTabularDisplayLayout = () => {
        const isTabularFull = data.labelFormat === "tabular-full";
        return (
            <div className="w-full lg:w-[1350px] md:w-[1350px]  mx-auto">
                <div className={classNames("border-2 border-black  px-3 py-1", { "lg:!w-[1550px] md:!w-[1550px]": isTabularFull })}>
                    <div className="flex gap-6">
                        <div className={classNames("w-full max-w-[310px]", { "!max-w-[360px]": isTabularFull })}>
                            <div className="border-b-[0.1rem] border-black">
                                <div className="border-b border-black pb-2">
                                    <span className={classNames("text-6xl font-black leading-[3.2rem]", { "!text-[4.5rem] tracking-tight !leading-[1]": isTabularFull })}>Nutrition <br />Facts</span>
                                </div>
                            </div>

                            <div className={classNames("font-thin text-4xl pt-1 leading-[33px]", { "!text-[1.9rem]": isTabularFull })}>
                                {isTabularFull ? <>{formatServingsPerContainer(data.servingsPerContainer || "0")} servings per container</> : <>about {formatServingsPerContainer(data.servingsPerContainer || "3")} servings <br />per container</>}
                            </div>
                            <div className="border-b-[0.2rem] border-gray-500">
                                <div className={classNames("pb-2 flex flex-col", { "!pb-3": isTabularFull })}>
                                    <span className={classNames("font-extrabold text-4xl", { "!text-[2rem]": isTabularFull })}>Serving size</span>
                                    <span className={classNames("font-extrabold text-4xl", { "!text-[2rem]": isTabularFull })}>{formatServingSize() || "0 cup (0g)"}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between pt-1">
                                <div className="pb-2 flex flex-col">
                                    <span className={classNames("font-extrabold text-4xl", { "!text-[2.8rem]": isTabularFull })}>Calories</span>
                                    <span className={classNames("font-extrabold text-2xl", { "pl-2 text-3xl": isTabularFull })}>per serving</span>
                                </div>
                                <div className="font-extrabold text-6xl">{formatNutrientValue("calories", data.calories || "0", "")}</div>
                            </div>
                        </div>
                        <div className="grow">
                            <div className="flex gap-5">
                                <div className="flex-[35%]">
                                    <div className="border-b-[0.8rem] border-black">
                                        <div className={classNames("flex justify-between items-center font-bold py-2 leading-[30px] border-b-6 border-black", { "!py-1": isTabularFull })}>
                                            <span className="text-2xl font-black">Amount/serving </span>
                                            <span className="text-2xl font-extrabold block">% DV</span>
                                        </div>
                                    </div>
                                    <BoldTitleAndValue
                                        title={<>Total Fat <small className="!font-thin text-3xl">{formatNutrientValue("totalFat", data.totalFat || "0", "g")}g</small></>}
                                        value="3%" rootClass="!py-1" sizeStyle="!text-3xl" />

                                    <div className="flex justify-between border-b border-gray-400 py-1 pl-6">
                                        <span className="font-thin text-3xl">{(data.labelFormat === "tabular-full") ? "Saturated" : "Sat."} Fat {data.saturatedFat || "0"}g</span>
                                        <span className="font-extrabold text-3xl">
                                            {shouldShowDV("saturatedFat", data.saturatedFat || "0") ? `${calculateDV("saturatedFat", data.saturatedFat || "0")}%` : "0%"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-400 py-1 pl-6">
                                        <span className="font-thin text-3xl"><em>Trans</em> Fat {formatNutrientValue("transFat", data.transFat || "0", "g")}g</span>

                                    </div>

                                    <BoldTitleAndValue
                                        title={<>Cholesterol <small className="!font-thin text-3xl">{formatNutrientValue("cholesterol", data.cholesterol || "0", "mg")}mg</small></>}
                                        value={shouldShowDV("cholesterol", data.cholesterol || "0") ? `${calculateDV("cholesterol", data.cholesterol || "0")}%` : ""}
                                        rootClass="!py-1" sizeStyle="!text-3xl" />
                                    <div className="border-b-[0.7rem] border-black">
                                        <BoldTitleAndValue
                                            title={<>Sodium <small className="!font-thin text-3xl">{formatNutrientValue("sodium", data.sodium || "0", "mg")}mg</small></>}
                                            value={shouldShowDV("sodium", data.sodium || "0") ? `${calculateDV("sodium", data.sodium || "0")}%` : ""}
                                            rootClass="!py-1" sizeStyle="!text-3xl" />
                                    </div>
                                </div>
                                <div className="flex-[35%]">
                                    <div className="border-b-[0.8rem] border-black">
                                        <div className={classNames("flex justify-between items-center font-bold py-2 leading-[30px] border-b-6 border-black", { "!py-1": isTabularFull })}>
                                            <span className="text-2xl font-black">Amount/serving </span>
                                            <span className="text-2xl font-extrabold block">% DV</span>
                                        </div>
                                    </div>
                                    <BoldTitleAndValue
                                        title={<>Total Carb. <small className="!font-thin text-3xl">{formatNutrientValue("totalCarbs", data.totalCarbs || "0", "g")}g</small></>}
                                        value={shouldShowDV("totalCarbs", data.totalCarbs || "0") ? `${calculateDV("totalCarbs", data.totalCarbs || "0")}%` : ""}
                                        rootClass="!py-1" sizeStyle="!text-3xl" />

                                    <div className="flex justify-between border-b border-gray-400 py-1 pl-6">
                                        <span className="font-thin text-3xl">{isTabularFull && "Dietary"} Fiber {formatNutrientValue("dietaryFiber", data.dietaryFiber || "0", "g")}g</span>
                                        <span className="font-extrabold text-3xl">
                                            {shouldShowDV("dietaryFiber", data.dietaryFiber || "0") ? `${calculateDV("dietaryFiber", data.dietaryFiber || "0")}%` : "0%"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-400 py-1 pl-6">
                                        <span className="font-thin text-3xl">Total Sugars {formatNutrientValue("totalSugars", data.totalSugars || "0", "g")}g</span>
                                        <span className="font-extrabold text-3xl">
                                            {shouldShowDV("totalSugars", data.totalSugars || "0") ? `${calculateDV("totalSugars", data.totalSugars || "0")}%` : "0%"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between border-b border-gray-400 py-[5px] pl-6">
                                        <span className="pl-6 font-thin text-3xl">Incl. {formatNutrientValue("addedSugars", data.addedSugars, "g")}g Added Sugars</span>
                                        <span className="font-extrabold text-3xl">
                                            {shouldShowDV("addedSugars", data.addedSugars || "0") ? `${calculateDV("addedSugars", data.addedSugars || "0")}%` : "0%"}
                                        </span>
                                    </div>

                                    {/* Protein */}
                                    <div className="border-b-[0.7rem] border-black">
                                        <BoldTitleAndValue rootClass="!py-1" sizeStyle="!text-3xl"
                                            title={<>Protein <small className="!font-thin text-3xl">{formatNutrientValue("protein", data.protein || "0", "g")}g</small></>}
                                        />
                                    </div>
                                </div>
                                {data.labelFormat === "tabular-full" &&
                                    <div className="text-2xl font-thin pt-8 flex-[16%] !leading-[1.84rem]">
                                        <span> *  </span>
                                        <span>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</span>
                                    </div>
                                }
                            </div>
                            <div className={classNames("text-3xl text-black flex flex-wrap gap-x-[14px] gap-y-2 ", { "pt-[11px]": !isTabularFull })}>
                                <span>Vitamin D {shouldShowDV("vitaminD", data.vitaminD || "0") ? `${calculateDV("vitaminD", data.vitaminD || "0")}%` : "0%"}</span>
                                <div>
                                    <span className="mr-3">•</span>
                                    <span>Calcium {shouldShowDV("calcium", data.calcium || "0") ? `${calculateDV("calcium", data.calcium || "0")}%` : "0%"}</span>
                                </div>
                                <div>
                                    <span className="mr-3">•</span>
                                    <span>Iron {shouldShowDV("iron", data.iron || "0") ? `${calculateDV("iron", data.iron || "0")}%` : "0%"}</span>
                                </div>
                                <div>
                                    <span className="mr-3">•</span>
                                    <span>Potassium {shouldShowDV("potassium", data.potassium || "0") ? `${calculateDV("potassium", data.potassium || "0")}%` : "0%"}</span>
                                </div>
                                {_.map(_.filter(OPTIONAL_VITAMINS, (row => row.isVisible)), ({ label, value }) => (
                                    <div key={"tabular" + label}>
                                        <span className="mr-3">•</span>
                                        <span>{label} {value || "0%"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {renderIngridientSection(data)}
            </div>
        )
    }

    //simplified Done
    const renderSimplifiedDisplay = () => (
        <div className="w-full lg:w-[600px] md:w-[600px]  mx-auto">
            <div className="border-2 border-black px-3 py-1">
                <div className="border-b-[0.1rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="helvetica-black text-[3rem] sm:text-[3.5rem] md:text-[4.8rem] font-black leading-tight tracking-[-0.05em]">Nutrition</span>
                        <span className="helvetica-black text-[3rem] sm:text-[3.5rem] md:text-[4.8rem] font-black leading-tight tracking-[-0.05em]">Facts</span>
                    </div>
                </div>

                <div className="font-thin text-3xl ">{formatServingsPerContainer(data.servingsPerContainer || 0)} servings per container</div>
                <div className="border-b-[1.5rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="font-extrabold text-3xl">Serving size</span>
                        <span className="font-extrabold text-3xl">{formatServingSize() || "0 tbsp (0g)"}</span>
                    </div>

                </div>

                <div className="border-b-[0.8rem] border-black">
                    <div className="flex justify-between items-end font-bold py-2 border-b-6 border-black">
                        <div>
                            <span className="text-xl block">Amount per serving</span>
                            <span className="text-6xl font-black">Calories</span>
                        </div>
                        <div className="text-7xl font-black">{formatNutrientValue("calories", data.calories || "0", "")}</div>
                    </div>
                </div>
                <div className="border-b border-black py-2">
                    <p className="text-right font-black text-md">% DV*</p>
                </div>

                {/* Total Fat */}
                <BoldTitleAndValue
                    title={`Total Fat ${formatNutrientValue("totalFat", data.totalFat || "14", "g")}g`}
                    value={shouldShowDV("totalFat", data.totalFat || "0") ? `${calculateDV("totalFat", data.totalFat || "0")}%` : "0%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Saturated Fat {formatNutrientValue("saturatedFat", data.saturatedFat || "0", "g")}g</span>
                    <span className="font-thin text-2xl">
                        {shouldShowDV("saturatedFat", data.saturatedFat || "0") ? `${calculateDV("saturatedFat", data.saturatedFat || "0")}%` : "0%"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl italic"><em>Trans</em> Fat {formatNutrientValue("transFat", data.transFat || "0", "g")}g</span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Polyunsaturated Fat {formatNutrientValue("polyunsaturatedFat", data.saturatedFat || "0", "g")}g</span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Monounsaturated Fat {formatNutrientValue("monounsaturatedFat", data.saturatedFat || "0", "g")}g</span>
                </div>
                {/* Cholesterol */}
                <BoldTitleAndValue
                    title={`Cholesterol ${formatNutrientValue("cholesterol", data.cholesterol || "0", "mg")}mg`}
                    value={shouldShowDV("cholesterol", data.cholesterol || "0") ? `${calculateDV("cholesterol", data.cholesterol || "0")}%` : ""}
                />
                {/* Sodium */}
                <BoldTitleAndValue
                    title={`Sodium ${formatNutrientValue("sodium", data.sodium || "0", "mg")}mg`}
                    value={shouldShowDV("sodium", data.sodium || "0") ? `${calculateDV("sodium", data.sodium || "0")}%` : ""}
                />
                {/* Carbohydrate */}
                <BoldTitleAndValue
                    title={`Total Carbohydrate ${formatNutrientValue("totalCarbs", data.totalCarbs || "0", "g")}g`}
                    value={shouldShowDV("totalCarbs", data.totalCarbs || "0") ? `${calculateDV("totalCarbs", data.totalCarbs || "0")}%` : ""}
                />
                {/* Protein */}
                <div className="border-b-[1.2rem] border-black">
                    <BoldTitleAndValue title={`Protein ${formatNutrientValue("protein", data?.protein || "0", "g")}g`} />
                </div>
                {/* Not a significant source statement */}
                <div className="py-2 border-b text-xs py-2">
                    {(() => {
                        const insignificantNutrients = getInsignificantNutrients();
                        if (insignificantNutrients.length > 0) {
                            return (
                                <div className="py-2 border-b border-black">
                                    <p className="text-sm">
                                        * Not a significant source of{" "}
                                        {insignificantNutrients.join(", ")}.
                                    </p>
                                </div>
                            );
                        }
                        return null;
                    })()}
                </div>
                <div className="flex gap-2 text-xl mt-2 pt-1">
                    <span> *  </span> <span>% DV = % Daily Value</span>
                </div>
            </div>
            {renderIngridientSection(data)}
        </div>
    );

    //done
    const renderMicronutrientsSideBySide = () => (
        <div className="w-full lg:w-[600px] md:w-[600px] mx-auto">
            <div className="border-2 border-black px-3 py-1">
                <div className="border-b-[0.1rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="helvetica-black text-[3rem] sm:text-[3.5rem] md:text-[4.8rem] font-black leading-tight tracking-[-0.05em]">Nutrition</span>
                        <span className="helvetica-black text-[3rem] sm:text-[3.5rem] md:text-[4.8rem] font-black leading-tight tracking-[-0.05em]">Facts</span>
                    </div>
                </div>

                <div className="font-thin text-3xl pt-1">{formatServingsPerContainer(data.servingsPerContainer || "0")} servings per container</div>
                <div className="border-b-[1.2rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="font-extrabold text-3xl">Serving size</span>
                        <span className="font-extrabold text-3xl">{formatServingSize() || "0 cup (0g)"}</span>
                    </div>

                </div>

                <div className="border-b-[0.8rem] border-black">
                    <div className="flex justify-between items-end font-bold py-2 border-b-6 border-black">
                        <div>
                            <span className="text-xl font-extrabold block">Amount per serving</span>
                            <span className="text-6xl font-black">Calories</span>
                        </div>
                        <div className="text-7xl font-black">{formatNutrientValue("calories", data.calories || "0", "")}</div>
                    </div>
                </div>
                <div className="border-b border-black py-2">
                    <p className="text-right font-extrabold font-black text-md">% Daily Value*</p>
                </div>

                {/* Total Fat */}
                <BoldTitleAndValue
                    title={`Total Fat ${formatNutrientValue("totalFat", data.totalFat || "8", "g")}g`}
                    value={shouldShowDV("totalFat", data.totalFat || "0") ? `${calculateDV("totalFat", data.totalFat || "0")}%` : "0%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Saturated Fat {formatNutrientValue("saturatedFat", data.saturatedFat || "0", "g")}g</span>
                    <span className="font-thin text-2xl">
                        {shouldShowDV("saturatedFat", data.saturatedFat || "0") ? `${calculateDV("saturatedFat", data.saturatedFat || "0")}%` : "0%"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl italic"><em>Trans</em> Fat {formatNutrientValue("transFat", data.transFat || "0", "g")}g</span>
                </div>

                {/* Cholesterol */}
                <BoldTitleAndValue
                    title={`Cholesterol ${formatNutrientValue("cholesterol", data.cholesterol || "0", "mg")}mg`}
                    value={shouldShowDV("cholesterol", data.cholesterol || "0") ? `${calculateDV("cholesterol", data.cholesterol || "0")}%` : "0%"}
                />
                {/* Sodium */}
                <BoldTitleAndValue
                    title={`Sodium ${formatNutrientValue("sodium", data.sodium || "0", "mg")}mg`}
                    value={shouldShowDV("sodium", data.sodium || "0") ? `${calculateDV("sodium", data.sodium || "0")}%` : "0%"}
                />
                {/* Carbohydrate */}
                <BoldTitleAndValue
                    title={`Total Carbohydrate ${formatNutrientValue("totalCarbs", data.totalCarbs || "0", "g")}g`}
                    value={shouldShowDV("totalCarbs", data.totalCarbs || "0") ? `${calculateDV("totalCarbs", data.totalCarbs || "0")}%` : "0%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Dietary Fiber {formatNutrientValue("dietaryFiber", data.dietaryFiber || "0", "g")}g</span>
                    <span className="font-thin text-2xl">
                        {shouldShowDV("dietaryFiber", data.dietaryFiber || "0") ? `${calculateDV("dietaryFiber", data.dietaryFiber || "0")}%` : "0%"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Total Sugars {formatNutrientValue("totalSugars", data.totalSugars || "0", "g")}g</span>
                    <span className="font-thin text-2xl">-</span>
                </div>

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="pl-6 font-thin text-2xl">Includes {formatNutrientValue("addedSugars", data.addedSugars || "0", "g")}g Added Sugars</span>
                    <span className="font-thin text-2xl">
                        {shouldShowDV("addedSugars", data.addedSugars) ? `${calculateDV("addedSugars", data.addedSugars)}%` : "0%"}
                    </span>
                </div>

                {/* Protein */}
                <div className="border-b-[1.2rem] border-black">
                    <BoldTitleAndValue
                        title={`Protein ${formatNutrientValue("protein", data?.protein || "0", "g")}g`}
                    // value={shouldShowDV("protein", data.protein) ? `${calculateDV("protein", data.protein)}%` : ""}
                    />
                </div>

                {/* Vitamins */}
                <div className="border-b-[0.5rem] border-black">
                    <div>
                        <div className="flex justify-between border-b border-gray-400 py-2">
                            {_.map(_.filter([
                                { title: `Vit. D ${data?.vitaminD || 0}mcg`, value: shouldShowDV("vitaminD", data?.vitaminD) ? `${calculateDV("vitaminD", data?.vitaminD)}%` : "0%", isVisible: !!data?.vitaminD || true },
                                { title: `Calcium ${data?.calcium || 0}mg`, value: shouldShowDV("calcium", data?.calcium) ? `${calculateDV("calcium", data?.calcium)}%` : "0%", isVisible: !!data?.calcium || true },
                            ], (row) => row?.isVisible),
                                ({ title, value }) => (
                                    <div key={title} className="flex justify-between ">
                                        <span className="font-thin text-2xl">{title}</span>&nbsp;
                                        <span className="font-thin text-2xl">{value}</span>
                                    </div>
                                ))}
                        </div>
                        <div className="flex justify-between border-b border-gray-400 py-2">
                            {_.map(_.filter([
                                { title: `Iron ${data?.iron || 0}mg`, value: shouldShowDV("iron", data?.iron) ? `${calculateDV("iron", data?.iron)}%` : "0%", isVisible: !!data?.calcium || true },
                                { title: `Potas. ${formatNutrientValue("potassium", data?.potassium || "0", "mg")}mg`, value: shouldShowDV("potassium", data?.potassium) ? `${calculateDV("potassium", data?.potassium)}%` : "0%", isVisible: !!data?.potassium || true }
                            ], (row) => row?.isVisible),
                                ({ title, value }) => (
                                    <div key={title} className="flex justify-between ">
                                        <span className="font-thin text-2xl">{title}</span>&nbsp;
                                        <span className="font-thin text-2xl">{value}</span>
                                    </div>
                                ))}
                        </div>
                        {_.map(_.chunk(_.filter(OPTIONAL_VITAMINS, (row => row.isVisible)), 2), (dataArray, idx) => (
                            <div className="flex justify-between border-b border-gray-400 py-2" key={"microMain" + idx}>
                                {_.map(dataArray, ({ label, shortLabel, key, value, unit }) => (
                                    <div key={"micro" + label} className="flex justify-between">
                                        <span className="font-thin text-2xl">
                                            {shortLabel} {formatNutrientValue("potassium", data?.[key] || "0")}{unit}
                                        </span>&nbsp;
                                        <span className="font-thin text-2xl">{value}</span>
                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 text-xl mt-2 pt-1">
                    <span> *  </span>
                    <span>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</span>
                </div>
            </div>
            {renderIngridientSection(data)}
        </div>
    );

    // done
    const renderInfantFormat = () => (
        <div className="w-full lg:w-[600px] md:w-[600px] mx-auto">
            <div className="border-2 border-black px-3 py-1">
                <div className="border-b-[0.1rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="helvetica-black text-[3rem] sm:text-[3.5rem] md:text-[4.8rem] font-black leading-tight tracking-[-0.05em]">Nutrition</span>
                        <span className="helvetica-black text-[3rem] sm:text-[3.5rem] md:text-[4.8rem] font-black leading-tight tracking-[-0.05em]">Facts</span>
                    </div>
                </div>

                <div className="font-thin text-3xl pt-1">{formatServingsPerContainer(data.servingsPerContainer || "0")} servings per container</div>
                <div className="border-b-[1.2rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="font-extrabold text-3xl">Serving size</span>
                        <span className="font-extrabold text-3xl">{formatServingSize() || '0 pack (0g)'}</span>
                    </div>

                </div>

                <div className="border-b-[0.8rem] border-black">
                    <div className="flex justify-between items-end font-bold py-2 border-b-6 border-black">
                        <div>
                            <span className="text-xl font-extrabold block">Amount per serving</span>
                            <span className="text-6xl font-black">Calories</span>
                        </div>
                        <div className="text-7xl font-black">{formatNutrientValue("calories", data.calories || "0", "")}</div>
                    </div>
                </div>
                <div className="border-b border-black py-2">
                    <p className="text-right font-extrabold font-black text-md">% Daily Value*</p>
                </div>

                {/* Total Fat */}
                <BoldTitleAndValue
                    title={`Total Fat ${formatNutrientValue("totalFat", data.totalFat || "0", "g")}g`}
                    value={shouldShowDV("totalFat", data.totalFat || "0") ? `${calculateDV("totalFat", data.totalFat || "0")}%` : ""}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Saturated Fat {formatNutrientValue("saturatedFat", data.saturatedFat || "0", "g")}g</span>
                    <span className="font-thin text-2xl">
                        {shouldShowDV("saturatedFat", data.saturatedFat || "0") ? `${calculateDV("saturatedFat", data.saturatedFat || "0")}%` : ""}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl italic"><em>Trans</em> Fat {formatNutrientValue("transFat", data.transFat || "0", "g")}g</span>
                </div>

                {/* Cholesterol */}
                <BoldTitleAndValue
                    title={`Cholesterol ${formatNutrientValue("cholesterol", data.cholesterol || "0", "mg")}mg`}
                    value={shouldShowDV("cholesterol", data.cholesterol || "0") ? `${calculateDV("cholesterol", data.cholesterol || "0")}%` : ""}
                />
                {/* Sodium */}
                <BoldTitleAndValue
                    title={`Sodium ${formatNutrientValue("sodium", data.sodium || "0", "mg")}mg`}
                    value={shouldShowDV("sodium", data.sodium || "0") ? `${calculateDV("sodium", data.sodium || "0")}%` : ""}
                />
                {/* Carbohydrate */}
                <BoldTitleAndValue
                    title={`Total Carbohydrate ${formatNutrientValue("totalCarbs", data.totalCarbs || "0", "g")}g`}
                    value={shouldShowDV("totalCarbs", data.totalCarbs || "0") ? `${calculateDV("totalCarbs", data.totalCarbs || "0")}%` : "0%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Dietary Fiber {formatNutrientValue("dietaryFiber", data.dietaryFiber || "0", "g")}g</span>
                    {/* <span className="font-thin text-2xl">
                        {shouldShowDV("dietaryFiber", data.dietaryFiber || "0") ? `${calculateDV("dietaryFiber", data.dietaryFiber || "0")}%` : ""}
                    </span> */}
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Total Sugars {formatNutrientValue("totalSugars", data.totalSugars || "0", "g")}g</span>
                    <span className="font-thin text-2xl">-</span>
                </div>
                {data.addedSugars && (
                    <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                        <span className="pl-6 font-thin text-2xl">Includes {formatNutrientValue("addedSugars", data.addedSugars || "0", "g")}g Added Sugars</span>
                        <span className="font-thin text-2xl">
                            {shouldShowDV("addedSugars", data.addedSugars) ? `${calculateDV("addedSugars", data.addedSugars)}%` : ""}
                        </span>
                    </div>
                )}

                {/* Protein */}
                <div className="border-b-[1.2rem] border-black">
                    <BoldTitleAndValue
                        title={`Protein ${formatNutrientValue("protein", data?.protein || "0", "g")}g`}
                        value={shouldShowDV("totalCarbs", data.totalCarbs || "0") ? `${calculateDV("totalCarbs", data.totalCarbs || "0")}%` : "0%"}
                    />
                </div>

                {/* Vitamins */}
                <div className="border-black">
                    {_.map(_.filter([
                        { title: `Vitamin D ${data?.vitaminD || 0}mcg`, value: shouldShowDV("vitaminD", data?.vitaminD) ? `${calculateDV("vitaminD", data?.vitaminD)}%` : "0%", isVisible: !!data?.vitaminD },
                        { title: `Calcium ${data?.calcium || 0}mg`, value: shouldShowDV("calcium", data?.calcium) ? `${calculateDV("calcium", data?.calcium)}%` : "0%", isVisible: !!data?.calcium },
                        { title: `Iron ${data?.iron || 0}mg`, value: shouldShowDV("iron", data?.iron) ? `${calculateDV("iron", data?.iron)}%` : "0%", isVisible: !!data?.calcium },
                        { title: `Potassium ${formatNutrientValue("potassium", data?.potassium || "0", "mg")}mg`, value: shouldShowDV("potassium", data?.potassium) ? `${calculateDV("potassium", data?.potassium)}%` : "0%", isVisible: !!data?.potassium },
                        ...OPTIONAL_VITAMINS
                    ], (row) => row?.isVisible),
                        ({ title, value }) => (
                            <div key={title} className={"flex justify-between py-2 border-b border-gray-400 last:border-0"}>
                                <span className="font-thin text-2xl">{title}</span>
                                <span className="font-thin text-2xl">{value}</span>
                            </div>
                        ))}
                </div>
            </div>
            {renderIngridientSection(data)}
        </div>
    );

    //done
    const renderChildrenFormat = () => (
        <div className="w-full lg:w-[600px] md:w-[600px] mx-auto">
            <div className="border-2 border-black px-3 py-1">
                <div className="border-b-[0.1rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="helvetica-black text-[3rem] sm:text-[3.5rem] md:text-[4.8rem] font-black leading-tight tracking-[-0.05em]">Nutrition</span>
                        <span className="helvetica-black text-[3rem] sm:text-[3.5rem] md:text-[4.8rem] font-black leading-tight tracking-[-0.05em]">Facts</span>
                    </div>
                </div>

                <div className="font-thin text-3xl pt-1">{formatServingsPerContainer(data.servingsPerContainer || "0")} servings per container</div>
                <div className="border-b-[1.2rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="font-extrabold text-3xl">Serving size</span>
                        <span className="font-extrabold text-3xl">{formatServingSize() ? formatServingSize() : "0 container (0g)"}</span>
                    </div>

                </div>

                <div className="border-b-[0.8rem] border-black">
                    <div className="flex justify-between items-end font-bold py-2 border-b-6 border-black">
                        <div>
                            <span className="text-xl font-extrabold block">Amount per serving</span>
                            <span className="text-6xl font-black">Calories</span>
                        </div>
                        <div className="text-7xl font-black">{formatNutrientValue("calories", data.calories || "0", "")}</div>
                    </div>
                </div>
                <div className="border-b border-black py-2">
                    <p className="text-right font-extrabold font-black text-md">% Daily Value*</p>
                </div>

                {/* Total Fat */}
                <BoldTitleAndValue
                    title={<>Total Fat <small className="!font-thin text-2xl">{formatNutrientValue("totalFat", data.totalFat || "0", "g")}mg</small></>}
                    value={shouldShowDV("totalFat", data.totalFat || "0") ? `${calculateDV("totalFat", data.totalFat || "0")}%` : "0%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Saturated Fat {formatNutrientValue("saturatedFat", data.saturatedFat || "0", "g")}g</span>
                    <span className="font-thin text-2xl">
                        {shouldShowDV("saturatedFat", data.saturatedFat || "0") ? `${calculateDV("saturatedFat", data.saturatedFat || "0")}%` : "0%"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl italic"><em>Trans</em> Fat {formatNutrientValue("transFat", data.transFat || "0", "g")}g</span>
                </div>

                {/* Cholesterol */}

                <BoldTitleAndValue
                    title={<>Cholesterol <small className="!font-thin text-2xl">{formatNutrientValue("cholesterol", data.cholesterol || "0", "mg")}mg</small></>}
                    value={shouldShowDV("cholesterol", data.cholesterol || "0") ? `${calculateDV("cholesterol", data.cholesterol || "0")}%` : "0%"}
                />
                {/* Sodium */}
                <BoldTitleAndValue
                    title={<>Sodium <small className="!font-thin text-2xl">{formatNutrientValue("cholesterol", data.cholesterol || "0", "mg")}mg</small></>}
                    value={shouldShowDV("sodium", data.sodium || "0") ? `${calculateDV("sodium", data.sodium || "0")}%` : "0%"}
                />

                {/* Carbohydrate */}
                <BoldTitleAndValue
                    title={<>Total Carbohydrate <small className="!font-thin text-2xl">{formatNutrientValue("totalCarbs", data.cholesterol || "0", "mg")}mg</small></>}
                    value={shouldShowDV("totalCarbs", data.totalCarbs || "0") ? `${calculateDV("totalCarbs", data.totalCarbs || "0")}%` : "0%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Dietary Fiber {formatNutrientValue("dietaryFiber", data.dietaryFiber || "0", "g")}g</span>
                    <span className="font-thin text-2xl">
                        {shouldShowDV("dietaryFiber", data.dietaryFiber || "0") ? `${calculateDV("dietaryFiber", data.dietaryFiber || "0")}%` : "0%"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-2xl">Total Sugars {formatNutrientValue("totalSugars", data.totalSugars || "0", "g")}g</span>
                    <span className="font-thin text-2xl">-</span>
                </div>

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="pl-6 font-thin text-2xl">Includes {formatNutrientValue("addedSugars", data.addedSugars || "0", "g")}g Added Sugars</span>
                    <span className="font-thin text-2xl">
                        {shouldShowDV("addedSugars", data.addedSugars) ? `${calculateDV("addedSugars", data.addedSugars)}%` : "0%"}
                    </span>
                </div>

                {/* Protein */}
                <div className="border-b-[1.2rem] border-black">
                    <BoldTitleAndValue
                        title={`Protein ${formatNutrientValue("protein", data?.protein || "0", "g")}g`}
                        value={shouldShowDV("protein", data.protein || "0") ? `${calculateDV("protein", data.protein || "0")}%` : "0%"}
                    />
                </div>

                {/* Vitamins */}
                <div className="border-b-[0.5rem] border-black">
                    {_.map(_.filter([
                        { title: `Vitamin D ${data?.vitaminD || 0}mcg`, value: shouldShowDV("vitaminD", data?.vitaminD) ? `${calculateDV("vitaminD", data?.vitaminD)}%` : "", isVisible: !!data?.vitaminD },
                        { title: `Calcium ${data?.calcium || 0}mg`, value: shouldShowDV("calcium", data?.calcium) ? `${calculateDV("calcium", data?.calcium)}%` : "", isVisible: !!data?.calcium },
                        { title: `Iron ${data?.iron || 0}mg`, value: shouldShowDV("iron", data?.iron) ? `${calculateDV("iron", data?.iron)}%` : "", isVisible: !!data?.calcium || true },
                        { title: `Potassium ${formatNutrientValue("potassium", data?.potassium || "0", "mg")}mg`, value: shouldShowDV("potassium", data?.potassium) ? `${calculateDV("potassium", data?.potassium)}%` : "0%", isVisible: !!data?.potassium },
                        ...OPTIONAL_VITAMINS
                    ], (row) => row?.isVisible),
                        ({ title, value }) => (
                            <div key={title} className="flex justify-between border-b border-gray-400 py-2">
                                <span className="font-thin text-2xl">{title}</span>
                                <span className="font-thin text-2xl">{value}</span>
                            </div>
                        ))}
                </div>
                {/* Add "Not a significant source" statement */}
                {/* {(() => {
                    const insignificantNutrients = getInsignificantNutrients();
                    if (insignificantNutrients.length > 0) {
                        return (
                            <div className="py-2 border-b border-black">
                                <p className="text-sm">
                                    * Not a significant source of{" "}
                                    {insignificantNutrients.join(", ")}.
                                </p>
                            </div>
                        );
                    }
                    return null;
                })()} */}

                <div className="flex gap-2 text-xl mt-2 pt-1">
                    <span> *  </span>
                    <span>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</span>
                </div>
            </div>
            {renderIngridientSection(data)}
        </div>
    );

    //done
    const renderBilingualFormat = () => (
        <div className="w-full">
            <div className="border-2 border-black   mx-auto px-3 py-1">
                <div className="border-b-[0.1rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="helvetica-black text-2xl py-3 sm:text-2xl md:text-[2.46rem] font-black leading-tight tracking-[-0.05em]">Nutrition Facts/Datos de Nutrición</span>
                    </div>
                </div>

                <div className="font-thin text-xl pt-1">
                    <span>{formatServingsPerContainer(data.servingsPerContainer || "0")} servings per container/</span>
                    <span>{formatServingsPerContainer(data.servingsPerContainer || "0")} raciones por envase</span>
                </div>

                <div className="border-b-[1.2rem] border-black">
                    <div className="border-b border-black pb-2 flex justify-between">
                        <span className="font-extrabold text-xl">Serving size/Tamaño por ración</span>
                        <span className="font-extrabold text-xl">{formatServingSize() || "0 cup taza (0g)"}</span>
                    </div>

                </div>

                <div className="border-b-[0.8rem] border-black">
                    <div className="flex justify-between items-end font-bold py-2 border-b-6 border-black">
                        <div>
                            <span className="text-l font-extrabold block">Amount per serving/Cantidad por ración</span>
                            <span className="text-4xl font-black">Calories/Calorías</span>
                        </div>
                        <div className="text-6xl font-black">{formatNutrientValue("calories", data.calories || "0", "")}</div>
                    </div>
                </div>
                <div className="border-b border-black py-2">
                    <p className="text-right font-extrabold font-black text-md">% Daily Value*/Valor Diario*</p>
                </div>

                {/* Total Fat */}
                <BoldTitleAndValue
                    sizeStyle="!text-xl"
                    title={<>Total Fat/Grasa Total <small className="!font-thin text-xl">{formatNutrientValue("totalFat", data.totalFat || "0", "g")}mg</small></>}
                    value={shouldShowDV("totalFat", data.totalFat || "0") ? `${calculateDV("totalFat", data.totalFat || "0")}%` : "10%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-xl">Saturated Fat/Grasa Saturada {formatNutrientValue("saturatedFat", data.saturatedFat || "0", "g")}g</span>
                    <span className="font-thin text-xl">
                        {shouldShowDV("saturatedFat", data.saturatedFat || "0") ? `${calculateDV("saturatedFat", data.saturatedFat || "0")}%` : "0%"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-xl italic"><em>Trans</em> Fat/Grasa {formatNutrientValue("transFat", data.transFat || "0", "g")}g</span>
                </div>

                {/* Cholesterol */}
                <BoldTitleAndValue
                    sizeStyle="!text-xl"
                    title={<>Cholesterol/Colesterol <small className="!font-thin text-xl">{formatNutrientValue("cholesterol", data.cholesterol || "0", "mg")}mg</small></>}
                    value={shouldShowDV("cholesterol", data.cholesterol || "0") ? `${calculateDV("cholesterol", data.cholesterol || "0")}%` : "0%"}
                />
                {/* Sodium */}
                <BoldTitleAndValue
                    sizeStyle="!text-xl"
                    title={<>Sodium/Sodio <small className="!font-thin text-xl">{formatNutrientValue("sodium", data.sodium || "0", "mg")}mg</small></>}
                    value={shouldShowDV("sodium", data.sodium || "0") ? `${calculateDV("sodium", data.sodium || "0")}%` : "0%"}
                />
                {/* Carbohydrate */}
                <BoldTitleAndValue
                    sizeStyle="!text-xl"
                    title={<>Total Carbohydrate/Carbohidrato Total <small className="!font-thin text-xl">{formatNutrientValue("totalCarbs", data.totalCarbs || "0", "g")}g</small></>}
                    value={shouldShowDV("totalCarbs", data.totalCarbs || "0") ? `${calculateDV("totalCarbs", data.totalCarbs || "0")}%` : "0%"}
                />

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-xl">Dietary Fiber/Fibra Dietética {formatNutrientValue("dietaryFiber", data.dietaryFiber || "0", "g")}g</span>
                    <span className="font-thin text-xl">
                        {shouldShowDV("dietaryFiber", data.dietaryFiber || "0") ? `${calculateDV("dietaryFiber", data.dietaryFiber || "0")}%` : "0%"}
                    </span>
                </div>
                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="font-thin text-xl">Total Sugars/Azúcares Totales {formatNutrientValue("totalSugars", data.totalSugars || "0", "g")}g</span>
                    <span className="font-thin text-xl">-</span>
                </div>

                <div className="flex justify-between border-b border-gray-400 py-2 pl-6">
                    <span className="pl-6 font-thin text-xl">
                        Includes {formatNutrientValue("addedSugars", data.addedSugars || "0", "g")}g Added Sugars/Incluye {formatNutrientValue("addedSugars", data.addedSugars || "0", "g")}g
                        azúcares añadidos
                    </span>
                    <span className="font-thin text-xl">
                        {shouldShowDV("addedSugars", data.addedSugars) ? `${calculateDV("addedSugars", data.addedSugars)}%` : "0%"}
                    </span>
                </div>

                {/* Protein */}
                <div className="border-b-[1.2rem] border-black">
                    <BoldTitleAndValue
                        sizeStyle="!text-xl"
                        title={<>Protein/Proteínas <small className="!font-thin text-2xl">{formatNutrientValue("protein", data.protein || "0", "g")}g</small></>}
                    />
                </div>

                {/* Vitamins */}
                <div className="border-b-[0.5rem] border-black">
                    {_.map(_.filter([
                        { title: `Vitamin D/Vitamina D ${data?.vitaminD || 0}mcg`, value: shouldShowDV("vitaminD", data?.vitaminD) ? `${calculateDV("vitaminD", data?.vitaminD)}%` : "0%", isVisible: !!data?.vitaminD },
                        { title: `Calcium/Calcio ${data?.calcium || 0}mg`, value: shouldShowDV("calcium", data?.calcium) ? `${calculateDV("calcium", data?.calcium)}%` : "0%", isVisible: !!data?.calcium },
                        { title: `Iron/Hierro ${data?.iron || 0}mg`, value: shouldShowDV("iron", data?.iron) ? `${calculateDV("iron", data?.iron)}%` : "0%", isVisible: !!data?.calcium },
                        { title: `Potassium/Potasio ${formatNutrientValue("potassium", data?.potassium || "0", "mg")}mg`, value: shouldShowDV("potassium", data?.potassium) ? `${calculateDV("potassium", data?.potassium)}%` : "0%", isVisible: !!data?.potassium },
                        ..._.map(OPTIONAL_VITAMINS, (row) => ({ ...row, title: row?.spanishTitle }))
                    ], (row) => row?.isVisible),
                        ({ title, value }) => (
                            <div key={title} className="flex justify-between border-b border-gray-400 py-2">
                                <span className="font-thin text-xl">{title}</span>
                                <span className="font-thin text-xl">{value}</span>
                            </div>
                        ))}
                </div>
                <div className="flex gap-2 text-[16px] mt-2 pt-1">
                    <span> *  </span>
                    <span>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</span>
                </div>
                <div className="flex gap-2 text-[16px] mt-2 pt-1">
                    <span> *  </span>
                    <span>El % Valor Diario (VD) le indica cuánto un nutriente en una porción de alimentos contribuye a una dieta diaria. 2,000 calorías al día se utiliza para asesoramiento de nutrición general.</span>
                </div>
            </div>
            {renderIngridientSection(data)}
        </div>
    );

    const renderLabelFormat = () => {
        switch (data.labelFormat) {
            case "standard":
                return renderStandardVertical();
            case "linear":
                return renderLinearDisplay();
            case "tabular":
            case "tabular-full":
                return renderTabularDisplayLayout();
            case "dual-column":
            case "dual-forms":
                return <DuelLayoutSection {...dualLayoutHookData} {...{ formatNutrientValue, calculateDV, formatServingsPerContainer }} >
                    {renderIngridientSection(data)}
                </DuelLayoutSection>
            case "simplified":
                return renderSimplifiedDisplay();
            case "micronutrients-side":
                return renderMicronutrientsSideBySide();
            case "infant":
                return renderInfantFormat();
            case "children":
                return renderChildrenFormat();
            case "bilingual":
                return renderBilingualFormat();
            case "aggregate":
                return <AggregateLabelPreview {...aggregateLayoutHookData} {...{ formatNutrientValue, calculateDV, formatServingsPerContainer }} >
                    {renderIngridientSection(data)}
                </AggregateLabelPreview>
            default:
                return renderStandardVertical();
        }
    };

    const [showScrollWarning, setShowScrollWarning] = useState(false);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (scrollContainerRef.current) {
                const hasOverflow =
                    scrollContainerRef.current.scrollWidth >
                    scrollContainerRef.current.clientWidth;
                setShowScrollWarning(hasOverflow);
            }
        };

        checkOverflow();
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [data.labelFormat, scrollContainerRef]);

    const buttonCss = (className) =>
        classNames(
            `inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
            ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
            disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-10 px-4 py-2
            text-white flex-1`,
            className
        );

    return (
        <div className="rounded-lg border bg-white text-cardTextColor shadow-sm sticky top-44">
            <div className="flex flex-col space-y-1.5 px-6 pt-6">
                <h3 className="text-2xl leading-none tracking-tight text-primaryTextColor font-black">
                    Live Preview
                </h3>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 font-light mb-2">
                        Format:{" "}
                        {data.labelFormat.charAt(0).toUpperCase() +
                            data.labelFormat.slice(1).replace("-", " ")}
                    </p>
                    {/* {[
                        "linear",
                        "tabular",
                        "tabular-full",
                        "bilingual",
                        "aggregate",
                        "dual-column",
                        "dual-forms",
                    ].includes(data.labelFormat) && (
                            <span className="text-xs bg-[#f05624] text-white px-2 py-1 rounded font-medium">
                                Wide Format
                            </span>
                        )} */}
                </div>
            </div>

            <div className="p-6 pt-0 pb-4">
                {showScrollWarning && (
                    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Wide Format:</strong> Scroll horizontally to view the
                            complete label. The exported version will be properly sized.
                        </p>
                    </div>
                )}

                {/* Label Preview Container - with max height to prevent overflow */}
                <div className="max-h-[53vh] overflow-y-auto mb-4">
                    <div className="overflow-x-auto" ref={scrollContainerRef} >
                        <div ref={divRef} style={{ padding: "20px 0" }}>
                            <div className="relative">
                                {renderLabelFormat()}
                                {/* Watermark Overlay */}
                                {!showExportModal &&
                                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                        <div className={classNames("transform -rotate-45 text-gray-300 text-lg font-bold opacity-50 select-none text-[30px]", { "!text-[50px]": data.labelFormat !== "linear" })}>
                                            ePackageSupply.com
                                        </div>
                                    </div>
                                }
                            </div>


                        </div>
                    </div>
                </div>

                {/* Action Buttons - always visible at bottom */}
                <div className="border-t border-gray-200 bg-gray-50 -mx-6 px-6 py-4">
                    <div className="text-center mb-3">
                        <p className="text-xs text-gray-600 font-light">
                            Exported files will be clean without any watermarks.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3  mx-auto">
                        <button
                            onClick={onSave}
                            className={buttonCss("bg-darkBlue hover:bg-[#1e4a8c]")}
                        >
                            <Save />
                            Save Progress
                        </button>
                        <button
                            onClick={onExport}
                            className={buttonCss("bg-[#f05624] hover:bg-[#d4461c]")}
                        >
                            <Download />
                            Export Label
                        </button>
                        <button
                            type="button"
                            className={buttonCss("bg-[#f05624] hover:bg-[#d4461c]")}
                        >
                            <a
                                href="mailto:service@epackagesupply.com?subject=Nutrition Label Generator Help"
                                className="btn btn-outline flex items-center space-x-2"
                                title="Need Help?"
                            >
                                <Mail />
                                <span>Need Help?</span>
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
