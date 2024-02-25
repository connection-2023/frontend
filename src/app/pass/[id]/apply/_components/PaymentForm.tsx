'use client';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import { ArrowUpSVG } from '@/icons/svg';
import { postPassPaymentInfo } from '@/lib/apis/paymentApis';
import { usePaymentStore, useUserStore } from '@/store';
import ApplyButton from '@/components/Button/ApplyButton';

const PaymentForm = () => {
  const { authUser } = useUserStore((state) => ({
    authUser: state.authUser,
  }));

  const { paymentWidget, paymentMethodsWidget } = usePaymentStore((state) => ({
    paymentWidget: state.paymentWidget,
    paymentMethodsWidget: state.paymentMethodsWidget,
  }));

  const handlePayment = async () => {
    if (!authUser?.name && !authUser?.phoneNumber) {
      toast.error('구매자 정보를 입력해주세요!');
      return;
    }

    const orderId = nanoid();

    const paymentData = {
      orderId,
      passId: 11,
      orderName: 'qqq',
      originalPrice: 2222,
      finalPrice: 2222,
    };

    try {
      const paymentInfo = await postPassPaymentInfo(paymentData);
      console.log(paymentInfo);
      const { orderId, orderName } = paymentInfo;

      // if (orderId && orderName) {
      //   await paymentWidget?.requestPayment({
      //     orderId,
      //     orderName,
      //     customerName: representative,
      //     customerEmail: '',
      //     successUrl: `${window.location.origin}/class/${postId}/apply/complete`,
      //     failUrl: `${window.location.origin}/fail`,
      //   });
      // } else {
      //   toast.error(paymentInfo);
      // }
    } catch (error) {
      // if (error instanceof Error && error.message) {
      //   postPaymentCancel(orderId);
      //   toast.error(error.message);
      // }
    }
  };

  return (
    <>
      <ul className="gap-2">
        <li className="flex items-center">
          <p className="flex-1">약관 동의</p>
          <button aria-label="자세히보기">
            <ArrowUpSVG
              className={`h-[34px] w-[34px] fill-gray-500 ${
                false ? '' : 'rotate-180'
              }`}
            />
          </button>
        </li>
        <li className="flex items-center">
          <p className="flex-1">약관 동의</p>
          <button aria-label="자세히보기">
            <ArrowUpSVG
              className={`h-[34px] w-[34px] fill-gray-500 ${
                false ? '' : 'rotate-180'
              }`}
            />
          </button>
        </li>
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
                {'100000'.toLocaleString()}원 결제하기
              </p>
            </>
          }
          onClick={handlePayment}
        />
      </div>
    </>
  );
};

export default PaymentForm;
