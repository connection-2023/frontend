import { create } from 'zustand';
import { IReservationInfo, IApplicantInfo } from '@/types/payment';

interface IPaymentStore {
  applyClass: IReservationInfo[] | null;
  applicant: IApplicantInfo | null;
  discountPrice: number | null;
  setDiscountPrice: (price: number) => void;
  setApplyClass: (participants: IReservationInfo[]) => void;
  setApplicant: (applicantInfo: IApplicantInfo) => void;
}

export const usePaymentStore = create<IPaymentStore>()((set) => ({
  applyClass: null,
  applicant: null,
  discountPrice: null,
  setDiscountPrice: (price) => set({ discountPrice: price }),
  setApplyClass: (participants) => set({ applyClass: participants }),
  setApplicant: (applicantInfo) => set({ applicant: applicantInfo }),
}));
