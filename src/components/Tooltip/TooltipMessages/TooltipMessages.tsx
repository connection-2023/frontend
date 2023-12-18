import { useRef } from 'react';
import { TooltipSVG } from '@/icons/svg';
import Button from '@/components/Button/Button';

interface ITooltip {
  setShow?: () => void;
}

export const CouponDuplicationTooltip = ({ setShow }: ITooltip) => {
  const dlStyle = 'row-span-2 flex flex-col gap-1 font-semibold ';
  const ddStyle = (possible: boolean) => {
    return `flex w-40 py-3 sm:h-[2.68rem] rounded-md sm:rounded-none sm:w-[11.68rem] items-center justify-center border border-solid ${
      possible ? 'border-sub-color1' : 'border-gray-300 sm:border-sub-color1'
    }`;
  };

  return (
    <div className="z-20 m-4 grid w-9/12 grid-rows-1 justify-items-center gap-3 text-sm sm:h-[12.25rem] sm:w-[26.82rem] sm:grid-rows-3 sm:gap-0">
      <dl className="col-span-2 gap-1 justify-self-start">
        <dt className="flex items-center gap-1 text-lg font-semibold sm:text-sm">
          중복할인쿠폰<p className="hidden sm:block">(추가 적용 가능)</p>
          <TooltipSVG className="sm:hidden" />
        </dt>
        <dd>
          하나의 클래스에는 하나의 쿠폰만 사용할 수 있지만,
          <br />
          중복 적용 쿠폰은 일반 쿠폰과 함께 사용할 수 있습니다.
        </dd>
      </dl>
      <dl className={dlStyle}>
        <dt className="text-sub-color1">가능</dt>
        <dd className={ddStyle(true)}>일반쿠폰</dd>
        <dd className={ddStyle(true)}>중복쿠폰 + 일반쿠폰</dd>
      </dl>
      <dl className={dlStyle}>
        <dt className="text-sub-color1">불가능</dt>
        <dd className={ddStyle(false)}>일반쿠폰 + 일반쿠폰</dd>
        <dd className={ddStyle(false)}>중복쿠폰 + 중복쿠폰</dd>
      </dl>
      <div className="col-span-2 block w-full sm:hidden">
        <Button color="secondary" size="large" onClick={setShow}>
          확인
        </Button>
      </div>
    </div>
  );
};

export const MaxDiscountTooltip = ({ setShow }: ITooltip) => {
  return (
    <dl className="m-4 flex flex-col gap-1 whitespace-nowrap text-sm">
      <dt className="font-semibold">최대할인 금액</dt>
      <dd>
        쿠폰을 사용할 때 받을 수 있는 할인의 최대 금액입니다.
        <br />
        해당 금액 이상으로는 할인 받을 수 없습니다.
      </dd>
      <div className="col-span-2 block w-full sm:hidden">
        <Button color="secondary" onClick={setShow}>
          확인
        </Button>
      </div>
    </dl>
  );
};

export const PrivateTooltip = ({ setShow }: ITooltip) => {
  return (
    <dl className="m-4 flex flex-col gap-1 whitespace-nowrap text-sm">
      <dt className="font-semibold">일부공개 쿠폰</dt>
      <dd>
        쿠폰의 링크를 공유 받은 회원은
        <br />
        공유된 링크를 통해서
        <br />이 쿠폰을 다운받고 사용할 수 있습니다.
      </dd>
      <div className="col-span-2 block w-full sm:hidden">
        <Button color="secondary" onClick={setShow}>
          확인
        </Button>
      </div>
    </dl>
  );
};

export const LocationDiscussionTooltip = () => {
  return (
    <div className="flex h-14 w-96 items-center justify-center text-sm">
      수업 장소가 특정하지 않을 경우(온라인, 방문수업 등)
      <br />
      가능한 지역을 선택 후 하단에 자세한 설명을 적어주세요.
    </div>
  );
};
