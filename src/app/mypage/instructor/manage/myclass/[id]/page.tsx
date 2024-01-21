'use client';
import { parseISO, format, isPast, isFuture } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ButtonStyles } from '@/constants/constants';
import { ArrowUpSVG, EditSVG } from '@/icons/svg';
import { getLecturerClassDetail, updateClassData } from '@/lib/apis/classApis';
import ClassOverview from './_components/ClassOverview';
import ClassTable from './_components/ClassTable';
import EditDayOff from './_components/EditDayOff';
import EditReservationComment from './_components/EditReservationComment';
import Notice from '@/components/ClassNotice/Notice';
import { ILecturerClassDetailResonse } from '@/types/class';

const ClassDetailPage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  const [classData, setClassData] = useState<
    ILecturerClassDetailResonse | undefined
  >(undefined);
  const [selectedClass, setSelectedClass] = useState<{
    index: number | null;
    id: number | null;
  }>({ index: null, id: null });

  useEffect(() => {
    const fetchClassDetailData = async () => {
      const data = await getLecturerClassDetail(id);
      if (data instanceof Error) return;

      setClassData(data);
    };

    fetchClassDetailData();
  }, []);

  if (!classData) return null;

  const handleSelectClassId = (index: number | null, id: number | null) => {
    if (selectedClass.id === id) {
      setSelectedClass({ index: null, id: null });
    } else {
      setSelectedClass({ index, id });
    }
  };

  const handleGoBack = () => {
    router.back();
  };

  const notificationUpdateDate = format(
    parseISO(classData.notification.updatedAt),
    'yyyy.MM.dd',
  );

  const updateData = async (
    key: 'notification' | 'reservationComment' | 'holidays',
    value: string | Date[],
  ) => {
    const requestData = {
      [key]: value,
    };
    const response = await updateClassData(id, requestData);

    const type =
      key === 'reservationComment'
        ? '예약 시 유의사항'
        : key === 'notification'
        ? '공지사항'
        : '휴무일';

    if (response.statusCode === 200) {
      toast.success(`${type}을 변경하였습니다!`);
      if (Array.isArray(value)) {
        const holidaysAsStringArray = value.map((date) => date.toISOString());

        setClassData({
          ...classData,
          [key]: holidaysAsStringArray,
        });
      } else {
        const responseNewData =
          key === 'reservationComment'
            ? response.data.updatedLecture
            : response.data.updatedLecture.lectureNotification;

        setClassData({
          ...classData,
          [key]: responseNewData,
        });
      }
    } else {
      toast.error(`${type} 변경에 실패하였습니다`);
    }
  };

  const processedScheduleData = classData.schedule.map((schedule, idx) => {
    const date = new Date(schedule.startDateTime);

    return {
      ...schedule,
      index: idx + 1,
      date,
      isPastClass: isPast(date),
    };
  });

  const futureScheduleData = processedScheduleData.filter((item) =>
    isFuture(item.date),
  );

  return (
    <div className="grid grid-cols-1 gap-4 px-4 md:px-9 xl:grid-cols-[2fr,1fr] xl:px-0">
      <section className="mb-18 flex h-full flex-col rounded-lg bg-white shadow-float">
        {/* Top Section */}
        <section className="flex whitespace-nowrap px-2 py-3">
          <div className="flex w-full items-center">
            <button onClick={handleGoBack} className="origin-center -rotate-90">
              <ArrowUpSVG width="34" height="34" fill="black" />
            </button>
            <p className="mr-2 flex h-[1.5625rem] w-[3.5625rem] items-center justify-center border-2 border-solid border-gray-500 text-sm font-bold text-gray-100">
              모집중
            </p>
          </div>
          <div className="w-32 text-sm font-semibold">
            <Link
              href={`/class/${id}/edit`}
              className={`h-7 ${ButtonStyles.default}`}
            >
              <EditSVG
                width="16"
                height="16"
                className="mr-2 fill-sub-color1"
              />
              클래스 수정
            </Link>
          </div>
        </section>

        <h1 className="flex h-16 items-center bg-gray-900 px-4 text-base font-bold text-black">
          {classData.title}
        </h1>

        <div className="flex w-full gap-4 px-4">
          <section className="flex w-full flex-col">
            <div className="mt-4">
              <Notice
                isEditMode={true}
                content={classData.notification.content}
                updateDate={notificationUpdateDate}
                updateNotice={updateData}
              />
            </div>
            <AccordionSection
              title="휴무일"
              component={
                <EditDayOff
                  updateHolidays={updateData}
                  schedules={classData.schedule}
                  holidays={classData.holidays}
                />
              }
            />
            <AccordionSection
              title="예약 시 유의사항"
              component={
                <EditReservationComment
                  reservationComment={classData.reservationComment}
                  updateReservation={updateData}
                />
              }
            />

            <div className="my-5 w-full ">
              <ClassTable
                schedules={processedScheduleData}
                maxCapacity={classData.maxCapacity}
                reservationDeadline={classData.reservationDeadline}
                handleSelectClassId={handleSelectClassId}
              />
            </div>
          </section>
        </div>
      </section>
      <section className="mt-4 lg:mt-0">
        <ClassOverview
          totalClassNum={processedScheduleData.length}
          pastClassNum={futureScheduleData.length}
          selectedClass={selectedClass}
          lectureId={id}
        />
      </section>
    </div>
  );
};

export default ClassDetailPage;

interface IAccordionSection {
  title: string;
  component: React.ReactNode;
}

const AccordionSection = ({ title, component }: IAccordionSection) => {
  const [isExpanded, setIsExpended] = useState(false);
  const buttonStyle = isExpanded ? '' : 'origin-center rotate-180';

  return (
    <section className="min-h-[2.37rem] border-b border-solid border-gray-700 pt-[0.87rem]">
      <h2
        onClick={() => setIsExpended(!isExpanded)}
        className="mb-2 flex cursor-pointer items-center font-semibold text-gray-100"
      >
        {title}
        <button className={buttonStyle}>
          <ArrowUpSVG width="34" height="34" className="fill-gray-100" />
        </button>
      </h2>

      {isExpanded && component}
    </section>
  );
};
