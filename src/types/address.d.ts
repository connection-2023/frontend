export interface AddressData {
  results: {
    common: {
      errorMessage: string;
      countPerPage: string;
      totalCount: string;
      errorCode: string;
      currentPage: string;
    };
    juso: Juso[] | [];
  };
}

export interface Juso {
  detBdNmList: string;
  bdNm: string;
  engAddr: string;
  rn: string;
  emdNm: string;
  zipNo: string;
  roadAddr: string;
  roadAddrPart2?: string;
  emdNo?: string;
  sggNm?: string;
  jibunAddr?: string;
  siNm?: string;
  roadAddrPart1?: string;
}
