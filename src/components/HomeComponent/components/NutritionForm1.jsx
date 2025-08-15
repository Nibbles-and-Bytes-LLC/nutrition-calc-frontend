import React, { useState, useEffect } from "react";

const initialState = {
  productName: "",
  servingSize: "",
  servingsPerContainer: "",
  calories: "",
  totalFat: "",
  saturatedFat: "",
  transFat: "",
  cholesterol: "",
  sodium: "",
  totalCarbs: "",
  dietaryFiber: "",
  totalSugars: "",
  addedSugars: "",
  protein: "",
  vitaminD: "",
  calcium: "",
  iron: "",
  potassium: "",
  vitaminA: "",
  vitaminC: "",
  vitaminE: "",
  vitaminK: "",
  thiamin: "",
  riboflavin: "",
  niacin: "",
  vitaminB6: "",
  folate: "",
  vitaminB12: "",
  biotin: "",
  pantothenicAcid: "",
  phosphorus: "",
  magnesium: "",
  zinc: "",
  selenium: "",
  copper: "",
  manganese: "",
  chromium: "",
  molybdenum: "",
  chloride: "",
  allergens: "",
  footnotes: "",
};

const requiredFields = [
  "productName",
  "servingSize",
  "calories",
  "totalFat",
  "totalCarbs",
  "protein",
];

const numericFields = [
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
  "protein",
  "vitaminD",
  "calcium",
  "iron",
  "potassium",
  "vitaminA",
  "vitaminC",
  "vitaminE",
  "vitaminK",
  "thiamin",
  "riboflavin",
  "niacin",
  "vitaminB6",
  "folate",
  "vitaminB12",
  "biotin",
  "pantothenicAcid",
  "phosphorus",
  "magnesium",
  "zinc",
  "selenium",
  "copper",
  "manganese",
  "chromium",
  "molybdenum",
  "chloride",
];

