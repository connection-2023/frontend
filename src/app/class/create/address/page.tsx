'use client';
import { ADDRESS_DESCRIPTION } from '@/constants/constants';
import {
  ArrowDownSVG,
  ArrowRightSVG,
  SearchSVG,
} from '../../../../../public/icons/svg';
import { FormEvent } from 'react';

const Address = () => {
  const addressSearch = (e: FormEvent<HTMLFormElement>) => {
    e.isDefaultPrevented();
  };

  const test = 1;
  return (
    <>
      <header className="m-auto h-20 w-full max-w-2xl px-11 ">
        <h1 className="pt-8 text-2xl font-semibold">주소 검색</h1>
      </header>
      <hr className="border-t-1 mb-7 w-full border-solid border-sub-color2" />

      <section className="m-auto flex w-full max-w-2xl flex-col px-11">
        <form className="relative" onSubmit={(e) => addressSearch(e)}>
          <input
            className="font- h-10 w-full border-b border-solid border-sub-color1 text-2xl font-semibold focus:outline-none"
            placeholder="도로명, 건물명, 지번 입력"
          />
          <button>
            <SearchSVG className="absolute right-0 top-1 h-7 w-7 fill-sub-color1" />
          </button>
        </form>

        <h2 className="mb-4 mt-7 text-lg font-semibold">{`검색 결과 (${test})`}</h2>

        <address className="flex flex-col gap-1 text-sm font-semibold">
          <div className="text-sub-color1">04300</div>
          <h3>서울 특별시 어쩌구 저쩌구</h3>
          <div className="text-[#969696]">[지번] 어쩌구 저꺼그</div>
        </address>
        <hr className="border-t-1 my-4 w-full border-solid border-sub-color2" />

        {/* <dl className="text-sm">
          {ADDRESS_DESCRIPTION.map(({ term, description }) => {
            return (
              <>
                <dt className="pb-1 text-[#969696]">{term}</dt>
                <dd className="mb-4 text-sub-color1">{description}</dd>
              </>
            );
          })}
        </dl> */}
        <nav className="flex w-full justify-center gap-6 stroke-[#969696]">
          <button className="flex items-center gap-2 text-[#969696]">
            {/* width="5" height="9" */}
            <ArrowRightSVG className="h-[15px] w-[9px] rotate-180 " />
            이전
          </button>
          <div className="relative">
            <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-sub-color1 text-center text-white">
              1
            </div>
          </div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <div>1</div>
          <button className="flex items-center gap-2 text-[#969696]">
            다음
            <ArrowRightSVG className="h-[15px] w-[9px] " />
          </button>
        </nav>
      </section>
    </>
  );
};

export default Address;
