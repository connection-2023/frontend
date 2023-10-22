import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { SNS_ITEMS } from '@/constants/constants';
import { InstructorApplyState } from '@/recoil/Create/atoms';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';
import SelectLocation from '@/components/SelectLocation/SelectLocation';
import CustomEditor from '@/components/TextArea/CustomEditor';
import UploadImage from '@/components/UploadImage/UploadImage';

const InstructorIntroduction = () => {
  const {
    register,
    control,
    formState: { errors },
    setFocus,
  } = useFormContext();

  const applyData = useRecoilValue(InstructorApplyState);

  return (
    <main className="my-10 flex flex-col gap-10">
      <section
        id="instructorImg"
        className="flex w-full flex-col border-b border-solid border-sub-color2 pb-10"
      >
        <Controller
          name="instructorImg"
          control={control}
          defaultValue={[]}
          rules={{
            required: '이미지',
          }}
          render={({ field }) => (
            <UploadImage
              onChange={field.onChange}
              defaultImg={applyData.instructorImg}
              errors={errors.instructorImg}
            />
          )}
        />
      </section>

      <IntroductionSection
        dataName="instructorLocation"
        title="지역"
        required={true}
        errors={errors.instructorLocation}
      >
        <Controller
          name="instructorLocation"
          control={control}
          rules={{
            required: '지역',
          }}
          render={({ field }) => <SelectLocation onChange={field.onChange} />}
        />
      </IntroductionSection>

      <IntroductionSection
        dataName="instructorGenre"
        title="장르"
        required={true}
        errors={errors.instructorGenre}
      >
        <Controller
          name="instructorGenre"
          control={control}
          defaultValue={[]}
          rules={{
            required: '장르',
          }}
          render={({ field }) => (
            <GenreCheckboxGroup
              onChange={field.onChange}
              defaultValue={applyData.instructorGenre}
            />
          )}
        />
      </IntroductionSection>

      <IntroductionSection
        labelId="affiliation"
        dataName="instructorAffiliation"
        title="소속"
        required={false}
      >
        <input
          id="affiliation"
          type="text"
          className="rounded-[0.31rem] px-4 py-2 outline outline-1 outline-sub-color2 focus:outline-sub-color1"
          placeholder="현재 속하고 있는 크루, 학원명 등을 적어주세요."
          {...register('instructorAffiliation')}
        />
      </IntroductionSection>

      <IntroductionSection title="SNS" required={false}>
        <ul className="flex flex-col gap-3">
          {SNS_ITEMS.map((item) => (
            <SNSItem key={item.title} {...item} />
          ))}
        </ul>
      </IntroductionSection>

      <section className="flex w-full flex-col gap-3">
        <label htmlFor="link0" className="mb-1">
          <h2 className="font-bold">
            프로필에서 보여질 강사 인스타그램 게시물의 링크를 설정해주세요.
          </h2>
          <p className="text-sub-color2">*최대 3개까지 표시 가능합니다.</p>
        </label>

        {Array.from({ length: 3 }).map((_, index) => (
          <input
            key={index}
            id={'link' + index}
            type="text"
            className="h-6 flex-grow rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2 focus:outline-sub-color1"
            placeholder="게시물 주소 입력"
            {...register('instructorInstagramLink' + index)}
          />
        ))}
      </section>

      <CustomEditor
        title="강사소개"
        dataName="applyIntroduction"
        placeholder="어떤 목표를 두고 수업을 진행하는지, 개인적인 수업 방식, 본인의 특징, 이야기, 포부 등
        댄스 강사로서 소개를 자유롭게 작성해주세요."
        height="471px"
        maxLength={1000}
        minLength={150}
      />

      <CustomEditor
        title="강사경력"
        dataName="applyCareer"
        placeholder="본인의 경력을 작성해주세요."
        height="303px"
        maxLength={500}
        minLength={0}
      />
    </main>
  );
};

interface IntroductionSection {
  labelId?: string;
  dataName?: string;
  title: string;
  required: boolean;
  children: JSX.Element;
  errors?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}

const IntroductionSection = ({
  labelId = undefined,
  dataName = undefined,
  title,
  required,
  children,
  errors,
}: IntroductionSection) => (
  <section className="flex w-full flex-col" id={dataName}>
    <label
      htmlFor={labelId}
      className={`mb-2 flex font-bold ${
        errors && 'animate-vibration text-main-color'
      }`}
    >
      <h2>{title}</h2>
      {required && <p className="text-sub-color2">(필수)</p>}
    </label>
    {children}
  </section>
);

interface SNSItemProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  title: string;
  placeholder: string;
  dataName: string;
}

const SNSItem = ({
  icon: Icon,
  title,
  placeholder,
  dataName,
}: SNSItemProps) => {
  const { register } = useFormContext();

  return (
    <li className="flex">
      <label
        className="flex w-32 items-center gap-1 font-semibold text-sub-color1"
        htmlFor={dataName}
      >
        <Icon
          className={
            title === '유튜브'
              ? 'stroke-sub-color1 [&>*:nth-child(1)]:fill-sub-color1'
              : 'fill-sub-color1'
          }
        />
        {title}
      </label>
      <input
        id={dataName}
        type="text"
        className="h-6 flex-grow rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2 focus:outline-sub-color1"
        placeholder={placeholder}
        {...register(dataName)}
      />
    </li>
  );
};

export default InstructorIntroduction;