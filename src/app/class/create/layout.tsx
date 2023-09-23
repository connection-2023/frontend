'use client';
import type { Metadata } from 'next';
import HookForm from './_recoil/hookForm/HookForm';
import { RecoilRoot } from 'recoil';

export const metadata: Metadata = {
  title: 'Connection | 클래스 작성',
  description: 'Connection 클래스 생성 페이지',
};

export default function ClassCreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <HookForm>{children}</HookForm>
    </RecoilRoot>
  );
}
