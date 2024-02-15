import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createNewCoupon } from '@/lib/apis/couponApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { createCouponUtils } from '@/utils/apiDataProcessor';
import CouponOption from '@/components/Coupon/CouponOption/CouponOption';
import { CouponData, createCoupon, createCouponData } from '@/types/coupon';
import { FetchError } from '@/types/types';

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
      if (
        !window.confirm(`쿠폰을 생성을 완료 하겠습니까?
      
      ** 추후 마이페이지 > 쿠폰/패스권 에서 수정 가능 합니다. **
      `)
      ) {
        return;
      }

      const processData = createCouponUtils(data, 'CREATE');

      const resData = await createNewCoupon(processData as createCouponData);
      resData.lectureCouponTarget = data.lectureIds;

      reset();
      toast.success('쿠폰 생성 완료');
      changeCouponList(resData);
    } catch (error) {
      const fetchError = error as FetchError;
      if (fetchError.status === 401) {
        await accessTokenReissuance();
        await onValid(data);
      } else {
        toast.error('쿠폰 생성 실패, 잠시후 다시 시도해주세요.');
        console.error(error);
      }
    }
  };

  const invalid = (data: FieldErrors<CouponData>) => {
    Object.values(data).forEach(({ message }) => {
      toast.error(message);
    });
  };

  return (
    <form onSubmit={handleSubmit(onValid, invalid)} className="relative pb-7">
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
      <button className="absolute -bottom-4 right-5 h-7 w-[5.375rem] rounded-md bg-sub-color1 text-white">
        생성하기
      </button>
    </form>
  );
};

export default CouponCreator;
