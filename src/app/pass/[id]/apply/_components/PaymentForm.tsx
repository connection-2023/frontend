'use client';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { ArrowUpSVG } from '@/icons/svg';
import { postPassPaymentInfo, postPaymentCancel } from '@/lib/apis/paymentApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { usePaymentStore, useUserStore } from '@/store';
import { ApplyButton } from '@/components/Button';
import { IPassInfoForIdData } from '@/types/pass';
import { FetchError } from '@/types/types';

interface PaymentFormProps {
  passInfo: IPassInfoForIdData;
}

const PaymentForm = ({ passInfo }: PaymentFormProps) => {
  const router = useRouter();

  const { authUser } = useUserStore((state) => ({
    authUser: state.authUser,
  }));

  const { paymentWidget } = usePaymentStore((state) => ({
    paymentWidget: state.paymentWidget,
  }));

  const paymentAction = async (orderId: string) => {
    const paymentData = {
      orderId,
      passId: passInfo.id,
      orderName: passInfo.title,
      originalPrice: passInfo.price,
      finalPrice: passInfo.price,
    };

    const paymentInfo = await postPassPaymentInfo(paymentData);
    const { orderId: reqOrderId, orderName } = paymentInfo;

    if (reqOrderId && orderName) {
      await paymentWidget?.requestPayment({
        orderName,
        orderId: reqOrderId,
        customerName: authUser!.name,
        customerEmail: authUser!.email,
        successUrl: `${window.location.origin}/pass/11/apply/complete`,
        failUrl: `${window.location.origin}/fail`,
      });
    } else {
      throw new Error('undefined paymentInfo');
    }
  };

  const handlePayment = async () => {
    if (!authUser) {
      if (
        confirm(
          '로그인이 필요한 서비스 입니다. 로그인 화면으로 이동 하시겠습니까?',
        )
      ) {
        router.push('/login');
      }
      return;
    }

    if (!authUser?.name && !authUser?.phoneNumber) {
      const element = document.getElementById('buyerInfo');

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      toast.error('구매자 정보를 입력해주세요!');
      return;
    }

    const orderId = nanoid();

    try {
      await paymentAction(orderId);
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await paymentAction(orderId);
          } catch (error) {
            postPaymentCancel(orderId);
            console.error(error);
          }
        } else {
          postPaymentCancel(orderId);

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
                {passInfo.price.toLocaleString()}원 결제하기
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
