import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PlusesSVG } from '@/icons/svg';
import { useClassCreateStore } from '@/store/classCreate';
import CouponSelect from './CouponSelect';
import CouponSelectModal from './CouponSelectModal';
import InstructorCoupon from '@/components/Coupon/Coupon';
import { couponGET } from '@/types/coupon';

interface AppliedCouponDisplayProps {
  isCouponSectionOpen: boolean;
  couponList: couponGET[];
}

const AppliedCouponDisplay = ({
  isCouponSectionOpen,
  couponList,
}: AppliedCouponDisplayProps) => {
  const [modalView, setModalView] = useState(false);
  const { classData } = useClassCreateStore((state) => ({
    classData: state.classData,
  }));

  const { control, setValue } = useFormContext();
  const renderRef = useRef(false);
  const couponOptions = couponList.map((option) => {
    return { value: option, label: option.title };
  });

  const couponSelectDefaultValue = (
    classData?.temporaryLectureCouponTarget?.map(({ lectureCouponId }) =>
      couponOptions.find(({ value }) => value.id === lectureCouponId),
    ) || []
  ).filter(Boolean);

  useEffect(() => {
    if (couponSelectDefaultValue.length > 0 && !renderRef.current) {
      setValue('coupons', couponSelectDefaultValue);
      renderRef.current = true;
    }
  }, [couponSelectDefaultValue]);

  const closeModalHandler = () => {
    setModalView(false);
  };

  return (
    <section>
      <div
        className={`${
          isCouponSectionOpen ? 'sm:flex' : 'hidden '
        } mb-3 gap-10 `}
      >
        <h2 className="mb-3 font-semibold sm:mb-0 sm:w-1/6">적용할 쿠폰</h2>
        <div className="hidden w-5/6 flex-wrap gap-5 sm:flex">
          <div className="w-full">
            <Controller
              name="coupons"
              control={control}
              defaultValue={couponSelectDefaultValue}
              render={({ field }) => (
                <CouponSelect
                  options={couponOptions}
                  onChange={field.onChange}
                  selectValue={field.value}
                />
              )}
            />
          </div>
        </div>
        <button
          type="button"
          onClick={() => setModalView(true)}
          className="flex h-10 w-full items-center justify-between rounded-md border border-solid border-gray-300 p-2 sm:hidden"
        >
          쿠폰 선택하기
          <PlusesSVG className="fill-black" />
        </button>
        {modalView && (
          <CouponSelectModal
            modalView={modalView}
            closeModalHandler={closeModalHandler}
            options={couponOptions}
          />
        )}
      </div>
      <div className="flex flex-wrap gap-4">
        <Controller
          name="coupons"
          control={control}
          defaultValue={[]}
          render={({ field }) => {
            return (
              <>
                {[...field.value]
                  .reverse()
                  .map((coupon: { value: couponGET; label: string }) => {
                    const cancelSelectedCoupon = () => {
                      field.onChange(
                        field.value.filter(
                          (selectedCoupon: {
                            value: couponGET;
                            label: string;
                          }) => selectedCoupon.value.id !== coupon.value.id,
                        ),
                      );
                    };

                    return (
                      <div
                        key={coupon.value.id}
                        className={!isCouponSectionOpen ? 'hidden' : ''}
                      >
                        <InstructorCoupon
                          coupon={coupon.value}
                          cancelSelectedCoupon={cancelSelectedCoupon}
                        />
                      </div>
                    );
                  })}
              </>
            );
          }}
        />
      </div>
    </section>
  );
};

export default AppliedCouponDisplay;
