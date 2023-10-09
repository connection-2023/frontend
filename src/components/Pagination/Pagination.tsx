import ReactPaginate from 'react-paginate';
import { ArrowRightSVG } from '../../../public/icons/svg';
import '@/styles/pagination.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
}

const navButtonStyle =
  'flex items-center gap-1 stroke-sub-color2 text-sub-color2 hover:stroke-sub-color1 hover:font-bold hover:text-sub-color1';

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      previousLabel={
        <div className={navButtonStyle}>
          <ArrowRightSVG className="mb-px h-[15px] w-[9px] rotate-180 " />
          이전
        </div>
      }
      nextLabel={
        <div className={navButtonStyle}>
          다음
          <ArrowRightSVG className="h-[15px] w-[9px]" />
        </div>
      }
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      initialPage={currentPage}
      onPageChange={onPageChange}
      containerClassName="pagination"
      activeLinkClassName="active_a"
      pageLinkClassName="page_a"
    />
  );
};

export default Pagination;
