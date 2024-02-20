'use client';
import { FormEvent, useRef, useState } from 'react';
import { searchAddress } from '@/lib/apis/searchAddress';
import AddressDescription from './AddressDescription';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import Pagination from '@/components/Pagination/Pagination';
import { AddressData } from '@/types/address';

const Address = () => {
  const [addressData, setAddressData] = useState<AddressData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const inputAddressRef = useRef('');

  const addressSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get('inputAddress') as string;

    if (value) {
      inputAddressRef.current = value;
      setAddressData(await searchAddress(value, 0));
      setCurrentPage(0);
    }
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
    setAddressData(await searchAddress(inputAddressRef.current, selected + 1));
  };

  return (
    <>
      <header className="m-auto h-20 w-full max-w-2xl px-3 sm:px-11 ">
        <h1 className="pt-8 text-2xl font-semibold">주소 검색</h1>
      </header>
      <hr className="border-t-1 mb-7 w-full border-solid border-gray-300" />

      <section className="m-auto mb-5 flex w-full max-w-2xl flex-col px-3 sm:mb-0 sm:px-11">
        <SearchForm addressSearch={addressSearch} />

        {addressData ? (
          <SearchResults addressData={addressData} />
        ) : (
          <AddressDescription />
        )}

        {addressData && addressData.results.common.errorCode === '0' && (
          <Pagination
            pageCount={Math.ceil(
              parseInt(addressData.results.common.totalCount) /
                parseInt(addressData.results.common.countPerPage),
            )}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </section>
    </>
  );
};

export default Address;
