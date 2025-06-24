# コーディング規約

Conform Factory プロジェクトのコーディング規約です。

## 🛠️ ツール設定

### ESLint 9 + Biome v2
- **ESLint**: React固有ルール、複雑な静的解析
- **Biome**: 高速フォーマット、基本リンティング
- **設定**: 競合回避で併用

### TypeScript
- **Strict Mode**: 必須
- **型安全性**: `any` の使用禁止
- **Import**: 絶対パス推奨

## 📝 命名規則

### ファイル・ディレクトリ
```
components/
├── forms/
│   ├── UserRegistrationForm.tsx    # PascalCase
│   └── ProductRegistrationForm.tsx
├── fields/
│   ├── InputField.tsx
│   └── SelectField.tsx
└── ui/
    ├── Button.tsx
    └── Modal.tsx

hooks/
├── useFormFactory.ts               # camelCase
└── useConformFactory.ts

types/
├── formTypes.ts                    # camelCase
└── factoryTypes.ts

utils/
├── formUtils.ts                    # camelCase
└── validationUtils.ts
```

### コンポーネント・関数
```typescript
// コンポーネント: PascalCase
export const UserRegistrationForm = () => { ... }

// カスタムHooks: use + PascalCase
export const useFormFactory = () => { ... }

// 関数: camelCase
export const createFormSchema = () => { ... }

// 定数: UPPER_SNAKE_CASE
export const FORM_TYPES = { ... }

// 型: PascalCase
export type FormConfig = { ... }
export interface FormFactoryProps { ... }
```

## 🎯 React 規約

### コンポーネント構造
```typescript
// ✅ 推奨構造
import type { ReactNode } from 'react'
import { useState, useCallback } from 'react'
import { useForm } from '@conform-to/react'

import type { FormConfig } from '@/types/formTypes'
import { createFormSchema } from '@/utils/formUtils'

// Props型定義（Propsサフィックス）
interface UserFormProps {
  config: FormConfig
  onSubmit: (data: unknown) => void
  children?: ReactNode
}

// コンポーネント（関数宣言 + export）
export function UserForm({ config, onSubmit, children }: UserFormProps) {
  // State
  const [isLoading, setIsLoading] = useState(false)
  
  // Custom Hooks
  const [form, fields] = useForm({
    // ...
  })
  
  // Event Handlers
  const handleSubmit = useCallback(() => {
    // ...
  }, [])
  
  // Early Return
  if (!config) {
    return <div>設定が見つかりません</div>
  }
  
  // JSX Return
  return (
    <form {...form.props} onSubmit={handleSubmit}>
      {/* ... */}
      {children}
    </form>
  )
}
```

### Hooks 順序
1. React Hooks (`useState`, `useEffect`, etc.)
2. Custom Hooks
3. Event Handlers
4. その他の関数

### Props 設計
```typescript
// ✅ 推奨
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: ReactNode
  onClick?: () => void
}

// ❌ 避ける
interface ButtonProps {
  style?: CSSProperties  // style propは避ける
  className?: string     // 必要最小限に
}
```

## 🏭 Factory Pattern 規約

### Factory クラス
```typescript
// ✅ 推奨構造
export class FormFactory {
  private static instances = new Map<string, FormFactory>()
  
  static create(type: FormType): FormFactory {
    if (!this.instances.has(type)) {
      this.instances.set(type, new FormFactory(type))
    }
    return this.instances.get(type)!
  }
  
  private constructor(private type: FormType) {}
  
  public generateForm(config: FormConfig): FormElement {
    // 実装
  }
}
```

### Type Guards
```typescript
// 型ガード関数
export function isUserForm(form: FormType): form is UserFormType {
  return form.type === 'user'
}

// 使用例
if (isUserForm(form)) {
  // form は UserFormType として扱われる
}
```

## 📦 Import 規約

### Import 順序
```typescript
// 1. React
import type { ReactNode } from 'react'
import { useState, useCallback } from 'react'

// 2. 外部ライブラリ
import { useForm } from '@conform-to/react'
import { z } from 'zod'

// 3. 内部（絶対パス推奨）
import type { FormConfig } from '@/types/formTypes'
import { FormFactory } from '@/factories/FormFactory'
import { Button } from '@/components/ui/Button'

// 4. 相対パス（同階層のみ）
import './Component.css'
```

### Export 規約
```typescript
// ✅ 名前付きエクスポート推奨
export { UserForm } from './UserForm'
export { ProductForm } from './ProductForm'

// ✅ デフォルトエクスポート（ページコンポーネントのみ）
export default function HomePage() { ... }

// ❌ 避ける
export default UserForm  // 通常のコンポーネントでは避ける
```

## 🧪 テスト規約

### ファイル命名
```
src/
├── components/
│   ├── UserForm.tsx
│   └── UserForm.test.tsx        # 同階層
└── __tests__/
    ├── integration/
    └── e2e/
```

### テスト構造
```typescript
describe('UserForm', () => {
  describe('rendering', () => {
    it('should render form fields correctly', () => {
      // ...
    })
  })
  
  describe('validation', () => {
    it('should show error for invalid email', () => {
      // ...
    })
  })
  
  describe('submission', () => {
    it('should call onSubmit with valid data', () => {
      // ...
    })
  })
})
```

## 📊 パフォーマンス規約

### メモ化
```typescript
// ✅ 計算量が多い場合
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data)
}, [data])

// ✅ 子コンポーネントに渡す関数
const handleClick = useCallback(() => {
  // ...
}, [dependency])

// ❌ 過度なメモ化は避ける
const simpleValue = useMemo(() => data.length, [data]) // 不要
```

### Bundle Size
- 動的インポート活用
- Tree Shaking 最適化
- 不要な依存関係の除去

## 🔒 型安全性

### Strict 設定
```typescript
// ✅ 推奨
interface Props {
  id: string
  count: number
  items: readonly string[]  // readonly修飾子
}

// ❌ 避ける
interface Props {
  id: any                   // any禁止
  count?: number | string   // union型は慎重に
  items: string[]           // mutableは注意
}
```

### 型アサーション
```typescript
// ✅ Type Guard推奨
if (isFormData(data)) {
  // data は FormData として扱われる
}

// ❌ as アサーションは最小限
const formData = data as FormData  // 避ける
```

## 📏 コード品質

### 複雑度制限
- 関数: 最大20行
- ファイル: 最大300行
- 循環的複雑度: 最大10

### コメント
```typescript
// ✅ なぜそうするかを説明
// Conform の制約により、手動でフィールドをリセット
form.reset()

// ❌ 何をするかの説明は不要
// ユーザーIDを取得
const userId = user.id
```

---

このコーディング規約に従うことで、プロジェクト全体の品質と保守性を保ちます。 
