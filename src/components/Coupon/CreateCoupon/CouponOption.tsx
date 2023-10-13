import { useState } from 'react';
import NoborderSelect from '@/components/Select/NoborderSelect';
import ClassRange from '@/app/class/create/_components/ClassSchedule/ClassRange/ClassRange';
import Tooltip from '@/components/Tooltip/Tooltip';
import {
  CouponDuplicationTooltip,
  MaxDiscountTooltip,
} from '@/components/Tooltip/TooltipMessages/TooltipMessages';
import { COUPON_UNIT_LIST } from '@/constants/constants';

const CouponOptionInputStyles =
  'h-7 rounded-md border border-solid border-sub-color2 focus:outline-none';

const CouponOption = () => {
  const [isLimit, setIsLimit] = useState(false);

  return (
    <main className="flex flex-col gap-4 ">
      <CouponOptionSection title="쿠폰명">
        <input type="text" className={`${CouponOptionInputStyles} w-96`} />
      </CouponOptionSection>

      <CouponOptionSection title="사용기간">
        <ClassRange />
      </CouponOptionSection>

      <CouponOptionSection title="쿠폰 상세">
        <div className="flex items-center gap-1">
          <input
            type="number"
            className={`${CouponOptionInputStyles} mr-[0.25rem] w-[5rem]`}
          />
          <NoborderSelect defaultValue="원" selectList={COUPON_UNIT_LIST} />
          <p className="font-semibold">할인</p>
        </div>
      </CouponOptionSection>

      <CouponOptionSection title="배부 개수">
        <div className="flex items-center">
          <p className={`mr-2 font-semibold ${isLimit && 'text-sub-color2'}`}>
            선착순
          </p>
          <input
            type="number"
            className={`${CouponOptionInputStyles} mr-1 w-12 `}
            readOnly={isLimit}
          />
          <p className={`mr-4 font-semibold ${isLimit && 'text-sub-color2'}`}>
            명
          </p>
          <input
            id="limit"
            type="checkbox"
            className="peer peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
            onChange={() => setIsLimit(!isLimit)}
          />
          <label
            htmlFor="limit"
            className="cursor-pointer select-none font-semibold text-sub-color2 peer-checked:text-black"
          >
            제한 없음
          </label>
        </div>
      </CouponOptionSection>

      <section className="flex items-center gap-10">
        <div className="flex w-1/6 items-center gap-1">
          <h2 className="whitespace-nowrap font-semibold">중복 쿠폰</h2>
          <Tooltip>
            <CouponDuplicationTooltip />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <input
            id="apply"
            type="checkbox"
            className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
          />
          <label
            htmlFor="apply"
            className="cursor-pointer select-none font-semibold text-sub-color2 peer-checked:text-black"
          >
            적용
          </label>
        </div>
      </section>

      <section className="flex items-center gap-10">
        <div className="flex w-1/6 items-center gap-1">
          <h2 className="whitespace-nowrap font-semibold">최대할인 금액</h2>
          <Tooltip>
            <MaxDiscountTooltip />
          </Tooltip>
        </div>
        <div className="flex items-center">
          <input
            type="number"
            className={`${CouponOptionInputStyles} peer mr-1 w-20`}
          />
          <p className="font-semibold text-sub-color2 peer-focus:text-black">
            원
          </p>
        </div>
      </section>
    </main>
  );
};

export default CouponOption;

const CouponOptionSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <section className="flex items-center gap-10">
    <h2 className="w-1/6 font-semibold">{title}</h2>
    {children}
  </section>
);
