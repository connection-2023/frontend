import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/Button';
import Coupon from '@/components/Coupon/Coupon';
import MobileModal from '@/components/Modal/MobileModal';
import { couponGET } from '@/types/coupon';

interface CouponSelectModalProps {
  modalView: boolean;
  options: {
    value: couponGET;
    label: string;
  }[];
  closeModalHandler: () => void;
}

const CouponSelectModal = ({
  options,
  closeModalHandler,
  modalView,
}: CouponSelectModalProps) => {
  const { setValue, getValues } = useFormContext();

  const [selectCoupons, setSelectCoupon] = useState<
    {
      value: couponGET;
      label: string;
    }[]
  >(getValues('coupons'));

  useEffect(() => {
    setSelectCoupon(getValues('coupons'));
  }, []);

  const selectCouponHandler = (
    selected: boolean,
    coupon: {
      value: couponGET;
      label: string;
    },
  ) => {
    if (selected) {
      const newSelectList = selectCoupons.filter(
        (selectCoupon) => selectCoupon?.value.id !== coupon.value.id,
      );
      return setSelectCoupon(newSelectList);
    }
    setSelectCoupon([...selectCoupons, coupon]);
  };

  const applySelectClass = () => {
    setValue('coupons', selectCoupons);
    closeModalHandler();
  };

  return (
    <MobileModal isOpened={modalView} handleClosed={closeModalHandler}>
      <section className="flex h-full flex-col gap-2 px-3">
        <strong className="text-lg">적용할 쿠폰을 선택해주세요.</strong>
        <ul className="flex h-3/5 flex-col items-center gap-2 overflow-auto py-4">
          {options.map((option) => {
            const { id } = option.value;

            const selected = selectCoupons.some(
              (item) => item?.value.id === id,
            );

            return (
              <li
                key={id}
                onClick={() => selectCouponHandler(selected, option)}
                className={`${
                  selected
                    ? 'rounded-md border-[3px] border-solid border-sub-color1'
                    : ''
                } cursor-pointer`}
              >
                <Coupon coupon={option.value} edit={false} />
              </li>
            );
          })}
        </ul>
        <div className="flex gap-3">
          <Button color="secondary" onClick={closeModalHandler}>
            취소
          </Button>
          <Button onClick={applySelectClass}>적용</Button>
        </div>
      </section>
    </MobileModal>
  );
};

export default CouponSelectModal;
