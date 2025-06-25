import { useProductField } from "../product-form-utilities";
import { InputField, SelectField } from "../../../fields";
import { productCategories } from "../../../../schemas/productSchema";

export const CategorySection = () => {
  const [categoryField] = useProductField("category");
  const [subcategoryField] = useProductField("subcategory");
  const [brandField] = useProductField("brand");
  const [modelField] = useProductField("model");
  const [tagsField] = useProductField("tags");

  const categoryOptions = productCategories.map((category) => ({
    value: category,
    label:
      {
        electronics: "家電・電子機器",
        clothing: "衣類・ファッション",
        books: "本・書籍",
        home: "ホーム・生活用品",
        sports: "スポーツ・アウトドア",
        toys: "おもちゃ・ホビー",
        beauty: "美容・コスメ",
        automotive: "自動車・バイク",
        food: "食品・飲料",
        other: "その他",
      }[category] || category,
  }));

  return (
    <section>
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">カテゴリ・分類</h2>
        <p className="text-sm text-gray-600 mt-1">
          商品のカテゴリとブランド情報を設定してください
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="カテゴリ"
            field={categoryField}
            options={categoryOptions}
            placeholder="カテゴリを選択してください"
            required
          />

          <InputField
            label="サブカテゴリ（任意）"
            placeholder="例: ノートパソコン"
            field={subcategoryField}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="ブランド（任意）"
            placeholder="例: Apple, Nike, Sony"
            field={brandField}
          />

          <InputField
            label="モデル名（任意）"
            placeholder="例: iPhone 15 Pro"
            field={modelField}
          />
        </div>

        <div>
          <InputField
            label="タグ（任意）"
            placeholder="カンマ区切りで入力 例: 人気, 新商品, セール"
            field={tagsField}
          />
          <p className="text-xs text-gray-500 mt-1">
            商品を検索しやすくするためのキーワードを設定できます（最大10個、各20文字以内）
          </p>
        </div>
      </div>
    </section>
  );
};
