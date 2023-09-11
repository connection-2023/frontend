import { NoticeSVG } from '../../../../public/icons/svg';

const Notice = ({ content }: { content: React.ReactNode }) => {
  return (
    <div className="w-full rounded-[0.63rem] border border-solid border-sub-color1 p-[0.96rem] text-sm">
      <h2 className="mb-2 flex items-center font-bold text-sub-color1">
        <NoticeSVG /> 공지사항
      </h2>
      <div>{content}</div>
    </div>
  );
};

export default Notice;
