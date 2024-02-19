import UploadImage from './UploadImage';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof UploadImage> = {
  title: 'Components/UploadImage',
  component: UploadImage,
  parameters: {
    docs: {
      description: {
        component: '이미지를 업로드하고 크롭 및 순서 변경이 가능한 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    defaultImg: {
      description: '기본으로 표시할 이미지 목록',
      control: { type: 'object' },
      table: {
        type: { summary: '{ imageUrl: string }[]' },
      },
    },
    situation: {
      description: '업로드 상황을 설명하는 문자열 (강사/클래스)',
      control: { type: 'text' },
      table: {
        type: { summary: 'string' },
      },
    },
    errors: {
      description: '에러를 표시하는데 사용',
      control: { type: 'none' },
      table: {
        type: {
          summary: 'FieldError | Merge<FieldError, FieldErrorsImpl<any>>',
        },
      },
    },
    onChange: {
      description: '이미지 목록이 변경될 때 호출되는 함수',
      control: { type: 'none' },
      table: {
        type: { summary: '( data: { imageUrl: string; }[] ) => void' },
      },
    },
  },
  args: {
    defaultImg: [],
    situation: '클래스',
  },
};

export default meta;
type Story = StoryObj<typeof UploadImage>;

export const Default: Story = {
  render: (args) => <UploadImage {...args} />,
};
