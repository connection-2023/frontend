import Button from '@/components/Button/Button';
import UpdateModalContainer from './UpdateModalContainer';

interface EmailUpdateProps {
  email: string;
  closeModalHandler?: () => void;
}

const EmailUpdate = ({ email, closeModalHandler }: EmailUpdateProps) => {
  return (
    <UpdateModalContainer title="이메일 변경" closeEvent={closeModalHandler}>
      <section className="flex flex-grow flex-col gap-4 px-5 pt-7 sm:justify-center sm:px-8 sm:pt-0">
        <dl className="grid grid-rows-2 items-center gap-y-3 text-lg font-semibold sm:grid-cols-[7rem_1fr] sm:grid-rows-none sm:gap-y-0 sm:text-base">
          <dt>현재 이메일</dt>
          <dd>{email}</dd>
        </dl>
        <div className="w-full text-lg font-semibold sm:grid sm:grid-cols-[7rem_1fr] sm:grid-rows-none sm:text-base">
          <label className="self-start">변경할 이메일</label>
          <div className="grid grid-cols-[1fr_7.7rem] gap-x-2 gap-y-4 sm:grid-cols-[1fr_1rem_1fr_8.625rem]">
            <input className="h-11 w-full flex-grow rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7" />
            <span className="self-center text-xl sm:text-base">@</span>
            <input className="h-11 w-full flex-grow rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-7" />
            <div className="h-11 w-full sm:h-7">
              <Button size="full" color="secondary">
                인증코드 전송
              </Button>
            </div>

            <input className="h-11 w-full rounded-md px-2 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:col-span-3 sm:h-7" />
            <div className="h-11 w-full sm:h-7">
              <Button size="full" color="secondary">
                인증하기
              </Button>
            </div>
          </div>
        </div>
      </section>
    </UpdateModalContainer>
  );
};

export default EmailUpdate;
