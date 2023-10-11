import { useEffect, useRef, useState } from 'react';
import SunEditor from 'suneditor-react';
import {
  UploadBeforeHandler,
  UploadBeforeReturn,
} from 'suneditor-react/dist/types/upload';
import SunEditorCore from 'suneditor/src/lib/core';
import { TOOLBAR } from '@/constants/constants';
import 'suneditor/dist/css/suneditor.min.css';
import { Controller, useFormContext } from 'react-hook-form';

interface CustomEditorProps {
  title: string;
  defaultValue: string;
  maxLength: number;
  minLength: number;
  height: string;
}

const CustomEditor = ({
  title,
  defaultValue,
  maxLength,
  minLength,
  height,
}: CustomEditorProps) => {
  const editor = useRef<SunEditorCore>();
  const editorText = useRef<string>(defaultValue);
  const [textLength, setTextLenght] = useState(defaultValue.length);

  const formMethods = useFormContext();
  const { control } = formMethods;

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

  const validateMinLength = () => {
    if (editor.current) {
      const textLength = editor.current.getText().trim().length;
      return textLength >= minLength || '최소 글자 수 미만';
    }
  };

  return (
    <section className="relative z-0 flex flex-col">
      <h2 id={title} className="mb-3 text-lg font-bold">
        {title}
      </h2>

      <Controller
        name={title}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: '필수 입력',
          validate: validateMinLength,
        }}
        render={({ field }) => (
          <SunEditor
            lang="ko"
            height={height}
            setContents={field.value}
            setOptions={{
              buttonList: TOOLBAR,
            }}
            onImageUploadBefore={handleImageUploadBefore}
            getSunEditorInstance={getSunEditorInstance}
            onChange={(content) => {
              field.onChange(content);
            }}
            onKeyUp={handleEditorChange}
          />
        )}
      />

      <div className="absolute -bottom-1 right-3 z-10 flex gap-1 text-sub-color2">
        (
        <p className={`${textLength < minLength && 'text-main-color'}`}>
          {textLength}
        </p>
        / {maxLength})
      </div>
    </section>
  );
};

export default CustomEditor;
