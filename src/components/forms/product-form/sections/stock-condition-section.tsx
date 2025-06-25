import { useProductField } from "../product-form-utilities";
import { InputField, SelectField } from "../../../fields";
import { productConditions } from "../../../../schemas/productSchema";

export const StockConditionSection = () => {
  const [conditionField] = useProductField("condition");
  const [quantityField] = useProductField("quantity");

  const conditionOptions = productConditions.map((condition) => ({
    value: condition,
    label:
      {
        new: "新品",
        "like-new": "ほぼ新品",
        good: "良好",
        fair: "普通",
        poor: "やや劣化",
      }[condition] || condition,
  }));

  return (
    <section>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">在庫・状態</h2>
        <p className="text-sm text-gray-600 mt-1">
          商品の状態と在庫数を設定してください
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SelectField
          label="商品状態"
          field={conditionField}
          options={conditionOptions}
          placeholder="商品の状態を選択してください"
          required
        />

        <InputField
          label="在庫数"
          placeholder="1"
          field={quantityField}
          type="number"
          required
        />
      </div>

      <div className="mt-4 p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          💡 在庫数を0に設定すると「売り切れ」状態になります
        </p>
      </div>
    </section>
  );
};
