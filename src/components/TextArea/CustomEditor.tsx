import { useEffect, useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import {
  UploadBeforeHandler,
  UploadBeforeReturn,
} from 'suneditor-react/dist/types/upload';
import SunEditorCore from 'suneditor/src/lib/core';
import { TOOLBAR } from '@/constants/constants';
import 'suneditor/dist/css/suneditor.min.css';

interface CustomEditorProps {
  title: string;
  defaultValue: string;
  maxLength: number;
  height: string;
}

const CustomEditor = ({
  title,
  defaultValue,
  maxLength,
  height,
}: CustomEditorProps) => {
  const editor = useRef<SunEditorCore>();
  const editorText = useRef<string>(defaultValue);
  const [textLength, setTextLenght] = useState(defaultValue.length);

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
      <h2 className="mb-3 text-lg font-bold">{title}</h2>
      <SunEditor
        lang="ko"
        height={height}
        defaultValue={defaultValue}
        setOptions={{
          buttonList: TOOLBAR,
        }}
        onImageUploadBefore={handleImageUploadBefore}
        getSunEditorInstance={getSunEditorInstance}
        onKeyUp={handleEditorChange}
      />
      <div className="absolute -bottom-1 right-3 z-20 text-sub-color2">
        ({textLength} / {maxLength})
      </div>
    </section>
  );
};

export default CustomEditor;
