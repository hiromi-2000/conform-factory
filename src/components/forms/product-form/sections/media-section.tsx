import { useProductField } from "../product-form-utilities";
import { InputField } from "../../../fields";

export const MediaSection = () => {
  const [imagesField] = useProductField("images");

  return (
    <section>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">画像・メディア</h2>
        <p className="text-sm text-gray-600 mt-1">
          商品の画像URLを設定してください
        </p>
      </div>

      <div className="space-y-4">
        <InputField
          label="商品画像URL"
          placeholder="https://example.com/image.jpg"
          field={imagesField}
          required
        />

        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-900 mb-2">
            画像について
          </h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 最低1枚、最大10枚まで登録できます</li>
            <li>• 有効なURL形式で入力してください</li>
            <li>• JPEGやPNG形式が推奨されます</li>
            <li>• 高解像度の画像を使用すると、より魅力的に表示されます</li>
          </ul>
        </div>

        <div className="flex items-center space-x-2 text-sm text-blue-600">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>画像アップロード機能は将来のバージョンで追加予定です</span>
        </div>
      </div>
    </section>
  );
};
