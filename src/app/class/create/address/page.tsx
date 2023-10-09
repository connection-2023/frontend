'use client';
import { FormEvent, useEffect, useState } from 'react';
import { searchAddress } from '@/app/apis/address/addressApi';
import { AddressData } from '@/types/address';
import SearchForm from './_components/SearchForm';
import SearchResults from './_components/SearchResults';
import AddressDescription from './_components/AddressDescription';
import Pagination from './_components/Pagination';

const Address = () => {
  const [addressData, setAddressData] = useState<AddressData | null>(null);

  const addressSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get('inputAddress') as string;

    if (value) {
      setAddressData(await searchAddress(value, 1));
    }
  };

  useEffect(() => {
    console.log(addressData);
  }, [addressData]);

  return (
    <>
      <header className="m-auto h-20 w-full max-w-2xl px-11 ">
        <h1 className="pt-8 text-2xl font-semibold">주소 검색</h1>
      </header>
      <hr className="border-t-1 mb-7 w-full border-solid border-sub-color2" />

      <section className="m-auto flex w-full max-w-2xl flex-col px-11">
        <SearchForm addressSearch={addressSearch} />

        <SearchResults />

        <AddressDescription />

        <Pagination />
      </section>
    </>
  );
};

export default Address;
