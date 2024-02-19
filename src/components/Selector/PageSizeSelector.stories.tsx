import PageSizeSelector from './PageSizeSelector';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof PageSizeSelector> = {
  title: 'Components/PageSizeSelector',
  component: PageSizeSelector,
  parameters: {
    docs: {
      layout: 'centered',
      description: {
        component: '페이지 크기를 선택할 수 있는 드롭다운 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      description: '현재 선택된 페이지 크기',
      options: [5, 10, 15, 20],
      defaultValue: { summary: 5 },
      control: { type: 'radio' },
      table: {
        type: { summary: 'number' },
      },
    },

    onChange: {
      description: '페이지 크기가 변경될 때 호출되는 함수',
      table: {
        type: {
          summary: '(event: React.ChangeEvent<HTMLSelectElement>) => void',
        },
      },
    },
  },
  args: {
    value: 5,
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof PageSizeSelector>;

export const Default: Story = {
  render: (args) => <PageSizeSelector {...args} />,
};
