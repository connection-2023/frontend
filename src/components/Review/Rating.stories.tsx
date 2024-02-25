import { action } from '@storybook/addon-actions';
import Rating from './Rating';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof Rating> = {
  title: 'Components/Review/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '드래그해서 별점 설정 컴포넌트',
      },
    },
  },
  argTypes: {
    rate: {
      description: '현재 별점',
      control: { type: 'number', min: 0, max: 5, step: 1 },
      table: {
        type: { summary: 'number' },
      },
    },
    readonly: {
      description: '별점 변경 가능 여부',
      control: { type: 'boolean' },
      defaultValue: { summary: false },
      table: {
        type: { summary: 'boolean' },
      },
    },
    viewRate: {
      description: '별점(숫자) 소수점 첫번째까지 표시 여부 (ex. 3.0/5)',
      control: { type: 'boolean' },
      defaultValue: { summary: true },
      table: {
        type: { summary: 'boolean' },
      },
    },
    bigStar: {
      description: '별 크기 설정',
      control: { type: 'boolean' },
      defaultValue: { summary: false },
      table: {
        type: { summary: 'boolean' },
      },
    },
    viewSelectRate: {
      description: '선택한 별점을 표시할지 여부 (ex. 3/5)',
      control: { type: 'boolean' },
      defaultValue: { summary: false },
      table: {
        type: { summary: 'boolean' },
      },
    },
    reviewCount: {
      description: '리뷰 개수 (ex. n개의 리뷰)',
      control: { type: 'number' },
      table: {
        type: { summary: 'number' },
      },
    },
    handleRate: {
      description: '별점이 변경될 때 호출되는 함수',
      table: {
        type: { summary: '(value: number) => void' },
      },
      onClick: action('on-click'),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  render: (args) => <Rating {...args} />,
};
