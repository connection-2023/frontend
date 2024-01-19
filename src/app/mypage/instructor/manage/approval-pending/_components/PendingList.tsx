'use client';
import { useMutation } from '@tanstack/react-query';
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import { useClickAway } from 'react-use';
import { patchPendingStatus } from '@/lib/apis/instructorApi';
import { formatClassTime } from '@/utils/dateTimeUtils';
import { formatPhoneNumber } from '@/utils/parseUtils';
import ApplicantProfile from './ApplicantProfile';
import DeclineModal from './DeclineModal';
import { IFormValues } from './DeclineModal';
import PaymentInfoModal from './PaymentInfoModal';
import PendingStatusButton from './PendingStatusButton';
import {
  IUpdatePaymentStatusRequestData,
  IApprovePayment,
} from '@/types/instructor';

interface PendingListProps {
  payment: IApprovePayment;
  lectureId: number;
  title: string;
}

const PendingList = ({ payment, lectureId, title }: PendingListProps) => {
  const [isRequestOpened, setIsRequestOpened] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [isDeclineModalOpened, setIsDeclineModalOpened] = useState(false);
  const [isDeclined, setIsDeclined] = useState(false);
  const [isRequestModalOpened, setIsRequestModalOpened] = useState(false);
  const requestRef = useRef(null);

  const { id, user, paymentMethod, finalPrice, reservation } = payment;
  const isRequest = reservation[0].requests.length > 1;
  const classTime = formatClassTime(
    reservation[0].lectureSchedule.startDateTime,
    reservation[0].lectureSchedule.endDateTime,
  );

  const mutation = useMutation({
    mutationFn: (requestData: IUpdatePaymentStatusRequestData) => {
      return patchPendingStatus(requestData);
    },
  });

  useClickAway(requestRef, () => {
    setIsRequestOpened(false);
  });

  const handleDeclineModalStatus = (status: boolean) => {
    setIsDeclineModalOpened(status);
    if (status) setIsRequestModalOpened(false);
  };

  const handleApproveStatus = (status: boolean) => {
    setIsApproved(status);
  };

  const handleSubmitDeclineForm = (data: IFormValues) => {
    // 승인 거절
    const requestStatusData = {
      paymentId: id,
      status: 'REFUSED',
      ...data,
    };

    mutation.mutate(requestStatusData, {
      onError: (error) => {
        toast.error(error.message);
      },

      onSuccess: () => {
        setIsDeclined(true);
        setIsApproved(true);
        toast.success('승인이 거절되었습니다!');
      },
    });
  };

  return (
    <>
      <li className="hidden w-full items-center justify-between md:flex">
        <ApplicantProfile user={user} reservation={reservation} />

        <p className="w-44">{classTime}</p>
        <p className="hidden lg:block">
          {formatPhoneNumber(reservation[0].phoneNumber)}
        </p>
        <p className="hidden lg:block">
          <span className="mr-2 w-14 text-sub-color1">
            {paymentMethod.name}
          </span>
          {`${finalPrice.toLocaleString()}원 (${
            reservation[0].participants
          }명)`}
        </p>

        <button
          onClick={() => setIsRequestModalOpened(true)}
          className="underline lg:hidden"
        >
          결제정보/요청사항
        </button>

        <div className="relative" ref={requestRef}>
          <button
            onClick={() => {
              setIsRequestOpened(!isRequestOpened);
            }}
            className={`hidden ${
              isRequest
                ? 'text-sub-color1'
                : 'pointer-events-none text-gray-300'
            } lg:block`}
          >
            요청사항
          </button>

          {isRequest && isRequestOpened && (
            <div className="absolute right-0 h-[104px] w-[515px] translate-x-[5.5rem] bg-request px-0.5">
              <p className="mt-4 h-[85px] overflow-y-auto whitespace-pre-line break-keep px-2.5 py-2 text-sm font-normal">
                {reservation[0].requests}
              </p>
            </div>
          )}
        </div>

        <PendingStatusButton
          id={id}
          lectureId={lectureId}
          isApproved={isApproved}
          isDeclined={isDeclined}
          handleDeclineModalStatus={handleDeclineModalStatus}
          handleApproveStatus={handleApproveStatus}
        />
      </li>

      {/* 반응형 */}
      <li className="px-3.5 pt-2.5 md:hidden">
        <div className="mb-3 flex w-full justify-between">
          <ApplicantProfile user={user} reservation={reservation} />

          <PendingStatusButton
            id={id}
            lectureId={lectureId}
            isApproved={isApproved}
            isDeclined={isDeclined}
            handleDeclineModalStatus={handleDeclineModalStatus}
            handleApproveStatus={handleApproveStatus}
          />
        </div>

        <p>{classTime}</p>

        <button
          onClick={() => setIsRequestModalOpened(true)}
          className="mt-1 text-gray-100 underline"
        >
          결제정보/요청사항
        </button>
      </li>

      {isDeclineModalOpened && (
        <DeclineModal
          isDeclineModalOpened={isDeclineModalOpened}
          handleClosed={() => setIsDeclineModalOpened(false)}
          handleSubmitDeclineForm={handleSubmitDeclineForm}
          applicant={reservation[0].representative}
          title={title}
          applyClass={classTime}
          amount={finalPrice}
        />
      )}

      {isRequestModalOpened && (
        <PaymentInfoModal
          isModalOpened={isRequestModalOpened}
          handleClosed={() => setIsRequestModalOpened(false)}
          applicant={reservation[0].representative}
          classTitle={title}
          applyList={classTime}
          applyCount={reservation[0].participants}
          amount={finalPrice}
          applyTime=""
          paymentMethod={paymentMethod.name}
          request={reservation[0].requests}
          id={id}
          lectureId={lectureId}
          isApproved={isApproved}
          isDeclined={isDeclined}
          handleDeclineModalStatus={handleDeclineModalStatus}
          handleApproveStatus={handleApproveStatus}
        />
      )}
    </>
  );
};

export default PendingList;
