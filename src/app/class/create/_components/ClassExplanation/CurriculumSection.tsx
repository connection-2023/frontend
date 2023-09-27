import { useEffect, useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import {
  UploadBeforeHandler,
  UploadBeforeReturn,
} from 'suneditor-react/dist/types/upload';
import SunEditorCore from 'suneditor/src/lib/core';
import { QUILL_DEFAULT_VALUE, TOOLBAR } from '@/constants/constants';
import 'suneditor/dist/css/suneditor.min.css';

const CurriculumSection = () => {
  const editor = useRef<SunEditorCore>();
  const editorText = useRef<string>(QUILL_DEFAULT_VALUE);
  const [textLength, setTextLenght] = useState(QUILL_DEFAULT_VALUE.length);

  useEffect(() => {
    handleEditorChange();
  }, []);

  const handleImageUploadBefore = (
    files: Array<File>,
    info: object,
    uploadHandler: UploadBeforeHandler,
  ): UploadBeforeReturn => {
    uploadHandler(files);
    return true;
  }; // 추후 S3로 변경 예정

  const getSunEditorInstance = (sunEditor: SunEditorCore) => {
    editor.current = sunEditor;
  };

  const handleEditorChange = () => {
    if (editor.current) {
      const textLength = editor.current.getText().trim().length;
      const maxLength = 3000;

      if (textLength > maxLength) {
        editor.current.setContents(editorText.current);
      } else {
        editorText.current = editor.current.getContents(true);
        setTextLenght(textLength);
      }
    }
  };

  return (
    <section className="relative mt-9 flex flex-col">
      <h2 className="text-lg font-bold">커리큘럼</h2>
      <SunEditor
        lang="ko"
        height="652px"
        defaultValue={QUILL_DEFAULT_VALUE}
        setOptions={{
          buttonList: TOOLBAR,
        }}
        onImageUploadBefore={handleImageUploadBefore}
        getSunEditorInstance={getSunEditorInstance}
        onKeyUp={handleEditorChange}
      />
      <div className="absolute -bottom-1 right-3 z-20 text-sub-color2">
        ({textLength} / 3000)
      </div>
    </section>
  );
};

export default CurriculumSection;
