import type { Meta, StoryObj } from "@storybook/react-vite";
import { ProductForm } from "./index";
import { type ProductRegistrationData } from "../../../schemas/productSchema";

const meta: Meta<typeof ProductForm> = {
  title: "Forms/ProductForm",
  component: ProductForm,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
# ProductForm

商品登録フォームコンポーネントです。formFactoryパターンを使用して型安全に実装されています。

## 特徴
- 📝 **複雑なフォーム**: 基本情報、価格、カテゴリ、在庫、寸法、画像、設定など8つのセクション
- 🔒 **型安全**: ZodスキーマとformFactoryによる完全な型安全性
- ✅ **リアルタイムバリデーション**: onBlur/onInputでのクライアントサイドバリデーション
- 💾 **下書き保存**: 部分的なデータの保存機能
- 🎨 **美しいUI**: Tailwind CSSによるモダンなデザイン
- ♿ **アクセシブル**: React Ariaに基づく実装

## formFactoryの価値
\`\`\`typescript
// 従来のフォーム実装 - 冗長で型安全性に欠ける
const [name, setName] = useState('');
const [price, setPrice] = useState(0);
const [errors, setErrors] = useState({});
// ... 数十行のボイラープレート

// formFactory使用 - 簡潔で型安全
const [form] = useProductForm({
  shouldValidate: "onBlur",
  onSubmit(event, { formData }) {
    const submission = parseWithZod(formData, { schema });
    if (submission.status === "success") {
      onSubmit(submission.value); // 完全に型安全！
    }
  },
});
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    onSubmit: { action: "submitted" },
    onSaveDraft: { action: "draft saved" },
    title: {
      control: "text",
      description: "フォームのタイトル",
    },
    className: {
      control: "text",
      description: "追加のCSSクラス",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的な商品登録フォーム
 */
export const Default: Story = {
  args: {
    onSubmit: (data: ProductRegistrationData) => {
      console.log("商品登録データ:", data);
    },
    onSaveDraft: (data: Partial<ProductRegistrationData>) => {
      console.log("下書き保存データ:", data);
    },
  },
};

/**
 * カスタムタイトル付きフォーム
 */
export const CustomTitle: Story = {
  args: {
    title: "新商品追加",
    onSubmit: (data: ProductRegistrationData) => {
      console.log("新商品データ:", data);
    },
    onSaveDraft: (data: Partial<ProductRegistrationData>) => {
      console.log("下書きデータ:", data);
    },
  },
};

/**
 * 下書き保存機能なしのフォーム
 */
export const WithoutDraftSave: Story = {
  args: {
    title: "シンプル商品登録",
    onSubmit: (data: ProductRegistrationData) => {
      console.log("商品データ:", data);
    },
    // onSaveDraftは省略
  },
};

/**
 * フォームの使用例とデモデータ
 */
export const WithExampleData: Story = {
  args: {
    title: "サンプルデータ付きフォーム",
    onSubmit: (data: ProductRegistrationData) => {
      console.log("完成したサンプルデータ:", JSON.stringify(data, null, 2));
    },
    onSaveDraft: (data: Partial<ProductRegistrationData>) => {
      console.log("サンプル下書きデータ:", JSON.stringify(data, null, 2));
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
このストーリーは実際の商品データを入力したデモを提供します。

### 入力例:
- **商品名**: iPhone 15 Pro
- **説明**: 最新のProカメラシステムを搭載した革新的なスマートフォン
- **価格**: 159800 (円)
- **カテゴリ**: 家電・電子機器
- **ブランド**: Apple
- **状態**: 新品

フォームの各セクションを試して、formFactoryの型安全性とユーザビリティを確認してください。
        `,
      },
    },
  },
};

/**
 * エラー処理のデモ
 */
export const ErrorHandling: Story = {
  args: {
    title: "エラーハンドリングデモ",
    onSubmit: () => {
      // 意図的にエラーをシミュレーション
      throw new Error("サーバーエラーのシミュレーション");
    },
    onSaveDraft: (data: Partial<ProductRegistrationData>) => {
      console.log("下書き保存成功:", data);
    },
  },
  parameters: {
    docs: {
      description: {
        story: `
このストーリーではフォームのエラーハンドリングをデモンストレーションします。

### テスト方法:
1. 必須フィールドを空のままにして送信 → バリデーションエラー
2. 不正な形式のデータを入力 → リアルタイムバリデーション
3. すべて正しく入力して送信 → サーバーエラーシミュレーション

formFactoryによる堅牢なエラーハンドリングを確認できます。
        `,
      },
    },
  },
};

/**
 * レスポンシブデザインのデモ
 */
export const ResponsiveDemo: Story = {
  args: {
    title: "レスポンシブフォーム",
    className: "min-h-screen",
    onSubmit: (data: ProductRegistrationData) => {
      console.log("レスポンシブテストデータ:", data);
    },
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story: `
このストーリーはフォームのレスポンシブデザインをデモンストレーションします。

### レスポンシブ機能:
- **モバイル**: 1カラムレイアウト
- **タブレット**: 2カラムレイアウト  
- **デスクトップ**: 3-4カラムレイアウト
- **ボタン配置**: 画面サイズに応じて縦/横配置切り替え

ViewportをStorybookで切り替えて確認してください。
        `,
      },
    },
  },
};
