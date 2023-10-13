const InstructorCoupon = () => {
  return (
    <dl className="flex h-[5.625rem] w-60 flex-col justify-evenly gap-1 px-3 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.25)]">
      <dt className="text-xl font-bold text-main-color">3000원</dt>
      <dd className="text-sm">
        <div className="truncate">
          이번 달만 제공하는 초특가 쿠폰 이번 달만 제공하는 초특가 쿠폰 초특가
          쿠폰
        </div>
        <span>23.10.10-23.12.10</span>
      </dd>
    </dl>
  );
};

export default InstructorCoupon;
