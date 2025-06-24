# Conform Factory

React + Conform を用いた Factory Pattern デモプロジェクト

## 📋 プロジェクト概要

このプロジェクトは、React 19 と Conform ライブラリを使用して Factory Pattern を実装し、動的フォーム生成のデモンストレーションを行います。

### 🎯 主な目標
- **Factory Pattern** による動的フォーム生成の実装
- **React 19** の最新機能活用
- **TypeScript** による型安全な実装
- **最新開発ツール** (ESLint 9, Biome v2, Vitest, Storybook 9) の活用

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

## 📚 ドキュメント

### 📖 開発ガイド
- [🤝 Contributing Guidelines](./docs/CONTRIBUTING.md) - 開発への参加方法
- [🎨 Code Style Guide](./docs/CODE_STYLE.md) - コーディング規約
- [🌿 Git Workflow](./docs/GIT_WORKFLOW.md) - Git運用ルール
- [🧪 Testing Strategy](./docs/TESTING.md) - テスト戦略

### 📋 プロジェクト管理
- [📅 Implementation Plan](./IMPLEMENTATION_PLAN.md) - 実装計画書（進捗管理付き）
- [⚖️ Code of Conduct](./docs/CODE_OF_CONDUCT.md) - 行動規範

## 🏗️ プロジェクト構造

```
conform-factory/
├── docs/                    # ドキュメント
├── src/                     # ソースコード
│   ├── components/          # コンポーネント
│   ├── factories/           # Factory Pattern実装
│   ├── schemas/             # Zodスキーマ
│   ├── types/               # TypeScript型定義
│   ├── hooks/               # カスタムHooks
│   └── stories/             # Storybookストーリー
├── tests/                   # テストファイル
├── .github/                 # GitHub設定
└── .storybook/              # Storybook設定
```

## 🎯 主要機能

### Factory Pattern による動的フォーム生成
- 設定ベースのフォーム生成
- 複数のフォームタイプに対応
- 型安全な実装

### 包括的な開発環境
- リアルタイムバリデーション
- コンポーネント駆動開発
- 自動テスト・品質管理

## 🤝 コントリビューション

このプロジェクトへの貢献を歓迎します！

1. [Contributing Guidelines](./docs/CONTRIBUTING.md) をお読みください
2. Issue を作成するか、既存の Issue を確認してください
3. フィーチャーブランチを作成してください
4. 変更を実装し、テストを追加してください
5. Pull Request を作成してください

## 📊 進捗状況

実装の進捗は [Implementation Plan](./IMPLEMENTATION_PLAN.md) で確認できます。

- ✅ プロジェクトルール整備完了
- 🔄 フェーズ1: 環境セットアップ（準備中）
- ⏳ フェーズ2〜8: 実装予定

## 📄 ライセンス

MIT License - 詳細は [LICENSE](./LICENSE) ファイルをご覧ください。

## 🙏 謝辞

このプロジェクトは以下のライブラリとツールによって支えられています：
- [Conform](https://github.com/edmundhung/conform) - エドマンド・ハング氏による素晴らしいフォームライブラリ
- [React Team](https://react.dev/) - React 19の革新的な機能
- [TypeScript Team](https://www.typescriptlang.org/) - 型安全性の向上
- その他多くのオープンソースプロジェクト

---

**Happy Coding!** 🎉
