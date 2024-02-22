'use client';
import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ApplyButton from '@/components/Button/ApplyButton';
import { ArrowUpSVG } from '@/icons/svg';
import { postPaymentInfo, postPaymentCancel } from '@/lib/apis/paymentApis';
import { usePaymentStore } from '@/store';

interface ApplySidebarProps {
  postId: string;
  title: string;
  price: number;
}

const ApplySidebar = ({ postId, title, price }: ApplySidebarProps) => {
  const [participants, setParticipants] = useState(0);
  const { discountPrice, couponId, stackableCouponId } = usePaymentStore(
    (state) => state.coupon,
  );
  const totalPrice = price * participants;
  const finalPrice = discountPrice
    ? Math.max(0, totalPrice - discountPrice)
    : totalPrice;
  const applyClass = usePaymentStore((state) => state.applyClass);
  const applicant = usePaymentStore((state) => state.applicant);
  const paymentWidget = usePaymentStore((state) => state.paymentWidget);
  const paymentMethodsWidget = usePaymentStore(
    (state) => state.paymentMethodsWidget,
  );

  useEffect(() => {
    if (applyClass) {
      setParticipants(applyClass.participants);
    }
  }, [JSON.stringify(applyClass)]);

  useEffect(() => {
    if (paymentMethodsWidget === null) {
      return;
    }

    paymentMethodsWidget.updateAmount(totalPrice);
  }, [participants, paymentWidget]);

  const handlePayment = async () => {
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

    const uniqueOrderId = nanoid();
    const { representative, phoneNumber, requests } = applicant;
    const paymentData = {
      lectureId: postId,
      orderName: title,
      orderId: uniqueOrderId,
      lectureSchedule: applyClass,
      originalPrice: totalPrice,
      finalPrice,
      representative,
      phoneNumber,
      requests,
      couponId,
      stackableCouponId,
    };

    try {
      const paymentInfo = await postPaymentInfo(paymentData);
      const { orderId, orderName } = paymentInfo;

      if (orderId && orderName) {
        await paymentWidget?.requestPayment({
          orderId,
          orderName,
          customerName: representative,
          customerEmail: '',
          successUrl: `${window.location.origin}/class/${postId}/apply/complete`,
          failUrl: `${window.location.origin}/fail`,
        });
      } else {
        toast.error(paymentInfo);
      }
    } catch (error) {
      if (error instanceof Error && error.message) {
        postPaymentCancel(uniqueOrderId);
        toast.error(error.message);
      }
    }
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
      </ul>

      <div className="mb-2 flex items-center justify-between font-bold">
        <p>최종 결제 금액</p>
        <span className="min-w-[2rem] text-2xl text-black">
          {finalPrice.toLocaleString()}원
        </span>
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
          <ArrowUpSVG
            className={`h-[34px] w-[34px] fill-gray-500 ${
              isOpen ? '' : 'rotate-180'
            }`}
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
