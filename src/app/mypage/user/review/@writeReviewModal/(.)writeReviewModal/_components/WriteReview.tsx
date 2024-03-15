'use client';
import { Controller, FieldErrors, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { writeReview } from '@/lib/apis/reviewApis';
import { accessTokenReissuance } from '@/lib/apis/userApi';
import ClassSelect from './ClassSelect';
import { Button } from '@/components/Button';
import Rating from '@/components/Review/Rating';
import { SelectClassType, WriteReviewData } from '@/types/review';
import { FetchError } from '@/types/types';

interface WriteReview {
  options: SelectClassType[];
}

const WriteReview = ({ options }: WriteReview) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<WriteReviewData>();

  const onValid = async (data: WriteReviewData) => {
    const { classInfo } = data;

    const reqData = {
      lectureId: classInfo!.value.lectureSchedule.lecture.id,
      reservationId: classInfo!.value.id,
      stars: data.stars,
      description: data.description,
    };

    try {
      await writeReview(reqData);
      toast.success('리뷰 작성 완료');

      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        const fetchError = error as FetchError;
        if (fetchError.status === 401) {
          try {
            await accessTokenReissuance();
            await writeReview(reqData);
          } catch (error) {
            console.error(error);
          }
        } else {
          toast.error('잘못된 요청입니다!');
        }
      }
    }
  };

  const invalid = (data: FieldErrors<WriteReviewData>) => {
    Object.values(data).forEach(({ message }) => {
      toast.error(message);
    });
  };

  const selectClass = watch('classInfo');
  const selectStar = watch('stars');

  return (
    <section className="px-4 pt-14 sm:px-7 sm:py-6">
      <form
        onSubmit={handleSubmit(onValid, invalid)}
        className="flex flex-col gap-7"
      >
        <div className="flex flex-col">
          <label className="flex font-semibold" aria-required="true">
            클래스 선택
            <span className="align-top text-sub-color1">*</span>
          </label>
          <Controller
            name="classInfo"
            control={control}
            defaultValue={null}
            rules={{
              required: '클래스를 선택 해주세요.',
            }}
            render={({ field }) => (
              <ClassSelect
                options={options}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className={`flex items-center font-semibold ${
              selectClass ? 'text-black' : 'text-gray-300'
            }`}
            aria-required="true"
          >
            클래스 만족도
            <span className="align-top text-sub-color1">*</span>
            <p className="ml-1 text-sm">(별점을 클릭해 평가해주세요)</p>
          </label>
          <Controller
            name="stars"
            control={control}
            defaultValue={0}
            rules={{
              validate: (star) => {
                if (star === 0) return '클래스 만족도를 평가 해주세요.';
              },
            }}
            render={({ field }) => (
              <Rating
                rate={field.value}
                handleRate={field.onChange}
                bigStar={true}
                viewRate={false}
                viewSelectRate={true}
                readonly={!selectClass}
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className={`flex items-center font-semibold ${
              selectClass && selectStar !== 0 ? 'text-black' : 'text-gray-300'
            }`}
          >
            수강후기
          </label>
          <textarea
            {...register('description')}
            disabled={!selectClass || selectStar === 0}
            className="h-44 resize-none rounded-md border border-gray-500 p-3 focus:outline-sub-color1"
            maxLength={2000}
          />
        </div>

        <div className="sm:ml-auto sm:w-24">
          <Button type="submit">
            <p className="px-2">리뷰등록</p>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default WriteReview;
