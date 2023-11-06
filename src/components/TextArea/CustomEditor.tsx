import { useEffect, useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import SunEditorCore from 'suneditor/src/lib/core';
import SunEditor from 'suneditor-react';
import {
  UploadBeforeHandler,
  UploadBeforeReturn,
  UploadInfo,
} from 'suneditor-react/dist/types/upload';
import { TOOLBAR } from '@/constants/constants';
import 'suneditor/dist/css/suneditor.min.css';
import { deleteImage, postSingleImage } from '@/lib/apis/imageApi';
import { toast } from 'react-toastify';

interface fileInfo {
  index: number;
  name: string;
  size: string | number;
  select: Function;
  delete: Function;
  element: Element;
  src: string;
}
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
  const imagesRef = useRef<fileInfo[]>([]);

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const handleImageUploadBefore = (
    files: Array<File>,
    info: object,
    uploadHandler: UploadBeforeHandler,
  ): UploadBeforeReturn => {
    postSingleImage(files[0], 'lectures')
      .then((data) => {
        uploadHandler({
          result: [
            {
              url: data,
              name: files[0].name,
              size: files[0].size,
            },
          ],
        });
      })
      .catch((error) => {
        toast.error('이미지 업로드 실패');
      });

    return undefined;
  };

  const handleImageUpload = async (
    targetElement: HTMLImageElement,
    index: number,
    state: 'create' | 'delete' | 'update',
    info: UploadInfo<HTMLImageElement>,
    remainingFilesCount: number,
  ) => {
    if (state === 'create' && editor.current) {
      imagesRef.current = [...editor.current.getImagesInfo()];
      console.log(imagesRef.current, '현재 이미지');
    } else if (state === 'delete' && editor.current) {
      const previousImages = [...imagesRef.current];
      const currentImages = editor.current.getImagesInfo();
      const deletedImages = previousImages.filter(
        (image) =>
          !currentImages.some((currentImage) => currentImage.src === image.src),
      );

      console.log(deletedImages, '삭제 진행한 이미지');

      // await deleteImage()

      imagesRef.current = previousImages.filter(
        (image) =>
          !deletedImages.some((deletedImage) => deletedImage.src === image.src),
      );
    }
  };

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

      <div className="w-full">
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
              width="100%"
              height={height}
              setContents={field.value}
              setOptions={{
                buttonList: TOOLBAR,
              }}
              placeholder={placeholder}
              getSunEditorInstance={getSunEditorInstance}
              onImageUploadBefore={handleImageUploadBefore}
              onImageUpload={handleImageUpload}
            />
          )}
        />
      </div>

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
