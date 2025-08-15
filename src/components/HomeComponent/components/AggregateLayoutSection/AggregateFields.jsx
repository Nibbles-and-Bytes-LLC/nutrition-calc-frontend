import React, { useState } from 'react'
import { servingSizeUnits } from '../Common'
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import TextField from '../../../../inputs/TextField';
import CustomSelect from '../../../../inputs/CustomSelect';


export const AggregateFields = ({ productCount, data, index, handleChangeValue, removeProduct }) => {
    const Form = ['A', 'B', 'C', 'D', 'E', 'F'];
    const [isActiveButton, setIsActiveButton] = useState("basic");
    // const [isExpended, setIsExpended] = useState(false);

    function handleButtonClick(value) {
        setIsActiveButton(value);
    }
    function handleChange(field, value) {
        handleChangeValue(field, value, index);
    }

    const buttonCss = `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-2xs`;
    return (
        <div className='rounded-lg bg-card text-card-foreground shadow-2xs border border-gray-200'>
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold tracking-tight text-lg text-textColor">Product {Form[index]}</h3>
                    <div className="flex items-center gap-2">
                        {/* <button
                            className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-input bg-background border h-9 rounded-md px-3 text-[#2559a9] hover:text-[#1e4a8c] hover:bg-blue-50"
                            type="button"
                            onClick={() => setIsExpended(!isExpended)}
                        >
                            {isExpended ? <ChevronUp /> : <ChevronDown />}
                            {isExpended ? "Collapse" : "Expand All Fields"}
                        </button> */}
                        {productCount > 2 &&
                            <button
                                className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-input bg-background border h-9 rounded-md px-3 text-red-600 hover:text-red-700 hover:bg-red-50"
                                type="button"
                                onClick={() => removeProduct(index)}
                            >
                                <Trash2 />
                            </button>
                        }
                    </div>
                </div>
            </div>
            <div className='p-6 pt-0'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4'>
                    <TextField
                        label="Product Name"
                        labelClass="!text-textColor"
                        required
                        placeholder={`Product ${Form[index]}`}
                        value={data.productName}
                        onChange={(e) => handleChange("productName", e.target.value)}
                    />
                    <TextField
                        label="Calories"
                        labelClass="!text-textColor"
                        required
                        placeholder="230"
                        value={data.calories}
                        onChange={(e) => handleChange("calories", e.target.value)}
                    />
                    <TextField
                        label="Total Fat (g)"
                        labelClass="!text-textColor"
                        required
                        placeholder="8"
                        value={data.totalFat}
                        onChange={(e) => handleChange("totalFat", e.target.value)}
                    />
                </div>
                {/* {isExpended && */}
                <div className='w-full'>
                    <div className="h-10 items-center justify-center rounded-md bg-muted p-1 text-[#64748b] grid w-full grid-cols-3 md:grid-cols-3  " style={{ outline: "none" }}>
                        <button type="button" data-state={isActiveButton === "basic" ? "active" : "inActive"} className={buttonCss} onClick={() => handleButtonClick('basic')}>
                            Basic Info
                        </button>
                        <button type="button" data-state={isActiveButton === "macronutrients" ? "active" : "inActive"} className={buttonCss} onClick={() => handleButtonClick('macronutrients')}>
                            Macronutrients
                        </button>
                        <button type="button" data-state={isActiveButton === "vitamins" ? "active" : "inActive"} className={buttonCss} onClick={() => handleButtonClick('vitamins')}>
                            Vitamins &amp; Minerals
                        </button>
                    </div>
                    <div className='ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4 mt-4'>
                        {/* basic */}
                        {(isActiveButton === "basic") &&
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Serving Size Weight"
                                    required
                                    placeholder="0"
                                    value={data.servingSizeWeight}
                                    onChange={(e) => handleChange("servingSizeWeight", e.target.value)}
                                />
                                <CustomSelect
                                    label="Serving Size Unit"
                                    required
                                    options={servingSizeUnits}
                                    id="servingSizeUnit"
                                    value={data.servingSizeUnit}
                                    onChange={(value) => handleChange("servingSizeUnit", value)}
                                />
                            </div>
                        }

                        {/* Macronutrients */}
                        {(isActiveButton === "macronutrients") &&
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Saturated Fat (g)"
                                    required
                                    placeholder="1"
                                    value={data.saturatedFat}
                                    onChange={(e) => handleChange("saturatedFat", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Trans Fat (g)"
                                    required
                                    placeholder="0"
                                    value={data.transFat}
                                    onChange={(e) => handleChange("transFat", e.target.value)}
                                />
                                <TextField
                                    label="Cholesterol (mg)"
                                    required
                                    placeholder="0"
                                    value={data.cholesterol}
                                    onChange={(e) => handleChange("cholesterol", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Sodium (mg)"
                                    required
                                    placeholder="160"
                                    value={data.sodium}
                                    onChange={(e) => handleChange("sodium", e.target.value)}
                                />
                                <TextField
                                    label="Total Carbs (g)"
                                    labelClass="!text-textColor"
                                    required
                                    placeholder="37"
                                    value={data.totalCarbs}
                                    onChange={(e) => handleChange("totalCarbs", e.target.value)}
                                />
                                <TextField
                                    label="Dietary Fiber (g)"
                                    labelClass="!text-textColor"
                                    required
                                    placeholder="4"
                                    value={data.dietaryFiber}
                                    onChange={(e) => handleChange("dietaryFiber", e.target.value)}
                                />
                                <TextField
                                    label="Total Sugars (g)"
                                    labelClass="!text-textColor"
                                    required
                                    placeholder="12"
                                    value={data.totalSugars}
                                    onChange={(e) => handleChange("totalSugars", e.target.value)}
                                />
                                <TextField
                                    label="Added Sugars (g)"
                                    labelClass="!text-textColor"
                                    required
                                    placeholder="10"
                                    value={data.addedSugars}
                                    onChange={(e) => handleChange("addedSugars", e.target.value)}
                                />
                                <TextField
                                    label="Protein (g)"
                                    labelClass="!text-textColor"
                                    required
                                    placeholder="3"
                                    value={data.protein}
                                    onChange={(e) => handleChange("protein", e.target.value)}
                                />
                            </div>
                        }
                        {(isActiveButton === "vitamins") &&
                            <>
                                <div>
                                    <h5 className="font-semibold text-[#414142] mb-3">Required Nutrients</h5>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-6'>
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Vitamin D (mcg)"
                                            required
                                            placeholder="2"
                                            value={data.vitaminD}
                                            onChange={(e) => handleChange("vitaminD", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Calcium (mg)"
                                            required
                                            placeholder="260"
                                            value={data.calcium}
                                            onChange={(e) => handleChange("calcium", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Iron (mg)"
                                            required
                                            placeholder="8"
                                            value={data.iron}
                                            onChange={(e) => handleChange("iron", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Potassium (mg)"
                                            required
                                            placeholder="235"
                                            value={data.potassium}
                                            onChange={(e) => handleChange("potassium", e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-[#414142] mb-3">Optional Nutrients</h5>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Vitamin A (mcg RAE)"
                                            placeholder="150"
                                            value={data.vitaminA}
                                            onChange={(e) => handleChange("vitaminA", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Vitamin C (mg)"
                                            placeholder="9"
                                            value={data.vitaminC}
                                            onChange={(e) => handleChange("vitaminC", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Vitamin E (mg)"
                                            placeholder="2"
                                            value={data.vitaminE}
                                            onChange={(e) => handleChange("vitaminE", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Thiamin (mg)"
                                            placeholder="0.1"
                                            value={data.thiamin}
                                            onChange={(e) => handleChange("thiamin", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Riboflavin (mg)"
                                            placeholder="0.1"
                                            value={data.riboflavin}
                                            onChange={(e) => handleChange("riboflavin", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Niacin (mg)"
                                            placeholder="2"
                                            value={data.niacin}
                                            onChange={(e) => handleChange("niacin", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Vitamin B6 (mg)"
                                            placeholder="0.1"
                                            value={data.vitaminB6}
                                            onChange={(e) => handleChange("vitaminB6", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Folate (mcg DFE)"
                                            placeholder="25"
                                            value={data.folate}
                                            onChange={(e) => handleChange("folate", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Vitamin B12 (mcg)"
                                            placeholder="0.5"
                                            value={data.vitaminB12}
                                            onChange={(e) => handleChange("vitaminB12", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Phosphorus (mg)"
                                            placeholder="100"
                                            value={data.phosphorus}
                                            onChange={(e) => handleChange("phosphorus", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Magnesium (mg)"
                                            placeholder="25"
                                            value={data.magnesium}
                                            onChange={(e) => handleChange("magnesium", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            label="Zinc (mg)"
                                            placeholder="1"
                                            value={data.zinc}
                                            onChange={(e) => handleChange("zinc", e.target.value)}
                                        />
                                    </div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                {/* } */}
            </div>
        </div>
    )
}
