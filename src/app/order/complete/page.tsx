import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { BANK_CODE_TO_NAME } from '@/constants/constants';
import { ApplySuccessSVG } from '@/icons/svg';
import wavyLine from '@/images/wavy.png';
import {
  patchPaymentConfirm,
  getPaymentInfo,
} from '@/lib/apis/serverApis/paymentsApis';
import {
  formatKoreanDateTime,
  formatFullDateTime,
  formatDateTimeNoSec,
} from '@/utils/dateTimeUtils';
import { IPaymentConfirmRequest } from '@/types/payment';

const ApplyCompletePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { orderId, paymentKey, amount } = searchParams;

  const paymentInfo: IPaymentConfirmRequest = {
    orderId,
    paymentKey,
    amount,
  };

  const { statusCode, error, message } = await patchPaymentConfirm(paymentInfo);

  if (statusCode !== 200 && error !== 'AlreadyApproved') throw Error(message);

  const PaymentData = await getPaymentInfo(orderId);

  if (!PaymentData) return null;

  const {
    orderName,
    originalPrice,
    finalPrice,
    updatedAt,
    paymentMethod,
    reservation,
    cardPaymentInfo,
    virtualAccountPaymentInfo,
    paymentProductType,
  } = PaymentData;

  const isClass = paymentProductType.name === '클래스';
  const isBankTransfer = paymentMethod.name === '가상계좌';

  const basicPaymentInfo = [
    {
      type: isClass ? '클래스' : '패스권',
      content: orderName,
    },
    isClass
      ? {
          type: '신청내역',
          content: reservation?.lectureSchedule
            ? `${formatKoreanDateTime(
                reservation?.lectureSchedule.startDateTime,
              )} ${reservation?.lectureSchedule.numberOfParticipants}명`
            : reservation?.regularLectureStatus
            ? `${reservation?.regularLectureStatus.day.join(',')} ${reservation
                ?.regularLectureStatus.dateTime} ${reservation
                ?.regularLectureStatus.numberOfParticipants}명`
            : null,
        }
      : {},
    {
      type: '총 금액',
      content: `${originalPrice.toLocaleString()}원`,
    },
    {
      type: '결제일시',
      content: formatFullDateTime(updatedAt),
    },
    {
      type: '결제방식',
      content: paymentMethod.name,
    },
  ];

  const accountsInfo =
    (virtualAccountPaymentInfo && [
      {
        type: '입금금액',
        content: `${finalPrice.toLocaleString()}원`,
      },
      {
        type: '입금계좌',
        content: `${BANK_CODE_TO_NAME[virtualAccountPaymentInfo.bankCode]} (${
          virtualAccountPaymentInfo.accountNumber
        })`,
      },
      {
        type: '예금주',
        content: virtualAccountPaymentInfo.customerName,
      },
      {
        type: '입금기한',
        content: `~${formatDateTimeNoSec(virtualAccountPaymentInfo.dueDate)}`,
      },
    ]) ||
    [];

  const paymentsInfo = [
    {
      type: '승인번호',
      content: cardPaymentInfo?.approveNo,
    },
    {
      type: '결제금액',
      content: `${finalPrice.toLocaleString()}원`,
    },
    {
      type: '영수증',
      content: (
        <Link
          href={
            isClass
              ? `/receipt?orderId=${orderId}`
              : `/receipt?orderId=${orderId}&type=pass`
          }
          className="underline underline-offset-2"
          scroll={false}
        >
          영수증 보기
        </Link>
      ),
    },
  ];

  const additionalInfo = isBankTransfer ? accountsInfo : paymentsInfo;
  const applicationDetails = [...basicPaymentInfo, ...additionalInfo];

  const orderStatus = (() => {
    if (isClass) {
      return isBankTransfer
        ? '입금 확인 후 신청이 확정됩니다'
        : '클래스 신청이 완료되었습니다';
    } else {
      return isBankTransfer
        ? '입금 확인 후 구매가 확정됩니다'
        : '패스권 구매가 완료되었습니다';
    }
  })();

  return (
    <main className="mx-auto flex w-full max-w-[40rem] flex-1 flex-col items-center whitespace-nowrap">
      <ApplySuccessSVG
        className={`mb-5 mt-6 ${
          isBankTransfer ? 'fill-gray-900' : 'fill-main-color'
        }`}
      />
      <h1 className="mb-6 text-2xl font-bold">{orderStatus}</h1>

      <Image src={wavyLine} alt="wavy-line" />

      <ul className="mb-6 mt-4 grid grid-cols-[min-content_minmax(max-content,_1fr)] gap-x-4 gap-y-3 px-4 text-sm font-normal">
        {applicationDetails.map(
          (detail, index) =>
            Object.keys(detail).length > 0 && (
              <Fragment key={index}>
                <li className="flex w-fit font-semibold">{detail.type}</li>
                <li>{detail.content}</li>
                {index === 2 || index === 4 ? (
                  <hr className="col-span-2 my-2 border-dashed border-gray-500" />
                ) : null}
              </Fragment>
            ),
        )}
      </ul>

      <Image src={wavyLine} alt="wavy-line" />

      <div className="mt-6  flex h-10 w-full gap-4 px-4 text-lg font-semibold">
        <Link
          href="/mypage/user/payment-history"
          className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-500 text-white"
          prefetch={false}
        >
          결제내역 보기
        </Link>
        <Link
          href={
            isClass ? `/class/${reservation?.lecture.id}` : '/mypage/user/pass'
          }
          className="flex w-full cursor-pointer items-center justify-center rounded-md bg-black text-white"
        >
          확인
        </Link>
      </div>
    </main>
  );
};

export default ApplyCompletePage;
