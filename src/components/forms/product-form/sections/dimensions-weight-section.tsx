import { useProductField } from "../product-form-utilities";
import { InputField, SelectField } from "../../../fields";

export const DimensionsWeightSection = () => {
  const [dimensionsField] = useProductField("dimensions");
  const [weightField] = useProductField("weight");

  // Conformのネストされたオブジェクトアクセス
  const dimensionsFieldset = dimensionsField?.getFieldset();
  const weightFieldset = weightField?.getFieldset();

  return (
    <section>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">寸法・重量</h2>
        <p className="text-sm text-gray-600 mt-1">
          商品のサイズと重量を設定してください（任意）
        </p>
      </div>

      <div className="space-y-6">
        {/* 寸法セクション */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">寸法</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InputField
              label="長さ"
              placeholder="0"
              field={dimensionsFieldset?.length}
              type="number"
            />

            <InputField
              label="幅"
              placeholder="0"
              field={dimensionsFieldset?.width}
              type="number"
            />

            <InputField
              label="高さ"
              placeholder="0"
              field={dimensionsFieldset?.height}
              type="number"
            />

            <SelectField
              label="単位"
              field={dimensionsFieldset?.unit}
              options={[
                { value: "cm", label: "cm" },
                { value: "inch", label: "inch" },
                { value: "m", label: "m" },
              ]}
            />
          </div>
        </div>

        {/* 重量セクション */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">重量</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="重量"
              placeholder="0"
              field={weightFieldset?.value}
              type="number"
            />

            <SelectField
              label="重量単位"
              field={weightFieldset?.unit}
              options={[
                { value: "g", label: "g" },
                { value: "kg", label: "kg" },
                { value: "lb", label: "lb" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-sm text-yellow-800">
          💡 寸法と重量は配送料計算や商品検索に使用されます
        </p>
      </div>
    </section>
  );
};
