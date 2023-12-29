import Link from 'next/link';
import { NotFoundSVG } from '@/icons/svg';

interface ListSectionProps {
  title: string;
  link: string;
  hasResults: boolean;
  children: React.ReactNode;
}

function ListSection({ title, link, hasResults, children }: ListSectionProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold ">{title}</h2>
        <Link
          href={link}
          className="text-gray-300 underline underline-offset-1"
        >
          {title} 더보기
        </Link>
      </div>
      {hasResults ? (
        children
      ) : (
        <div className="my-7 flex w-full flex-col items-center justify-center gap-8 text-lg font-semibold text-gray-100">
          <NotFoundSVG />
          <p>{title}</p>
        </div>
      )}
    </div>
  );
}

export default ListSection;
