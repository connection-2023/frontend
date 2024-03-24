'use client';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ApplyButton } from '@/components/Button';
import { IPassInfoForIdData } from '@/types/pass';
import {
  IApplicantInfo,
  IPaymentInfo,
  IReservationInfo,
  PaymentPassInfoParam,
} from '@/types/payment';
import { FetchError } from '@/types/types';
import { ArrowUpSVG } from '@/icons/svg';
import {
  postPaymentInfo,
  postPaymentCancel,
  postPassPaymentClassWithPass,
  postPassPaymentInfo,
} from '@/lib/apis/paymentApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { usePaymentStore, useUserStore } from '@/store';
import { reloadToast } from '@/utils/reloadMessage';

interface ApplySidebarProps {
  postId: string;
  title: string;
  price: number;
  isClass: boolean;
  passInfo?: IPassInfoForIdData;
}

const ApplySidebar = (props: ApplySidebarProps) => {
  const { postId, title, price, isClass, passInfo } = props;
  const [participants, setParticipants] = useState(0);
  const { discountPrice, couponId, stackableCouponId } = usePaymentStore(
    (state) => state.coupon,
  );
  const router = useRouter();
  const { authUser } = useUserStore((state) => ({
    authUser: state.authUser,
  }));
  const { pass } = usePaymentStore((state) => ({ pass: state.pass }));
  const totalPrice = isClass ? price * participants : price;
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

  const validatePaymentInfo = (() => {
    if (isClass && !applyClass) {
      toast.error('하나 이상의 클래스를 추가해주세요!');
      return false;
    }

    if (!applicant) {
      toast.error('예약자 정보를 입력해주세요!');
      return false;
    }

    const isAllFilled = Object.entries(applicant).every(([key, value]) => {
      if (key === 'requests') {
        return true;
      }
      return value;
    });

    if (!isAllFilled) {
      toast.error('예약자 정보를 입력해주세요!');
      return false;
    }

    return true;
  })();

  const scrollToBuyerInfo = () => {
    const element = document.getElementById('buyerInfo');

    if (element)
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handlePaymentInfo = async (
    paymentData: IPaymentInfo | PaymentPassInfoParam,
  ) => {
    const paymentInfo = isClass
      ? await postPaymentInfo(paymentData as IPaymentInfo)
      : await postPassPaymentInfo(paymentData as PaymentPassInfoParam);
    const { orderId, orderName } = paymentInfo;

    const customerName =
      'representative' in paymentData
        ? paymentData.representative
        : authUser!.name;
    const customerEmail =
      'representative' in paymentData ? '' : authUser!.email;

    if (orderId && orderName) {
      await paymentWidget?.requestPayment({
        orderId,
        orderName,
        customerName,
        customerEmail,
        successUrl: `${window.location.origin}/order/complete`,
        failUrl: `${window.location.origin}/order/fail`,
      });
    } else {
      throw new Error('undefined paymentInfo');
    }
  };

  const payForClassWithPass = async (paymentData: IPaymentInfo) => {
    const postAction = async (paymentData: IPaymentInfo) => {
      await postPassPaymentClassWithPass(paymentData);
    };

    await handlePaymentAction(postAction, paymentData.orderId, paymentData);

    reloadToast('클래스 신청 완료', 'success');
    router.push('/mypage/user/myclass/apply?view=calendar');
  };

  const handlePaymentAction = async (
    paymentAction:
      | ((paymentData: IPaymentInfo | PaymentPassInfoParam) => Promise<void>)
      | ((paymentData: IPaymentInfo) => Promise<void>),
    uniqueOrderId: string,
    paymentData: IPaymentInfo | PaymentPassInfoParam,
  ) => {
    try {
      await paymentAction(paymentData as IPaymentInfo);
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await paymentAction(paymentData as IPaymentInfo);
          } catch (error) {
            postPaymentCancel(uniqueOrderId);
            console.error(error);
          }
        } else {
          postPaymentCancel(uniqueOrderId);

          toast.error(
            fetchError.status === 400 || fetchError.status === 404
              ? error.message
              : '잘못된 요청 입니다.',
          );
          console.error(error);
        }
      }
    }
  };

  const handlePayment = async () => {
    if (!validatePaymentInfo) {
      scrollToBuyerInfo();
      return;
    }
    const uniqueOrderId = nanoid();

    let paymentData: IPaymentInfo | PaymentPassInfoParam;

    if (isClass) {
      const { representative, phoneNumber, requests } =
        applicant as IApplicantInfo;

      paymentData = {
        lectureId: postId,
        orderName: title,
        orderId: uniqueOrderId,
        lectureSchedule: applyClass as IReservationInfo,
        originalPrice: totalPrice,
        finalPrice,
        representative,
        phoneNumber,
        requests,
      };

      if (pass) {
        paymentData.passId = pass.lecturePassId;
      } else {
        paymentData.couponId = couponId;
        paymentData.stackableCouponId = stackableCouponId;
      }
    } else {
      const { id, title, price } = passInfo as IPassInfoForIdData;

      paymentData = {
        passId: id,
        orderName: title,
        orderId: uniqueOrderId,
        originalPrice: price,
        finalPrice: price,
      };
    }

    const paymentAction = pass ? payForClassWithPass : handlePaymentInfo;

    await handlePaymentAction(paymentAction, uniqueOrderId, paymentData);
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
        {!!pass && (
          <li className="flex items-center justify-between pl-4 text-gray-300">
            ㄴ 패스권사용 <span>{totalPrice.toLocaleString()}원</span>
          </li>
        )}
      </ul>

      <div className="mb-2 flex items-center justify-between font-bold">
        <p>최종 결제 금액</p>
        <span className="min-w-[2rem] text-2xl text-black">
          {!!pass ? 0 : finalPrice.toLocaleString()}원
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
