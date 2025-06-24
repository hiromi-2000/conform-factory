# テスト戦略

Conform Factory プロジェクトのテスト戦略とガイドラインです。

## 🎯 テスト方針

### テストピラミッド
```
     🔺 E2E Tests (少数)
    🔺🔺 Integration Tests (中程度)
   🔺🔺🔺 Unit Tests (多数)
```

### カバレッジ目標
- **全体カバレッジ**: 80%以上
- **クリティカルパス**: 95%以上
- **新機能**: 90%以上

## 🧪 テストツール

### Vitest (Unit・Integration)
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      threshold: {
        global: {
          statements: 80,
          branches: 80,
          functions: 80,
          lines: 80,
        },
      },
    },
  },
})
```

### Testing Library (React)
```typescript
// React コンポーネントテスト
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
```

### Storybook (Visual・Interaction)
```typescript
// ストーリーベースのテスト
import { expect } from '@storybook/jest'
import { within, userEvent } from '@storybook/testing-library'
```

## 📝 テスト分類

### 1. Unit Tests (単体テスト)

#### フォームコンポーネント
```typescript
// tests/components/UserForm.test.tsx
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { UserForm } from '@/components/forms/UserForm'

describe('UserForm', () => {
  const mockProps = {
    onSubmit: vi.fn(),
    config: {
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'password', type: 'password', required: true },
      ],
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render all form fields', () => {
      render(<UserForm {...mockProps} />)
      
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    })

    it('should display required field indicators', () => {
      render(<UserForm {...mockProps} />)
      
      const requiredFields = screen.getAllByText('*')
      expect(requiredFields).toHaveLength(2)
    })
  })

  describe('Validation', () => {
    it('should show error for invalid email', async () => {
      const user = userEvent.setup()
      render(<UserForm {...mockProps} />)
      
      const emailInput = screen.getByLabelText(/email/i)
      await user.type(emailInput, 'invalid-email')
      await user.tab()
      
      expect(screen.getByText(/有効なメールアドレスを入力してください/i))
        .toBeInTheDocument()
    })
  })

  describe('Submission', () => {
    it('should call onSubmit with valid data', async () => {
      const user = userEvent.setup()
      render(<UserForm {...mockProps} />)
      
      await user.type(screen.getByLabelText(/email/i), 'test@example.com')
      await user.type(screen.getByLabelText(/password/i), 'password123')
      await user.click(screen.getByRole('button', { name: /送信/i }))
      
      expect(mockProps.onSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      })
    })
  })
})
```

#### Factory Pattern
```typescript
// tests/factories/FormFactory.test.ts
import { FormFactory } from '@/factories/FormFactory'
import { FormType } from '@/types/formTypes'

describe('FormFactory', () => {
  describe('create', () => {
    it('should create user form factory', () => {
      const factory = FormFactory.create(FormType.USER)
      expect(factory).toBeInstanceOf(FormFactory)
    })

    it('should return same instance for same type', () => {
      const factory1 = FormFactory.create(FormType.USER)
      const factory2 = FormFactory.create(FormType.USER)
      expect(factory1).toBe(factory2)
    })
  })

  describe('generateForm', () => {
    it('should generate form with correct structure', () => {
      const factory = FormFactory.create(FormType.USER)
      const config = {
        fields: [
          { name: 'email', type: 'email' },
          { name: 'name', type: 'text' },
        ],
      }
      
      const form = factory.generateForm(config)
      expect(form.fields).toHaveLength(2)
      expect(form.fields[0].name).toBe('email')
    })
  })
})
```

#### カスタムHooks
```typescript
// tests/hooks/useFormFactory.test.ts
import { renderHook, act } from '@testing-library/react'
import { useFormFactory } from '@/hooks/useFormFactory'
import { FormType } from '@/types/formTypes'

describe('useFormFactory', () => {
  it('should initialize with correct form type', () => {
    const { result } = renderHook(() => 
      useFormFactory(FormType.USER)
    )
    
    expect(result.current.formType).toBe(FormType.USER)
    expect(result.current.factory).toBeDefined()
  })

  it('should generate form on config change', () => {
    const { result } = renderHook(() => 
      useFormFactory(FormType.USER)
    )
    
    const config = {
      fields: [{ name: 'email', type: 'email' }],
    }
    
    act(() => {
      result.current.updateConfig(config)
    })
    
    expect(result.current.form).toBeDefined()
    expect(result.current.form.fields).toHaveLength(1)
  })
})
```

### 2. Integration Tests (統合テスト)

#### フォームフロー
```typescript
// tests/integration/FormFlow.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '@/App'

