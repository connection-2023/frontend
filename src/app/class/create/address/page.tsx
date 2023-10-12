'use client';
import { FormEvent, useRef, useState } from 'react';
import Pagination from '@/components/Pagination/Pagination';
import SearchForm from './_components/SearchForm';
import SearchResults from './_components/SearchResults';
import AddressDescription from './_components/AddressDescription';
import { searchAddress } from '@/app/apis/address/addressApi';
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
      setAddressData(await searchAddress(value, 1));
    }
  };

  const handlePageChange = async ({ selected }: { selected: number }) => {
    const newSelected = selected + 1;
    setCurrentPage(newSelected);
    setAddressData(await searchAddress(inputAddressRef.current, newSelected));
  };

  return (
    <>
      <header className="m-auto h-20 w-full max-w-2xl px-11 ">
        <h1 className="pt-8 text-2xl font-semibold">주소 검색</h1>
      </header>
      <hr className="border-t-1 mb-7 w-full border-solid border-sub-color2" />

      <section className="m-auto flex w-full max-w-2xl flex-col px-11">
        <SearchForm addressSearch={addressSearch} />

        {addressData ? (
          <SearchResults addressData={addressData} />
        ) : (
          <AddressDescription />
        )}

        {addressData && !addressData.results.common.errorCode && (
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
