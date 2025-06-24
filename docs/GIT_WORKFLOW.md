# Git ワークフロー

Conform Factory プロジェクトのGit運用ルールです。

## 🌿 ブランチ戦略

### GitHub Flow
シンプルで効率的なGitHub Flowを採用：

```
main
├── feat/user-registration-form
├── fix/validation-error-handling  
├── docs/update-contributing-guide
└── refactor/form-factory-structure
```

### ブランチ種別

#### `main` ブランチ
- **目的**: 常にデプロイ可能な状態
- **保護**: 直接プッシュ禁止
- **マージ**: PRのみ
- **CI**: 全テスト必須

#### フィーチャーブランチ
```bash
# 命名規則
feat/<feature-name>        # 新機能
fix/<bug-description>      # バグ修正
docs/<doc-type>           # ドキュメント
refactor/<refactor-name>  # リファクタリング
test/<test-description>   # テスト追加
chore/<task-description>  # その他

# 例
feat/dynamic-form-generation
fix/zod-validation-schema
docs/setup-instructions
refactor/factory-pattern-optimization
test/form-submission-e2e
chore/update-dependencies
```

## 🔄 ワークフロー

### 1. 新機能・修正の開始
```bash
# mainブランチを最新に
git checkout main
git pull origin main

# フィーチャーブランチ作成
git checkout -b feat/user-registration-form

# 作業開始
# ... 実装 ...

# 変更をコミット
git add .
git commit -m "feat(forms): add user registration form component"
```

### 2. プルリクエスト作成
```bash
# リモートにプッシュ
git push origin feat/user-registration-form

# GitHub でPR作成
# - PR テンプレート使用
# - レビュアー指定
# - ラベル設定
```

### 3. コードレビュー
- [ ] コーディング規約遵守
- [ ] テストカバレッジ確認
- [ ] 機能動作確認
- [ ] パフォーマンス影響
- [ ] セキュリティ考慮

### 4. マージ
```bash
# CI通過後、Squash and Merge
# マージ後、ローカルブランチ削除
git checkout main
git pull origin main
git branch -d feat/user-registration-form
```

## 📝 コミット規約

### Conventional Commits
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Type 定義
| Type | 説明 | 例 |
|------|------|-----|
| `feat` | 新機能 | `feat(forms): add dynamic validation` |
| `fix` | バグ修正 | `fix(validation): resolve zod schema error` |
| `docs` | ドキュメント | `docs(readme): update setup guide` |
| `style` | フォーマット | `style(components): fix indentation` |
| `refactor` | リファクタリング | `refactor(factory): optimize pattern implementation` |
| `test` | テスト | `test(forms): add unit tests for validation` |
| `chore` | その他 | `chore(deps): update react to v19` |
| `perf` | パフォーマンス | `perf(forms): improve rendering performance` |
| `ci` | CI/CD | `ci(github): add test workflow` |

### Scope 定義
```typescript
// プロジェクト固有のscope
forms        // フォーム関連
fields       // フィールドコンポーネント
factory      // Factory Pattern
validation   // バリデーション
hooks        // カスタムHooks
types        // 型定義
utils        // ユーティリティ
stories      // Storybook
tests        // テスト
docs         // ドキュメント
config       // 設定
deps         // 依存関係
```

### コミット例
```bash
# 良い例 ✅
feat(forms): add UserRegistrationForm component
fix(validation): resolve email validation error
docs(contributing): update development setup
refactor(factory): improve type safety

# 避ける例 ❌
fix: bug fix                    # 説明不足
feat: new feature              # 具体性不足
update validation              # type不足
```

## 🏷️ タグ・リリース

### セマンティックバージョニング
```
v<major>.<minor>.<patch>

v1.0.0  # 初回リリース
v1.1.0  # 新機能追加
v1.1.1  # バグ修正
v2.0.0  # 破壊的変更
```

### リリースプロセス
```bash
# 1. バージョン更新
npm version patch|minor|major

# 2. タグプッシュ
git push origin main --tags

# 3. GitHub Release作成
# - リリースノート自動生成
# - 変更点ハイライト
```

## 🔒 ブランチ保護

### main ブランチ設定
- [ ] **Require pull request reviews**: 1人以上
- [ ] **Dismiss stale reviews**: 有効
- [ ] **Require status checks**: CI必須
- [ ] **Require conversation resolution**: 全て解決
- [ ] **Include administrators**: 管理者も従う

### 必須ステータスチェック
- [ ] **ESLint**: コード品質
- [ ] **Biome**: フォーマット
- [ ] **TypeScript**: 型チェック
- [ ] **Vitest**: テスト実行
- [ ] **Build**: ビルド成功

## 🚀 デプロイフロー

### 自動デプロイ
```yaml
# .github/workflows/deploy.yml
main branch push → 
  ├── Test & Lint
  ├── Build
  ├── Storybook Deploy
  └── Demo App Deploy
```

### 手動デプロイ
```bash
# プロダクション準備
pnpm build
pnpm test
pnpm lint

# デプロイ実行
pnpm deploy
```

## 🔧 Git Hooks

### Pre-commit
```bash
# husky + lint-staged
pnpm lint-staged

# 実行内容
- ESLint修正
- Biomeフォーマット
- TypeScript型チェック
- テスト実行（関連ファイル）
```

### Commit-msg
```bash
# コミットメッセージ検証
- Conventional Commits形式
- 文字数制限
- 必須フィールド確認
```

## 📊 Git統計

### 定期確認項目
- コミット頻度
- ブランチ寿命
- PRマージ時間
- コードレビュー参加率

### 分析コマンド
```bash
# コミット統計
git shortlog -sn

# ブランチ分析
git for-each-ref --sort=-committerdate refs/heads/

# 貢献者分析
git log --pretty=format:'%an' | sort | uniq -c | sort -rn
```

## 🚨 緊急時対応

### Hotfix フロー
```bash
# mainから緊急修正ブランチ作成
git checkout main
git checkout -b hotfix/critical-security-fix

# 修正実装
# ... fix ...

# 緊急リリース
git commit -m "fix(security): resolve critical vulnerability"
git push origin hotfix/critical-security-fix

# 即座にPR作成・マージ
# タグ付けしてリリース
```

### Revert 対応
```bash
# 問題のあるコミットを特定
git log --oneline

# リバート実行
git revert <commit-hash>

# 説明追加
git commit --amend -m "revert: fix critical rendering issue

This reverts commit abc123 due to performance regression
in form rendering on mobile devices."
```

---

このワークフローに従うことで、安全で効率的な開発を実現します。 
