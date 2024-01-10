import PendingList from './PendingList';
import Button from '@/components/Button/Button';

const ClassList = () => {
  const handleAllApprove = () => {};

  return (
    <section className="flex flex-col border-b border-solid border-gray-500 pb-6">
      <div className="flex items-baseline justify-between gap-x-2.5 px-3.5 md:p-0">
        <div className="gap-x-2.5 md:flex md:p-0">
          <h2 className="mb-1.5 font-bold">클래스 제목 </h2>
          <p className="flex-1 text-sub-color1 md:text-black">
            노쇼 위약금 <span className="font-bold">10,000원</span>
          </p>
        </div>
        <div className="w-[4.5rem] text-sm">
          <Button color="default" size="medium" onClick={handleAllApprove}>
            전체승인
          </Button>
        </div>
      </div>

      <ul className="mt-4 flex w-full flex-col gap-y-2 divide-y divide-gray-700 text-base text-gray-100 md:divide-none">
        <PendingList />
        <PendingList />
        <PendingList />
        <PendingList />
      </ul>
    </section>
  );
};

export default ClassList;
