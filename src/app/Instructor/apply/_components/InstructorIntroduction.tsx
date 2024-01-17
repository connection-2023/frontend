import {
  Controller,
  FieldError,
  FieldErrorsImpl,
  Merge,
  useFormContext,
} from 'react-hook-form';
import { SNS_ITEMS } from '@/constants/constants';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';
import SelectLocation from '@/components/SelectLocation/SelectLocation';
import CustomEditor from '@/components/TextArea/CustomEditor';
import UploadImage from '@/components/UploadImage/UploadImage';

const InstructorIntroduction = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <main className="my-10 flex flex-col gap-10">
      <section
        id="profileImageUrls"
        className="flex w-full flex-col border-b border-solid border-gray-500 pb-10"
      >
        <Controller
          name="profileImageUrls"
          control={control}
          rules={{
            required: '이미지',
          }}
          render={({ field }) => (
            <UploadImage
              onChange={field.onChange}
              errors={errors.profileImageUrls}
              situation="강사"
            />
          )}
        />
      </section>

      <IntroductionSection
        dataName="regions"
        title="지역"
        required={true}
        errors={errors.regions}
      >
        <Controller
          name="regions"
          control={control}
          defaultValue={{}}
          rules={{
            validate: (value) => {
              if (Object.keys(value).length === 0) {
                return '지역';
              }
            },
          }}
          render={({ field }) => (
            <SelectLocation
              defaultValue={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </IntroductionSection>

      <IntroductionSection
        dataName="genres"
        title="장르"
        required={true}
        errors={errors.genres}
      >
        <Controller
          name="genres"
          control={control}
          rules={{
            required: '장르',
          }}
          render={({ field }) => (
            <GenreCheckboxGroup onChange={field.onChange} />
          )}
        />
      </IntroductionSection>

      <IntroductionSection
        labelId="affiliation"
        dataName="affiliation"
        title="소속"
        required={false}
      >
        <input
          id="affiliation"
          type="text"
          className="rounded-md px-4 py-2 text-sm outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:text-base"
          placeholder="현재 속하고 있는 크루, 학원명 등을 적어주세요."
          {...register('affiliation')}
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
          <h2
            id="instagramPostUrls0"
            className={`font-bold ${
              (errors.instagramPostUrls0 ||
                errors.instagramPostUrls1 ||
                errors.instagramPostUrls2) &&
              'animate-vibration text-main-color'
            }`}
          >
            프로필에서 보여질 강사 인스타그램 게시물의 링크를 설정해주세요.
          </h2>
          <p className="text-gray-500">*최대 3개까지 표시 가능합니다.</p>
        </label>

        {Array.from({ length: 3 }).map((_, index) => (
          <input
            key={index}
            id={'link' + index}
            type="text"
            className="h-9 flex-grow rounded-md px-2 py-1 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-6"
            placeholder="게시물 주소 입력"
            {...register('instagramPostUrls' + index, {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: '올바른 인스타 주소',
              },
            })}
          />
        ))}
      </section>

      <CustomEditor
        title="강사소개"
        dataName="introduction"
        placeholder="어떤 목표를 두고 수업을 진행하는지, 개인적인 수업 방식, 본인의 특징, 이야기, 포부 등
        댄스 강사로서 소개를 자유롭게 작성해주세요."
        height="471px"
        maxLength={1000}
        minLength={150}
      />

      <CustomEditor
        title="강사경력"
        dataName="experience"
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
      {required && <p className="text-gray-500">(필수)</p>}
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
        className="h-9 flex-grow rounded-md px-2 py-1 outline outline-1 outline-gray-500 focus:outline-sub-color1 sm:h-6"
        placeholder={placeholder}
        {...register(dataName)}
      />
    </li>
  );
};

export default InstructorIntroduction;
