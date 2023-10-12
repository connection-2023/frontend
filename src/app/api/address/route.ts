import { NextResponse } from 'next/server';
import { AddressData } from '@/types/address';

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const keyword = searchParams.get('keyword');
  const page = searchParams.get('page');

  const response = await fetch(
    `https://business.juso.go.kr/addrlink/addrLinkApi.do?confmKey=${process.env.NEXT_PUBLIC_LOCATION_SEARCH_KEY}=&currentPage=${page}&countPerPage=5&keyword=${keyword}&resultType=json`,
  );

  const data: AddressData = await response.json();

  return NextResponse.json(data);
}
