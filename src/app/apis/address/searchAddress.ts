import { AddressData } from '@/types/address';

export const searchAddress = async (keyword: string, page: number | string) => {
  try {
    const response = await fetch(
      `http://192.168.219.199:3000/api/address?keyword=${encodeURIComponent(
        keyword,
      )}&page=${page}`,
    );

    if (!response.ok) throw new Error('Network response was not ok');

    const data: AddressData = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
