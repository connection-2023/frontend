import { Controller, useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { InstructorApplyState } from '@/recoil/Create/atoms';
import UploadImage from '@/components/UploadImage/UploadImage';
import SelectLocation from '@/components/SelectLocation/SelectLocation';
import GenreCheckboxGroup from '@/components/GenreCheckboxGroup/GenreCheckboxGroup';
import CustomEditor from '@/components/TextArea/CustomEditor';
import {
  InstagramSVG,
  LinkSVG,
  YoutubeSVG,
} from '../../../../../public/icons/svg';

const InstructorIntroduction = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  const applyData = useRecoilValue(InstructorApplyState);

  return (
    <main className="my-10 flex flex-col gap-8">
      <section
        id="applyImg"
        className=" mb-10 flex w-full flex-col border-b border-solid border-sub-color2"
      >
        <Controller
          name="applyImg"
          control={control}
          defaultValue={[]}
          rules={{
            required: '이미지',
          }}
          render={({ field }) => (
            <UploadImage
              onChange={field.onChange}
              defaultImg={applyData.instructorImg}
            />
          )}
        />
      </section>

      <section className="flex w-full flex-col">
        <div className="mb-2 flex font-bold">
          <h2>지역</h2>
          <p className="text-sub-color2">(필수)</p>
        </div>
        <Controller
          name="instructorLocation"
          control={control}
          rules={{
            required: '주소',
          }}
          render={({ field }) => <SelectLocation onChange={field.onChange} />}
        />
      </section>

      <section className=" flex w-full flex-col">
        <div className="mb-2 flex font-bold">
          <h2>장르</h2>
          <p className="text-sub-color2">(필수)</p>
        </div>
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
      </section>

      <section className="flex w-full flex-col gap-2">
        <h2 className="font-bold">소속</h2>
        <input
          type="text"
          className="rounded-[0.31rem] px-4 py-2 outline outline-1 outline-sub-color2"
          placeholder="현재 속하고 있는 크루, 학원명 등을 적어주세요."
        />
      </section>

      <section className="flex w-full flex-col gap-2">
        <h2 className="font-bold">SNS</h2>
        <ul className="flex flex-col gap-3">
          <li className="flex">
            <label className="flex w-32 items-center gap-1 font-semibold text-sub-color1">
              <InstagramSVG className="fill-sub-color1" />
              인스타그램
            </label>
            <input
              type="text"
              className="h-6 flex-grow rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2"
              placeholder="인스타그램 아이디"
            />
          </li>
          <li className="flex">
            <label className="flex w-32 items-center gap-1 font-semibold text-sub-color1">
              <YoutubeSVG className="stroke-sub-color1 [&>*:nth-child(1)]:fill-sub-color1" />
              유튜브
            </label>
            <input
              type="text"
              className="h-6 flex-grow rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2"
              placeholder="유튜브 링크"
            />
          </li>
          <li className="flex">
            <label className="flex w-32 items-center gap-1 font-semibold text-sub-color1">
              <LinkSVG className="fill-sub-color1" />
              홈페이지
            </label>
            <input
              type="text"
              className="h-6 flex-grow rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2 "
              placeholder="관련 홈페이지 링크"
            />
          </li>
        </ul>
      </section>

      <section className="flex w-full flex-col gap-3">
        <label className="mb-1">
          <h2 className="font-bold">
            프로필에서 보여질 강사 인스타그램 게시물의 링크를 설정해주세요.
          </h2>
          <p className="text-sub-color2">*최대 3개까지 표시 가능합니다.</p>
        </label>

        <input
          type="text"
          className="h-6 flex-grow rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2"
          placeholder="게시물 주소 입력"
        />

        <input
          type="text"
          className="h-6 flex-grow rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2"
          placeholder="게시물 주소 입력"
        />

        <input
          type="text"
          className="h-6 flex-grow rounded-[0.31rem] px-2 py-1 outline outline-1 outline-sub-color2"
          placeholder="게시물 주소 입력"
        />
      </section>

      <CustomEditor
        title="강사소개"
        dataName="classCurriculum"
        placeholder={`어떤 목표를 두고 수업을 진행하는지, 개인적인 수업 방식, 본인의 특징, 이야기, 포부 등
        댄스 강사로서 소개를 자유롭게 작성해주세요,`}
        height="471px"
        maxLength={1000}
        minLength={0}
      />

      <CustomEditor
        title="강사경력"
        dataName="classCurriculum"
        placeholder={`어떤 목표를 두고 수업을 진행하는지, 개인적인 수업 방식, 본인의 특징, 이야기, 포부 등
        댄스 강사로서 소개를 자유롭게 작성해주세요,`}
        height="303px"
        maxLength={500}
        minLength={0}
      />
    </main>
  );
};

export default InstructorIntroduction;
