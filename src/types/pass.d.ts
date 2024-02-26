export interface IgetPassFunction {
  take: number | undefined;
  currentPage?: number;
  targetPage?: number;
  firstItemId?: number;
  lastItemId?: number;
  passStatusOptions: 'AVAILABLE' | 'DISABLED';
  filterOption: 'LATEST' | 'HIGHEST_PRICE' | 'BEST_SELLING';
  lectureId?: string | number;
}

export interface IresponsePassData {
  itemList: IpassData[];
  totalItemCount: number;
}

export interface IpassData {
  id: number;
  title: string;
  price: number;
  availableMonths: number;
  maxUsageCount: number;
  salesCount: number;
  lecturePassTarget: {
    lecture: {
      id: number;
      title: string;
    };
  }[];
}

export interface IPassInfoForIdData extends IpassData {
  createdAt: string;
  updatedAt: string;
  lecturer: {
    id: number;
    nickname: string;
    profileCardImageUrl: string;
  };
}

export interface IcreatePass {
  title: string;
  lectureIds: {
    label: string;
    value: number;
  }[];
  availableMonths: string;
  maxUsageCount: string;
  price: string;
}

export interface IcreatePassReqData {
  title: string;
  lectureIds: number[];
  availableMonths: string;
  maxUsageCount: string;
  price: string;
}

export interface IpassTable {
  user: {
    nickname: string;
    img: string;
  };
  classList: string[];
  count: number;
  purchase_date: string;
  expiration_date: string;
  expiration_date_sm: string;
}

export interface searchPass {
  searchAfter: [number, number];
  id: number;
  price: number;
  title: string;
  lecturePassTarget: {
    title: string;
    lectureId: number;
  }[];
  lecturer: {
    lecturerId: number;
    nickname: string;
    profileCardImageUrl: string;
  };
}

export interface userPass {
  id: number;
  price: number;
  title: string;
  availableMonths: number;
  maxUsageCount: number;
  appliedList: {
    id: number;
    title: string;
  }[];
  lecturerId: number;
  nickname: string;
  profileCardImageUrl: string;
}
