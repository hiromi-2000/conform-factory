# React + Conform Factory Pattern デモプロジェクト実装計画書

## プロジェクト概要

React + Conformライブラリを使用してFactory Patternを実装し、動的フォーム生成のデモンストレーションを行うプロジェクトです。

## 技術スタック

- **React 19** - 最新のUIライブラリ（新しいhooksとConcurrent機能）✅
- **@conform-to/react** - フォーム状態管理・バリデーション ✅
- **@conform-to/zod** - スキーマバリデーション ✅
- **Zod v3** - TypeScript用スキーマバリデーション（最新安定版）✅
- **React Aria** - アクセシブルなUIコンポーネント・プリミティブ ✅
- **TypeScript** - 型安全性 ✅
- **Vite** - ビルドツール・開発サーバー ✅
- **Vitest** - テストフレームワーク ✅
- **Storybook 9** - コンポーネントドキュメント・開発環境 ✅
- **ESLint 9** - 静的解析・リンター（Flat Config）✅
- **Biome v2** - 高速フォーマッター・リンター（ESLintと併用）✅
- **Tailwind CSS** - ユーティリティファーストCSS ✅
- **pnpm** - 高速パッケージマネージャー ✅

## 実装フェーズ

### フェーズ1: プロジェクト環境セットアップ（1日目）✅ **完了**

#### 1. React 19 + Viteプロジェクトの初期化
- [x] Viteプロジェクトの作成
- [x] React 19のインストール
- [x] 基本的なプロジェクト構造の確認

#### 2. 開発ツールのセットアップ
- [x] Core dependencies のインストール
- [x] Linting & Formatting ツールのインストール
- [x] Testing ツールのインストール
- [x] Styling ツールのインストール
- [x] Storybook 9のインストール

#### 3. 設定ファイルの作成
- [x] `eslint.config.js` - ESLint 9 Flat Config
- [x] `biome.json` - Biome v2設定（フォーマッター中心）
- [x] `.storybook/main.ts` - Storybook 9設定
- [x] `.storybook/preview.ts` - Storybook 9プレビュー設定
- [ ] `tailwind.config.js` - Tailwind設定
- [ ] `vitest.config.ts` - テスト設定

### フェーズ2: リンター・フォーマッター統合設定（1日目後半）✅ **完了**

#### 1. ESLint 9 Flat Config設定
- [x] ESLint 9 基本設定の作成
- [x] TypeScript設定の統合
- [x] React関連プラグインの設定
- [x] Storybook対応の設定

#### 2. Biome v2 + ESLint 9併用設定
- [x] Biome: フォーマット・基本リンティング設定
- [x] ESLint: React固有ルール・複雑な静的解析設定
- [x] 競合回避設定
- [x] 設定ファイルの動作確認

#### 3. 開発環境統合
- [x] package.jsonスクリプトの整備
- [x] ESLint + Biome統合テスト完了
- [x] 自動フォーマット・リンティング統合
- [x] コード品質統合（`pnpm run code-quality`）
- [ ] VS Code設定
- [ ] Git hooks設定  
- [ ] CI/CD用スクリプト作成

**📝 完了時点での成果:**
- Biome v2.0.5設定修正（正しいキー名、競合回避）
- ESLint 9 + Biome完全統合・動作確認
- 自動フォーマット・セキュリティ・アクセシビリティ対応
- インポート整理・コード品質統一完了

### フェーズ3: 型定義とFactory Pattern基盤（2日目）

#### 1. Zod v4スキーマ定義
- [x] `schemas/userSchema.ts` - ユーザー登録スキーマ ✅ **完了**
- [x] `schemas/productSchema.ts` - 商品登録スキーマ ✅ **完了**
- [x] `schemas/contactSchema.ts` - お問い合わせスキーマ ✅ **完了**
- [x] `schemas/dynamicSchema.ts` - 動的フォームスキーマ ✅ **完了**
- [x] `schemas/index.ts` - スキーマエクスポート ✅ **完了**

```typescript
// schemas/userSchema.ts - ユーザー登録
// schemas/productSchema.ts - 商品登録  
// schemas/contactSchema.ts - お問い合わせ
// schemas/dynamicSchema.ts - 動的フォーム
```

