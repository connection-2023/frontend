import { useMemo, useRef } from 'react';
import ReactQuill from 'react-quill';
import {
  ANNOUNCEMENT,
  CLASS_OPERATION_PLAN,
  QUILL_DEFAULT_VALUE,
  QUILL_MODULES_CONTAINER,
} from '@/constants/constants';
import 'react-quill/dist/quill.snow.css';
import '@/styles/quill.css';

const scrollStyle =
  'scrollbar scrollbar-track-[#F5F5F5] scrollbar-thumb-sub-color2 scrollbar-thumb-rounded-lg scrollbar-w-2';

const ClassExplanation = () => {
  const quillRef = useRef<ReactQuill | null>(null);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      const file = input.files?.[0];

      if (file && quillRef.current) {
        const imageURL = await readFileAsDataURL(file);
        // 추후 S3 업로드 후 변경

        const editor = quillRef.current.getEditor();
        const range = editor.getSelection();
        if (range) {
          editor.insertEmbed(range.index, 'image', imageURL);
        }
      }
    });
  };

  const readFileAsDataURL = (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsDataURL(file);
    });
  }; //추후 S3로 변경시 삭제 예정

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: QUILL_MODULES_CONTAINER,
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

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
          modules={modules}
          defaultValue={QUILL_DEFAULT_VALUE}
          ref={quillRef}
        />
      </section>
    </>
  );
};

export default ClassExplanation;
