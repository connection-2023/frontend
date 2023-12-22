'use client';
import { useState } from 'react';
import PassDetail from './PassDetail';
import PassListView from './PassListView';
import { SelectClassType } from '@/types/coupon';
import { IpassData } from '@/types/pass';

interface PassContainerProps {
  myLectureList: SelectClassType[];
  totalItemCount: number;
  passList: IpassData[];
  couponCount: number;
}

const PassContainer = ({
  myLectureList,
  totalItemCount,
  passList,
  couponCount,
}: PassContainerProps) => {
  const [selectPass, setSelectPass] = useState<IpassData | null>(null);

  const selectPassHandler = (data: IpassData | null) => {
    setSelectPass(data);
  };

  return (
    <section className="z-0 flex w-full flex-col px-3 sm:px-6 md:px-9 xl:px-0">
      <div
        className={`z-0 flex w-full flex-col rounded-lg bg-white ${
          !selectPass && 'p-5'
        } shadow-float`}
      >
        {selectPass ? (
          <PassDetail
            passInfo={selectPass}
            selectPassHandler={selectPassHandler}
          />
        ) : (
          <PassListView
            myLectureList={myLectureList}
            totalItemCount={totalItemCount}
            passList={passList}
            couponCount={couponCount}
            selectPassHandler={selectPassHandler}
          />
        )}
      </div>
    </section>
  );
};

export default PassContainer;
