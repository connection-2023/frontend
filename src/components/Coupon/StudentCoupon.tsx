import Link from 'next/link';
import { useRef, useState } from 'react';
import { useClickAway } from 'react-use';
import { studentCouponGET } from '@/types/coupon';

const StudentCoupon = ({
  discount,
  title,
  startAt,
  endAt,
  unit,
  classList,
  used = false,
}: studentCouponGET) => {
  // 추후 api 연결시 used, classList, type 수정 예정

  const [classView, setClassView] = useState(false);
  const classListRef = useRef(null);

  useClickAway(classListRef, () => {
    setClassView(false);
  });

  return (
    <dl className="flex w-60 flex-col justify-evenly gap-3 p-3 shadow-float">
      <dt
        className={`flex justify-between text-xl font-bold  ${
          used ? 'text-[#969696]' : 'text-main-color'
        }`}
      >
        {discount + unit}
        <button className="h-5 rounded-md bg-sub-color4 px-1 text-sm text-[#969696]">
          삭제
        </button>
      </dt>
      <dd className={`flex flex-col text-sm ${used && 'text-[#969696]'}`}>
        <div className="truncate">{title}</div>
        {startAt} - {endAt}
        <span
          ref={classListRef}
          className="relative cursor-pointer text-sub-color2 underline underline-offset-4"
          onClick={() => setClassView((prev) => !prev)}
        >
          {used ? `${classList[0]}` : `적용 가능한 클래스(${classList.length})`}
          {/* 수정 예정 */}
          {classView && (
            <div className="absolute top-4 z-10 flex min-w-[16rem] flex-col border border-solid border-sub-color2 bg-white text-black">
              {classList.map(({ className, classLink }, index) => (
                <Link
                  key={classLink + index}
                  href={classLink}
                  className="border-b border-solid border-sub-color2 px-4 py-2 hover:bg-sub-color4"
                >
                  {className}
                </Link>
              ))}
            </div>
          )}
        </span>
      </dd>
    </dl>
  );
};

export default StudentCoupon;
