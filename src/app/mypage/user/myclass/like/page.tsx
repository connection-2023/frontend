import { Suspense } from 'react';
import InterrestedClass from './_components/InterrestedClass';
import InterrestedClassLoading from './_components/loading/InterrestedClassLoading';

const page = async () => {
  return (
    <Suspense fallback={<InterrestedClassLoading />}>
      <InterrestedClass />
    </Suspense>
  );
};

export default page;
