import type { Meta, StoryObj } from "@storybook/react-vite";
import { UserForm } from "./index";

const meta = {
  component: UserForm,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "ユーザー登録フォーム - userFormSchemaに基づいた包括的なユーザー情報入力フォーム。<br />※idが競合するため、Docsのサンプルは動作しません。",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof UserForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "デフォルト",
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "基本的なユーザー登録フォームです。すべての必須フィールドとオプションフィールドが含まれています。",
      },
    },
  },
};

export const WithValidationErrors: Story = {
  name: "バリデーションエラー表示",
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          "フォームに不正な値を入力した際のバリデーションエラー表示を確認できます。",
      },
    },
  },
  play: async () => {
    // 必要に応じて、エラー状態をトリガーするためのインタラクションを追加
  },
};
