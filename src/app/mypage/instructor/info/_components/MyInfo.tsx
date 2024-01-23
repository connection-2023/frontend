import ProfileImg from '@/components/ProfileImage/ProfileImage';
import Link from 'next/link';
import Button from '@/components/Button/Button';
import { BigArrowSVG, ChangeImageSVG } from '@/icons/svg';
import { useUserStore } from '@/store';

const MyInfo = async () => {
  const { authUser } = useUserStore.getState();

  const phoneNumber = authUser?.phoneNumber;
  const infoComponents = [
    {
      dt: '이름',
      dd: authUser?.name,
      viewArrow: false,
    },
    {
      dt: '닉네임',
      dd: authUser?.nickname,
      viewArrow: true,
    },
    {
      dt: '소셜 로그인',
      dd: <div className="text-red-400">변경 해야한다</div>,
      viewArrow: true,
    },
    {
      dt: '이메일',
      dd: authUser?.email,
      viewArrow: true,
    },
    {
      dt: '휴대폰 번호',
      dd:
        phoneNumber?.slice(0, 3) +
        '-' +
        phoneNumber?.slice(3, 7) +
        '-' +
        phoneNumber?.slice(7, 11),
      viewArrow: true,
    },
  ];

  return (
    <section className="flex flex-col rounded-md bg-white px-5 py-6 shadow-vertical">
      <h1 className="mb-7 text-2xl font-bold">내 정보</h1>
      <div className="flex flex-col gap-7 sm:flex-row">
        <button className="group relative mx-auto w-44 flex-shrink-0 self-start sm:mx-0 [&>*:nth-child(1)]:h-44">
          <ProfileImg
            src="https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg"
            size="xlarge"
          />
          <div className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-vertical group-hover:shadow-[inset_0_0px_3px_1px_rgba(0,0,0,0.3)]">
            <ChangeImageSVG className="h-7 w-7" />
          </div>
        </button>
        <dl className="flex grow flex-col border-t border-solid border-gray-700">
          {infoComponents.map(({ dt, dd, viewArrow }) => (
            <div
              key={dt}
              className="grid grid-cols-[104px_1fr_34px] items-center border-b border-solid border-gray-700 py-1"
            >
              <dt className="font-bold">{dt}</dt>
              <dd className="truncate">{dd}</dd>
              {viewArrow && (
                <button className="justify-self-end">
                  <BigArrowSVG
                    width="34"
                    height="34"
                    className="fill-gray-700 hover:fill-black"
                  />
                </button>
              )}
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row">
        <Link href="/" className="w-full sm:w-1/2">
          <Button size="medium" color="secondary">
            강사 프로필 보러가기
          </Button>
        </Link>
        <Link href="/" className="w-full sm:w-1/2">
          <Button size="medium" color="secondary">
            강사 프로필 수정하기
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default MyInfo;
