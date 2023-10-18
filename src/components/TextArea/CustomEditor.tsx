import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SunEditorCore from 'suneditor/src/lib/core';
import SunEditor from 'suneditor-react';
import {
  UploadBeforeHandler,
  UploadBeforeReturn,
} from 'suneditor-react/dist/types/upload';
import { TOOLBAR } from '@/constants/constants';
import 'suneditor/dist/css/suneditor.min.css';

interface CustomEditorProps {
  title: string;
  maxLength: number;
  minLength: number;
  height: string;
  dataName: string;
  defaultValue?: string;
  placeholder?: string;
}

const CustomEditor = ({
  title,
  maxLength,
  minLength,
  height,
  dataName,
  defaultValue = '',
  placeholder = '',
}: CustomEditorProps) => {
  const editor = useRef<SunEditorCore>();
  const editorText = useRef<string>(defaultValue);
  const [textLength, setTextLenght] = useState(defaultValue.length);

  const {
    control,
    formState: { errors },
  } = useFormContext();

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
      return textLength >= minLength || title;
    }
  };

  return (
    <section className="relative z-0 flex w-full flex-col">
      <label className="flex text-lg font-bold">
        <h2
          id={dataName}
          className={`mb-3 ${
            errors[dataName] && 'animate-vibration text-main-color'
          }`}
        >
          {title}
        </h2>
        {minLength !== 0 && <p className="text-sub-color2">(필수)</p>}
      </label>

      <Controller
        name={dataName}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: minLength !== 0 ? title : false,
          validate: validateMinLength,
        }}
        render={({ field }) => (
          <SunEditor
            onChange={(content) => {
              handleEditorChange();
              field.onChange(content);
            }}
            lang="ko"
            height={height}
            setContents={field.value}
            setOptions={{
              buttonList: TOOLBAR,
            }}
            placeholder={placeholder}
            getSunEditorInstance={getSunEditorInstance}
            onImageUploadBefore={handleImageUploadBefore}
          />
        )}
      />

      <p className="absolute -bottom-1 right-3 z-10 flex gap-1 text-sub-color2">
        (
        <span className={`${textLength < minLength && 'text-main-color'}`}>
          {textLength}
        </span>
        / {maxLength})
      </p>
    </section>
  );
};

export default CustomEditor;
