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

export interface IcreatePass {
  title: string;
  lectureIds: Array<{
    label: string;
    value: number;
  }>;
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
}
