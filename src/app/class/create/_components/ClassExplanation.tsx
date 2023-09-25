import ReactQuill from 'react-quill';
import {
  ANNOUNCEMENT,
  CLASS_OPERATION_PLAN,
  QUILL_DEFAULT_VALUE,
  QUILL_MODULES,
} from '@/constants/constants';
import 'react-quill/dist/quill.snow.css';
import '@/styles/quill.css';

const scrollStyle =
  'scrollbar scrollbar-track-[#F5F5F5] scrollbar-thumb-sub-color2 scrollbar-thumb-rounded-lg scrollbar-w-2';

const ClassExplanation = () => {
  return (
    <>
      <section className="mt-9 flex flex-col">
        <h2 className="text-lg font-bold">중요 공지사항을 입력해주세요.</h2>
        <textarea
          className={`mt-3 h-24 resize-none rounded-md border border-sub-color2 p-3
          ${scrollStyle}`}
          placeholder={ANNOUNCEMENT}
        />
      </section>

      <section className="mt-9 flex flex-col">
        <h2 className="text-lg font-bold">어떤 클래스를 운영할 계획인가요?</h2>
        <textarea
          className={`mt-3 h-40 resize-none rounded-md border border-sub-color2 p-3
          ${scrollStyle}`}
          placeholder={CLASS_OPERATION_PLAN}
        />
      </section>

      <section className="mt-9 flex flex-col">
        <h2 className="text-lg font-bold">커리큘럼</h2>
        <ReactQuill
          className={`mb-10 mt-3 h-[40rem] ${scrollStyle}`}
          modules={QUILL_MODULES}
          defaultValue={QUILL_DEFAULT_VALUE}
          onChange={(e) => console.log(e)}
        />
      </section>
    </>
  );
};

export default ClassExplanation;
