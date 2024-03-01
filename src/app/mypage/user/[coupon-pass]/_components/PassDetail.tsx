import Link from 'next/link';
import { userPassList } from '@/types/pass';

interface PassDetailProps {
  selectPass: userPassList;
}

const PassDetail = ({ selectPass }: PassDetailProps) => {
  return (
    <section className="flex w-full max-w-[641px] flex-col gap-2 pt-7">
      <header className=" flex justify-between">
        <h1 className="text-2xl font-semibold">11일</h1>
        <Link
          href="/"
          className="flex w-[75px] items-center justify-center rounded-md border border-solid border-black bg-white text-black hover:bg-black/10 active:bg-black active:text-white"
        >
          구매취소
        </Link>
      </header>
      {/* <hr className="border-gray-500" /> */}
      <dl className="grid grid-cols-2 border-y border-b-gray-700 border-t-gray-500 py-4 text-sm [&>dt]:font-semibold">
        <div className="grid grid-cols-[5.3rem,1fr] gap-y-2">
          <dt>구매일</dt>
          <dd>s</dd>

          <dt>결제정보</dt>
          <dd>s</dd>
        </div>

        <div className="grid grid-cols-[5.3rem,1fr] gap-y-2">
          <dt>사용기간</dt>
          <dd>s</dd>

          <dt>잔여일수</dt>
          <dd>s</dd>
        </div>
      </dl>

      <h2 className="text-sm font-semibold">패스권 사용내역</h2>
      <ul>
        <li>sss</li>
        <li>sss</li>
        <li>sss</li>
      </ul>
    </section>
  );
};

export default PassDetail;
