'use client';
import { FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CloseSVG, CouponSVG } from '@/icons/svg';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { createCouponUtils } from '@/utils/createCoupon';
import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';
import CouponOption from '@/components/Coupon/CouponOption/CouponOption';
import RouterModal from '@/components/Modal/RouterModal';
import { CouponData, couponGET } from '@/types/coupon';
import { FetchError } from '@/types/types';

interface CouponCreateModalProps {
  searchParams: {
    type: 'CREATE' | 'UPDATE';
    coupon?: string;
  };
}

const CouponCreateModal = ({ searchParams }: CouponCreateModalProps) => {
  const { type, coupon } = searchParams;
  const couponObj = coupon ? (JSON.parse(coupon) as couponGET) : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
    setValue,
    watch,
    trigger,
    clearErrors,
  } = useForm<CouponData>();

  const onValid = async (data: CouponData) => {
    try {
      if (!window.confirm('쿠폰을 생성하시겠습니까?')) {
        return;
      }

      await createCouponUtils(data);

      toast.success('쿠폰 생성 완료');

      window.location.reload();
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
    <RouterModal closeButtonView={false}>
      <div className="h-screen w-screen overflow-auto sm:h-fit sm:w-[640px]">
        <header className="mb-4 flex w-full justify-between gap-2 border-b border-gray-500 px-5 pb-4 pt-5">
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <CouponSVG className="h-6 w-6 fill-black " />
              <h1 className="text-lg font-semibold">
                쿠폰 {type === 'CREATE' ? '생성하기' : '수정/삭제'}
              </h1>
            </div>
            <button>
              <CloseSVG
                width="24"
                height="24"
                className="stroke-gray-500 stroke-2"
              />
            </button>
          </div>
        </header>
        <div className="px-5 pb-7">
          <CouponOption
            register={register}
            control={control}
            getValues={getValues}
            setValue={setValue}
            watch={watch}
            errors={errors}
            trigger={trigger}
            clearErrors={clearErrors}
            defaultValue={couponObj}
            type={type}
          />
          <div className="mt-5 flex justify-end gap-2">
            {type === 'UPDATE' && (
              <div className="w-24 font-semibold">
                <UniqueButton size="small">배포 중지</UniqueButton>
              </div>
            )}
            <form
              onSubmit={handleSubmit(onValid, invalid)}
              className="w-24 font-semibold"
            >
              <Button type="submit" size="small">
                {type === 'CREATE' ? '생성 하기' : '수정 완료'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </RouterModal>
  );
};

export default CouponCreateModal;