describe('Form Flow Integration', () => {
  it('should complete user registration flow', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // フォームタイプ選択
    await user.selectOptions(
      screen.getByLabelText(/フォームタイプ/i),
      'user'
    )
    
    // フォーム入力
    await user.type(
      screen.getByLabelText(/email/i),
      'test@example.com'
    )
    await user.type(
      screen.getByLabelText(/パスワード/i),
      'password123'
    )
    
    // 送信
    await user.click(screen.getByRole('button', { name: /送信/i }))
    
    // 成功メッセージ確認
    expect(screen.getByText(/登録が完了しました/i))
      .toBeInTheDocument()
  })
})
```

### 3. Visual Tests (Storybook)

#### ストーリーテスト
```typescript
// stories/UserForm.stories.ts
import type { Meta, StoryObj } from '@storybook/react'
import { expect } from '@storybook/jest'
import { within, userEvent } from '@storybook/testing-library'
import { UserForm } from '@/components/forms/UserForm'

const meta: Meta<typeof UserForm> = {
  title: 'Forms/UserForm',
  component: UserForm,
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof UserForm>

export const Default: Story = {
  args: {
    config: {
      fields: [
        { name: 'email', type: 'email', required: true },
        { name: 'password', type: 'password', required: true },
      ],
    },
  },
}

export const WithValidation: Story = {
  args: Default.args,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    
    // 無効なメール入力
    await user.type(canvas.getByLabelText(/email/i), 'invalid')
    await user.tab()
    
    // エラーメッセージ確認
    await expect(canvas.getByText(/有効なメールアドレス/i))
      .toBeInTheDocument()
  },
}
```

### 4. E2E Tests (Playwright)

#### クリティカルパス
```typescript
// tests/e2e/user-registration.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Registration', () => {
  test('should complete full registration process', async ({ page }) => {
    await page.goto('/')
    
    // フォームタイプ選択
    await page.selectOption('[data-testid="form-type-select"]', 'user')
    
    // フォーム入力
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'password123')
    await page.fill('[data-testid="confirm-password-input"]', 'password123')
    
    // 送信
    await page.click('[data-testid="submit-button"]')
    
    // 成功ページ確認
    await expect(page.locator('[data-testid="success-message"]'))
      .toBeVisible()
    await expect(page).toHaveURL(/.*success/)
  })

  test('should handle validation errors', async ({ page }) => {
    await page.goto('/')
    
    await page.selectOption('[data-testid="form-type-select"]', 'user')
    await page.fill('[data-testid="email-input"]', 'invalid-email')
    await page.click('[data-testid="submit-button"]')
    
    await expect(page.locator('[data-testid="email-error"]'))
      .toContainText('有効なメールアドレスを入力してください')
  })
})
```

## 🚀 テスト実行

### 開発時
```bash
# ウォッチモード
pnpm test:watch

# 特定ファイル
pnpm test UserForm.test.tsx

# カバレッジ付き
pnpm test:coverage
```

### CI/CD
```bash
# 全テスト実行
pnpm test:ci

# 並列実行
pnpm test:parallel

# E2E テスト
pnpm test:e2e
```

### Storybook
```bash
# ストーリーテスト
pnpm test-storybook

# ビジュアルテスト
pnpm test-storybook:visual
```

## 📊 テストメトリクス

### 計測項目
- テストカバレッジ
- テスト実行時間
- 失敗率
- 新機能のテスト追加率

### レポート
```bash
# カバレッジレポート
pnpm test:coverage --reporter=html

# JUnitレポート
pnpm test --reporter=junit

# テストサマリー
pnpm test:summary
```

## 🛠️ テストユーティリティ

### カスタムレンダー
```typescript
// src/test/utils.tsx
import { render } from '@testing-library/react'
import { FormProvider } from '@/contexts/FormContext'

export function renderWithProviders(
  ui: React.ReactElement,
  options = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <FormProvider>{children}</FormProvider>
  }

  return render(ui, { wrapper: Wrapper, ...options })
}
```

### モックファクトリー
```typescript
// src/test/mocks.ts
import { vi } from 'vitest'

export const createMockFormConfig = (overrides = {}) => ({
  fields: [
    { name: 'email', type: 'email', required: true },
  ],
  ...overrides,
})

export const mockFormFactory = {
  create: vi.fn(),
  generateForm: vi.fn(),
}
```

## 🔧 設定ファイル

### Vitest設定
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,tsx}'],
    exclude: ['node_modules', 'dist', '.storybook'],
  },
})
```

### Testing Library設定
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
import { beforeAll, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

beforeAll(() => {
  // グローバル設定
})

afterEach(() => {
  cleanup()
})
```

---

この戦略に従うことで、高品質で信頼性の高いテストスイートを構築します。 
