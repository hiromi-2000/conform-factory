# Conform Factory Demo

React + Conform を用いた Factory Pattern デモプロジェクト

## 📋 プロジェクト概要

このプロジェクトは、React 19 と Conform ライブラリを使用して Factory Pattern を実装し、動的フォーム生成のデモンストレーションを行います。

### 🎯 主な目標
- **Factory Pattern** による動的フォーム生成の実装
- **TypeScript** ConformのHooksに型情報を付与する

## 🛠️ 技術スタック

- **React 19** - UIライブラリ（最新版）
- **@conform-to/react** - フォーム状態管理・バリデーション
- **Zod v4** - スキーマバリデーション
- **TypeScript** - 型安全性
- **Vite** - ビルドツール
- **Vitest** - テストフレームワーク
- **Storybook 9** - コンポーネントドキュメント
- **ESLint 9** - リンター（Flat Config）
- **Biome v2** - フォーマッター
- **Tailwind CSS** - スタイリング
- **pnpm** - パッケージマネージャー

## 🚀 クイックスタート

```bash
# リポジトリのクローン
git clone https://github.com/hiromi-2000/conform-factory.git
cd conform-factory

# 依存関係のインストール
pnpm install

# 開発サーバー起動
pnpm dev

# Storybook起動
pnpm storybook
```

## 🏗️ プロジェクト構造

```
conform-factory/
├── docs/                    # ドキュメント
├── src/                     # ソースコード
│   ├── components/          # コンポーネント
│   ├── factory/             # Factory Pattern実装
│   ├── schemas/             # Zodスキーマ
│   ├── types/               # TypeScript型定義
│   └── hooks/               # カスタムHooks
├── tests/                   # テストファイル
├── .github/                 # GitHub設定
└── .storybook/              # Storybook設定
```
