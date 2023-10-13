import { useForm } from 'react-hook-form';
import CouponOption from '@/components/Coupon/CreateCoupon/CouponOption';

const CouponCreator = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
  } = useForm();

  const onValid = (data: any) => {
    console.log(data);
  };

  const invalid = (data: any) => {
    console.log(data, '실패');
  };

  return (
    <form onSubmit={handleSubmit(onValid, invalid)} className="relative">
      <CouponOption
        register={register}
        control={control}
        getValues={getValues}
        setValue={setValue}
        watch={watch}
      />
      <button className="absolute bottom-0 right-5 h-7 w-[5.375rem] rounded-md bg-sub-color1 text-white">
        생성하기
      </button>
    </form>
  );
};

export default CouponCreator;
