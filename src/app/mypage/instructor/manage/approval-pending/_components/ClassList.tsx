import PendingList from './PendingList';
import Button from '@/components/Button/Button';

const ClassList = () => {
  const handleAllApprove = () => {};

  return (
    <section className="flex flex-col border-b border-solid border-gray-500 pb-6">
      <div className="flex items-baseline justify-between gap-x-2.5">
        <h2 className="mb-1.5 font-bold">클래스 제목 </h2>
        <p className="flex-1">
          노쇼 위약금 <span className="font-bold">10,000원</span>
        </p>

        <div className="w-[4.5rem] text-sm">
          <Button color="default" size="medium" onClick={handleAllApprove}>
            전체승인
          </Button>
        </div>
      </div>

      <ul className="mt-4 flex w-full flex-col gap-y-2 text-base text-gray-100">
        <PendingList />
        <PendingList />
        <PendingList />
        <PendingList />
      </ul>
    </section>
  );
};

export default ClassList;
