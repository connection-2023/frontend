import Button from '@/components/Button/Button';
import { BigArrowSVG, ChangeImageSVG } from '@/icons/svg';
import MyInfo from './_components/MyInfo';

const page = () => {
  return (
    <main className="col-span-1 flex w-full flex-col px-4 sm:px-9 xl:px-0">
      <div className="flex flex-col gap-4 lg:flex-row ">
        <div className="flex grow flex-col gap-6">
          <MyInfo />
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
        <article className="flex w-full flex-shrink-0 flex-col self-start whitespace-nowrap rounded-md bg-white p-5 px-5 py-6 shadow-vertical lg:w-80">
          <ul className="mb-5 flex flex-col gap-5 px-1">
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
          </ul>
          <div className="w-full sm:ml-auto sm:w-28 lg:w-full">
            <Button color="secondary" disabled={true}>
              적용하기
            </Button>
          </div>
        </article>
      </div>
    </main>
  );
};

export default page;
