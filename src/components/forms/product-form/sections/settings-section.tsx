import { useProductField } from "../product-form-utilities";
import { InputField, CheckboxField } from "../../../fields";

export const SettingsSection = () => {
  const [isAvailableField] = useProductField("isAvailable");
  const [isFeaturedField] = useProductField("isFeatured");
  const [allowBackorderField] = useProductField("allowBackorder");
  const [skuField] = useProductField("sku");
  const [manufacturerPartNumberField] = useProductField(
    "manufacturerPartNumber"
  );

  return (
    <section>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          販売設定・メタデータ
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          商品の販売に関する設定とメタデータを入力してください
        </p>
      </div>

      <div className="space-y-6">
        {/* 販売設定 */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">販売設定</h3>
          <div className="space-y-4">
            <CheckboxField label="販売可能" field={isAvailableField} />

            <CheckboxField label="注目商品として表示" field={isFeaturedField} />

            <CheckboxField
              label="在庫切れ時の予約注文を許可"
              field={allowBackorderField}
            />
          </div>
        </div>

        {/* メタデータ */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-4">メタデータ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="SKU（商品管理番号）"
              placeholder="例: PRD-001-BLK"
              field={skuField}
            />

            <InputField
              label="製造元品番"
              placeholder="例: MP001234"
              field={manufacturerPartNumberField}
            />
          </div>

          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 mb-2">入力規則</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>
                • SKU:
                英大文字、数字、ハイフン、アンダースコアのみ（50文字以内）
              </li>
              <li>• 製造元品番: 50文字以内</li>
              <li>• これらの情報は在庫管理や受発注で使用されます</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
