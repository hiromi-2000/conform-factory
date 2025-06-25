import { useProductField } from "../product-form-utilities";
import { InputField, SelectField } from "../../../fields";

export const PriceSection = () => {
  const [priceField] = useProductField("price");
  const [originalPriceField] = useProductField("originalPrice");
  const [currencyField] = useProductField("currency");

  return (
    <section>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">価格情報</h2>
        <p className="text-sm text-gray-600 mt-1">
          商品の価格と通貨を設定してください
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="販売価格"
              placeholder="0.00"
              field={priceField}
              type="number"
              required
            />

            <InputField
              label="定価（任意）"
              placeholder="0.00"
              field={originalPriceField}
              type="number"
            />
          </div>
        </div>

        <SelectField
          label="通貨"
          field={currencyField}
          options={[
            { value: "JPY", label: "日本円 (¥)" },
            { value: "USD", label: "米ドル ($)" },
            { value: "EUR", label: "ユーロ (€)" },
          ]}
          required
        />
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          💡 定価を設定した場合、販売価格は定価より安く設定してください
        </p>
      </div>
    </section>
  );
};
