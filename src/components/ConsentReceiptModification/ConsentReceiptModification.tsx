'use client';
import Button from '@/components/Button/Button';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../Modal/Modal';

// 현재 동의 현황 Props로 받은 후
const ConsentReceiptModification = () => {
  const [modalView, setModalView] = useState(false);
  const [termsOfServiceAgreement, setTermsOfServiceAgreement] = useState('');
  const currentConsentReceipt = useRef(); // 추후 변경 됐는지 확인 용
  const { handleSubmit, register } = useForm();

  const consentReceiptList = [
    {
      dataName: '데이터 타입 추후 react-hook-form',
      label: '알림톡 수신 동의',
      termsOfServiceAgreement: '약관 동의 내용',
    },
  ];

  const openModal = (termsOfServiceAgreement: string) => {
    setTermsOfServiceAgreement(termsOfServiceAgreement);
    setModalView(true);
  };

  const closeModal = () => {
    setModalView(false);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  return (
    <>
      <article className="flex w-full flex-shrink-0 flex-col self-start whitespace-nowrap rounded-md bg-white p-5 px-5 py-6 shadow-vertical lg:w-80">
        <ul className="mb-5 flex flex-col gap-5 px-1">
          <h1 className="text-xl font-bold">알림/이메일 수신 동의</h1>
          {consentReceiptList.map(
            ({ dataName, label, termsOfServiceAgreement }) => (
              <li key={dataName} className="mb-1 flex items-center gap-3">
                <input
                  id={dataName}
                  type="checkbox"
                  className="h-[18px] w-[18px] accent-black"
                  {...register(dataName)}
                />
                <label htmlFor={dataName} className="cursor-pointer text-sm">
                  {label}
                </label>
                <button
                  className="text-gray-500 underline"
                  onClick={() => openModal(termsOfServiceAgreement)}
                >
                  보기
                </button>
              </li>
            ),
          )}
        </ul>
        <form
          className="w-full sm:ml-auto sm:w-28 lg:w-full"
          onClick={handleSubmit(onSubmit)}
        >
          <Button type="submit" color="secondary" disabled={true}>
            적용하기
          </Button>
        </form>
      </article>
      <Modal isOpened={modalView} handleClosed={closeModal}>
        {termsOfServiceAgreement}
      </Modal>
    </>
  );
};

export default ConsentReceiptModification;
