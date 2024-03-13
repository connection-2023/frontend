import Link from 'next/link';
import { getReceipt } from '@/lib/apis/serverApis/paymentsApis';
import {
  formatKoreanDateTime,
  formatFullDateTime,
} from '@/utils/dateTimeUtils';
import BackButton from '@/components/Button/BackButton';

const OrderDetail = async ({
  params: { orderId },
}: {
  params: { orderId: string };
}) => {
  const receiptData = await getReceipt(orderId);
  if (receiptData instanceof Error) return;

  const {
    orderName,
    updatedAt,
    originalPrice,
    finalPrice,
    cardPaymentInfo,
    paymentMethod,
    reservation,
  } = receiptData;

  const orderInfo = [
    { label: '주문자', content: <p>{reservation.representative}</p> },
    { label: '연락처', content: <p>{reservation.phoneNumber}</p> },
    {
      label: '요청사항',
      content: (
        <p>{reservation.requests === '' ? '(없음)' : reservation.requests}</p>
      ),
    },
  ];

  const paymentInfo = [
    {
      label: '클래스',
      content: `${orderName}`,
    },
    {
      label: '신청내역',
      content: `${formatKoreanDateTime(
        reservation.lectureSchedule.startDateTime,
      )} ${reservation.lectureSchedule.numberOfParticipants}명`,
    },
    {
      label: '총 금액',
      content: `${originalPrice.toLocaleString()}원`,
    },
    {
      label: '결제일시',
      content: formatFullDateTime(updatedAt),
    },
    {
      label: '결제방식',
      content: paymentMethod?.name,
    },
    {
      label: '승인번호',
      content: cardPaymentInfo?.approveNo,
    },
    {
      label: '결제금액',
      content: `${finalPrice.toLocaleString()}원`,
    },
    {
      label: '영수증',
      content: (
        <Link
          href={`/receipt?orderId=${orderId}`}
          className="text-sub-color1 underline underline-offset-2"
          scroll={false}
        >
          영수증 보기
        </Link>
      ),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[40rem] px-4 xl:mx-0">
      <div className="mb-4 flex items-center border-b border-gray-500 py-2">
        <BackButton size={40} />
        <h2 className="text-2xl font-bold text-gray-100">결제 상세</h2>
      </div>

      <h3 className="mb-3.5 pl-10 text-lg font-semibold">주문자 정보</h3>
      <ul className="mb-4 flex flex-col gap-y-3 border-b border-gray-500 pb-4 pl-10">
        {orderInfo.map((info, index) => (
          <li key={index} className="flex items-center gap-x-5 text-sm">
            <span className="w-14 font-semibold">{info.label}</span>
            <div className="font-medium text-gray-100">{info.content}</div>
          </li>
        ))}
      </ul>

      <h3 className="mb-3.5 pl-10 text-lg font-semibold">결제 정보</h3>
      <div className="mb-4 border-b border-gray-500 pb-4 pl-10">
        <ul className="flex w-fit flex-col gap-y-3">
          {paymentInfo.map((detail, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-5 ${
                index === 2 || index === 4
                  ? 'border-b border-dashed border-gray-500 pb-2'
                  : null
              } text-sm`}
            >
              <span className="w-14 font-semibold">{detail.label}</span>
              <div className="w-fit font-medium text-gray-100">
                {detail.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetail;
