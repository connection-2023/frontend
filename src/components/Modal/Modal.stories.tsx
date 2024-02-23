import Modal from './Modal';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal/BasicModal',
  component: Modal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '기본 모달 컴포넌트',
      },
    },
  },
  argTypes: {
    isOpened: {
      description: '모달 창의 열림 상태',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
      },
    },
    children: {
      description: '모달 내부 내용',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    handleClosed: {
      description: '모달 창이 닫힐 때 호출되는 함수',
      action: '모달 닫기',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    isOpened: true,
    handleClosed: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => (
    <div className="h-96">
      <Modal {...args}>
        <div className="flex h-80 w-80 items-center justify-center">
          모달 내용
        </div>
      </Modal>
    </div>
  ),
};
