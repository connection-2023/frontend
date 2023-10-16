export const CouponDuplicationTooltip = () => {
  const dlStyle = 'row-span-2 flex flex-col gap-1 font-semibold';
  const ddStyle =
    'flex h-[2.68rem] w-[11.68rem] items-center justify-center border border-solid border-sub-color1';

  return (
    <div className="m-4 grid h-[12.25rem] w-[26.82rem] grid-rows-3 justify-items-center text-sm">
      <dl className="col-span-2 flex gap-1">
        <dt>중복 적용:</dt>
        <dd>
          하나의 클래스에는 하나의 쿠폰만 사용할 수 있지만,
          <br />
          중복 적용 쿠폰은 일반 쿠폰과 함께 사용할 수 있습니다.
        </dd>
      </dl>
      <dl className={dlStyle}>
        <dt className="text-sub-color1">가능</dt>
        <dd className={ddStyle}>중복쿠폰 + 일반쿠폰</dd>
      </dl>
      <dl className={dlStyle}>
        <dt className="text-sub-color1">불가능</dt>
        <dd className={ddStyle}>중복쿠폰 + 중복쿠폰</dd>
        <dd className={ddStyle}>일반쿠폰 + 일반쿠폰</dd>
      </dl>
    </div>
  );
};

export const MaxDiscountTooltip = () => {
  return (
    <dl className="m-4 flex gap-1 whitespace-nowrap text-sm">
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

export const LocationDiscussionTooltip = () => {
  return (
    <div className="flex h-14 w-96 items-center justify-center text-sm">
      수업장소가 특정하지 않을 경우(온라인, 방문수업 등)
      <br />
      가능한 지역을 선택 후 하단에 자세한 설명을 적어주세요.
    </div>
  );
};
