import React from 'react';
import UserPass from '@/components/Pass/UserPass';
import { userPass } from '@/types/pass';

const PassesListView = ({ passList }: { passList: userPass[] }) => {
  return (
    <section className="mb-7 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {passList.map((passInfo) => (
        <UserPass passInfo={passInfo} key={passInfo.id} />
      ))}
    </section>
  );
};

export default PassesListView;
