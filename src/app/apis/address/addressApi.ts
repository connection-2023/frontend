import { AddressData } from '@/types/address';

export const searchAddress = async (keyword: string, page: number | string) => {
  try {
    const response = await fetch(
      `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${process.env.NEXT_PUBLIC_LOCATION_SEARCH_KEY}=&currentPage=${page}&countPerPage=10&keyword=${keyword}&resultType=json`,
    );

    if (!response.ok) throw new Error('Network response was not ok');

    const data: AddressData = await response.json();

    if (data.results.common.errorCode === '0') {
      return data;
    } else {
      throw new Error('Failed to fetch address information');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
