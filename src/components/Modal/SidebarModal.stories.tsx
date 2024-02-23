import SidebarModal from './SidebarModal';
import type { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof SidebarModal> = {
  title: 'Components/Modal/SidebarModal',
  component: SidebarModal,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component: '테블릿 뷰에서 마이페이지를 보여주는 사이드바 모달 컴포넌트',
      },
    },
  },
  argTypes: {
    children: {
      description: '모달 내부 내용',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    isOpened: {
      description: '모달 창의 열림 상태',
      control: { type: 'boolean' },
      table: {
        type: { summary: 'boolean' },
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
type Story = StoryObj<typeof SidebarModal>;

export const Default: Story = {
  render: (args) => (
    <div className="h-screen">
      <SidebarModal {...args}>
        <div className="flex h-full w-full items-center justify-center">
          마이페이지 사이드바
        </div>
      </SidebarModal>
    </div>
  ),
};
