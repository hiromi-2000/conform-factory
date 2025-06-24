/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // フォームコンポーネント用のカスタムカラー
      colors: {
        "form-border": "hsl(var(--form-border))",
        "form-input": "hsl(var(--form-input))",
        "form-primary": "hsl(var(--form-primary))",
        "form-error": "hsl(var(--form-error))",
        "form-success": "hsl(var(--form-success))",
      },
      // アニメーション
      animation: {
        "form-error": "shake 0.3s ease-in-out",
        "form-success": "pulse 0.5s ease-in-out",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
        },
      },
    },
  },
  plugins: [
    // React Aria + Tailwindの統合（一時的に無効化）
    // require("@tailwindcss/forms"),
  ],
  // ダークモード対応
  darkMode: "class",
};
