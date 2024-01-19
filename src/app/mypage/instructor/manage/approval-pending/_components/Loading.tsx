import Spinner from '@/components/Loading/Spinner';

const Loading = () => (
  <section className="mx-4 flex min-h-[400px] flex-col rounded-lg bg-white shadow-float md:mx-9 md:p-6 xl:mx-0">
    <h1 className="px-3.5 pt-6 text-2xl font-bold md:p-0">승인대기</h1>
    <p className="whitespace-pre-line break-keep px-3.5 text-base md:p-0">
      *노쇼위약금 혹은 신청금액의 입금이 확인된 수강생에 한하여 하단의 신청승인
      버튼을 클릭하셔야 해당 수강생의 수강 신청이 완료됩니다. <br />{' '}
      <span className="text-main-color">
        수락 전 노쇼위약금/신청금액 입금이 완료되었는지 확인해주세요.
      </span>
    </p>

    <div className="mt-5 flex h-full items-center justify-center">
      <Spinner />
    </div>
  </section>
);

export default Loading;
