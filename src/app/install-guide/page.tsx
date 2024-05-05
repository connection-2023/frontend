import { FRONT_DOMAIN } from '@/constants/constants';
import {
  AOSStpe1,
  AOSStpe2,
  AOSStpe3,
  AOSStpe4,
  AOSStpe5,
} from '@/images/install_guide/AOS';
import {
  IOSStpe1,
  IOSStpe2,
  IOSStpe3,
  IOSStpe4,
  IOSStpe5,
} from '@/images/install_guide/IOS';
import Guide from './_components/Guide';

const page = () => {
  const AOSGuide = [
    { src: AOSStpe1, text: `크롬에서 ${FRONT_DOMAIN}를 여세요` },
    { src: AOSStpe2, text: '화면의 우측상단의 메뉴 아이콘을 탭하세요' },
    { src: AOSStpe3, text: '어플리케이션 설치를 탭하세요' },
    { src: AOSStpe4, text: '설치를 누르세요' },
    {
      src: AOSStpe5,
      text: '이제 커넥션을 즐겨주세요!',
    },
  ];

  const IOSGuide = [
    { src: IOSStpe1, text: `사파리에서 ${FRONT_DOMAIN}를 여세요` },
    { src: IOSStpe2, text: '공유하기를 누르세요' },
    { src: IOSStpe3, text: '홈 화면에 추가를 누르세요' },
    { src: IOSStpe4, text: '화면 우측상단의 추가를 누르세요' },
    { src: IOSStpe5, text: '커넥션을 즐겨주세요!' },
  ];

  return (
    <main className="mt-7 max-w-3xl sm:mx-auto">
      <Guide guide={AOSGuide} title="안드로이드" />
      <Guide guide={IOSGuide} title="IOS" reverse={true} />
    </main>
  );
};

export default page;
