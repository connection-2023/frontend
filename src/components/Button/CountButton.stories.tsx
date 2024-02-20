import { useState } from 'react';
import CountButton from './CountButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof CountButton> = {
  title: 'Components/Buttons/CountButton',
  component: CountButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '클래스 상세페이지, 신청 페이지에서 사용되는 신청 인원 증감 버튼 컴포넌트',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      description: '버튼을 클릭했을 때 호출되는 함수',
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof CountButton>;

const CountButtonWithState = () => {
  const [count, setCount] = useState(0);
  const onClickUp = () => {
    setCount((prev) => prev + 1);
  };

  const onClickDown = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

  return (
    <div className="flex items-center text-sm text-gray-100">
      <CountButton onClick={onClickDown} aria-label="인원 감소">
        -
      </CountButton>
      <span className="flex h-[31px] w-[34px] items-center justify-center border-y border-solid border-gray-500">
        {count}
      </span>
      <CountButton onClick={onClickUp} aria-label="인원 증가">
        +
      </CountButton>
      <span className="ml-1.5">명</span>
    </div>
  );
};

export const Default: Story = {
  render: () => <CountButtonWithState />,
};

// export const Default: Story = {
//   render: () => {
//     const [count, setCount] = useState(0);
//     const onClickUp = () => {
//       setCount((prev) => prev + 1);
//     };

//     const onClickDown = () => {
//       if (count > 1) {
//         setCount((prev) => prev - 1);
//       }
//     };

//     return (
//       <div className="flex items-center text-sm text-gray-100">
//         <CountButton onClick={onClickDown} aria-label="인원 감소">
//           -
//         </CountButton>
//         <span className="flex h-[31px] w-[34px] items-center justify-center border-y border-solid border-gray-500">
//           {count}
//         </span>
//         <CountButton onClick={onClickUp} aria-label="인원 증가">
//           +
//         </CountButton>
//         <span className="ml-1.5">명</span>
//       </div>
//     );
//   },
// };
