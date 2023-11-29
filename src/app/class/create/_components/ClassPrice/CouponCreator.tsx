import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createNewCoupon } from '@/lib/apis/couponApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { createCouponUtils } from '@/utils/createCoupon';
import CouponOption from '@/components/Coupon/CouponOption/CouponOption';
import { CouponData, createCoupon } from '@/types/coupon';

interface CouponCreatorProps {
  changeCouponList: (couponOption: createCoupon) => void;
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
    reset,
    clearErrors,
  } = useForm<CouponData>();

  const onValid = async (data: CouponData) => {
    try {
      const resData = await createCouponUtils(data);
      resData.lectureCouponTarget = data.lectureIds;

      reset();
      toast.success('쿠폰 생성 완료');
      changeCouponList(resData);
    } catch (error) {
      if (error instanceof Error && error.message.includes('401')) {
        await accessTokenReissuance();
        await onValid(data);
      } else {
        toast.error('쿠폰 생성 실패, 잠시후 다시 시도해주세요.');
        console.error(error);
      }
    }
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
        clearErrors={clearErrors}
      />
      <button className="absolute bottom-0 right-5 h-7 w-[5.375rem] rounded-md bg-sub-color1 text-white">
        생성하기
      </button>
    </form>
  );
};

export default CouponCreator;
