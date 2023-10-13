import NoborderSelect from '@/components/Select/NoborderSelect';
import ClassRange from '@/app/class/create/_components/ClassSchedule/ClassRange/ClassRange';
import Tooltip from '@/components/Tooltip/Tooltip';

const CouponOption = () => {
  return (
    <main className="flex flex-col gap-4 ">
      <section className="flex items-center gap-10">
        <h2 className="w-1/6 font-semibold">쿠폰명</h2>
        <input
          type="text"
          className="h-7 w-96 rounded-md border border-solid border-sub-color2"
        />
      </section>

      <section className="flex items-center gap-10">
        <h2 className="w-1/6 font-semibold">사용 기간</h2>
        <ClassRange />
      </section>

      <section className="flex items-center gap-10">
        <h2 className="w-1/6 font-semibold">쿠폰 상세</h2>
        <div className="flex items-center gap-1">
          <input
            type="number"
            className="mr-1 h-7 w-20 rounded-md border border-solid border-sub-color2"
          />
          <NoborderSelect defaultValue="원" selectList={['원', '%']} />
          <p className="font-semibold">할인</p>
        </div>
      </section>

      <section className="flex items-center gap-10">
        <h2 className="w-1/6 font-semibold">배부 개수</h2>
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
            className="cursor-pointer select-none font-semibold text-sub-color2 peer-checked:text-black"
          >
            제한 없음
          </label>
        </div>
      </section>

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
            className="peer mr-1 h-7 w-20 rounded-md border border-solid border-sub-color2"
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

const CouponDuplicationTooltip = () => {
  return (
    <div className="m-4 inline-grid h-[12.25rem] w-[26.82rem] grid-rows-3 text-sm">
      <dl className="col-span-2 flex">
        <dt>중복 적용:</dt>
        <dd>
          하나의 클래스에는 하나의 쿠폰만 사용할 수 있지만,
          <br />
          중복 적용 쿠폰은 일반 쿠폰과 함께 사용할 수 있습니다.
        </dd>
      </dl>
      <dl className="row-span-2 flex flex-col items-center gap-1">
        <dt className="text-sub-color1">가능</dt>
        <dd className="flex h-[2.68rem] w-[11.68rem] items-center justify-center border border-solid border-sub-color1">
          중복쿠폰 + 일반쿠폰
        </dd>
      </dl>
      <dl className="row-span-2 flex flex-col items-center gap-1">
        <dt className="text-sub-color1">불가능</dt>
        <dd className="flex h-[2.68rem] w-[11.68rem] items-center justify-center border border-solid border-sub-color1">
          중복쿠폰 + 중복쿠폰
        </dd>
        <dd className="flex h-[2.68rem] w-[11.68rem] items-center justify-center border border-solid border-sub-color1">
          일반쿠폰 + 일반쿠폰
        </dd>
      </dl>
    </div>
  );
};

const MaxDiscountTooltip = () => {
  return (
    <dl className="m-4 flex  gap-1 whitespace-nowrap text-sm">
      <dt>최대할인금액:</dt>
      <dd>
        쿠폰을 사용할 때 받을 수 있는 할인의 최대금액입니다.
        <br />
        최종할인금액은 쿠폰의 할인율에 따라 결정되지만
        <br />
        해당 금액 이상으로는할인 받을 수 없습니다
      </dd>
    </dl>
  );
};
