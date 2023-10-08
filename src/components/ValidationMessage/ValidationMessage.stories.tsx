import { StoryObj, Meta } from '@storybook/react';
import ValidationMessage from './ValidationMessage';

const meta: Meta<typeof ValidationMessage> = {
  title: 'Components/ValidationMessage',
  component: ValidationMessage,
  tags: ['autodocs'],
  argTypes: {
    invalidData: {
      description: '유효성 통과 못한 데이터 이름 배열',
    },
  },
  args: {
    invalidData: ['사진', '제목', '장르', '인원', '진행방식', '난이도', '가격'],
  },
};

export default meta;
type Story = StoryObj<typeof ValidationMessage>;

export const 기본: Story = {
  render: (args) => <ValidationMessage {...args} />,
};
