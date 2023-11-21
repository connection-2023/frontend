import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CloseSVG, ArrowUpSVG } from '@/icons/svg';
import { IMyPaymentInfo } from '@/types/types';

interface PaymentListProps extends IMyPaymentInfo {
  handlePaymentDelete: (id: number) => void;
}

const PaymentList = ({
  orderId,
  id,
  type,
  status,
  paymentDate,
  image,
  count,
  title,
  classTime,
  price,
  handlePaymentDelete,
}: PaymentListProps) => {
  const router = useRouter();
  const isClass = type === 'class';
  const textStyles =
    status === '입금대기' ? 'underline text-sub-color1' : 'text-gray-300';

  const handleNavigateToDetail = () => {
    router.push(`/${id}`);
  };

  return (
    <div className="relative w-full rounded-md bg-white px-3.5 py-3 font-medium shadow-vertical">
      <button
        onClick={() => handlePaymentDelete(orderId)}
        className="absolute right-2.5 top-3"
      >
        <CloseSVG width="24" height="24" className="stroke-gray-500 stroke-2" />
      </button>
      <p className={`mb-2.5 text-lg font-semibold ${textStyles}`}>{status}</p>
      <div className="flex gap-3.5 text-sm">
        <figure
          onClick={handleNavigateToDetail}
          className="relative h-[5.5rem] w-[8.5rem] overflow-hidden rounded-md"
        >
          <Image
            src={image}
            fill
            alt="회원 결제내역 이미지"
            className="object-cover"
          />
        </figure>

        <ul className="flex flex-col gap-1">
          <li className="text-gray-300">결제일 {paymentDate}</li>
          <li>
            <span>({count}회)</span>
            {title}
          </li>
          {isClass && <li>{classTime}</li>}
          <li className={`${!isClass && 'mt-5'} flex items-center gap-2.5`}>
            <span className="text-lg font-semibold">
              ₩{price.toLocaleString()}
            </span>
            <Link
              href={`/receipt/${orderId}`}
              className="flex items-center text-sub-color1"
            >
              영수증보기
              <ArrowUpSVG
                width="17"
                height="17"
                className="rotate-90 fill-sub-color1"
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PaymentList;
