import { StoryObj, Meta } from '@storybook/react';
import { useState } from 'react';
import Carousel from './Carousel';
import ClassCard from '../ClassPreview/ClassPreview';

const meta: Meta<typeof Carousel> = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    imgURL: {
      description: '표시할 이미지들의 URL들이 담긴 배열, children 우선 렌더',
    },
    children: {
      description: '표시할 요소들, imgURL 보다 우선순위 높음',
    },
    move: { description: '캐러셀 움직임 활성화' },
    arrow: {
      description:
        '탐색을 위해 화살표를 표시해야 하는지 여부를 나타내는 선택적 플래그 (기본값 = true)',
      defaultValue: true,
    },
    priority: {
      description: '해당 숫자 만큼 요소를 미리 렌더 (기본값 = 1)',
      defaultValue: 1,
    },
    showCurrentElement: {
      description:
        '현재 캐러셀 위치 표시의 상태창 표시 여부를 나타내는 선택적 플래그 (기본값 = true)',
      defaultValue: true,
    },
    showCurrentElementBackGround: {
      description:
        '상태창 표시 배경 여부를 나타내는 선택적 플래그 (기본값 = true)',
      defaultValue: true,
    },
    gap: {
      description:
        '캐러셀 요소 사이의 간격을 rem으로 지정하는 선택적 숫자 (기본값 = 0)',
      defaultValue: 0,
    },
    carouselMoveIntervalTime: {
      description:
        '캐러셀 움직이는 시간을 ms로 지정하는 선택적 숫자 (기본값 = 2000ms)',
      defaultValue: 2000,
    },
    arrowPushMoveWaitTime: {
      description:
        'Arrow를 누른 후 캐러셀 움직임을 멈추는 시간을 ms로 지정하는 선택적 숫자 (기본값 = 2000ms)',
      defaultValue: 2000,
    },
    movePause: {
      description: '캐러셀의 움직임을 true 동안 일시정지 (기본값 = false)',
      defaultValue: false,
    },
  },
  args: {
    imgURL: [
      'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
    ],
    move: true,
    arrow: true,
    showCurrentElement: true,
    showCurrentElementBackGround: true,
    gap: 0,
    priority: 1,
    carouselMoveIntervalTime: 2000,
    arrowPushMoveWaitTime: 2000,
  },
};

export default meta;
type Story = StoryObj<typeof Carousel>;

export const 기본: Story = {
  render: (args) => (
    <div className="relative h-80 w-80 overflow-hidden">
      <Carousel {...args} />
    </div>
  ),
};

export function Focus동작() {
  const [focus, setFocus] = useState(false);

  const onFocus = () => {
    setFocus(true);
  };

  const offFocus = () => {
    setFocus(false);
  };

  return (
    <div
      className="relative h-80 w-80 overflow-hidden"
      onMouseLeave={offFocus}
      onMouseOver={onFocus}
    >
      <Carousel
        imgURL={[
          'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
          'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
        ]}
        move={focus}
        arrow={focus}
        showCurrentElement={focus}
      />
    </div>
  );
}

export const 여러요소표시: Story = {
  render: ({ imgURL }) => (
    <div className="relative w-full overflow-hidden">
      <div className="h-80 w-1/3">
        {imgURL && (
          <Carousel imgURL={imgURL} move={true} priority={imgURL?.length} />
        )}
      </div>
    </div>
  ),
};

const classCardData = [
  {
    id: 1,
    status: '모집중' as const,
    date: '08/04~09/25',
    title: '가비쌤과 함께하는 왁킹 클래스',
    location: ['서울 마포구'],
    genre: ['락킹', '락킹'],
    type: '개인레슨',
    time: ['오전', '오후'],
    review: { average: 4.5, count: 14 },
    price: 80000,
    profile: { src: null, nickname: 'nickname' },
    selectedDates: [
      new Date(2023, 8, 4),
      new Date(2023, 8, 6),
      new Date(2023, 8, 8),
    ],
    imgURL: [
      'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
    ],
  },
  {
    id: 2,
    status: '모집중' as const,
    date: '08/04~09/25',
    title: '가비쌤과 함께하는 왁킹 클래스',
    location: ['서울 마포구', '서울 동작구'],
    genre: ['락킹', '락킹'],
    type: '개인레슨',
    time: ['오전'],
    review: { average: 4.5, count: 14 },
    price: 80000,
    profile: { src: null, nickname: 'nickname' },
    selectedDates: [new Date()],
    imgURL: [
      'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
    ],
  },
  {
    id: 3,
    status: '마감' as const,
    date: '08/04~09/25',
    title: '가비쌤과 함께하는 왁킹 클래스',
    location: ['서울 마포구', '서울 성동구'],
    genre: ['락킹'],
    type: '개인레슨',
    time: ['오전'],
    review: { average: 4, count: 12 },
    price: 80000,
    profile: { src: null, nickname: 'nickname' },
    selectedDates: [new Date()],
    imgURL: [
      'https://img.freepik.com/free-photo/pretty-woman-practising-hip-hop-dance_107420-85008.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/girl-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9249.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/dance-time-stylish-men-and-woman-dancing-hip-hop-in-bright-clothes-on-green-background-at-dance-hall-in-neon-light_155003-16406.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/two-beautiful-slender-girls-doing-dancing-and-gymnastics-in-the-dance-hall_1157-13817.jpg?size=626&ext=jpg',
      'https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg',
    ],
  },
];

export function ClassCard사용() {
  const [focus, setFocus] = useState(false);

  const onFocus = () => {
    setFocus(true);
  };

  const offFocus = () => {
    setFocus(false);
  };

  return (
    <div className="relative flex h-80 w-full justify-center ">
      <div className="flex h-full w-11/12 items-center overflow-hidden">
        <div
          className="w-[30rem]"
          onMouseOver={onFocus}
          onMouseLeave={offFocus}
        >
          <Carousel
            move={true}
            showCurrentElement={false}
            carouselMoveIntervalTime={3000}
            priority={3}
            gap={2}
            movePause={focus}
          >
            {classCardData.map((state, index) => (
              <ClassCard key={index} {...state} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
