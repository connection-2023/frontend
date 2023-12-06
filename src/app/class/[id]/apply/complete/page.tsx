import { parseISO, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { IPaymentConfirmRequest } from '@/types/payment';
import { ApplySuccessSVG, WavyLineSVG } from '@/icons/svg';
import { patchPaymentConfirm } from '@/lib/apis/serverApis/paymentsApis';

const ApplyCompletePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { orderId, paymentKey, amount } = searchParams;
  const cookieStore = cookies();
  const userToken = cookieStore.get('userAccessToken')?.value;

  if (!userToken) return;

  const paymentInfo: IPaymentConfirmRequest = {
    orderId,
    paymentKey,
    amount,
  };

  const PaymentData = await patchPaymentConfirm(userToken, paymentInfo);
  if (PaymentData instanceof Error) return;

  const {
    orderName,
    originalPrice,
    finalPrice,
    updatedAt,
    paymentMethod,
    reservation,
    cardPaymentInfo,
    virtualAccountPaymentInfo,
  } = PaymentData;
  const isBankTransfer = paymentMethod.name === '가상계좌';

  const basicPaymentInfo = [
    {
      type: '클래스',
      content: `${orderName}`,
    },
    {
      type: '신청내역',
      content: reservation.map((info) => {
        const formattedDate = format(
          parseISO(info.lectureSchedule.startDateTime),
          'MM월 dd일 (eee) HH:mm',
          {
            locale: ko,
          },
        );
        return `${formattedDate} ${info.participants}명`;
      }),
    },
    {
      type: '총 금액',
      content: `${originalPrice.toLocaleString()}원`,
    },
    {
      type: '결제일시',
      content: format(parseISO(updatedAt), 'yyyy.MM.dd HH:mm:ss'),
    },
    {
      type: '결제방식',
      content: paymentMethod.name,
    },
  ];

  const accoutsInfo = [
    {
      type: '입금금액',
      content: `${finalPrice.toLocaleString()}원`,
    },
    {
      type: '입금계좌',
      content: `${virtualAccountPaymentInfo?.bank.name} (${virtualAccountPaymentInfo?.accountNumber})`,
    },
    {
      type: '예금주',
      content: `${virtualAccountPaymentInfo?.customerName}`,
    },
    {
      type: '입금기한',
      content: `~${
        virtualAccountPaymentInfo &&
        format(parseISO(virtualAccountPaymentInfo?.dueDate), 'yyyy.MM.dd HH:mm')
      }`,
    },
  ];

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
          href={`/class/apply-complete/receipt?orderId=${orderId}`}
          className="underline underline-offset-2"
        >
          영수증 보기
        </Link>
      ),
    },
  ];

  const applicationDetails = isBankTransfer
    ? [...basicPaymentInfo, ...accoutsInfo]
    : [...basicPaymentInfo, ...paymentsInfo];

  return (
    <div className="flex w-full flex-col items-center whitespace-nowrap">
      <ApplySuccessSVG
        className={`mb-5 mt-6 ${
          isBankTransfer ? 'fill-gray-900' : 'fill-main-color'
        }`}
      />
      <h1 className="mb-6 text-2xl font-bold">
        {isBankTransfer
          ? '입금 확인 후 신청이 확정됩니다'
          : '클래스 신청이 완료되었습니다'}
      </h1>

      <WavyLineSVG />

      <ul className="mb-6 mt-4 grid grid-cols-[min-content_minmax(max-content,_1fr)] gap-x-4 gap-y-3 px-4 text-sm font-normal">
        {applicationDetails.map((detail, index) => (
          <React.Fragment key={index}>
            <li className="flex w-fit font-semibold">{detail.type}</li>
            <li>{detail.content}</li>
            {index === 2 || index === 4 ? (
              <hr className="col-span-2 my-2 border-dashed border-gray-500" />
            ) : null}
          </React.Fragment>
        ))}
      </ul>

      <WavyLineSVG />

      <div className="mt-6 flex h-10 w-full gap-4 text-lg font-semibold">
        <Link
          href="" // 마이페이지 결제 내역으로 가기
          className="flex w-full cursor-pointer items-center justify-center rounded-md bg-gray-500 text-white"
        >
          결제내역 보기
        </Link>
        <Link
          href={`/class/${searchParams.id}`}
          className="flex w-full cursor-pointer items-center justify-center rounded-md bg-black text-white"
        >
          확인
        </Link>
      </div>
    </div>
  );
};

export default ApplyCompletePage;
