import ClassDetailLoading from './_components/Loading/ClassDetailLoading';
import ClassTopLoading from './_components/Loading/ClassTopLoading';

const loading = () => (
  <div
    role="status"
    className="border-box mx-auto mt-[1.38rem] box-border grid grid-cols-1 gap-x-12 md:grid-cols-[3fr_1fr] md:gap-x-5 xl:grid-cols-[1fr_2fr_1fr]"
  >
    <ClassTopLoading />
    <div className="hidden xl:block" />

    <ClassDetailLoading />
  </div>
);

export default loading;
