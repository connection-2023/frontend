import { redirect } from 'next/navigation';

export default function passModal() {
  redirect('/mypage/instructor/coupon-pass?state=pass');
}
