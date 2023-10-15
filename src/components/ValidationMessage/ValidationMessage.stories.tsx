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
    invalidData: [
      { key: 'photo', type: 'image', message: '사진', ref: null },
      { key: 'title', type: 'text', message: '제목', ref: null },
      { key: 'genre', type: 'text', message: '장르', ref: null },
      { key: 'peopleCount', type: 'number', message: '인원수 ', ref: null },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof ValidationMessage>;

export const 기본: Story = {
  render: (args) => <ValidationMessage {...args} />,
};
