'use client';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useIntersect from '@/hooks/useIntersect';
import { searchPasses } from '@/lib/apis/searchApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import { useUserStore } from '@/store';
import { transformSearchPasses } from '@/utils/apiDataProcessor';
import UserPass from '@/components/Pass/UserPass';
import Spinner from '@/components/Spinner/Spinner';
import { searchPassesParameters, userPass } from '@/types/pass';
import { FetchError } from '@/types/types';

interface PassesListViewProps {
  passList: userPass[];
  searchData: searchPassesParameters;
}

const PassesListView = ({
  searchData: currentSearchData,
  passList,
}: PassesListViewProps) => {
  const [passes, setPasses] = useState(passList);
  const [isLastItem, setIsLastItem] = useState(false);
  const { userType } = useUserStore((state) => ({
    userType: state.userType,
  }));

  useEffect(() => {
    setPasses(passList);
    setIsLastItem(false);
  }, [passList]);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const updateSearchPassesList = async () => {
    const searchData = {
      ...currentSearchData,
      searchAfter: passes.at(-1)?.searchAfter,
    };

    const passList = await searchPasses(searchData, userType === 'user');
    setIsLastItem(!passList.length);
    setPasses((prev) => [...prev, ...transformSearchPasses(passList)]);
  };

  const searchPassesHandler = async () => {
    try {
      await updateSearchPassesList();
    } catch (error) {
      const fetchError = error as FetchError;
      if (fetchError.status === 401) {
        await accessTokenReissuance();
        await updateSearchPassesList();
      } else {
        toast.error('패스권 목록 불러오기 실패, 잠시후 다시 시도해주세요.');
        console.error(error);
      }
    }
  };

  const { ref, loading } = useIntersect(searchPassesHandler, options);

  return (
    <>
      <section className="mb-7 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {passes.map((passInfo, index) => (
          <div
            key={passInfo.id}
            ref={index === passes.length - 1 && !isLastItem ? ref : undefined}
          >
            <UserPass passInfo={passInfo} />
          </div>
        ))}
      </section>
      {loading && (
        <div className="mb-5 flex justify-center">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default PassesListView;