**📝 スキーマ実装完了:**
- 4つの主要スキーマ（ユーザー、商品、お問い合わせ、動的フォーム）実装完了
- 包括的なバリデーション（Zodベース）実装
- 日本語エラーメッセージ対応
- TypeScript型安全性確保
- 電話番号バリデーション（固定電話・携帯電話対応）
- 動的フォーム設定（フィールド定義、条件分岐、バリデーションルール）完備

#### 2. 包括的テストスイート実装 ✅ **完了**
- [x] `schemas/__tests__/userSchema.test.ts` - ユーザースキーマテスト（27テスト）
- [x] `schemas/__tests__/productSchema.test.ts` - 商品スキーマテスト（29テスト）
- [x] `schemas/__tests__/contactSchema.test.ts` - お問い合わせスキーマテスト（23テスト）
- [x] `schemas/__tests__/dynamicSchema.test.ts` - 動的スキーマテスト（43テスト）

**📝 テスト実装完了:**
- 総計122テストケース実装
- 成功ケース・エラーケース両方の網羅的テスト
- バリデーション関数・個別フィールドスキーマテスト
- ユーティリティ関数テスト
- 定数・型定義テスト
- 全テスト合格（122/122 passed）

#### 3. TypeScript型定義 ✅ **完了**
- [x] `schemas/types.ts` - 基本型定義 ✅ **完了**
- [x] `factories/formFactory.tsx` 内で型定義完結 ✅ **完了**

```typescript
// ※ 個別の型定義ファイル不要 - formFactory.tsx内で完結
```

#### 4. Factory Pattern実装 ✅ **完了**
- [x] `factories/formFactory.tsx` - メインファクトリー実装 ✅ **完了**
- [x] `factories/form.tsx` - React Ariaベースフォームコンポーネント ✅ **完了**
- [ ] Factory Pattern動作テスト

```typescript
// factories/formFactory.tsx - メインファクトリー ✅ 実装完了
// factories/form.tsx - React Ariaベースフォーム ✅ 実装完了
// ※ ValidationFactory不要 - parseWithZodで十分統合済み
// ※ FormConfigFactory不要 - 動的設定は別途実装予定
```

**📝 Factory Pattern実装完了:**
- TypeScript型安全なformFactory実装完了
- Conform + Zod v4統合実装（バリデーションも統合済み）
- スキーマベースの型推論実装
- useForm, useField, useFormMetadata, Formコンポーネントの型安全ラッパー実装
- React Aria Components統合完了
- Factory Pattern基盤構築完了

### フェーズ4: コンポーネント実装（3日目）

#### 1. React Ariaフィールドコンポーネント実装

- [ ] `components/fields/InputField.tsx` - React Ariaベーステキスト入力
- [ ] `components/fields/SelectField.tsx` - React Ariaベースセレクトボックス
- [ ] `components/fields/TextareaField.tsx` - React Ariaベーステキストエリア
- [ ] `components/fields/CheckboxField.tsx` - React Ariaベースチェックボックス

```typescript
// components/fields/InputField.tsx - React Ariaベース
// components/fields/SelectField.tsx - React Ariaベース
// components/fields/TextareaField.tsx - React Ariaベース
// components/fields/CheckboxField.tsx - React Ariaベース
```

### フェーズ5: 動的フォーム実装（4日目）

#### 1. 各フォームコンポーネント
- [ ] `components/forms/UserRegistrationForm.tsx` - ユーザー登録フォーム
- [ ] `components/forms/ProductRegistrationForm.tsx` - 商品登録フォーム
- [ ] `components/forms/ContactForm.tsx` - お問い合わせフォーム
- [ ] `components/forms/DynamicForm.tsx` - 動的フォーム
- [ ] フォームコンポーネントの動作確認

```typescript
// components/forms/UserRegistrationForm.tsx
// components/forms/ProductRegistrationForm.tsx
// components/forms/ContactForm.tsx
// components/forms/DynamicForm.tsx
```

#### 2. Factory Pattern統合
- [ ] 動的フォーム生成機能実装
- [ ] 設定ベースのフィールド生成実装
- [ ] 条件付きフィールド表示実装
- [ ] Factory Pattern統合テスト

```typescript
// ※ カスタムHooks不要 - formFactory()が直接Hooksを返すため
```

### フェーズ6: Storybook 9ドキュメント作成（5日目）

