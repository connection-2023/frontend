import { useState } from 'react';

import ClassInfo from './ClassPrice/ClassInfo';
import CouponButton from './ClassPrice/CouponButton';
import CouponCreator from './ClassPrice/CouponCreator';
import AppliedCouponDisplay from './ClassPrice/AppliedCouponDisplay';

const ClassPrice = () => {
  const [isCouponSectionOpen, setIsCouponSectionOpen] = useState(false);

  const toggleCouponSection = () => {
    setIsCouponSectionOpen((prev) => !prev);
  };

  return (
    <>
      <ClassInfo />

      <section className="flex flex-col gap-7 border-y border-solid border-sub-color1 py-5">
        <CouponButton
          isCouponSectionOpen={isCouponSectionOpen}
          toggleCouponSection={toggleCouponSection}
        />

        {isCouponSectionOpen && (
          <>
            <CouponCreator />

            <hr className="border-sub-color2" />

            <AppliedCouponDisplay />
          </>
        )}
      </section>
    </>
  );
};

export default ClassPrice;