export default function NutritionForm({ onChange }) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showVitamins, setShowVitamins] = useState(false);

  useEffect(() => {
    if (onChange) onChange(form);
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (onChange) onChange(updated);
      return updated;
    });
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!form[field]) {
        newErrors[field] = "Required";
      }
    });
    numericFields.forEach((field) => {
      if (form[field] && isNaN(Number(form[field]))) {
        newErrors[field] = "Must be a number";
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Later: pass data to preview component
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Nutrition Facts Input</h2>
      <div>
        <label className="block font-semibold">Product Name *</label>
        <input name="productName" value={form.productName} onChange={handleChange} className="input" />
        {errors.productName && <span className="text-red-600 text-sm">{errors.productName}</span>}
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block font-semibold">Serving Size *</label>
          <input name="servingSize" value={form.servingSize} onChange={handleChange} className="input" placeholder="e.g. 2/3 cup (55g)" />
          {errors.servingSize && <span className="text-red-600 text-sm">{errors.servingSize}</span>}
        </div>
        <div className="flex-1">
          <label className="block font-semibold">Servings Per Container</label>
          <input name="servingsPerContainer" value={form.servingsPerContainer} onChange={handleChange} className="input" />
        </div>
      </div>
      <div>
        <label className="block font-semibold">Calories *</label>
        <input name="calories" value={form.calories} onChange={handleChange} className="input" type="number" />
        {errors.calories && <span className="text-red-600 text-sm">{errors.calories}</span>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block">Total Fat (g) *</label>
          <input name="totalFat" value={form.totalFat} onChange={handleChange} className="input" type="number" />
          {errors.totalFat && <span className="text-red-600 text-sm">{errors.totalFat}</span>}
        </div>
        <div>
          <label className="block">Saturated Fat (g)</label>
          <input name="saturatedFat" value={form.saturatedFat} onChange={handleChange} className="input" type="number" />
          {errors.saturatedFat && <span className="text-red-600 text-sm">{errors.saturatedFat}</span>}
        </div>
        <div>
          <label className="block">Trans Fat (g)</label>
          <input name="transFat" value={form.transFat} onChange={handleChange} className="input" type="number" />
          {errors.transFat && <span className="text-red-600 text-sm">{errors.transFat}</span>}
        </div>
        <div>
          <label className="block">Cholesterol (mg)</label>
          <input name="cholesterol" value={form.cholesterol} onChange={handleChange} className="input" type="number" />
          {errors.cholesterol && <span className="text-red-600 text-sm">{errors.cholesterol}</span>}
        </div>
        <div>
          <label className="block">Sodium (mg)</label>
          <input name="sodium" value={form.sodium} onChange={handleChange} className="input" type="number" />
          {errors.sodium && <span className="text-red-600 text-sm">{errors.sodium}</span>}
        </div>
        <div>
          <label className="block">Total Carbohydrate (g) *</label>
          <input name="totalCarbs" value={form.totalCarbs} onChange={handleChange} className="input" type="number" />
          {errors.totalCarbs && <span className="text-red-600 text-sm">{errors.totalCarbs}</span>}
        </div>
        <div>
          <label className="block">Dietary Fiber (g)</label>
          <input name="dietaryFiber" value={form.dietaryFiber} onChange={handleChange} className="input" type="number" />
          {errors.dietaryFiber && <span className="text-red-600 text-sm">{errors.dietaryFiber}</span>}
        </div>
        <div>
          <label className="block">Total Sugars (g)</label>
          <input name="totalSugars" value={form.totalSugars} onChange={handleChange} className="input" type="number" />
          {errors.totalSugars && <span className="text-red-600 text-sm">{errors.totalSugars}</span>}
        </div>
        <div>
          <label className="block">Added Sugars (g)</label>
          <input name="addedSugars" value={form.addedSugars} onChange={handleChange} className="input" type="number" />
          {errors.addedSugars && <span className="text-red-600 text-sm">{errors.addedSugars}</span>}
        </div>
        <div>
          <label className="block">Protein (g) *</label>
          <input name="protein" value={form.protein} onChange={handleChange} className="input" type="number" />
          {errors.protein && <span className="text-red-600 text-sm">{errors.protein}</span>}
        </div>
      </div>
      <button type="button" className="text-blue-600 underline" onClick={() => setShowVitamins((v) => !v)}>
        {showVitamins ? "Hide" : "Show"} Vitamins & Minerals
      </button>
      {showVitamins && (
        <div className="grid grid-cols-2 gap-2 bg-gray-50 p-3 rounded">
          <div>
            <label className="block">Vitamin D (mcg)</label>
            <input name="vitaminD" value={form.vitaminD} onChange={handleChange} className="input" type="number" />
            {errors.vitaminD && <span className="text-red-600 text-sm">{errors.vitaminD}</span>}
          </div>
          <div>
            <label className="block">Calcium (mg)</label>
            <input name="calcium" value={form.calcium} onChange={handleChange} className="input" type="number" />
            {errors.calcium && <span className="text-red-600 text-sm">{errors.calcium}</span>}
          </div>
          <div>
            <label className="block">Iron (mg)</label>
            <input name="iron" value={form.iron} onChange={handleChange} className="input" type="number" />
            {errors.iron && <span className="text-red-600 text-sm">{errors.iron}</span>}
          </div>
          <div>
            <label className="block">Potassium (mg)</label>
            <input name="potassium" value={form.potassium} onChange={handleChange} className="input" type="number" />
            {errors.potassium && <span className="text-red-600 text-sm">{errors.potassium}</span>}
          </div>
          <div>
            <label className="block">Vitamin A (mcg)</label>
            <input name="vitaminA" value={form.vitaminA} onChange={handleChange} className="input" type="number" />
            {errors.vitaminA && <span className="text-red-600 text-sm">{errors.vitaminA}</span>}
          </div>
          <div>
            <label className="block">Vitamin C (mg)</label>
            <input name="vitaminC" value={form.vitaminC} onChange={handleChange} className="input" type="number" />
            {errors.vitaminC && <span className="text-red-600 text-sm">{errors.vitaminC}</span>}
          </div>
          <div>
            <label className="block">Vitamin E (mg)</label>
            <input name="vitaminE" value={form.vitaminE} onChange={handleChange} className="input" type="number" />
            {errors.vitaminE && <span className="text-red-600 text-sm">{errors.vitaminE}</span>}
          </div>
          <div>
            <label className="block">Vitamin K (mcg)</label>
            <input name="vitaminK" value={form.vitaminK} onChange={handleChange} className="input" type="number" />
            {errors.vitaminK && <span className="text-red-600 text-sm">{errors.vitaminK}</span>}
          </div>
          <div>
            <label className="block">Thiamin (mg)</label>
            <input name="thiamin" value={form.thiamin} onChange={handleChange} className="input" type="number" />
            {errors.thiamin && <span className="text-red-600 text-sm">{errors.thiamin}</span>}
          </div>
          <div>
            <label className="block">Riboflavin (mg)</label>
            <input name="riboflavin" value={form.riboflavin} onChange={handleChange} className="input" type="number" />
            {errors.riboflavin && <span className="text-red-600 text-sm">{errors.riboflavin}</span>}
          </div>
          <div>
            <label className="block">Niacin (mg)</label>
            <input name="niacin" value={form.niacin} onChange={handleChange} className="input" type="number" />
            {errors.niacin && <span className="text-red-600 text-sm">{errors.niacin}</span>}
          </div>
          <div>
            <label className="block">Vitamin B6 (mg)</label>
            <input name="vitaminB6" value={form.vitaminB6} onChange={handleChange} className="input" type="number" />
            {errors.vitaminB6 && <span className="text-red-600 text-sm">{errors.vitaminB6}</span>}
          </div>
          <div>
            <label className="block">Folate (mcg)</label>
            <input name="folate" value={form.folate} onChange={handleChange} className="input" type="number" />
            {errors.folate && <span className="text-red-600 text-sm">{errors.folate}</span>}
          </div>
          <div>
            <label className="block">Vitamin B12 (mcg)</label>
            <input name="vitaminB12" value={form.vitaminB12} onChange={handleChange} className="input" type="number" />
            {errors.vitaminB12 && <span className="text-red-600 text-sm">{errors.vitaminB12}</span>}
          </div>
          <div>
            <label className="block">Biotin (mcg)</label>
            <input name="biotin" value={form.biotin} onChange={handleChange} className="input" type="number" />
            {errors.biotin && <span className="text-red-600 text-sm">{errors.biotin}</span>}
          </div>
          <div>
            <label className="block">Pantothenic Acid (mg)</label>
            <input name="pantothenicAcid" value={form.pantothenicAcid} onChange={handleChange} className="input" type="number" />
            {errors.pantothenicAcid && <span className="text-red-600 text-sm">{errors.pantothenicAcid}</span>}
          </div>
          <div>
            <label className="block">Phosphorus (mg)</label>
            <input name="phosphorus" value={form.phosphorus} onChange={handleChange} className="input" type="number" />
            {errors.phosphorus && <span className="text-red-600 text-sm">{errors.phosphorus}</span>}
          </div>
          <div>
            <label className="block">Magnesium (mg)</label>
            <input name="magnesium" value={form.magnesium} onChange={handleChange} className="input" type="number" />
            {errors.magnesium && <span className="text-red-600 text-sm">{errors.magnesium}</span>}
          </div>
          <div>
            <label className="block">Zinc (mg)</label>
            <input name="zinc" value={form.zinc} onChange={handleChange} className="input" type="number" />
            {errors.zinc && <span className="text-red-600 text-sm">{errors.zinc}</span>}
          </div>
          <div>
            <label className="block">Selenium (mcg)</label>
            <input name="selenium" value={form.selenium} onChange={handleChange} className="input" type="number" />
            {errors.selenium && <span className="text-red-600 text-sm">{errors.selenium}</span>}
          </div>
          <div>
            <label className="block">Copper (mg)</label>
            <input name="copper" value={form.copper} onChange={handleChange} className="input" type="number" />
            {errors.copper && <span className="text-red-600 text-sm">{errors.copper}</span>}
          </div>
          <div>
            <label className="block">Manganese (mg)</label>
            <input name="manganese" value={form.manganese} onChange={handleChange} className="input" type="number" />
            {errors.manganese && <span className="text-red-600 text-sm">{errors.manganese}</span>}
          </div>
          <div>
            <label className="block">Chromium (mcg)</label>
            <input name="chromium" value={form.chromium} onChange={handleChange} className="input" type="number" />
            {errors.chromium && <span className="text-red-600 text-sm">{errors.chromium}</span>}
          </div>
          <div>
            <label className="block">Molybdenum (mcg)</label>
            <input name="molybdenum" value={form.molybdenum} onChange={handleChange} className="input" type="number" />
            {errors.molybdenum && <span className="text-red-600 text-sm">{errors.molybdenum}</span>}
          </div>
          <div>
            <label className="block">Chloride (mg)</label>
            <input name="chloride" value={form.chloride} onChange={handleChange} className="input" type="number" />
            {errors.chloride && <span className="text-red-600 text-sm">{errors.chloride}</span>}
          </div>
        </div>
      )}
      <div>
        <label className="block font-semibold">Allergens</label>
        <input name="allergens" value={form.allergens} onChange={handleChange} className="input" placeholder="e.g. Milk, Soy, Wheat" />
      </div>
      <div>
        <label className="block font-semibold">Footnotes</label>
        <textarea name="footnotes" value={form.footnotes} onChange={handleChange} className="input" rows={2} />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700">Save & Preview</button>
    </form>
  );
} 