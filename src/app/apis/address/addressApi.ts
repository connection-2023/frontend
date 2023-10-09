import { AddressData } from '@/types/address';

export const searchAddress = async (keyword: string, page: number | string) => {
  try {
    const response = await fetch(
      `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${process.env.NEXT_PUBLIC_LOCATION_SEARCH_KEY}=&currentPage=${page}&countPerPage=5&keyword=${keyword}&resultType=json`,
    );

    if (!response.ok) throw new Error('Network response was not ok');

    const data: AddressData = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
