import NoborderSelect from '@/components/Select/NoborderSelect';
import ClassRange from '@/app/class/create/_components/ClassSchedule/ClassRange/ClassRange';
import CouponContainer from './CouponContainer';

const CouponOption = () => {
  return (
    <main className="flex flex-col gap-4 ">
      <CouponContainer title="쿠폰명">
        <input
          type="text"
          className="h-7 w-96 rounded-md border border-solid border-sub-color2"
        />
      </CouponContainer>

      <CouponContainer title="사용 기간">
        <ClassRange />
      </CouponContainer>

      <CouponContainer title="쿠폰 상세">
        <div className="flex items-center gap-1">
          <input
            type="number"
            className="mr-1 h-7 w-20 rounded-md border border-solid border-sub-color2"
          />
          <NoborderSelect defaultValue="원" selectList={['원', '%']} />
          <p className="font-semibold">할인</p>
        </div>
      </CouponContainer>

      <CouponContainer title="배부 개수">
        <div className="flex items-center">
          <p className="mr-4 font-semibold">선착순</p>
          <input
            type="number"
            className="mr-1 h-7 w-12 rounded-md border border-solid border-sub-color2"
          />
          <p className="mr-4 font-semibold">명</p>
          <input
            id="limit"
            type="checkbox"
            className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
          />
          <label
            htmlFor="limit"
            className="cursor-pointer select-none text-sm font-semibold text-sub-color2 peer-checked:text-black"
          >
            제한 없음
          </label>
        </div>
      </CouponContainer>

      <CouponContainer title="중복 쿠폰">
        <div className="flex items-center">
          <input
            id="apply"
            type="checkbox"
            className="peer mr-1 h-7 w-[1.12rem] accent-sub-color1"
          />
          <label
            htmlFor="apply"
            className="cursor-pointer select-none text-sm font-semibold text-sub-color2 peer-checked:text-black"
          >
            적용
          </label>
        </div>
      </CouponContainer>

      <CouponContainer title="최대할인 금액">
        <div className="flex items-center">
          <input
            type="number"
            className="mr-1 h-7 w-20 rounded-md border border-solid border-sub-color2"
          />
          원
        </div>
      </CouponContainer>
    </main>
  );
};

export default CouponOption;
