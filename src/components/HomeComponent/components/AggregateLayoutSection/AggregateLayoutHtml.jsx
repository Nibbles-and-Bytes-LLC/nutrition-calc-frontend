import _ from 'lodash';
import CustomSelect from '../../../../inputs/CustomSelect'
import InfoTooltip from '../../../../inputs/InfoToolTip';
import { AggregateFields } from './AggregateFields';
import TextField from '../../../../inputs/TextField';
import { Plus } from 'lucide-react';


export const AggregateLayoutHtml = ({
    products,
    productCount, handleSelectProduct,
    nuteritionFacts,
    handleChange,
    addOneMore,
    handleNuteritionFact,
    removeProduct
}) => {

    const ProductOptions = [2, 3, 4, 5, 6]?.map((r) => ({ label: r + ' products', value: r }));

    return (
        <div className='rounded-lg border bg-card text-card-foreground shadow-2xs'>
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl leading-none tracking-tight text-[#414142] font-black">Aggregate Display Configuration</h3>
                <p className="text-sm text-gray-600 font-light">Configure multiple products for side-by-side comparison</p>
            </div>
            <div className='p-6 pt-0'>
                <div className='space-y-6'>
                    <div className='w-48'>
                        <CustomSelect
                            label="Number of Products"
                            required
                            labelIcon={
                                <InfoTooltip children='Choose how many products to display side-by-side. You can have between 2 and 6 products for comparison.' />
                            }
                            options={ProductOptions}
                            value={productCount}
                            onChange={(value) => handleSelectProduct(value)}
                        />
                    </div>
                    <div className='space-y-4'>
                        <h4 className="font-semibold text-[#414142] ">Nutrition Facts</h4>
                        <div className='rounded-lg bg-card text-card-foreground shadow-2xs border border-gray-200  p-6'>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Servings per Container "
                                    required
                                    placeholder="8"
                                    value={nuteritionFacts.servingsPerContainer}
                                    onChange={(e) => handleNuteritionFact("servingsPerContainer", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Serving Size Quantity"
                                    required
                                    placeholder="1 "
                                    value={nuteritionFacts.servingSizeQuantity}
                                    onChange={(e) => handleNuteritionFact("servingSizeQuantity", e.target.value)}
                                />
                                <TextField
                                    labelClass="!text-textColor"
                                    label="Serving Size Units"
                                    required
                                    placeholder="eg. box"
                                    value={nuteritionFacts.servingSizeQuantityUnits}
                                    onChange={(e) => handleNuteritionFact("servingSizeQuantityUnits", e.target.value)}
                                />

                            </div>
                        </div>
                    </div>
                    <div className='space-y-4'>
                        <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-[#414142]">Product Information</h4>
                            {(products?.length !== 6) &&
                                <div className="flex gap-2">
                                    <button
                                        className="ring-offset-background focus-visible:outline-hidden focus-visible:ring-ring inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 h-9 rounded-md px-3 bg-[#2559a9] hover:bg-[#1e4a8c] text-white"
                                        type="button"
                                        onClick={() => addOneMore()}
                                    >
                                        <Plus className='w-4 h-4 mr-1' />
                                        Add Product
                                    </button>
                                </div>
                            }
                        </div>
                        <div className='grid gap-6'>
                            {_.map(products, (row, idx) => (
                                <AggregateFields
                                    {...{ productCount, removeProduct }}
                                    index={idx}
                                    data={row}
                                    key={"aggregate" + idx}
                                    handleChangeValue={handleChange}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
