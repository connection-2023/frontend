import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createNewCoupon } from '@/lib/apis/couponApis';
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
    await createNewCoupon(createData);
  };

  const onValid = (data: CouponData) => {
    createCoupon(data);
    toast.success('쿠폰 생성 완료');
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
