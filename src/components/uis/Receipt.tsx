import { Fragment } from 'react';
import { ISSUER_CODE } from '@/constants/constants';
import { getPaymentInfo } from '@/lib/apis/serverApis/paymentsApis';
import { formatFullDateTime } from '@/utils/dateTimeUtils';

const Receipt = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { orderId, type: searchType } = searchParams;
  const receiptData = await getPaymentInfo(orderId);
  if (receiptData instanceof Error) return;

  const type = searchType === 'pass' ? '패스권' : '클래스';

  const {
    orderName,
    updatedAt,
    originalPrice,
    finalPrice,
    cardPaymentInfo,
    paymentCouponUsage,
  } = receiptData;

  const issuer = cardPaymentInfo ? ISSUER_CODE[cardPaymentInfo.issuerCode] : '';
  // 무통장, 패스권일 때 로직 추가 예정
  const paymentDetails = [
    {
      type: `${type}명`,
      content: orderName,
    },
    {
      type: '승인일시',
      content: formatFullDateTime(updatedAt),
    },
    {
      type: '승인번호',
      content: cardPaymentInfo?.approveNo,
    },
    {
      type: '결제수단',
      content: `${issuer} (${cardPaymentInfo?.number.slice(-4)})`,
    },
    {
      type: '결제구분',
      content:
        cardPaymentInfo?.installmentPlanMonths === 0
          ? '일시불'
          : cardPaymentInfo?.installmentPlanMonths,
    },

    {
      type: `${type} 금액`,
      content: `${originalPrice.toLocaleString()} 원`,
    },
  ];

  // 쿠폰 관련 추후 수정 필요
  const couponDetails = paymentCouponUsage
    ? {
        type: '적용 쿠폰',
        content: (
          <>
            - {paymentCouponUsage?.couponDiscountPrice?.toLocaleString()}원{' '}
            <br />({paymentCouponUsage.couponTitle})
            {paymentCouponUsage.stackableCouponDiscountPrice &&
            paymentCouponUsage.stackableCouponTitle ? (
              <>
                <br />-
                {paymentCouponUsage.stackableCouponDiscountPrice.toLocaleString()}
                원 <br />({paymentCouponUsage.stackableCouponTitle})
              </>
            ) : null}
          </>
        ),
      }
    : {};

  const receiptDetails = [...paymentDetails, couponDetails];

  return (
    <div className="relative m-auto box-border flex h-[560px] flex-col items-center leading-normal">
      <h1 className="mb-1 text-lg font-semibold">Connection</h1>
      <p className="text-sm font-semibold text-gray-300">{orderId}</p>
      <hr className="my-4 w-full border-main-color" />

      <ul className="mt-4 grid w-full grid-cols-[min-content_minmax(auto,_1fr)] items-baseline gap-y-2 text-sm font-normal">
        {receiptDetails.map((detail, index) => (
          <Fragment key={index}>
            <li className="flex w-fit whitespace-nowrap text-gray-300">
              {detail.type}
            </li>
            <li className="break-words text-right">{detail.content}</li>
            {index === 0 || index === 4 ? (
              <hr className="col-span-2 my-2 border-dashed border-gray-500" />
            ) : null}
          </Fragment>
        ))}
      </ul>

      <div className="mb-6 mt-6 flex w-full items-center justify-between">
        <p className="whitespace-nowrap text-lg font-semibold">총 결제금액</p>
        <p className="whitespace-pre-wrap break-words text-right text-2xl font-semibold text-main-color">
          {finalPrice.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default Receipt;
