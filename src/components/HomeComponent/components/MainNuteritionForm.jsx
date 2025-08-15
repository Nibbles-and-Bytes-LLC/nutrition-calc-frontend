import { CommonCard, servingSizeUnits } from './Common';
import TextField from '../../../inputs/TextField';
import CheckBox from '../../../inputs/Checkbox';
import InfoTooltip from '../../../inputs/InfoToolTip';
import CustomSelect from '../../../inputs/CustomSelect';
import CustomTextArea from '../../../inputs/CustomTextArea';
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import { DualLayoutHtml } from './DualLayoutSection/DualLayoutHtml';
import { AggregateLayoutHtml } from './AggregateLayoutSection/AggregateLayoutHtml';

export const MainNuteritionForm = ({ data, handleChange, dualLayoutHookData, aggregateLayoutHookData }) => {

    const [showOptionalNutrients, setShowOptionalNutrients] = useState(false)

    return (
        <>
            {!["dual-column", "dual-forms", "aggregate"]?.includes(data?.labelFormat)
                ?
                <>
                    <CommonCard title="Basic Information">
                        <div className="space-y-4">
                            <TextField
                                label="Product Name"
                                id="productName"
                                labelIcon={
                                    <InfoTooltip
                                        children="The name of your food product as it will appear on the package. While optional for the nutrition label itself, it helps identify your product and is recommended for organization and reference."
                                    />
                                }
                                placeholder="Enter product name"
                                value={data.productName}
                                onChange={(e) => handleChange("productName", e.target.value)}
                            />
                            {data.labelFormat === "bilingual" && (
                                <TextField
                                    label="Product Name (Spanish)"
                                    id="productNameSpanish"
                                    labelIcon={
                                        <InfoTooltip
                                            children="The name of your food product as it will appear on the package. While optional for the nutrition label itself, it helps identify your product and is recommended for organization and reference."
                                        />
                                    }
                                    placeholder="Nombre del producto en español"
                                    value={data.productNameSpanish}
                                    onChange={(e) => handleChange("productNameSpanish", e.target.value)}
                                />
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div>
                                <TextField
                                    label="Servings per Container"
                                    id="servingsPerContainer"
                                    required
                                    placeholder="Example: 7"
                                    labelIcon={
                                        <InfoTooltip
                                            children='The total number of servings in the entire package. This tells consumers how many servings they can expect from the package. Examples: "About 2", "7", "1.5". Required by FDA.'
                                        />
                                    }
                                    value={data.servingsPerContainer}
                                    onChange={(e) => handleChange("servingsPerContainer", e.target.value)}
                                />
                            </div>
                                <div>
                                    <TextField
                                        label="Calories"
                                        id="calories"
                                        required
                                        labelIcon={
                                            <InfoTooltip
                                                children='The number of calories (energy) in one serving. This is the most prominent nutrition information on the label. Round to the nearest 5 or 10 calories depending on the amount. Required by FDA.'
                                            />
                                        }
                                        placeholder="Enter calories per serving"
                                        value={data.calories}
                                        onChange={(e) => handleChange("calories", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div>
                                <TextField
                                    label="Servings per Quantity"
                                    required
                                    labelIcon={
                                        <InfoTooltip
                                            children='The amount that people typically eat at one time, based on FDA Reference Amounts Customarily Consumed (RACC). Use fractions or decimals. Examples: "1", "1/2", "2", "0.5". Required by FDA.'
                                        />
                                    }
                                    id="servingSizeQuantity"
                                    placeholder="Example: 1/2, 10"
                                    value={data.servingSizeQuantity}
                                    onChange={(e) => handleChange("servingSizeQuantity", e.target.value)}
                                />
                            </div>
                                <TextField label="Serving Size Units"
                                    labelIcon={
                                        <InfoTooltip children='The unit of measure for the serving size quantity. Use common household measures that consumers understand. Examples: "cup", "pieces", "tablespoon", "bottle", "slice". Required by FDA.' />
                                    }
                                    required
                                    id="servingSizeQuantityUnits"
                                    placeholder="Example: Cup, Chips, Bottle, Tbsp, etc."
                                    value={data.servingSizeQuantityUnits}
                                    onChange={(e) => handleChange("servingSizeQuantityUnits", e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <TextField
                                        label="Serving Size Weight"
                                        required
                                        id="servingSizeWeight"
                                        placeholder="Example: 55"
                                        labelIcon={
                                            <InfoTooltip
                                                children='The weight or volume of one serving in metric units. This appears in parentheses after the household measure on the label. Use grams for solids, milliliters for liquids. Required by FDA.' />
                                        }
                                        value={data.servingSizeWeight}
                                        onChange={(e) => handleChange("servingSizeWeight", e.target.value)}
                                    /></div>
                                <div>
                                    <CustomSelect
                                        label="Serving Size Unit"
                                        required
                                        labelIcon={
                                            <InfoTooltip children='The metric unit for the serving size weight. Choose grams for solid foods, milliliters for liquid foods. This ensures consistency with FDA requirements for metric measurements.' />
                                        }
                                        options={servingSizeUnits}
                                        id="servingSizeUnit"
                                        value={data.servingSizeUnit}
                                        onChange={(value) => handleChange("servingSizeUnit", value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </CommonCard >
                    <CommonCard title="Macronutrients" subtitle="All macronutrients are required by the FDA. % Daily Values are automatically calculated.">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <TextField
                                label="Total Fat (g)"
                                id="servingsPerContainer"
                                required
                                labelIcon={<InfoTooltip>Required by FDA. Total amount of fat in one serving, including saturated and trans fat. Enter "0" if no fat. % Daily Value automatically calculated based on 78g daily value.</InfoTooltip>}
                                placeholder="e.g., 12"
                                value={data.totalFat}
                                onChange={(e) => handleChange("totalFat", e.target.value)}
                            />
                            <TextField label="Saturated Fat (g)"
                                labelIcon={<InfoTooltip>Required by FDA. Amount of saturated fat in one serving. Must be indented under Total Fat on the label. % Daily Value automatically calculated based on 20g daily value.</InfoTooltip>}
                                id="saturatedFat"
                                placeholder="e.g., 3"
                                required
                                value={data.saturatedFat}
                                onChange={(e) => handleChange("saturatedFat", e.target.value)}
                            />
                            <TextField
                                labelIcon={<InfoTooltip>Amount of trans fat in one serving. Required to be listed if present. No % Daily Value is shown for trans fat.</InfoTooltip>}
                                label="Trans Fat (g)"
                                id="transFat"
                                placeholder="e.g., 0"
                                value={data.transFat}
                                onChange={(e) => handleChange("transFat", e.target.value)}
                            />
                            <TextField
                                labelIcon={<InfoTooltip>Required by FDA. Amount of cholesterol in one serving. Enter "0" if no cholesterol. % Daily Value automatically calculated based on 275mg daily value.</InfoTooltip>}
                                label="Cholesterol (mg)"
                                id="cholesterol"
                                required
                                placeholder="e.g., 30"
                                value={data.cholesterol}
                                onChange={(e) => handleChange("cholesterol", e.target.value)}
                            />
                            <TextField
                                labelIcon={<InfoTooltip>Required by FDA. Amount of sodium in one serving. Enter "0" if no sodium. % Daily Value automatically calculated based on 2300mg daily value.</InfoTooltip>}
                                label="Sodium (mg)"
                                id="sodium"
                                required
                                placeholder="e.g., 470"
                                value={data.sodium}
                                onChange={(e) => handleChange("sodium", e.target.value)}
                            />
                            <TextField
                                labelIcon={<InfoTooltip>Required by FDA. Total amount of carbohydrates in one serving, including fiber and sugars. % Daily Value automatically calculated based on 300g daily value.</InfoTooltip>}
                                label="Total Carbs (g)"
                                id="totalCarbs"
                                required
                                placeholder="e.g., 31"
                                value={data.totalCarbs}
                                onChange={(e) => handleChange("totalCarbs", e.target.value)}
                            />
                            <TextField
                                labelIcon={<InfoTooltip>Amount of dietary fiber in one serving. Should be indented under Total Carbohydrates on the label. % Daily Value automatically calculated based on 28g daily value.</InfoTooltip>}
                                label="Dietary Fiber (g)"
                                id="dietaryFiber"
                                placeholder="e.g., 0"
                                value={data.dietaryFiber}
                                onChange={(e) => handleChange("dietaryFiber", e.target.value)}
                            />
                            <TextField
                                labelIcon={<InfoTooltip>Required by FDA. Total amount of sugars in one serving, including natural and added sugars. No % Daily Value shown for total sugars.</InfoTooltip>}
                                label="Sugars (g)"
                                id="totalSugars"
                                required
                                placeholder="e.g., 5"
                                value={data.totalSugars}
                                onChange={(e) => handleChange("totalSugars", e.target.value)}
                            />
                            <TextField
                                labelIcon={<InfoTooltip>Amount of sugars added during processing. Should be indented under Total Sugars. Required if any sugars are added. % Daily Value automatically calculated based on 50g daily value.</InfoTooltip>}
                                label="Added Sugar (g)"
                                id="addedSugars"
                                placeholder="e.g., 0"
                                value={data.addedSugars}
                                onChange={(e) => handleChange("addedSugars", e.target.value)}
                            />
                        </div>
                        <div className="mt-4 space-y-4">
                            <div>
                                <TextField
                                    labelIcon={<InfoTooltip>Required by FDA. Amount of protein in one serving. % Daily Value automatically calculated based on 50g daily value when protein claims are made.</InfoTooltip>}
                                    label="Protein (g)"
                                    id="protein"
                                    placeholder="e.g., 5"
                                    required
                                    value={data.protein}
                                    onChange={(e) => handleChange("protein", e.target.value)}
                                />
                            </div>
                            {/* <CheckBox id="showProteinDV" label="Show Protein % Daily Value" /> */}
                        </div>
                    </CommonCard>
                    {data?.labelFormat !== "simplified" &&
                        <CommonCard title="Vitamins & Minerals" subtitle="Vitamin D, Calcium, Iron, and Potassium are required by the FDA. % Daily Values are automatically calculated.">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <TextField
                                    label="Vitamin D (mcg)"
                                    labelIcon={<InfoTooltip>Required by FDA to be listed. Amount of Vitamin D in one serving. Enter "0" if none present. % Daily Value automatically calculated based on 20mcg daily value.</InfoTooltip>}
                                    id="vitaminD"
                                    placeholder="e.g., 2"
                                    value={data.vitaminD}
                                    onChange={(e) => handleChange("vitaminD", e.target.value)}
                                />
                                <TextField
                                    label="Calcium (mg)"
                                    labelIcon={<InfoTooltip>Required by FDA to be listed. Amount of calcium in one serving. Enter "0" if none present. % Daily Value automatically calculated based on 1300mg daily value.</InfoTooltip>}
                                    id="calcium"
                                    placeholder="e.g., 260"
                                    value={data.calcium}
                                    onChange={(e) => handleChange("calcium", e.target.value)}
                                />
                                <TextField
                                    label="Iron (mg)"
                                    labelIcon={<InfoTooltip>Required by FDA to be listed. Amount of iron in one serving. Enter "0" if none present. % Daily Value automatically calculated based on 18mg daily value.</InfoTooltip>}
                                    id="iron"
                                    placeholder="e.g., 1"
                                    value={data.iron}
                                    onChange={(e) => handleChange("iron", e.target.value)}
                                />
                                <TextField
                                    label="Potassium (mg)"
                                    labelIcon={<InfoTooltip>Required by FDA to be listed. Amount of potassium in one serving. Enter "0" if none present. % Daily Value automatically calculated based on 4700mg daily value.</InfoTooltip>}
                                    id="potassium"
                                    placeholder="e.g., 235"
                                    value={data.potassium}
                                    onChange={(e) => handleChange("potassium", e.target.value)}
                                />
                            </div>

                            {/* Optional Nutrients - Collapsible */}
                            <div className='mt-6'>
                                <button
                                    type="button"
                                    onClick={() => setShowOptionalNutrients(!showOptionalNutrients)}
                                    className="flex items-center justify-between w-full text-left"
                                >
                                    <h4 className="font-semibold text-textColor flex items-center">
                                        Optional Nutrients
                                        <InfoTooltip>
                                            Additional vitamins and minerals that can be included if present in significant amounts or if
                                            nutrition claims are made. % Daily Values are automatically calculated when values are entered.
                                        </InfoTooltip>
                                    </h4>
                                    <div
                                        className={`transform transition-transform duration-200 ${showOptionalNutrients ? "rotate-180" : ""}`}
                                    >
                                        <svg className="w-5 h-5 text-darkBlue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                <p className="text-sm text-gray-600 font-light mt-1 mb-3">
                                    Add additional vitamins and minerals to your nutrition label
                                </p>

                                {showOptionalNutrients && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

                                        <TextField
                                            label="Vitamin A (mcg RAE)"
                                            labelIcon={<InfoTooltip>Amount of Vitamin A in one serving. RAE = Retinol Activity Equivalents. % Daily Value automatically calculated based on 900mcg daily value.</InfoTooltip>}
                                            id="vitaminA"
                                            value={data.vitaminA}
                                            onChange={(e) => handleChange("vitaminA", e.target.value)}
                                            placeholder="e.g., 150"
                                        />

                                        <TextField
                                            label="Vitamin C (mg)"
                                            labelIcon={<InfoTooltip>Amount of Vitamin C (ascorbic acid) in one serving. % Daily Value automatically calculated based on 90mg daily value.</InfoTooltip>}
                                            id="vitaminC"
                                            value={data.vitaminC}
                                            onChange={(e) => handleChange("vitaminC", e.target.value)}
                                            placeholder="e.g., 9"
                                        />

                                        <TextField
                                            label="Vitamin E (mg)"
                                            labelIcon={<InfoTooltip>Amount of Vitamin E (alpha-tocopherol) in one serving. % Daily Value automatically calculated based on 15mg daily value.</InfoTooltip>}
                                            id="vitaminE"
                                            value={data.vitaminE}
                                            onChange={(e) => handleChange("vitaminE", e.target.value)}
                                            placeholder="e.g., 2"
                                        />

                                        <TextField
                                            label="Thiamin (mg)"
                                            labelIcon={<InfoTooltip>Amount of Thiamin (Vitamin B1) in one serving. % Daily Value automatically calculated based on 1.2mg daily value.</InfoTooltip>}
                                            id="thiamin"
                                            value={data.thiamin}
                                            onChange={(e) => handleChange("thiamin", e.target.value)}
                                            placeholder="e.g., 0.1"
                                        />

                                        <TextField
                                            label="Riboflavin (mg)"
                                            labelIcon={<InfoTooltip>Amount of Riboflavin (Vitamin B2) in one serving. % Daily Value automatically calculated based on 1.3mg daily value.</InfoTooltip>}
                                            id="riboflavin"
                                            value={data.riboflavin}
                                            onChange={(e) => handleChange("riboflavin", e.target.value)}
                                            placeholder="e.g., 0.1"
                                        />
                                        <TextField
                                            label="Niacin (mg)"
                                            labelIcon={<InfoTooltip>Amount of Niacin (Vitamin B3) in one serving. % Daily Value automatically calculated based on 16mg daily value.</InfoTooltip>}
                                            id="niacin"
                                            value={data.niacin}
                                            onChange={(e) => handleChange("niacin", e.target.value)}
                                            placeholder="e.g., 2"
                                        />
                                        <TextField
                                            label="Vitamin B6 (mg)"
                                            labelIcon={<InfoTooltip>Amount of Vitamin B6 (pyridoxine) in one serving. % Daily Value automatically calculated based on 1.7mg daily value.</InfoTooltip>}
                                            id="vitaminB6"
                                            value={data.vitaminB6}
                                            onChange={(e) => handleChange("vitaminB6", e.target.value)}
                                            placeholder="e.g., 0.1"
                                        />
                                        <TextField
                                            label="Folate (mcg)"
                                            labelIcon={<InfoTooltip>Amount of Folate in one serving. DFE = Dietary Folate Equivalents. % Daily Value automatically calculated based on 400mcg daily value.</InfoTooltip>}
                                            id="folate"
                                            value={data.folate}
                                            onChange={(e) => handleChange("folate", e.target.value)}
                                            placeholder="e.g., 25"
                                        />
                                        <TextField
                                            label="Vitamin B12 (mcg)"
                                            labelIcon={<InfoTooltip>Amount of Vitamin B12 (cobalamin) in one serving. % Daily Value automatically calculated based on 2.4mcg daily value.</InfoTooltip>}
                                            id="vitaminB12"
                                            value={data.vitaminB12}
                                            onChange={(e) => handleChange("vitaminB12", e.target.value)}
                                            placeholder="e.g., 0.5"
                                        />
                                        <TextField
                                            label="Phosphorus (mg)"
                                            labelIcon={<InfoTooltip>Amount of phosphorus in one serving. % Daily Value automatically calculated based on 1250mg daily value.</InfoTooltip>}
                                            id="phosphorus"
                                            value={data.phosphorus}
                                            onChange={(e) => handleChange("phosphorus", e.target.value)}
                                            placeholder="e.g., 100"
                                        />
                                        <TextField
                                            label="Magnesium (mg)"
                                            labelIcon={<InfoTooltip>Amount of magnesium in one serving. % Daily Value automatically calculated based on 420mg daily value.</InfoTooltip>}
                                            id="magnesium"
                                            value={data.magnesium}
                                            onChange={(e) => handleChange("magnesium", e.target.value)}
                                            placeholder="e.g., 25"
                                        />
                                        <TextField
                                            label="Zinc (mg)"
                                            labelIcon={<InfoTooltip>Amount of zinc in one serving. % Daily Value automatically calculated based on 11mg daily value.</InfoTooltip>}
                                            id="zinc"
                                            value={data.zinc}
                                            onChange={(e) => handleChange("zinc", e.target.value)}
                                            placeholder="e.g., 1"
                                        />
                                    </div>
                                )}
                            </div>
                        </CommonCard>
                    }
                </>
                :
                (data?.labelFormat === "aggregate")
                    ? <AggregateLayoutHtml lableFormat={data.labelFormat} {...aggregateLayoutHookData} />
                    : <DualLayoutHtml lableFormat={data.labelFormat} {...dualLayoutHookData} />
            }
            <CommonCard title="Options">
                <div className="space-y-4">

                    <CheckBox
                        id="transparentBackground"
                        labelIcon={<InfoTooltip>Remove the white background from exported labels for easier integration into package designs.</InfoTooltip>}
                        label="Transparent Background"
                        subLabel={`The background color is set to ${data.transparentBackground ? "transparent" : "white"}`}
                        checked={data.transparentBackground}
                        onChange={(checked) => handleChange("transparentBackground", checked)}
                    />

                    <CheckBox
                        labelIcon={<InfoTooltip>Include ingredient list and company information on your nutrition label as required by FDA for most packaged foods.</InfoTooltip>}
                        label="Add Ingredient List & Manufacturer Information"
                        id="addIngredientInfo"
                        checked={data.addIngredientInfo}
                        onChange={(checked) => handleChange("addIngredientInfo", checked)}
                    />
                </div>
            </CommonCard>

            {data.addIngredientInfo && (
                <CommonCard title="Ingredient List">
                    <div className="space-y-4">

                        <CustomTextArea
                            labelIcon={<InfoTooltip>List all ingredients in descending order by weight. The ingredient that weighs the most must be listed first, and the ingredient that weighs the least is listed last. Use common or usual names.</InfoTooltip>}
                            note={<><strong>Important:</strong> Ingredients must be listed in descending order by weight (heaviest first).</>}
                            label="INGREDIENTS"
                            placeholder="BULGUR WHEAT, SAUCE (WATER, HALF AND HALF [MILK, CREAM], PARMESAN CHEESE [PASTEURIZED SKIM MILK, CULTURES, SALT, ENZYMES], CHEDDAR CHEESE." id="ingredients"
                            value={data.ingredients}
                            onChange={(e) => handleChange("ingredients", e.target.value)}
                        />
                        {data.labelFormat === "bilingual" && (
                            <div>
                                <CustomTextArea
                                    labelIcon={<InfoTooltip>Spanish translation of the ingredients list. Must match the English ingredients exactly but in Spanish.</InfoTooltip>}
                                    note={<><strong>Important:</strong> Ingredients must be listed in descending order by weight (heaviest first).</>}
                                    label="INGREDIENTES (Spanish)"
                                    placeholder="e.g., TRIGO BULGUR, SALSA (AGUA, MITAD Y MITAD [LECHE, CREMA], QUESO PARMESANO [LECHE DESCREMADA PASTEURIZADA, CULTIVOS, SAL, ENZIMAS], QUESO CHEDDAR."
                                    id="ingredientsSpanish"
                                    value={data.ingredientsSpanish}
                                    onChange={(e) => handleChange("ingredientsSpanish", e.target.value)}
                                />
                            </div>
                        )}
                        <CustomTextArea
                            label="CONTAINS"
                            labelIcon={<InfoTooltip>List major food allergens present in the product. Required by FDA for the 9 major allergens: milk, eggs, fish, shellfish, tree nuts, peanuts, wheat, soybeans, and sesame.</InfoTooltip>}
                            placeholder="WHEAT, MILK."
                            id="contains"
                            value={data.contains}
                            onChange={(e) => handleChange("contains", e.target.value)}
                        />
                        {data.labelFormat === "bilingual" && (
                            <div>
                                <CustomTextArea
                                    label="CONTIENE (Spanish)"
                                    labelIcon={<InfoTooltip>Spanish translation of the allergen information.</InfoTooltip>}
                                    placeholder="e.g., TRIGO, LECHE."
                                    id="containsSpanish"
                                    value={data.containsSpanish}
                                    onChange={(e) => handleChange("containsSpanish", e.target.value)}
                                />
                            </div>
                        )}

                        <CheckBox
                            label="Show Ingredient list border?"
                            labelIcon={<InfoTooltip>Add a border line above the ingredient list to separate it from the nutrition facts.</InfoTooltip>}
                            id="showIngredientBorder"
                            checked={data.showIngredientBorder}
                            onChange={(checked) => handleChange("showIngredientBorder", checked)}
                        />
                    </div>
                </CommonCard>
            )}
            {data.addIngredientInfo && (
                <CommonCard title="Manufacturer Name & Address">
                    <div className="space-y-4">
                        <div>
                            <TextField
                                label="Company Name"
                                labelIcon={<InfoTooltip>Name of the manufacturer, packer, or distributor. Required by FDA for identification purposes.</InfoTooltip>}
                                id="companyName"
                                value={data.companyName}
                                onChange={(e) => handleChange("companyName", e.target.value)}
                                placeholder="Any Cookie Company"
                            />
                        </div>
                        {data.labelFormat === "bilingual" && (
                            <div>
                                <TextField
                                    label="Company Name (Spanish)"
                                    labelIcon={<InfoTooltip>Spanish translation of your company name.</InfoTooltip>}
                                    id="companyNameSpanish"
                                    value={data.companyNameSpanish}
                                    onChange={(e) => handleChange("companyNameSpanish", e.target.value)}
                                    placeholder="Nombre de la empresa"
                                />
                            </div>
                        )}
                        <div>
                            <CustomTextArea
                                label="Company Address"
                                labelIcon={<InfoTooltip>Complete address including street, city, state, and ZIP code. Required by FDA for consumer contact information.</InfoTooltip>}
                                id="companyAddress"
                                value={data.companyAddress}
                                onChange={(e) => handleChange("companyAddress", e.target.value)}
                                placeholder="Street address, city, state, and zip code."
                                rows={2}
                            />
                        </div>
                        {data.labelFormat === "bilingual" && (
                            <div>
                                <CustomTextArea
                                    label="Company Address (Spanish)"
                                    labelIcon={<InfoTooltip>Spanish translation of your company address.</InfoTooltip>}
                                    id="companyAddressSpanish"
                                    value={data.companyAddressSpanish}
                                    onChange={(e) => handleChange("companyAddressSpanish", e.target.value)}
                                    placeholder="Dirección de la empresa, ciudad, estado y código postal."
                                    rows={2}
                                />
                            </div>
                        )}
                    </div>
                </CommonCard>
            )}


            {data.addIngredientInfo && (
                <CommonCard title="">
                    <div className="bg-orange-50 border border-[#f05624] rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-[#f05624] flex-shrink-0 mt-0.5" />
                            <div className="text-left">
                                <h3 className="font-semibold text-textColor mb-2">Important Disclaimer</h3>
                                <p className="text-sm text-textColor font-light leading-[24px]">
                                    By using this nutrition label generator, you acknowledge and accept all risks and liability
                                    associated with its use. You are solely responsible for the accuracy of all nutritional information
                                    entered and ensuring compliance with applicable regulations. ePackageSupply provides this tool
                                    as-is and makes no warranties regarding the accuracy, completeness, or regulatory compliance of
                                    generated labels. Professional consultation is strongly recommended for commercial use.
                                </p>
                            </div>
                        </div>
                    </div>
                </CommonCard>
            )}
        </>
    )
}
