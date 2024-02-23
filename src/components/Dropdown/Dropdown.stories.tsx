import { action } from '@storybook/addon-actions';
import Dropdown from './Dropdown';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '드롭다운 메뉴 컴포넌트',
      },
    },
  },
  argTypes: {
    options: {
      description:
        '드롭다운 메뉴의 각 항목과 해당 항목을 클릭했을 때의 이벤트 핸들러 지정',
      table: {
        type: {
          summary: `{ 
                onClick?: React.MouseEventHandler<HTMLLIElement>; 
                component: React.ReactNode; 
            }[]`,
        },
      },
    },
    className: {
      description: '클래스 속성 추가(옵션값)',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
  },

  args: {
    options: [
      {
        component: <p>옵션 1</p>,
        onClick: action('옵션 1 클릭'),
      },
      {
        component: <p>옵션 2</p>,
        onClick: action('옵션 2 클릭'),
      },
      {
        component: <p>옵션 3</p>,
        onClick: action('옵션 3 클릭'),
      },
      {
        component: <p>옵션 4</p>,
        onClick: action('옵션 4 클릭'),
      },
    ],
    className: 'whitespace-nowrap',
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: (args) => (
    <div className="relative h-40">
      <Dropdown {...args} />
    </div>
  ),
};
