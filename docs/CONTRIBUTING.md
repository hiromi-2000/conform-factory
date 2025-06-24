# Contributing to Conform Factory

React + Conform Factory Pattern デモプロジェクトへの貢献ありがとうございます！

## 📋 開発環境セットアップ

### 必要な環境
- **Node.js**: v20.x以上
- **pnpm**: v9.x以上 
- **Git**: v2.x以上

### 初期セットアップ
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

## 🔄 開発フロー

### 1. Issue の作成
- 新機能や修正内容について Issue を作成
- 適切なテンプレートを使用
- ラベルを設定

### 2. ブランチの作成
```bash
# ブランチ命名規則
feat/feature-name       # 新機能
fix/bug-description     # バグ修正
docs/documentation-type # ドキュメント
refactor/refactor-name  # リファクタリング
test/test-description   # テスト追加
```

### 3. 開発作業
- 実装計画書（IMPLEMENTATION_PLAN.md）に従う
- コーディング規約（docs/CODE_STYLE.md）を遵守
- テストを必ず追加
- Storybookでコンポーネント確認

### 4. プルリクエスト
- PR テンプレートを使用
- レビューを依頼
- CI チェックが全て通過していることを確認

## ✅ 作業前チェックリスト

- [ ] Issue が作成されている
- [ ] 適切なブランチ名で作業
- [ ] `pnpm lint` でエラーなし
- [ ] `pnpm test` で全テスト通過
- [ ] `pnpm build` で正常にビルド
- [ ] Storybook でコンポーネント確認

## 📝 コミット規約

[Conventional Commits](https://www.conventionalcommits.org/) 形式を使用：

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Type 一覧
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント
- `style`: フォーマット
- `refactor`: リファクタリング
- `test`: テスト
- `chore`: その他

### 例
```bash
feat(forms): add dynamic form generation
fix(validation): resolve zod schema error
docs(readme): update installation guide
```

## 🧪 テスト要件

- **単体テスト**: 新機能・修正に対するテストを必須
- **カバレッジ**: 80%以上を維持
- **E2E テスト**: 重要な機能フローには必須

## 📚 関連ドキュメント

- [コーディング規約](./CODE_STYLE.md)
- [Git ワークフロー](./GIT_WORKFLOW.md) 
- [テスト戦略](./TESTING.md)
- [実装計画書](../IMPLEMENTATION_PLAN.md)

## 🤝 質問・相談

- GitHub Issues でお気軽にご質問ください
- 開発方針について迷った場合は Discussion を活用

## 🎯 目標

- **品質**: 高品質で保守性の高いコード
- **学習**: 最新技術スタックの実践的活用
- **共有**: Factory Pattern の効果的な実装例 
