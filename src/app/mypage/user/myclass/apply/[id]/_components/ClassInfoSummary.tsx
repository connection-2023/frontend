import Link from 'next/link';
import InstructorProfileMenu from '@/components/Profile/InstructorProfileMenu';
import { IApplyDetailResponse } from '@/types/class';
import { formatDateTimeNoSec } from '@/utils/dateTimeUtils';
import { formatPhoneNumber } from '@/utils/parseUtils';

interface IClassInfoSummaryProps extends IApplyDetailResponse {
  type: '원데이' | '정기';
}

const ClassInfoSummary = (props: IClassInfoSummaryProps) => {
  const {
    type,
    lecturer,
    representative,
    participants,
    phoneNumber,
    payment,
    lectureSchedule,
  } = props;
  const { id, nickname, profileCardImageUrl } = lecturer;

  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-3.5 gap-y-2.5 font-semibold">
      <p>강사</p>
      <InstructorProfileMenu
        instructorId={id}
        nickname={nickname}
        profileImg={profileCardImageUrl}
        profileSize="xsmall"
      />
      {type === '원데이' && lectureSchedule && (
        <>
          <p>수업일정</p>
          <p className="font-normal">
            {formatDateTimeNoSec(lectureSchedule?.startDateTime)}
          </p>
        </>
      )}
      <p>대표자</p>
      <p className="font-normal">{representative}</p>
      <p>신청인원</p>
      <p className="font-normal">{participants}명</p>
      <p>대표 연락처</p>
      <p className="font-normal">{formatPhoneNumber(phoneNumber)}</p>

      <p>결제금액</p>
      <p>
        <Link
          href={`/receipt?orderId=${payment.orderId}`}
          className="font-normal text-gray-100 underline"
        >
          {payment.finalPrice.toLocaleString()}원
        </Link>
        <span className="ml-2 text-gray-500">
          {payment.paymentMethod.name}결제
        </span>
      </p>
    </div>
  );
};

export default ClassInfoSummary;
