import React, { useState } from 'react';
import { CommonCard } from './Common';
import InfoTooltip from '../../../inputs/InfoToolTip';

export const FDAComplience = () => {
    const [showFDACompliance, setShowFDACompliance] = useState(false)

    return (
        <>
            {/* FDA Compliance Requirements - Collapsible */}
            <CommonCard title="">
                <button
                    type="button"
                    onClick={() => setShowFDACompliance(!showFDACompliance)}
                    className="flex items-center justify-between w-full text-left"
                >
                    <h4 className="font-semibold text-textColor flex items-center">
                        FDA Compliance Requirements
                        <InfoTooltip>
                            Important information about FDA requirements for nutrition labels, required fields, and "Not a
                            significant source" rules.
                        </InfoTooltip>
                    </h4>
                    <div className={`transform transition-transform duration-200 ${showFDACompliance ? "rotate-180" : ""}`}>
                        <svg className="w-5 h-5 text-darkBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </button>
                <p className="text-sm text-gray-600 font-light mt-1 mb-3">
                    Essential FDA guidelines for nutrition label compliance.{" "}
                    <a
                        href="https://www.fda.gov/media/81606/download"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-darkBlue hover:text-[#1e4a8c] underline font-medium"
                    >
                        Full FDA Guidelines
                    </a>
                </p>

                {showFDACompliance && (
                    <div className="space-y-4 mt-4">
                        {/* Required Fields Section */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 className="font-semibold text-textColor mb-2 flex items-center">
                                Required Fields
                                <InfoTooltip>
                                    Fields marked with an asterisk (*) are required by the FDA for nutrition labels.
                                </InfoTooltip>
                            </h5>
                            <div className="text-sm text-blue-800 space-y-2">
                                <p>
                                    <strong>Mandatory Information:</strong> Fields marked with (*) must be completed for FDA compliance.
                                </p>
                                <div className="grid md:grid-cols-2 gap-2 text-xs">
                                    <ul className="space-y-1">
                                        <li>• Servings per container</li>
                                        <li>• Serving size (quantity & weight)</li>
                                        <li>• Calories</li>
                                        <li>• Total Fat</li>
                                        <li>• Saturated Fat</li>
                                        <li>• Cholesterol</li>
                                    </ul>
                                    <ul className="space-y-1">
                                        <li>• Sodium</li>
                                        <li>• Total Carbohydrates</li>
                                        <li>• Total Sugars</li>
                                        <li>• Protein</li>
                                        <li>• Vitamin D, Calcium, Iron, Potassium</li>
                                    </ul>
                                </div>
                                <p className="text-xs">% Daily Values are automatically calculated based on FDA standards.</p>
                            </div>
                        </div>

                        {/* Not a Significant Source Rules */}
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <h5 className="font-semibold text-textColor mb-2 flex items-center">
                                "Not a Significant Source" Rules
                                <InfoTooltip>
                                    When nutrients fall below FDA thresholds, they must be listed as "Not a significant source" on the
                                    label or shown as "0".
                                </InfoTooltip>
                            </h5>
                            <div className="text-sm text-orange-800 space-y-2">
                                <p>
                                    <strong>FDA Thresholds:</strong> Nutrients below these amounts are considered insignificant:
                                </p>
                                <div className="grid md:grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <p className="font-medium mb-1">Macronutrients:</p>
                                        <ul className="space-y-1">
                                            <li>• Saturated fat, trans fat: &lt; 0.5g</li>
                                            <li>• Cholesterol: &lt; 2mg</li>
                                            <li>• Dietary fiber: &lt; 1g</li>
                                            <li>• Sugars: &lt; 0.5g</li>
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="font-medium mb-1">Vitamins & Minerals:</p>
                                        <ul className="space-y-1">
                                            <li>• Vitamins A & C: &lt; 2% DV</li>
                                            <li>• Calcium, Iron: &lt; 2% DV</li>
                                            <li>• Vitamin D, Potassium: &lt; 2% DV</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="text-xs bg-orange-100 p-2 rounded">
                                    <strong>Automatic Handling:</strong> Our generator automatically applies these rules and will show
                                    "0" or include nutrients in the "Not a significant source" statement as appropriate.
                                </p>
                            </div>
                        </div>

                        {/* Rounding Rules */}
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h5 class="font-semibold text-[#414142] mb-2 flex items-center">FDA Rounding Rules
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" class="lucide lucide-info w-4 h-4 text-[#2559a9] cursor-pointer ml-1 flex-shrink-0 hover:text-[#1e4a8c] transition-colors" data-state="closed">
                                    <circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path>
                                </svg>
                            </h5><div class="text-sm text-green-800 space-y-3">
                                <p><strong>Automatic Rounding:</strong> Values are automatically rounded according to FDA guidelines:</p>
                                <div class="bg-green-100 p-3 rounded">
                                    <p class="font-medium mb-2">Calories:</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Less than 5 calories: Round to 0</li>
                                        <li>• 5-50 calories: Round to nearest 5</li>
                                        <li>• Greater than 50 calories: Round to nearest 10</li>
                                    </ul>
                                </div>
                                <div class="bg-green-100 p-3 rounded">
                                    <p class="font-medium mb-2">Fats (Total, Saturated, Trans):</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Less than 0.5g: Round to 0</li>
                                        <li>• 0.5-5g: Round to nearest 0.5g</li>
                                        <li>• Greater than 5g: Round to nearest 1g</li>
                                    </ul>
                                </div>
                                <div class="bg-green-100 p-3 rounded">
                                    <p class="font-medium mb-2">Cholesterol:</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Less than 2mg: Round to 0</li>
                                        <li>• 2-5mg: Show as "less than 5mg"</li>
                                        <li>• Greater than 5mg: Round to nearest 5mg</li>
                                    </ul>
                                </div>
                                <div class="bg-green-100 p-3 rounded">
                                    <p class="font-medium mb-2">Sodium &amp; Potassium:</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Less than 5mg: Round to 0</li>
                                        <li>• 5-140mg: Round to nearest 5mg</li>
                                        <li>• Greater than 140mg: Round to nearest 10mg</li>
                                    </ul>
                                </div>
                                <div class="bg-green-100 p-3 rounded">
                                    <p class="font-medium mb-2">Carbohydrates, Fiber, Sugars &amp; Protein:</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Less than 0.5g: Round to 0</li>
                                        <li>• 0.5-1g: Show as "less than 1g"</li>
                                        <li>• Greater than 1g: Round to nearest 1g</li>
                                    </ul>
                                </div>
                                <div class="bg-green-100 p-3 rounded">
                                    <p class="font-medium mb-2">Vitamins &amp; Minerals (Specific Increments):</p>
                                    <div class="grid md:grid-cols-2 gap-3 text-xs">
                                        <div>
                                            <p class="font-medium mb-1">Common Increments:</p>
                                            <ul class="space-y-1">
                                                <li>• Vitamin A: Nearest 10 mcg</li>
                                                <li>• Vitamin C: Nearest 1 mg</li>
                                                <li>• Vitamin D: Nearest 0.1 mcg</li>
                                                <li>• Vitamin E: Nearest 0.1 mg</li>
                                                <li>• Calcium: Nearest 10 mg</li>
                                                <li>• Iron: Nearest 0.1 mg</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <p class="font-medium mb-1">B-Vitamins:</p>
                                            <ul class="space-y-1">
                                                <li>• Thiamin, Riboflavin, B6, B12: Nearest 0.01 mg</li>
                                                <li>• Niacin: Nearest 0.1 mg</li>
                                                <li>• Folate: Nearest 5 mcg</li>
                                                <li>• Phosphorus: Nearest 10 mg</li>
                                                <li>• Magnesium: Nearest 5 mg</li>
                                                <li>• Zinc: Nearest 0.1 mg</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-green-100 p-3 rounded">
                                    <p class="font-medium mb-2">% Daily Values:</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Less than 2% DV: Can be expressed as 0%</li>
                                        <li>• 2-10% DV: Round to nearest 2%</li>
                                        <li>• 10-50% DV: Round to nearest 5%</li>
                                        <li>• Greater than 50% DV: Round to nearest 10%</li>
                                    </ul>
                                </div>
                                <div class="bg-green-100 p-3 rounded">
                                    <p class="font-medium mb-2">Servings per Container:</p>
                                    <ul class="text-xs space-y-1">
                                        <li>• Less than 2 servings: Single serving or "about 2"</li>
                                        <li>• 2-5 servings: Round to nearest 0.5</li>
                                        <li>• Greater than 5 servings: Round to nearest whole number</li>
                                    </ul>
                                </div>
                                <p class="text-xs bg-green-200 p-2 rounded mt-3">
                                    <strong>Fully Automated:</strong> Our nutrition label generator automatically applies all FDA rounding rules. You simply enter your raw nutritional data, and we handle all the complex rounding calculations to ensure your labels are FDA compliant.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CommonCard>
        </>
    )
}
