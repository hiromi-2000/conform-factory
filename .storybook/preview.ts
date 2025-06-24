import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    // Storybook 9のautodocs設定
    docs: {
      autodocs: "tag",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // アクセシビリティ設定（addon-a11y用）
    a11y: {
      config: {
        rules: [
          {
            id: "color-contrast",
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;
