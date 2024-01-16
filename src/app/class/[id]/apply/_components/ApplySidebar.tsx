'use client';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApplyButton from '@/components/Button/ApplyButton';
import { ArrowDownSVG } from '@/icons/svg';
import { postPaymentInfo, postPaymentCancel } from '@/lib/apis/paymentApis';
import { usePaymentStore } from '@/store';

interface ApplySidebarProps {
  postId: string;
  title: string;
  price: number;
  handleAccountInfoSubmit: () => void;
}

const ApplySidebar = ({
  postId,
  title,
  price,
  handleAccountInfoSubmit,
}: ApplySidebarProps) => {
  const [participants, setParticipants] = useState(0);
  const orderId = nanoid();
  const totalPrice = price * participants;
  const discountPrice = usePaymentStore((state) => state.discountPrice);
  const applyClass = usePaymentStore((state) => state.applyClass);
  const applicant = usePaymentStore((state) => state.applicant);

  useEffect(() => {
    if (applyClass) {
      const newParticipants = applyClass.reduce(
        (sum, schedule) => sum + schedule.participants,
        0,
      );
      if (participants !== newParticipants) {
        setParticipants(newParticipants);
      }
    }
  }, [JSON.stringify(applyClass)]);

  const handlePayment = async () => {
    handleAccountInfoSubmit();
    if (!applyClass) {
      toast.error('하나 이상의 클래스를 추가해주세요!');
      return;
    }

    if (!applicant) {
      toast.error('예약자 정보를 입력해주세요!');
      return;
    }

    const isAllFilled = Object.entries(applicant).every(([key, value]) => {
      if (key === 'requests') {
        return true;
      }
      return value;
    });

    if (!isAllFilled) {
      toast.error('예약자 정보를 입력해주세요!');
      return;
    }

    const { representative, phoneNumber, requests } = applicant;

    const paymentData = {
      lectureId: postId,
      orderName: title,
      orderId,
      lectureSchedules: applyClass,
      originalPrice: totalPrice,
      finalPrice: totalPrice,
      representative,
      phoneNumber,
      requests,
    };

    // try {
    //   const paymentInfo = await postPaymentInfo(paymentData);
    //   const { orderId, orderName } = paymentInfo;

    //   if (orderId && orderName) {
    //   } else {
    //     toast.error(paymentInfo);
    //   }
    // } catch (error) {
    //   if (error instanceof Error && error.message) {
    //     postPaymentCancel(orderId);
    //     toast.error(error.message);
    //   }
    // }
  };

  return (
    <section className="sticky top-20 mt-5 flex flex-col whitespace-pre-line break-keep px-3.5 text-sm text-gray-100 lg:mt-14 lg:px-0">
      <h4 className="text-lg font-bold">결제 금액</h4>
      <ul className="mb-5 mt-6 flex flex-col gap-3 border-b border-solid border-gray-500 pb-[0.81rem]">
        <li className="flex items-center justify-between">
          주문 금액
          <span className="min-w-[1.25rem]">
            {totalPrice.toLocaleString()}원
          </span>
        </li>
        {!!discountPrice && (
          <li className="flex items-center justify-between pl-4 text-gray-300">
            ㄴ 쿠폰사용 <span>{discountPrice?.toLocaleString()}원</span>
          </li>
        )}
        <li className="text-sm font-medium text-sub-color1">
          (노쇼 위약금을 제외한 수강금액은 수업 강사에게 직접 결제하시면
          됩니다.)
        </li>
      </ul>

      <div className="mb-2 flex items-baseline justify-between font-bold">
        <p>최종 결제 금액</p>
        <div className="flex flex-col">
          <p className="text-right font-medium text-main-color">노쇼위약금</p>
          <span className="min-w-[2rem] text-2xl text-black">
            {totalPrice.toLocaleString()}원
          </span>
        </div>
      </div>

      <ul className="gap-2">
        <Agreement title="개인정보 제3자 제공고지" detail=" " />
        <Agreement title="전자상거래 구매안전 서비스 안내" detail=" " />
      </ul>

      <p className="mb-4 mt-[1.31rem] font-bold">
        상기 필수약관을 확인하였으며 결제에 동의합니다.
      </p>

      <div className="fixed bottom-4 left-0 w-screen px-9 lg:static lg:w-full lg:px-0">
        <ApplyButton
          label={
            <>
              <p className="hidden lg:block">결제하기</p>
              <p className="lg:hidden">
                {totalPrice.toLocaleString()}원 결제하기
              </p>
            </>
          }
          onClick={handlePayment}
        />
      </div>
    </section>
  );
};

export default ApplySidebar;

interface AgreementProps {
  title: string;
  detail: string;
}

const Agreement = ({ title, detail }: AgreementProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li className="flex items-center">
        <p className="flex-1">{title}</p>
        <button onClick={() => setIsOpen(!isOpen)} aria-label="자세히보기">
          <ArrowDownSVG
            className={`fill-gray-500 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </li>
      {isOpen && (
        <div className="max-h-24 overflow-y-auto">
          개인정보 제3자 제공고지에 대한 자세한 내용...
        </div>
      )}
    </>
  );
};
