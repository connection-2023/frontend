import { useState } from 'react';
import { USER_COUPON_CLASS_LIST_TAKE } from '@/constants/constants';
import { PlusesSVG } from '@/icons/svg';
import { SelectClassType } from '@/types/coupon';

interface ClassFilterSelectListsUserProps {
  myLectureList: SelectClassType[];
  handleChangeSelectedClass: (selectedOptions: any) => void;
  selectedClass: SelectClassType | null;
  userClassFilterView: boolean;
}

const ClassFilterSelectListsUser = ({
  myLectureList,
  handleChangeSelectedClass,
  selectedClass,
  userClassFilterView,
}: ClassFilterSelectListsUserProps) => {
  const [listViewCount, setListViewCount] = useState(
    USER_COUPON_CLASS_LIST_TAKE,
  );
  const [selectedClassValue, setSelectedClassValue] = useState<
    string | number | number[] | undefined
  >(selectedClass?.value);

  const changeSelectedClass = (classId: number) => {
    let newValue;

    if (selectedClassValue === 'select-all') {
      newValue = [classId];
    } else {
      if (
        Array.isArray(selectedClassValue) &&
        selectedClassValue.includes(classId)
      ) {
        newValue = selectedClassValue.filter(
          (selectedId) => selectedId !== classId,
        );

        if (newValue.length === 0) {
          newValue = 'select-all';
        }
      } else if (
        Array.isArray(selectedClassValue) &&
        selectedClassValue.length + 1 === myLectureList.length - 1
      ) {
        newValue = 'select-all';
      } else {
        newValue = [...(selectedClassValue as number[]), classId];
      }
    }

    setSelectedClassValue(newValue);
    handleChangeSelectedClass({ value: newValue });
  };

  return (
    <ul
      className={`${
        userClassFilterView ? 'flex' : 'hidden'
      } w-full flex-wrap items-center text-sm`}
    >
      {myLectureList.map(
        ({ label, value }, index) =>
          index !== 0 &&
          index < listViewCount && (
            <button
              key={value}
              className={`mb-2 mr-5  ${
                selectedClassValue === 'select-all' ||
                (Array.isArray(selectedClassValue) &&
                  selectedClassValue.includes(Number(value)))
                  ? 'text-sub-color1'
                  : 'text-black'
              }`}
              onClick={() => changeSelectedClass(Number(value))}
            >
              <li className="sm:blok flex w-64 truncate sm:w-auto">#{label}</li>
            </button>
          ),
      )}
      {myLectureList.length > listViewCount && (
        <button
          className="group mb-2 mr-5 flex gap-1 hover:text-sub-color1 sm:text-gray-500 sm:underline"
          onClick={() =>
            setListViewCount((count) => count + USER_COUPON_CLASS_LIST_TAKE)
          }
        >
          <p className="sm:hidden">+{myLectureList.length - listViewCount}</p>
          더보기
          <div className="hidden h-5 w-5 items-center justify-center rounded-full border border-gray-500 group-hover:border-sub-color1 sm:flex">
            <PlusesSVG className="fill-sub-color1" />
          </div>
        </button>
      )}
    </ul>
  );
};

export default ClassFilterSelectListsUser;
