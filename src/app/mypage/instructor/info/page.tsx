import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';
import ProfileImg from '@/components/ProfileImage/ProfileImage';
import { BigArrowSVG, ChangeImageSVG } from '@/icons/svg';
import Link from 'next/link';

const page = () => {
  return (
    <main className="col-span-1 flex w-full flex-col ">
      <div className="flex flex-col gap-5 sm:flex-row">
        <div className="flex grow flex-col gap-6">
          <section className="flex flex-col rounded-md bg-white px-5 py-6 shadow-vertical">
            <h1 className="mb-7 text-2xl font-bold">내 정보</h1>
            <div className="flex gap-7">
              <button className="group relative w-44 flex-shrink-0 self-start [&>*:nth-child(1)]:h-44">
                <ProfileImg
                  src="https://img.freepik.com/free-photo/boy-dancing-hip-hop-in-stylish-clothes-on-gradient-background-at-dance-hall-in-neon-light_155003-9262.jpg?size=626&ext=jpg"
                  size="xlarge"
                />
                <div className="absolute bottom-0 right-0 flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white shadow-vertical group-hover:shadow-[inset_0_0px_3px_1px_rgba(0,0,0,0.3)]">
                  <ChangeImageSVG className="h-7 w-7" />
                </div>
              </button>
              <dl className="flex grow flex-col border-t border-solid border-gray-700">
                <div className="grid grid-cols-6 items-center border-b border-solid border-gray-700 py-1">
                  <dt className="w-24 font-bold">sss</dt>
                  <dd className="col-span-4 truncate">
                    sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                  </dd>
                  <button className="justify-self-end">
                    <BigArrowSVG
                      width="34"
                      height="34"
                      className="fill-gray-700 hover:fill-black"
                    />
                  </button>
                </div>
              </dl>
            </div>
            <div className="mt-6 flex gap-4">
              <Link href="/" className="w-1/2">
                <Button size="medium" color="secondary">
                  강사 프로필 보러가기
                </Button>
              </Link>
              <Link href="/" className="w-1/2">
                <Button size="medium" color="secondary">
                  강사 프로필 수정하기
                </Button>
              </Link>
            </div>
          </section>
          <section className="flex flex-col rounded-md bg-white py-4 text-[#414141] shadow-vertical">
            <header className="flex items-center justify-between border-b border-solid border-gray-500 px-5 pb-3">
              <h1 className="text-lg font-semibold">계좌 정보</h1>
              <button>
                <BigArrowSVG
                  width="34"
                  height="34"
                  className="fill-gray-500 hover:fill-black"
                />
              </button>
            </header>
            <div className="mt-4 flex flex-col gap-2">
              <dl className="flex px-5 text-sm">
                <dt className="w-16 font-semibold">은행</dt>
                <dd>우리은행</dd>
              </dl>
              <dl className="flex px-5 text-sm">
                <dt className="w-16 font-semibold">계좌번호</dt>
                <dd>우리은행</dd>
              </dl>
            </div>
          </section>
        </div>
        <article className="flex w-80 flex-shrink-0 flex-col self-start whitespace-nowrap rounded-md bg-white p-5 px-5 py-6 shadow-vertical">
          <ul className="flex flex-col gap-5 px-1">
            <h1 className="text-xl font-bold">알림/이메일 수신 동의</h1>
            <li className="mb-1 flex items-center gap-3">
              <input
                id="ex"
                type="checkbox"
                className="h-[18px] w-[18px] accent-black"
              />
              <label htmlFor="ex" className="cursor-pointer text-sm">
                알림톡 수신 동의
              </label>
              <button className="text-gray-500 underline">보기</button>
            </li>
            <Button color="secondary" disabled={true}>
              적용하기
            </Button>
          </ul>
        </article>
      </div>
    </main>
  );
};

export default page;
