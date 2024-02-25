import { IgetFunction } from '@/types/coupon';
import {
  IcreatePassReqData,
  IgetPassFunction,
  IresponsePassData,
} from '@/types/pass';
import { FetchError } from '@/types/types';

export const getIssuedPassLists = async (
  data: IgetFunction,
  type: 'lecturer' | 'user',
  signal?: AbortSignal,
): Promise<IresponsePassData> => {
  const params = new URLSearchParams();

  Object.entries(data)
    .filter(([_, v]) => v !== undefined)
    .forEach(([k, v]) => {
      if (Array.isArray(v)) {
        v.forEach((value) => params.append(`${k}[]`, value));
      } else {
        params.append(k, String(v));
      }
    });

  try {
    const response = await fetch(`/api/pass/getIssuedPassList?${params}`, {
      method: 'GET',
      credentials: 'include',
      signal,
      headers: {
        'Content-Type': 'application/json',
        type: type,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    const { passList: itemList, totalItemCount } = resData.data;

    return { itemList, totalItemCount };
  } catch (error) {
    console.error('발급한 패스권 조회 오류', error);
    throw error;
  }
};

export const createNewPass = async (data: IcreatePassReqData) => {
  try {
    const response = await fetch(`/api/pass/new`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error('패스권 생성 오류', error);
    throw error;
  }
};

export const getPassForId = async (passId: number) => {
  try {
    const response = await fetch(`/api/pass/get-id?passId=${passId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData;
  } catch (error) {
    console.error('패스권 조회 오류', error);
    throw error;
  }
};

export const getSalesStatusPass = async (passId: number) => {
  try {
    const response = await fetch(`/api/pass/sales?passId=${passId}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const error: FetchError = new Error(errorData.message || '');
      error.status = response.status;
      throw error;
    }

    const resData = await response.json();

    return resData;
  } catch (error) {
    console.error('패스권 판매 현황조회 오류', error);
    throw error;
  }
};
