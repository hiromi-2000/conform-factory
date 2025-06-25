import {
  productRegistrationSchema,
  type ProductRegistrationData,
} from "../../../schemas/productSchema";
import { parseWithZod } from "@conform-to/zod/v4";
import { twMerge } from "tailwind-merge";
import {
  ProductForm as ProductFormBase,
  useProductForm,
} from "./product-form-utilities";
import {
  BasicInfoSection,
  PriceSection,
  CategorySection,
  StockConditionSection,
  DimensionsWeightSection,
  MediaSection,
  SettingsSection,
  FormActionsSection,
} from "./sections";

interface ProductFormProps {
  onSubmit?: (data: ProductRegistrationData) => void;
  onSaveDraft?: (data: Partial<ProductRegistrationData>) => void;
  className?: string;
  title?: string;
}

export const ProductForm = ({
  onSubmit,
  onSaveDraft,
  className,
  title = "商品登録",
}: ProductFormProps) => {
  // formFactory使用 - 型安全で簡潔！
  const [form] = useProductForm({
    // [Conformドキュメント参考](https://ja.conform.guide/validation)
    // クライアントサイドバリデーション設定
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onSubmit(event, { formData }) {
      event.preventDefault();

      // formFactoryで既にバリデーション済みなので、parseWithZodで最終確認
      const submission = parseWithZod(formData, {
        schema: productRegistrationSchema,
      });

      if (submission.status === "success" && onSubmit) {
        onSubmit(submission.value);
      }
    },
  });

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      const formElement = document.getElementById(form.id) as HTMLFormElement;
      if (formElement) {
        const formData = new FormData(formElement);
        // 部分的なデータとして保存（バリデーションをスキップ）
        const entries = Object.fromEntries(formData.entries());
        onSaveDraft(entries as Partial<ProductRegistrationData>);
      }
    }
  };

  return (
    <div className={twMerge("max-w-4xl mx-auto p-8", className)}>
      {/* ヘッダー */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-600">商品情報を入力して登録してください</p>
      </div>

      {/* formFactoryで生成されたFormコンポーネント */}
      <ProductFormBase
        form={form}
        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
      >
        <div className="p-8 space-y-8">
          {/* 各セクションでuseFieldを使用 */}
          <BasicInfoSection />
          <PriceSection />
          <CategorySection />
          <StockConditionSection />
          <DimensionsWeightSection />
          <MediaSection />
          <SettingsSection />
        </div>

        {/* useFormMetadataを活用したアクションセクション */}
        <FormActionsSection
          onReset={() => form.reset()}
          onSaveDraft={handleSaveDraft}
        />
      </ProductFormBase>
    </div>
  );
};
