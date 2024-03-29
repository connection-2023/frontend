import Receipt from '@/components/uis/Receipt';

const ReceiptPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => (
  <main className="my-10 h-full">
    <div className="mx-auto w-[388px] bg-checkout-receipt bg-no-repeat px-8 py-14">
      <Receipt searchParams={searchParams} />
    </div>
  </main>
);

export default ReceiptPage;
