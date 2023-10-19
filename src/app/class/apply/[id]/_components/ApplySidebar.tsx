import { useState } from 'react';
import { ArrowDownSVG } from '../../../../../../public/icons/svg';
import { Button } from '@/components/Button/Button';

const ApplySidebar = () => {
  return (
    <section className="sticky top-20 mt-14 flex flex-col whitespace-pre-line break-keep text-sm text-sub-color3">
      <h4 className="text-lg font-bold">결제 금액</h4>
      <ul className="mb-5 mt-6 flex flex-col gap-3 border-b border-solid border-sub-color2 pb-[0.81rem]">
        {/* 금액은 API 연결 시 변경 예정 */}
        <li className="flex items-center justify-between">
          주문 금액 <span>200,000원</span>
        </li>
        <li className="flex items-center justify-between pl-4 text-[#969696]">
          ㄴ 쿠폰사용 <span>30,000원</span>
        </li>
      </ul>

      <div className="mb-2 flex items-center justify-between font-bold">
        <p>최종 결제 금액</p>
        <span className="text-2xl text-black">170,000원</span>
      </div>

      <ul className="gap-2">
        <Agreement title="개인정보 제3자 제공고지" detail=" " />
        <Agreement title="전자상거래 구매안전 서비스 안내" detail=" " />
      </ul>
      <p className="mb-4 mt-[1.31rem] font-bold">
        상기 필수약관을 확인하였으며 결제에 동의합니다.
      </p>
      <Button primary={true} mode="default" size="large" onClick={() => {}}>
        결제하기
      </Button>
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
        <p>{title}</p>
        <button onClick={() => setIsOpen(!isOpen)}>
          <ArrowDownSVG
            className={`fill-sub-color2 ${isOpen ? 'rotate-180' : ''}`}
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
