import { ArrowDownSVG, CouponSVG } from '../../../../../public/icons/svg';
import { useState } from 'react';
import CouponOption from '@/components/Coupon/CouponOption';
import ReactSelect from '@/components/Select/ReactSelect';
import Select from 'react-select';

function createOptions(from: number, to: number) {
  return Array.from({ length: to - from + 1 }, (_, i) => ({
    value: i + from,
    label: String(i + from),
  }));
}

const ClassPrice = () => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultValue = { value: 20, label: '20' };

  const options = createOptions(defaultValue.value, 100);

  const couponOptions = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const handleChange = (
    selectedOption: { value: number; label: string } | null,
  ) => {
    console.log(selectedOption);
  };

  return (
    <>
      <section className="mt-3 flex flex-col text-lg font-semibold">
        <div className="flex h-16 items-center border-b border-solid border-sub-color2">
          <h2 className="w-1/4">총 클래스 횟수</h2>
          <div>20회</div>
        </div>

        <div className="flex h-16 items-center border-b border-solid border-sub-color2">
          <h2 className="w-1/4">1회 최대 수강생</h2>
          <ReactSelect
            instanceId="my-unique-id"
            defaultValue={defaultValue}
            options={options}
            onChange={handleChange}
            styleType="number"
          />
          {/* 추후 아이디 변경 */}
          <p className="ml-1">명</p>
        </div>
        <div className="flex h-16 items-center ">
          <h2 className="w-1/4">가격 설정</h2>
          <div>1회당</div>
          <input
            type="number"
            className="ml-7 mr-1 h-8 w-24 rounded-md border border-solid border-sub-color4 text-right focus:outline-none"
          />
          {/* 숫자 확인 유효성 */}원
        </div>
      </section>

      <section className="flex flex-col gap-7 border-y border-solid border-sub-color1 py-5">
        <button
          className="flex items-center gap-2"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <CouponSVG className="h-6 w-6 fill-sub-color1" />
          <h2 className="text-lg font-semibold">쿠폰 생성/적용</h2>
          <ArrowDownSVG
            className={`h-9 w-9 fill-black ${isOpen && 'rotate-180'}`}
          />
        </button>
        {isOpen && (
          <>
            <div className="relative">
              <CouponOption />
              <button className="absolute bottom-0 right-5 h-7 w-[5.375rem] rounded-md bg-sub-color1 text-white">
                생성하기
              </button>
            </div>

            <hr className="border-sub-color2" />

            <div className="flex items-center gap-4 font-semibold">
              <h2 className="w-1/6">적용할 쿠폰</h2>
              <div className="w-96">
                <ReactSelect
                  options={couponOptions}
                  placeholder="적용할 쿠폰 선택"
                  noOptionsMessage="적용 가능한 쿠폰이 없습니다"
                />
              </div>
            </div>
          </>
        )}
      </section>
    </>

    // border-b-2 border-solid border-sub-color1
  );
};

export default ClassPrice;
