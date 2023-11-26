import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createNewCoupon } from '@/lib/apis/couponApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import CouponOption from '@/components/Coupon/CouponOption/CouponOption';
import { CouponData, couponGET } from '@/types/coupon';

interface CouponCreatorProps {
  changeCouponList: (couponOption: couponGET) => void;
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

  const createCoupon = async (data: CouponData) => {
    const {
      validityPeriod,
      couponQuantity,
      discountValue,
      maxUsageCount,
      couponDistributionCount,
      lectureIds,
      title,
      maxDiscountAmount,
      isPrivate,
      isStackable,
    } = data;

    const createData = {
      title,
      startAt: new Date(validityPeriod.startDate),
      endAt: new Date(validityPeriod.endDate),
      percentage: couponQuantity === '%' ? Number(discountValue) : undefined,
      discountPrice:
        couponQuantity === '원' ? Number(discountValue) : undefined,
      maxUsageCount: maxUsageCount
        ? undefined
        : Number(couponDistributionCount),
      isPrivate,
      isStackable,
      lectureIds: lectureIds.map(({ value }) => Number(value)),
      maxDiscountPrice: Number(maxDiscountAmount) ?? undefined,
    };

    return await createNewCoupon(createData);
  };

  const onValid = async (data: CouponData) => {
    try {
      const resData = await createCoupon(data);
      resData.lectureCouponTarget = data.lectureIds;

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
      />
      <button className="absolute bottom-0 right-5 h-7 w-[5.375rem] rounded-md bg-sub-color1 text-white">
        생성하기
      </button>
    </form>
  );
};

export default CouponCreator;
