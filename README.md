# Rect Conform Factory Demo

React + Conform を用いた Factory Pattern デモプロジェクト

## 📋 プロジェクト概要

このプロジェクトは、React 19 と Conform ライブラリを使用して Factory Pattern を実装し、動的フォーム生成のデモンストレーションを行います。

## 🌐 ライブデモ

**[サンプルを確認する](https://hiromi-2000.github.io/react-conform-factory-demo/)**

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

# Storybook起動e
pnpm storybook
```

## 🏗️ プロジェクト構造

```
conform-factory/
├── docs/                    # ドキュメント
├── src/                     # ソースコード
│   ├── components/          # コンポーネント
│   │   ├── button/          # ボタンコンポーネント
│   │   └── forms/           # フォーム関連コンポーネント
│   │       ├── common/      # 共通フォームコンポーネント
│   │       ├── fields/      # フィールドコンポーネント
│   │       ├── organization-form/ # (デモ)組織フォーム
│   │       └── user-form/   # (デモ)ユーザーフォーム
│   ├── lib/                 # ライブラリ・ユーティリティ
│   │   ├── conform/         # Conform関連の実装
│   │   └── zod/             # Zodスキーマ関連
│   ├── types/               # TypeScript型定義
│   └── test/                # テスト設定
├── .storybook/              # Storybook設定
└── .github/                 # GitHub設定
```
