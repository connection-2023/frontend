import Button from '@/components/Button/Button';
import MyInfo from './_components/MyInfo';
import Account from './_components/Account';

const page = () => {
  return (
    <main className="col-span-1 flex w-full flex-col px-4 sm:px-9 xl:px-0">
      <div className="flex flex-col gap-4 lg:flex-row ">
        <div className="flex grow flex-col gap-4 lg:gap-6">
          <MyInfo />
          <Account />
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
