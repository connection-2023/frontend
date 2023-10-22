import { useForm } from 'react-hook-form';
import CouponOption from '@/components/Coupon/CouponOption/CouponOption';
import { CouponData } from '@/types/coupon';

interface CouponCreatorProps {
  changeCouponList: (couponOption: CouponData) => void;
  isCouponSectionOpen: boolean;
}

const CouponCreator = ({
  isCouponSectionOpen,
  changeCouponList,
}: CouponCreatorProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
    trigger,
  } = useForm<CouponData>();

  const onValid = (data: CouponData) => {
    console.log(data);
    // 추후 토스트 메시지 추가 예정
    changeCouponList(data);
  };

  const invalid = (data: any) => {
    console.log(data, '실패');
    // 추후 토스트 메시지 추가 예정
  };

  return (
    <form
      onSubmit={handleSubmit(onValid, invalid)}
      className={`${!isCouponSectionOpen ? 'hidden' : ''} relative`}
    >
      <CouponOption
        register={register}
        control={control}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
        errors={errors}
        trigger={trigger}
      />
      <button className="absolute bottom-0 right-5 h-7 w-[5.375rem] rounded-md bg-sub-color1 text-white">
        생성하기
      </button>
    </form>
  );
};

export default CouponCreator;