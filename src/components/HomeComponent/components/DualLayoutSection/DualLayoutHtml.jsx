import React, { useState } from 'react'
import CustomSelect from '../../../../inputs/CustomSelect'
import { CommonCard, servingSizeUnits } from '../Common'
import TextField from '../../../../inputs/TextField'
import classNames from 'classnames';


const CommonInputFields = ({ title, data, handleDualFormChange, section = "perServing" }) => {
    const [isActiveButton, setIsActiveButton] = useState("basic");

    function handleButtonClick(value) {
        setIsActiveButton(value);
    }

    function handleChange(name, value) {
        handleDualFormChange(name, value, section);
    };

    const buttonCss = `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-2xs`;

    return (
        <div className={classNames("rounded-lg bg-card text-card-foreground shadow-2xs border border-blue-200", { "!border-green-200": section === "perContainer" })}>
            <div className="flex flex-col space-y-1.5 p-6 pb-3">
                <h3 className="font-semibold tracking-tight text-lg text-textColor">{title}</h3>
            </div>
            <div className='p-6 pt-0'>
                <div className='w-full'>
                    <div className="h-10 items-center justify-center rounded-md bg-muted p-1 text-[#64748b] grid w-full grid-cols-1 md:grid-cols-2" style={{ outline: "none" }}>
                        <button type="button" data-state={isActiveButton === "basic" ? "active" : "inActive"} className={buttonCss} onClick={() => handleButtonClick('basic')}>
                            Basic Nutrients
                        </button>
                        <button type="button" data-state={isActiveButton === "vitamins" ? "active" : "inActive"} className={buttonCss} onClick={() => handleButtonClick('vitamins')}>
                            Vitamins &amp; Minerals
                        </button>
                    </div>
                    {(isActiveButton === "basic") &&
                        <div className="ring-offset-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4 mt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Calories"
                                    id="calories"
                                    required
                                    placeholder="300"
                                    value={data.calories}
                                    onChange={(e) => handleChange("calories", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Total Fat (g)"
                                    required
                                    placeholder="16"
                                    value={data.totalFat}
                                    onChange={(e) => handleChange("totalFat", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Saturated Fat (g)"
                                    required
                                    placeholder="5"
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
                                    placeholder="60"
                                    value={data.cholesterol}
                                    onChange={(e) => handleChange("cholesterol", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Sodium (mg)"
                                    required
                                    placeholder="375"
                                    value={data.sodium}
                                    onChange={(e) => handleChange("sodium", e.target.value)}
                                />
                                <TextField
                                    label="Total Carbs (g)"
                                    labelClass="!text-textColor"
                                    required
                                    placeholder="36"
                                    value={data.totalCarbs}
                                    onChange={(e) => handleChange("totalCarbs", e.target.value)}
                                />
                                <TextField
                                    label="Dietary Fiber (g)"
                                    labelClass="!text-textColor"
                                    required
                                    placeholder="12"
                                    value={data.dietaryFiber}
                                    onChange={(e) => handleChange("dietaryFiber", e.target.value)}
                                />
                                <TextField
                                    label="Total Sugars (g)"
                                    labelClass="!text-textColor"
                                    required
                                    placeholder="14"
                                    value={data.totalSugars}
                                    onChange={(e) => handleChange("totalSugars", e.target.value)}
                                />
                                <TextField
                                    label="Added Sugars (g)"
                                    labelClass="!text-textColor"
                                    required
                                    placeholder="18"
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
                        </div>
                    }
                    {(isActiveButton === "vitamins") &&
                        <div className='ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 space-y-4 mt-4'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Vitamin D (mcg)"
                                    placeholder="400"
                                    value={data.vitaminD}
                                    onChange={(e) => handleChange("vitaminD", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Calcium (mg)"
                                    placeholder="400"
                                    value={data.calcium}
                                    onChange={(e) => handleChange("calcium", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Iron (mg)"
                                    placeholder="2"
                                    value={data.iron}
                                    onChange={(e) => handleChange("iron", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Potassium (mg)"
                                    placeholder="940"
                                    value={data.potassium}
                                    onChange={(e) => handleChange("potassium", e.target.value)}
                                />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export const DualLayoutHtml = ({ servingValues, perServingData, perContainerData, lableFormat, handleDualFormChange }) => {
    const isDualForm = (lableFormat === "dual-forms");



    function handleServingSection(name, value) {
        handleDualFormChange(name, value, "servingField");
    }

    function handleLableChange(name, value) {
        handleDualFormChange(name, value, "dualForm");
    }

    return (
        <div className="rounded-lg border bg-card text-card-foreground shadow-2xs">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl leading-none tracking-tight text-textColor font-black">Dual Column Configuration</h3>
                <p className="text-sm text-gray-600 font-light">Configure nutrition values for per serving and per container display</p>
            </div>
            <div className='p-6 pt-0'>
                <div className='space-y-6'>
                    <div>
                        <h4 className="font-semibold text-textColor mb-4">Basic Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Servings per Container"
                                    required
                                    placeholder="e.g., 2"
                                    value={servingValues.servingsPerContainer}
                                    onChange={(e) => handleServingSection("servingsPerContainer", e.target.value)}
                                />

                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-semibold text-textColor mb-2 block">Serving Size *</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <TextField
                                            labelClass="!text-textColor"
                                            required
                                            placeholder="1"
                                            value={servingValues.servingSizeQuantity}
                                            onChange={(e) => handleServingSection("servingSizeQuantity", e.target.value)}
                                        />
                                        <TextField
                                            labelClass="!text-textColor"
                                            required
                                            placeholder="cup"
                                            value={servingValues.servingSizeQuantityUnits}
                                            onChange={(e) => handleServingSection("servingSizeQuantityUnits", e.target.value)}
                                        />

                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <TextField
                                        labelClass="!text-textColor"
                                        required
                                        placeholder="255"
                                        value={servingValues.servingSizeWeight}
                                        onChange={(e) => handleServingSection("servingSizeWeight", e.target.value)}
                                    />
                                    <CustomSelect
                                        required
                                        options={servingSizeUnits}
                                        id="servingSizeUnit"
                                        value={servingValues.servingSizeUnit}
                                        onChange={(value) => handleServingSection("servingSizeUnit", value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {isDualForm &&
                        <div>
                            <h4 class="font-semibold text-[#414142] mb-4">Column Labels</h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    labelClass="!text-textColor"
                                    label="First Form Label"
                                    placeholder="e.g., Per 1/4 cup dry mix"
                                    value={perServingData.title}
                                    onChange={(e) => handleLableChange("first_label", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Second Form Label"
                                    placeholder="e.g., Per baked portion"
                                    value={perContainerData.title}
                                    onChange={(e) => handleLableChange("second_label", e.target.value)}
                                />
                            </div>
                        </div>
                    }
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-textColor">Nutrition Information</h4>
                        </div>
                        <div className='space-y-6'>
                            <CommonInputFields title={isDualForm ? "First Form" : "Per Serving"} data={perServingData} {...{ handleDualFormChange }} />
                            <CommonInputFields title={isDualForm ? "Second Form" : "Per Container"} section='perContainer' data={perContainerData}  {...{ handleDualFormChange }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
