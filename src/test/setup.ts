import "@testing-library/jest-dom";

// React Testing Library + Vitestのセットアップ
import { beforeAll, afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
});

// グローバルモック設定
beforeAll(() => {
  // ResizeObserver mock
  global.ResizeObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // IntersectionObserver mock
  global.IntersectionObserver = vi.fn(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // window.matchMedia mock
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});
