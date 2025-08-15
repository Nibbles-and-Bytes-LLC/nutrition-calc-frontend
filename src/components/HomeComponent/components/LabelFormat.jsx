import React from 'react';
import { CommonCard } from './Common';
import InfoTooltip from '../../../inputs/InfoToolTip';


export const LabelFormat = ({ labelFormats, data, handleChange }) => {
    console.log(data, 'data::::::::::::::::::::::::::::::::::::::::::')
    return (
        <>
            {/* Label Format Selection */}
            <CommonCard
                title="Label Format"
                subtitle="Choose from FDA-approved nutrition label formats"
                toolTip={
                    <InfoTooltip>
                        Choose the FDA-approved format that best fits your package size and design requirements. Different formats
                        are suitable for different package dimensions and space constraints.
                    </InfoTooltip>
                }>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {labelFormats.map((format) => (
                        <div key={format.value} className="relative h-70">
                            <input
                                type="radio"
                                id={format.value}
                                name="labelFormat"
                                value={format.value}
                                checked={data.labelFormat === format.value}
                                onChange={(e) => handleChange("labelFormat", e.target.value)}
                                className="sr-only"
                            />
                            <label
                                htmlFor={format.value}
                                className={`block cursor-pointer rounded-lg border-2 p-3 transition-all hover:border-[#2559a9] h-full flex flex-col ${data.labelFormat === format.value ? "border-[#2559a9] bg-[#2559a9] bg-opacity-5" : "border-gray-200"
                                    }`}
                            >
                                {/* Thumbnail Preview */}
                                <div className="mb-3 bg-white border border-gray-300 rounded p-2 h-40 flex items-center justify-center overflow-hidden">
                                    {format.value === "standard" ? (
                                        <div className="text-xs w-20 border border-black p-1">
                                            <div className="border-b-2 border-black mb-1">
                                                <div className="font-bold text-[6px]">Nutrition Facts</div>
                                            </div>
                                            <div className="border-b border-black mb-1">
                                                <div className="font-bold text-[5px]">Calories 250</div>
                                            </div>
                                            <div className="space-y-[1px] text-[4px]">
                                                <div className="flex justify-between">
                                                    <span>Total Fat 12g</span>
                                                    <span>15%</span>
                                                </div>
                                                <div className="flex justify-between pl-1">
                                                    <span>Sat Fat 3g</span>
                                                    <span>15%</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span>Sodium 470mg</span>
                                                    <span>20%</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : format.value === "horizontal" ? (
                                        <div className="text-xs w-28 border border-black p-1">
                                            <div className="flex gap-2">
                                                <div className="flex-1">
                                                    <div className="border-b-2 border-black mb-1">
                                                        <div className="font-bold text-[6px]">Nutrition Facts</div>
                                                    </div>
                                                    <div className="font-bold text-[5px]">Calories 250</div>
                                                </div>
                                                <div className="flex-1 text-[4px]">
                                                    <div className="space-y-[1px]">
                                                        <div className="flex justify-between">
                                                            <span>Fat 12g</span>
                                                            <span>15%</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span>Sodium 470mg</span>
                                                            <span>20%</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : format.value === "tabular" ? (
                                        <div className="text-xs w-24 border border-black p-1">
                                            <div className="font-bold text-[6px] text-center mb-1">Nutrition Facts</div>
                                            <table className="w-full text-[4px]">
                                                <thead>
                                                    <tr className="border-b border-black">
                                                        <th className="text-left">Nutrient</th>
                                                        <th className="text-right">Amount</th>
                                                        <th className="text-right">%DV</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Calories</td>
                                                        <td className="text-right">250</td>
                                                        <td className="text-right">-</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Fat</td>
                                                        <td className="text-right">12g</td>
                                                        <td className="text-right">15%</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ) : format.value === "linear" ? (
                                        <div className="text-xs w-32 border border-black p-1">
                                            <div className="font-bold text-[6px] mb-1">Nutrition Facts</div>
                                            <div className="text-[4px] flex flex-wrap gap-1">
                                                <span>Calories 250</span>
                                                <span>Fat 12g (15%)</span>
                                                <span>Sodium 470mg (20%)</span>
                                            </div>
                                        </div>
                                    ) : format.value === "simplified" ? (
                                        <div className="text-xs w-20 border border-black p-1">
                                            <div className="border-b-2 border-black mb-1">
                                                <div className="font-bold text-[6px]">Nutrition Facts</div>
                                            </div>
                                            <div className="space-y-[1px] text-[4px]">
                                                <div>Calories 250</div>
                                                <div>Fat 12g</div>
                                                <div>Sodium 470mg</div>
                                                <div>Carbs 31g</div>
                                            </div>
                                        </div>
                                    ) : format.value === "dual-column" ? (
                                        <div className="text-xs w-24 border border-black p-1">
                                            <div className="border-b-2 border-black mb-1">
                                                <div className="font-bold text-[6px]">Nutrition Facts</div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-1 text-[4px]">
                                                <div>
                                                    <div>Calories 250</div>
                                                    <div>Fat 12g</div>
                                                </div>
                                                <div>
                                                    <div>Sodium 470mg</div>
                                                    <div>Carbs 31g</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : format.value === "bilingual" ? (
                                        <div className="text-xs w-24 border border-black p-1">
                                            <div className="border-b-2 border-black mb-1">
                                                <div className="font-bold text-[6px]">Nutrition Facts</div>
                                                <div className="font-bold text-[6px]">Información Nutricional</div>
                                            </div>
                                            <div className="text-[4px]">
                                                <div>Calories/Calorías 250</div>
                                                <div>Fat/Grasa 12g</div>
                                            </div>
                                        </div>
                                    ) : format.value === "small-package" ? (
                                        <div className="text-xs w-16 border border-black p-1">
                                            <div className="font-bold text-[5px] mb-1">Nutrition Facts</div>
                                            <div className="text-[3px] space-y-[1px]">
                                                <div>Cal 250</div>
                                                <div>Fat 12g</div>
                                                <div>Sod 470mg</div>
                                            </div>
                                        </div>
                                    ) : format.value === "infant" ? (
                                        <div className="text-xs w-20 border border-black p-1">
                                            <div className="border-b-2 border-black mb-1">
                                                <div className="font-bold text-[6px]">Nutrition Facts</div>
                                                <div className="text-[5px]">Infant Formula</div>
                                            </div>
                                            <div className="text-[4px]">
                                                <div>Calories 20</div>
                                                <div>Protein 0.4g</div>
                                                <div>Fat 1.1g</div>
                                            </div>
                                        </div>
                                    ) : format.value === "children" ? (
                                        <div className="text-xs w-20 border border-black p-1">
                                            <div className="border-b-2 border-black mb-1">
                                                <div className="font-bold text-[6px]">Nutrition Facts</div>
                                                <div className="text-[5px]">Children Under 4</div>
                                            </div>
                                            <div className="text-[4px]">
                                                <div>Calories 250</div>
                                                <div>Fat 12g</div>
                                                <div>Sodium 470mg</div>
                                            </div>
                                        </div>
                                    ) : format.value === "supplement" ? (
                                        <div className="text-xs w-20 border border-black p-1">
                                            <div className="border-b-2 border-black mb-1">
                                                <div className="font-bold text-[6px]">Supplement Facts</div>
                                            </div>
                                            <div className="text-[4px]">
                                                <div>Vitamin C 60mg</div>
                                                <div>Vitamin D 400IU</div>
                                                <div>Calcium 162mg</div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-xs w-20 border border-black p-1">
                                            <div className="border-b-2 border-black mb-1">
                                                <div className="font-bold text-[6px]">Nutrition Facts</div>
                                            </div>
                                            <div className="text-[4px]">
                                                <div>Calories 250</div>
                                                <div>Fat 12g</div>
                                                <div>Sodium 470mg</div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Format Name and Description */}
                                <div className="text-center">
                                    <h3
                                        className={`font-semibold text-sm mb-1 ${data.labelFormat === format.value ? "text-[#2559a9]" : "text-[#414142]"
                                            }`}
                                    >
                                        {format.label}
                                    </h3>
                                    <p className="text-xs text-gray-600 font-light">
                                        {format.value === "standard" && "Most common vertical format"}
                                        {format.value === "horizontal" && "Side-by-side layout for wide packages"}
                                        {format.value === "tabular" && "Table format for easy comparison"}
                                        {format.value === "linear" && "Single line format for limited space"}
                                        {format.value === "simplified" && "Basic format with essential nutrients"}
                                        {format.value === "dual-column" && "Two-column layout"}
                                        {format.value === "aggregate" && "Combined product information"}
                                        {format.value === "bilingual" && "English and Spanish labels"}
                                        {format.value === "small-package" && "Compact format for small packages"}
                                        {format.value === "infant" && "Special format for infant formula"}
                                        {format.value === "children" && "Format for children under 4 years"}
                                        {format.value === "supplement" && "Format for dietary supplements"}
                                    </p>
                                </div>

                                {/* Selected Indicator */}
                                {data?.labelFormat === format.value && (
                                    <div className="absolute top-2 right-2 w-5 h-5 bg-[#2559a9] rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                )}
                            </label>
                        </div>
                    ))}
                </div>
            </CommonCard>
        </>
    )
}