#### 1. コンポーネントストーリー作成
- [ ] `stories/InputField.stories.ts` - 入力フィールドストーリー
- [ ] `stories/SelectField.stories.ts` - セレクトフィールドストーリー
- [ ] `stories/TextareaField.stories.ts` - テキストエリアストーリー
- [ ] `stories/CheckboxField.stories.ts` - チェックボックスストーリー
- [ ] `stories/FormFactory.stories.ts` - フォームファクトリーストーリー
- [ ] `stories/DynamicForm.stories.ts` - 動的フォームストーリー

```typescript
// stories/InputField.stories.ts
// stories/FormFactory.stories.ts
// stories/DynamicForm.stories.ts
```

#### 2. ESLint 9 Storybook対応
- [ ] Storybook専用ルール設定
- [ ] ストーリーファイル用設定
- [ ] Storybook ESLint設定の動作確認

#### 3. インタラクティブドキュメント
- [ ] Controls addon活用設定
- [ ] Actions addon活用設定
- [ ] Interactions addon活用設定
- [ ] ドキュメントページの作成

### フェーズ7: Vitestテスト実装（6日目）

#### 1. ユニットテスト
- [ ] `tests/components/FormFactory.test.tsx` - FormFactoryコンポーネントテスト
- [ ] `tests/components/InputField.test.tsx` - InputFieldコンポーネントテスト
- [ ] `tests/factories/FormFactory.test.ts` - フォームファクトリーテスト
- [ ] `tests/hooks/useFormFactory.test.ts` - useFormFactoryフックテスト
- [ ] `tests/schemas/validation.test.ts` - バリデーションスキーマテスト

```typescript
// tests/components/FormFactory.test.tsx
// tests/factories/FormFactory.test.ts
// tests/hooks/useFormFactory.test.ts
```

#### 2. ESLint 9テスト設定
- [ ] テストファイル専用ルール設定
- [ ] Testing Libraryルール統合
- [ ] テスト用ESLint設定の動作確認

#### 3. 統合テスト
- [ ] フォーム送信テスト実装
- [ ] バリデーションテスト実装
- [ ] Factory Pattern動作テスト実装
- [ ] E2Eテストケース作成

### フェーズ8: UI/UX最適化とデモ機能（7日目）

#### 1. Tailwind CSSによるデザイン
- [ ] レスポンシブデザイン実装
- [ ] ダークモード対応実装
- [ ] アニメーション実装
- [ ] UIコンポーネントの統一

#### 2. コード品質最終確認
- [ ] ESLint 9全ルール適用確認
- [ ] Biome v2フォーマット統一確認
- [ ] TypeScript strict mode対応確認
- [ ] 最終的なコード品質チェック

#### 3. デモ機能実装
- [ ] フォーム設定エディター実装
- [ ] リアルタイムプレビュー実装
- [ ] JSON設定エクスポート/インポート実装
- [ ] デモ用サンプルデータ作成
- [ ] 最終的な動作確認とテスト

## ディレクトリ構造

```
conform-factory/
├── src/
│   ├── components/
│   │   ├── forms/           # フォームコンポーネント
│   │   ├── fields/          # フィールドコンポーネント
│   │   ├── ui/              # 共通UIコンポーネント
│   │   └── layout/          # レイアウトコンポーネント
│   ├── factories/           # Factory Pattern実装
│   ├── schemas/             # Zod v4スキーマ
│   ├── types/               # TypeScript型定義
│   ├── hooks/               # カスタムHooks
│   ├── utils/               # ユーティリティ関数
│   └── stories/             # Storybook stories
├── tests/                   # Vitestテスト
├── .storybook/              # Storybook 9設定
├── docs/                    # ドキュメント
├── eslint.config.js         # ESLint 9 Flat Config
├── biome.json               # Biome v2設定
├── vitest.config.ts         # Vitest設定
├── tailwind.config.js       # Tailwind設定
├── pnpm-lock.yaml           # pnpmロックファイル
├── IMPLEMENTATION_PLAN.md   # この実装計画書
└── README.md
```

## 開発コマンド

```bash
# 開発サーバー起動
pnpm dev

# Storybook起動
pnpm storybook

# テスト実行
pnpm test
pnpm test:ui

# リント・フォーマット
pnpm lint           # ESLint 9実行
pnpm lint:fix       # ESLint 9自動修正
pnpm format         # Biome v2フォーマット
pnpm format:check   # Biome v2チェック
pnpm code-quality   # ESLint + Biome実行

# ビルド
pnpm build
```

