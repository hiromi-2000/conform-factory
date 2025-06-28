import type { Meta, StoryObj } from "@storybook/react-vite";
import Button from ".";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: { type: "radio" },
      options: ["primary", "secondary", "delete", "delete-secondary"],
    },
    size: {
      control: { type: "radio" },
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    children: {
      control: { type: "text" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
  args: {
    children: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "primary",
  },
};

export const Secondary: Story = {
  args: {
    color: "secondary",
  },
};

export const Delete: Story = {
  args: {
    color: "delete",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <div className="flex space-x-4">
      <Button {...args} color="primary">
        Primary Disabled
      </Button>
      <Button {...args} color="secondary">
        Secondary Disabled
      </Button>
      <Button {...args} color="delete">
        Delete Disabled
      </Button>
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className="flex items-start space-x-4">
      <Button {...args} size="xs">
        Extra Small
      </Button>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
      <Button {...args} size="xl">
        Extra Large
      </Button>
    </div>
  ),
};

export const AllButtons: Story = {
  render: (args) => (
    <div className="flex items-start space-x-4">
      <div className="flex flex-col space-y-4">
        <Button {...args} color="primary">
          Primary
        </Button>
        <Button {...args} color="primary" disabled>
          Primary Disabled
        </Button>
      </div>
      <div className="flex flex-col space-y-4">
        <Button {...args} color="secondary">
          Secondary
        </Button>
        <Button {...args} color="secondary" disabled>
          Secondary Disabled
        </Button>
      </div>
      <div className="flex flex-col space-y-4">
        <Button {...args} color="delete">
          Delete
        </Button>
        <Button {...args} color="delete" disabled>
          Delete Disabled
        </Button>
      </div>
      <div className="flex flex-col space-y-4">
        <Button {...args} color="delete-secondary">
          Delete Secondary
        </Button>
        <Button {...args} color="delete-secondary" disabled>
          Delete Secondary Disabled
        </Button>
      </div>
    </div>
  ),
};
