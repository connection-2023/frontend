'use client';

import { useUserStore } from '@/store';

const BuyerInfo = () => {
  const { authUser } = useUserStore((state) => ({
    authUser: state.authUser,
  }));

  return (
    <div className="mt-4 rounded-md px-4 py-4 shadow-vertical">
      <section className="w-full whitespace-nowrap">
        <h3 className="text-lg font-semibold" id="buyerInfo">
          구매자 정보
        </h3>
        <ul className="mt-4 flex flex-col gap-2 text-sm font-semibold text-gray-100 ">
          <li className="flex items-center gap-4 py-[0.31rem]">
            <label className="flex items-center gap-[30px]">
              <span>구매자 이름</span>
              <input
                defaultValue={authUser?.name}
                className="h-7 w-full max-w-[20rem] rounded-md border border-solid border-gray-500 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1"
              />
            </label>

            <div className="w-24 shrink-0" />
          </li>
          <li className="flex items-center gap-4 py-[0.31rem]">
            <label className="flex items-center gap-4">
              <span>구매자 연락처</span>
              <input
                defaultValue={authUser?.phoneNumber}
                className="h-7 w-full max-w-[20rem] rounded-md border border-solid border-gray-500 px-[0.62rem] py-[0.31rem] focus:outline-sub-color1"
              />
            </label>

            <button className="h-7 w-24 shrink-0 cursor-pointer whitespace-nowrap rounded-md border border-solid border-black bg-black font-medium text-white">
              인증하기
            </button>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default BuyerInfo;
