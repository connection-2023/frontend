import Image from 'next/image';
import Link from 'next/link';
import { ButtonStyles } from '@/constants/constants';
import failImage from '@/images/fail.png';
import wavyLine from '@/images/wavy.png';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connection | 주문 실패',
  description: 'Connection 주문에 실패하였습니다..',
};

const OrderFail = ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const { message } = searchParams;

  return (
    <main className="mx-auto flex w-screen flex-1 flex-col items-center justify-center overflow-hidden pb-24 md:pb-0">
      <figure className="mb-6 mt-9">
        <Image
          src={failImage}
          alt="주문 실패 이미지"
          width={106}
          height={121}
          sizes="100vw"
        />
      </figure>

      <h1 className="mb-4 text-center text-2xl font-bold">
        주문이 정상적으로 <br className="sm:hidden" /> 완료되지 않았습니다.
      </h1>

      <h2 className="mb-4 text-base font-semibold">
        결제 실패사유: <span className="text-sub-color1">{message}</span>
      </h2>

      <Image src={wavyLine} alt="wavy-line" />

      <p className="mb-9 mt-4 w-60 break-keep text-center text-sm font-medium md:w-full md:max-w-sm">
        이용에 불편을 드려 죄송합니다.
        <br />
        시스템 문제로 신청 실패가 계속 될 경우 커넥션 카카오톡 채널톡 혹은
        이메일(connecntion@gmail.com)로 문의 주시면 확인 도와드리겠습니다.
      </p>

      <div className="mb-8 grid w-full grid-cols-1 gap-4 whitespace-nowrap px-3.5 text-lg font-semibold sm:w-[430px] sm:grid-cols-2">
        <Link
          href="/"
          className="flex h-11 w-full items-center justify-center rounded-md border border-solid text-gray-300 hover:text-black sm:h-9"
        >
          홈으로 가기
        </Link>
        <Link
          href="/"
          className={
            '-order-1 h-11 ' + ButtonStyles.secondary + ' sm:order-none sm:h-9'
          }
        >
          다시 신청하기
        </Link>
      </div>
    </main>
  );
};

export default OrderFail;