## 設定ファイル例

### `eslint.config.js` (ESLint 9 Flat Config)

```javascript
import js from '@eslint/js';
import typescript from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsx from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import storybook from 'eslint-plugin-storybook';
```

### `biome.json` (Biome v2設定)

```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.0/schema.json",
  "organizeImports": {
    "enabled": true
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "javascript": {
    "formatter": {
      "quoteStyle": "single",
      "trailingCommas": "es5"
    }
  },
  "files": {
    "include": ["src/**/*", "tests/**/*", "stories/**/*"],
    "ignore": ["node_modules", "dist", "build"]
  }
}
```

## 成果物

### 1. 本格的なデモアプリケーション
- React 19最新機能活用
- Factory Patternによる拡張可能設計
- ESLint 9 + Biome v2による高品質コード
- 完全なTypeScript型安全性

### 2. 開発者体験の向上
- Storybook 9による開発・ドキュメント環境
- Vitestによる高速テスト環境
- ESLint 9 + Biome v2の最強リンティング環境
- pnpmによる高速パッケージ管理

### 3. プロダクション対応
- 厳格なコード品質管理
- アクセシビリティ対応
- 保守性の高いコード構造
- パフォーマンス最適化

## 推定作業時間

- **合計**: 7日間（約40-45時間）
- **環境構築**: 1日（ESLint 9 + Biome v2設定含む）
- **コア実装**: 4日間
- **品質・ドキュメント**: 2日間

## 特筆事項

### ESLint 9とBiome v2の併用メリット
- **ESLint 9**: React固有のルール、複雑な静的解析、プラグインエコシステム
- **Biome v2**: 高速フォーマット、基本的なリンティング、統一された設定
- **相互補完**: それぞれの強みを活かした最強の開発環境

### React 19の新機能活用
- `use()` hookによる非同期データ処理
- Concurrent機能による高速レンダリング
- Server Components対応の準備

### Factory Patternの利点
- 動的フォーム生成の柔軟性
- 設定ベースの拡張可能性
- TypeScriptによる型安全な実装

## 進捗管理

### 全体進捗
- [x] **フェーズ1**: プロジェクト環境セットアップ（1日目） ✅ **完了**
- [x] **フェーズ2**: リンター・フォーマッター統合設定（1日目後半）✅ **完了**
- [x] **フェーズ3**: 型定義とFactory Pattern基盤（2日目）
- [ ] **フェーズ4**: React 19対応コンポーネント実装（3日目）
- [ ] **フェーズ5**: 動的フォーム実装（4日目）
- [ ] **フェーズ6**: Storybook 9ドキュメント作成（5日目）
- [ ] **フェーズ7**: Vitestテスト実装（6日目）
- [ ] **フェーズ8**: UI/UX最適化とデモ機能（7日目）

### マイルストーン
- [x] **マイルストーン1**: 開発環境構築完了（フェーズ1-2完了）✅ **完了**
- [ ] **マイルストーン2**: Factory Pattern基盤完成（フェーズ3完了）
- [ ] **マイルストーン3**: 基本フォーム機能完成（フェーズ4-5完了）
- [ ] **マイルストーン4**: ドキュメント・テスト完成（フェーズ6-7完了）
- [ ] **マイルストーン5**: プロジェクト完成（フェーズ8完了）

### 注意事項
- チェックボックスは作業完了時にチェック（`[x]`）に変更してください
- 各フェーズの進捗に応じて全体進捗とマイルストーンも更新してください
- 問題が発生した場合は、該当セクションにメモを追記してください

---

## 📊 **最新更新履歴**

### 2024年 - フェーズ2完了 ✅
- **ESLint 9 + Biome v2統合設定完了**
- Biome v2.0.5設定修正（正しいキー名、競合回避）
- ESLint 9 + Biome完全統合・動作確認
- 自動フォーマット・セキュリティ・アクセシビリティ対応
- インポート整理・コード品質統一完了
- **マイルストーン1: 開発環境構築完了** ✅
- **次のステップ**: フェーズ3 型定義とFactory Pattern基盤実装

---

*この計画書は実装の進行に応じて更新される場合があります。* 
