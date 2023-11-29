import { FieldErrors, useForm } from 'react-hook-form';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { CloseSVG, CouponSVG } from '@/icons/svg';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { createCouponUtils } from '@/utils/createCoupon';
import Button from '@/components/Button/Button';
import UniqueButton from '@/components/Button/UniqueButton';
import CouponOption from '@/components/Coupon/CouponOption/CouponOption';
import { CouponData, couponGET } from '@/types/coupon';

interface CouponCreateModal {
  isOpen: boolean;
  closeModal: () => void;
  type: 'CREATE' | 'UPDATE';
  selectCouponData?: couponGET;
}

const CouponCreateModal = ({
  closeModal,
  isOpen,
  type,
  selectCouponData,
}: CouponCreateModal) => {
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

  const closeModalHandler = () => {
    reset();
    closeModal();
  };

  const onValid = async (data: CouponData) => {
    try {
      if (!window.confirm('쿠폰을 생성하시겠습니까?')) {
        return;
      }

      const resData = await createCouponUtils(data);
      resData.lectureCouponTarget = data.lectureIds;

      reset();
      toast.success('쿠폰 생성 완료');
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

  const invalid = (data: FieldErrors<CouponData>) => {
    console.log(data);

    Object.values(data).forEach(({ message }) => {
      toast.error(message);
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModalHandler}
      style={customModalStyles}
      ariaHideApp={false}
    >
      <header className="mb-4 flex justify-between gap-2 border-b border-gray-500 px-5 pb-4 pt-5">
        <div className="flex items-center gap-2">
          <CouponSVG className="h-6 w-6 fill-black " />
          <h1 className="text-lg font-semibold">
            쿠폰 {type === 'CREATE' ? '생성하기' : '수정/삭제'}
          </h1>
        </div>
        <button onClick={closeModalHandler}>
          <CloseSVG className="h-6 w-6 stroke-gray-300" />
        </button>
      </header>
      <form onSubmit={handleSubmit(onValid, invalid)} className="px-5 pb-7">
        <CouponOption
          register={register}
          control={control}
          getValues={getValues}
          setValue={setValue}
          watch={watch}
          errors={errors}
          trigger={trigger}
          clearErrors={clearErrors}
          defaultValue={selectCouponData}
          type={type}
        />
        <div className="mt-5 flex justify-end gap-2">
          {type === 'UPDATE' && (
            <div className="w-24 font-semibold">
              <UniqueButton size="small">쿠폰 삭제</UniqueButton>
            </div>
          )}
          <div className="w-24 font-semibold">
            <Button type="submit" size="small">
              {type === 'CREATE' ? '생성 하기' : '수정 완료'}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default CouponCreateModal;

const customModalStyles: ReactModal.Styles = {
  content: {
    width: '80%',
    height: 'fit-content',
    maxWidth: '40.0625rem',
    minHeight: '32.8125rem',
    padding: '',
    zIndex: '10',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderColor: 'black',
    boxShadow: '0 1px 4px 1px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'visible',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.50)',
    zIndex: 30,
  },
};
