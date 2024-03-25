import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { BANK_CODE_TO_NAME } from '@/constants/constants';
import { CloseSVG, ArrowUpSVG, CopySVG } from '@/icons/svg';
import { getAccountInfo } from '@/lib/apis/paymentApis';
import { formatShortDate, formatDateTimeNoSec } from '@/utils/dateTimeUtils';
import Modal from '@/components/Modal/Modal';
import { IVirtualAccountInfo } from '@/types/payment';
import { IMyPayment } from '@/types/types';

interface PaymentListProps extends IMyPayment {
  // eslint-disable-next-line no-unused-vars
  handlePaymentDelete: (id: number) => void;
}

const PaymentList = (props: PaymentListProps) => {
  const {
    orderId,
    id,
    paymentProductType,
    paymentStatus,
    updatedAt,
    orderName,
    finalPrice,
    reservation,
    handlePaymentDelete,
  } = props;
  const { lectureSchedule, regularLectureStatus } = reservation;
  const [isOpened, setIsOpened] = useState(false);
  const [accountDetail, setAccountDetail] = useState<IVirtualAccountInfo>();
  const router = useRouter();

  const imgSrc = (() => {
    if (lectureSchedule) {
      return lectureSchedule.lecture.imageUrl;
    } else if (regularLectureStatus) {
      return regularLectureStatus.lecture.imageUrl;
    } else {
      return '';
    }
  })();

  const classTime = (() => {
    if (lectureSchedule) {
      return formatDateTimeNoSec(lectureSchedule.startDateTime);
    } else if (regularLectureStatus) {
      return `${regularLectureStatus.day.join(
        '',
      )} ${regularLectureStatus.dateTime[0].slice(0, 5)}`;
    } else {
      return '';
    }
  })();

  const isClass = paymentProductType.name === '클래스';
  const textStyles =
    paymentStatus.name === 'WAITING_FOR_DEPOSIT'
      ? 'underline text-sub-color1 cursor-pointer'
      : 'text-gray-300';

  const handleNavigateToDetail = () => {
    if (lectureSchedule) {
      router.push(`/${lectureSchedule.lecture.id}`);
    }

    if (regularLectureStatus) {
      router.push(`/${regularLectureStatus.lecture.id}`);
    }
  };

  const handleModalOpened = async () => {
    setIsOpened(true);

    const accountData = await getAccountInfo(id);
    if (accountData instanceof Error) return;
    setAccountDetail(accountData);
  };

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('클립보드에 링크가 복사되었습니다!');
    } catch (err) {
      toast.error('링크 복사에 실패하였습니다');
    }
  };

  return (
    <div className="relative w-full rounded-md bg-white px-3.5 py-3 font-medium shadow-vertical">
      <button
        onClick={() => handlePaymentDelete(id)}
        className="absolute right-2.5 top-3"
      >
        <CloseSVG width="24" height="24" className="stroke-gray-500 stroke-2" />
      </button>
      <p
        onClick={
          paymentStatus.name === 'WAITING_FOR_DEPOSIT'
            ? handleModalOpened
            : undefined
        }
        className={`mb-2.5 text-lg font-semibold ${textStyles}`}
      >
        {paymentStatus.name === 'WAITING_FOR_DEPOSIT'
          ? '입금대기'
          : paymentStatus.name === 'CANCELED'
          ? '결제취소'
          : '결제완료'}
      </p>
      <div className="flex gap-3.5 text-sm">
        <figure
          onClick={handleNavigateToDetail}
          className="flex h-28 w-[8.5rem] overflow-hidden rounded-md"
        >
          <Image
            src={imgSrc}
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, 33vw"
            alt="회원 결제내역 이미지"
            className="object-cover"
            style={{ height: 'auto', width: '100%' }}
          />
        </figure>

        <ul className="flex flex-col gap-1">
          <li className="text-gray-300">결제일 {formatShortDate(updatedAt)}</li>
          <li>{orderName}</li>
          {isClass && reservation && (
            <li>{`${classTime} ${reservation.participants}명`}</li>
          )}

          <li className={`${!isClass && 'mt-5'} flex items-center gap-2.5`}>
            <span className="text-lg font-semibold">
              ₩{finalPrice.toLocaleString()}
            </span>
            <Link
              href={`/mypage/user/payment-history/${orderId}`}
              className="flex items-center text-sub-color1"
              prefetch={false}
            >
              결제상세
              <ArrowUpSVG
                width="17"
                height="17"
                className="rotate-90 fill-sub-color1"
              />
            </Link>
          </li>
        </ul>
      </div>

      {isOpened && accountDetail && (
        <Modal isOpened={isOpened} handleClosed={() => setIsOpened(false)}>
          <div className="w-[25.5rem] pb-6 pt-2 text-sm font-normal">
            <div className="flex h-24 flex-col items-center justify-center gap-3.5 border-b border-solid border-gray-700">
              <h3 className="text-lg font-semibold">무통장 입금 안내</h3>
              <p className="flex items-center rounded-l-full bg-main-color-transparent pr-1 font-medium">
                <span className="mr-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-main-color text-base font-semibold text-white">
                  !
                </span>
                기한 내 입금하지 않으실 경우 수강 취소 될 수 있습니다.
              </p>
            </div>
            <section className="mt-3.5 w-full px-6">
              <h4 className="mb-1.5 font-semibold">{orderName}</h4>
              <div>{`${classTime} ${reservation.participants}명`}</div>

              <ul className="mt-4 flex w-full flex-col gap-y-2">
                <li className="flex gap-x-5 whitespace-nowrap">
                  <p className="w-[3.3rem] font-semibold">입금 금액</p>
                  <p>{finalPrice.toLocaleString()}원</p>
                </li>
                <li className="flex gap-5 whitespace-nowrap">
                  <p className="w-[3.3rem] font-semibold">입금계좌</p>
                  <div className="flex flex-col">
                    {BANK_CODE_TO_NAME[accountDetail.bankCode]}
                    <p
                      onClick={() =>
                        handleCopyClipBoard(
                          `${BANK_CODE_TO_NAME[accountDetail.bankCode]} ${
                            accountDetail.accountNumber
                          }`,
                        )
                      }
                      className="flex cursor-pointer items-center"
                    >
                      {accountDetail.accountNumber}
                      <span className="flex items-center text-gray-300">
                        <CopySVG width="16" height="16" className="ml-2 mr-1" />
                        복사하기
                      </span>
                    </p>
                  </div>
                </li>
                <li className="flex gap-5 whitespace-nowrap">
                  <p className="w-[3.3rem] font-semibold">예금주</p>
                  <p>{accountDetail.customerName}</p>
                </li>
                <li className="flex gap-5 whitespace-nowrap">
                  <p className="w-[3.3rem] font-semibold">입금 기한</p>
                  <p>{formatDateTimeNoSec(accountDetail.dueDate)}까지</p>
                </li>
              </ul>
            </section>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default PaymentList;
