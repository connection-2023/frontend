import Info from '@/components/MyInfo/Info';
import Account from './_components/Account';
import ConsentReceiptModification from '@/components/MyInfo/ConsentReceiptModification';

const page = () => {
  return (
    <main className="col-span-1 flex w-full flex-col px-4 sm:px-9 xl:px-0">
      <div className="flex flex-col gap-4 lg:flex-row ">
        <div className="flex grow flex-col gap-4 lg:gap-6">
          <Info />
          <Account />
        </div>
        <ConsentReceiptModification />
      </div>
    </main>
  );
};

export default page;