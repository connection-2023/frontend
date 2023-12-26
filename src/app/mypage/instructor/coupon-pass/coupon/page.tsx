import { redirect } from 'next/navigation';

export default function couponModal() {
  redirect('/mypage/instructor/coupon-pass?state=coupon');
}
