import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';

const NicknameUpdate = ({ nickname }: { nickname: string }) => {
  return (
    <main className="flex h-full w-full flex-col sm:h-[19rem] sm:w-[40rem]">
      <header className="flex justify-center border-b border-solid border-gray-700 pb-6 pt-9 sm:py-4 ">
        <h1 className="text-lg font-semibold sm:text-2xl">닉네임 변경</h1>
      </header>
      <section className="mx-auto flex flex-grow flex-col gap-4 pt-7 sm:mx-0 sm:justify-center sm:px-8 sm:pt-0">
        <dl className="grid grid-rows-2 items-center gap-y-3 text-lg font-semibold sm:grid-cols-[7rem_1fr] sm:grid-rows-none sm:gap-y-0 sm:text-base">
          <dt>현재 닉네임</dt>
          <dd>{nickname}</dd>
        </dl>
        <div className="grid grid-rows-2 items-center sm:grid-cols-[7rem_1fr] sm:grid-rows-none sm:gap-4">
          <label
            htmlFor="updateNickname"
            className="text-lg font-semibold sm:text-base"
          >
            변경할 닉네임
          </label>
          <div className="flex items-center gap-4">
            <input
              id="updateNickname"
              className="h-11 flex-grow rounded-md px-3 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7"
            />
            <div className="hidden w-[8.625rem] sm:block">
              <Button size="small" color="secondary">
                중복확인
              </Button>
            </div>
            <div className="w-24 sm:hidden">
              <Button size="large" color="secondary">
                중복확인
              </Button>
            </div>
          </div>
        </div>
      </section>
      <div className="my-6 flex gap-4 px-4 sm:px-8">
        <div className="hidden w-1/2 sm:block">
          <UniqueButton>취소</UniqueButton>
        </div>
        <div className="hidden w-1/2 sm:block">
          <Button size="medium" color="secondary">
            변경하기
          </Button>
        </div>
        <div className="w-full sm:hidden">
          <Button size="large" color="secondary">
            변경하기
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NicknameUpdate;
