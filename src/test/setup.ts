import "@testing-library/jest-dom";

import { cleanup } from "@testing-library/react";
// Vitest + React Testing Library基本セットアップ
import { afterEach } from "vitest";

// 各テスト後にクリーンアップ
afterEach(() => {
  cleanup();
});

