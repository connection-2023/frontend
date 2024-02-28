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
    id: number;
    nickname: string;
    userProfileImageUrl: string;
  };
  classList: string[];
  count: number;
  purchase_date: string;
  startAt: string;
  endAt: string;
}

export interface searchPass {
  searchAfter: [number, number];
  id: number;
  price: number;
  title: string;
  availableMonths: number;
  maxUsageCount: number;
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
  searchAfter: [number, number];
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

export interface searchPassesParameters {
  take: number;
  sortOption: 'LATEST' | 'POPULAR' | 'LOWEST_PRICE';
  value?: string;
  searchAfter?: [number, number];
}

export interface passSituation {
  user: {
    id: number;
    nickname: string;
    userProfileImageUrl: string;
  };
  userPass: {
    id: number;
    remainingUses: number;
    startAt: string;
    endAt: string;
    createdAt: string;
    updatedAt: string;
  };
  reservations:
    | {
        id: number;
        representative: string;
        phoneNumber: string;
        participants: number;
        requests: string;
        lecture: {
          id: number;
          title: string;
        };
      }[]
    | null;
}
