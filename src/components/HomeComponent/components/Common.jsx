import ButtonComponent from '../../../inputs/Button';
import classNames from 'classnames';
import SvGComPonent from '../../../common/SvgComponets';
import _ from 'lodash';

// eslint-disable-next-line react-refresh/only-export-components
export const servingSizeUnits = [
    { value: 'grams', label: 'Grams (g)' },
    { value: 'ounces', label: 'Ounces (oz)' },
    { value: 'milliliters', label: 'Milliliters (mL)' },
    { value: 'fluid-ounces', label: 'Fluid Ounces (fl oz)' },
    { value: 'pounds', label: 'Pounds (lb)' },
    { value: 'kilograms', label: 'Kilograms (kg)' },
];

// eslint-disable-next-line react-refresh/only-export-components
export const dvValues = {
    totalFat: 78,
    saturatedFat: 20,
    cholesterol: 300,
    sodium: 2400,
    potassium: 4700,
    totalCarbs: 300,
    dietaryFiber: 25,
    addedSugars: 50,
    protein: 50,
    vitaminD: 20,
    calcium: 1300,
    iron: 18,
    vitaminA: 900,
    vitaminC: 60,
    vitaminE: 15,
    thiamin: 1.5,
    riboflavin: 1.7,
    niacin: 20,
    vitaminB6: 2,
    folate: 400,
    vitaminB12: 6,
    phosphorus: 1000,
    magnesium: 400,
    zinc: 15,
};

// eslint-disable-next-line react-refresh/only-export-components
export const OptionalVitaminData = [
    { label: "Vitamin A", value: "vitaminA", shortLabel: "Vit. A", spanishLabel: "Vitamin A/Vitamina A (mcg RAE)", unit: "mcg" },
    { label: "Vitamin C", value: "vitaminC", shortLabel: "Vit. C", spanishLabel: "Vitamina C/Vitamina C (mg)", unit: "mg" },
    { label: "Vitamin E", value: "vitaminE", shortLabel: "Vit. E", spanishLabel: "Vitamina E/Vitamina E (mg)", unit: "mg" },
    { label: "Thiamin", value: "thiamin", shortLabel: "Thiamin", spanishLabel: "Thiamin/Tiamina (mg)", unit: "mg" },
    { label: "Riboflavin", value: "riboflavin", shortLabel: "Riboflavin", spanishLabel: "Riboflavin/Riboflavina (mg)", unit: "mg" },
    { label: "Niacin", value: "niacin", shortLabel: "Niacin", spanishLabel: "Niacin/Niacina (mg)", unit: "mg" },
    { label: "Vitamin B6", value: "vitaminB6", shortLabel: "Vit. B6", spanishLabel: "Vitamin B6/Vitamina B6 (mg)", unit: "mg" },
    { label: "Folate", value: "folate", shortLabel: "Folate", spanishLabel: "Folate/Folato (mcg DFE)", unit: "mcg" }, // usually mcg
    { label: "Vitamin B12", value: "vitaminB12", shortLabel: "Vit. B12", spanishLabel: "Vitamin B12/Vitamina B12 (mcg)", unit: "mcg" }, // typically mcg even if labeled as mg
    { label: "Phosphorus", value: "phosphorus", shortLabel: "Phosphorus", spanishLabel: "Phosphorus/Fósforo (mg)", unit: "mg" },
    { label: "Magnesium", value: "magnesium", shortLabel: "Magnesium", spanishLabel: "Magnesium/Magnesio (mg)", unit: "mg" },
    { label: "Zinc", value: "zinc", shortLabel: "Zinc", spanishLabel: "Zinc/Zinc (mg)", unit: "mg" },
];

export const CommonCard = ({ children, title, toolTip, subtitle }) => {
    return (
        <div className="rounded-lg border bg-card text-cardTextColor shadow-sm">

            <div className={classNames("flex flex-col space-y-1.5 p-3", { "!p-6": title })}>
                <h3 className="text-2xl leading-none tracking-tight text-primaryTextColor font-black">
                    <span className='flex items-center '>{title} {toolTip}</span>
                    {subtitle && <p className="tracking-[1px] mt-2 text-sm text-[#4b5563] font-light">{subtitle}</p>}
                </h3>
            </div>
            <div className="p-6 pt-0">
                {children}
            </div>
        </div>
    )
}


export const HomeSearchSection = ({ onClick = null }) => {
    return (
        <ButtonComponent variant='' type="button" className="!font-light w-full border border-n-30 rounded-md px-4 py-2 flex gap-2 items-center" onClick={onClick ? () => onClick() : () => console.log('')}>
            <SvGComPonent iconName="search" />
            <span class="text-[#a4a4a4] !text-n-50">Search for products, lids or information</span>
        </ButtonComponent>
    )
}


export const BoldTitleAndValue = ({ title, value, titleClass, sizeStyle, rootClass }) => (
    <div className={classNames("flex justify-between border-b border-gray-400 py-2", rootClass)}>
        <span className={classNames("font-extrabold text-2xl text-black", sizeStyle, titleClass)}>{title}</span>
        {value && <span className={classNames("font-extrabold text-2xl text-black", sizeStyle)}>{value}</span>}
    </div>
)


// Dual column Display and Aggregate layouts
export const CommonDualContenLayout = ({ servingUnit, titleCss, className, aggregate = false, aggregateTitle = "", children, smallTitle, count }) => (
    <div className={classNames("pl-2 grow", className)}>
        {aggregate &&
            <>
                <div className="border-b-[0.4rem] border-black">
                    <div className="border-b border-black pb-2 text-right">
                        <span className="text-2xl ml-auto leading-[2rem] block min-h-[64px] max-w-[140px] break-words">{aggregateTitle}</span>
                    </div>
                </div>

                <div className="pt-1 h-[35px]"></div>
                <div className="border-b-[1.2rem] border-black">
                    <div className="border-b border-black pb-2 text-right">
                        <span className="font-thin text-3xl">{servingUnit || '(0g)'}</span>
                    </div>
                </div>
            </>
        }
        <div className="">
            <div className="border-b-[0.8rem] border-black">
                <div className="flex flex-col items-end font-bold leading-[20px] border-b-6 border-black">
                    {smallTitle ? <span className={classNames(`text-[1.1rem] text-right font-extrabold block max-w-[140px] break-words ${titleCss}`)}>{smallTitle}</span> : <div className="h-[20px]" />}
                    <span className="text-6xl font-extrabold font-black">{count}</span>
                </div>
            </div>
            <div className="border-b border-black py-2">
                <p className="text-right font-extrabold font-black text-md">{smallTitle ? "% DV" : "% Daily Value"}</p>
            </div>
            {children}
        </div>
    </div>
);


export const OptionalNuteriants = () => (
    <></>
)


export const DuelColumnCalerioes = ({ aggregate = false, titleStyle, subtitle, formatNutrientValue, data, extraVitamins }) => (
    <div className="">
        <div className="border-b-[0.8rem] border-black">
            <div className={classNames("flex flex-col items-start font-bold pb-1 pt-[1.78rem] leading-[30px] border-b-6 border-black", titleStyle)}>
                <span className="text-xl font-extrabold block">{subtitle}</span>
                <span className="text-5xl font-black">Calories</span>
            </div>
        </div>
        <div className="border-b border-black py-5">
            <p className="text-right font-extrabold font-black text-md"></p>
        </div>

        {/* Total Fat */}
        <BoldTitleAndValue title="Total Fat" rootClass="!py-1" />

        <div className="flex justify-between border-b border-gray-400 py-1 pl-6">
            <span className="font-thin text-2xl">Saturated Fat</span>
        </div>
        <div className="flex justify-between border-b border-gray-400 py-1 pl-6">
            <span className="font-thin text-2xl italic"><em>Trans</em> Fat</span>
        </div>

        <BoldTitleAndValue title="Cholesterol" rootClass="!py-1" />
        <BoldTitleAndValue title="Sodium" rootClass="!py-1" />
        <BoldTitleAndValue title="Total Carb" rootClass="!py-1" />

        <div className="flex justify-between border-b border-gray-400 py-1 pl-6">
            <span className="font-thin text-2xl">Dietary Fiber</span>
        </div>
        <div className="flex justify-between border-b border-gray-400 py-1 pl-6">
            <span className="font-thin text-2xl">Total Sugars</span>
        </div>
        {data.addedSugars && (
            <div className="flex justify-between border-b border-gray-400 py-1 pl-6">
                <span className="pl-6 font-thin text-2xl whitespace-nowrap">Incl Added Sugars</span>
            </div>
        )}
        {/* Protein */}
        <div className="border-b-[1.2rem] border-black">
            <BoldTitleAndValue rootClass="!py-1" title={`Protein ${formatNutrientValue("protein", data?.protein || "0", "g")}g`} />
        </div>

        {aggregate ?
            <div className="flex gap-8">
                <div className="flex gap-2 text-xl mt-2 pt-1 max-w-[325px]">
                    <span> *  </span>
                    <span>The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.</span>
                </div>
                <div>
                    {_.map(["Vitamin D", "Calcium", "Iron ", "Potassium", ..._.map(extraVitamins, (r) => _.split(r, '(')[0] || "")],
                        (row) => (
                            <div key={row} className={classNames("flex justify-between border-b border-gray-400 py-1", { "!border-0": row === "Potassium" })}>
                                <span className="font-thin text-2xl">{row}</span>
                            </div>
                        ))}
                </div>
            </div>
            :
            _.map(["Vitamin D", "Calcium", "Iron ", "Potassium"],
                (row) => (
                    <div key={row} className={classNames("flex justify-between border-b border-gray-400 py-1", { "!border-0": row === "Potassium" })}>
                        <span className="font-thin text-2xl">{row}</span>
                    </div>
                ))}
    </div>
)