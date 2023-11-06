import ReactPaginate from 'react-paginate';
import { ArrowRightSVG } from '@/icons/svg';
import '@/styles/pagination.css';

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedItem: { selected: number }) => void;
  marginPagesDisplayed?: number;
  pageRangeDisplayed?: number;
}

const navButtonStyle =
  'flex items-center gap-1 stroke-gray-500 text-gray-500 hover:stroke-sub-color1 hover:font-bold hover:text-sub-color1';

const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
  marginPagesDisplayed = 1,
  pageRangeDisplayed = 3,
}: PaginationProps) => {
  return (
    <ReactPaginate
      previousLabel={
        <p className={navButtonStyle}>
          <ArrowRightSVG className="mb-px h-[15px] w-[9px] rotate-180 " />
          이전
        </p>
      }
      nextLabel={
        <p className={navButtonStyle}>
          다음
          <ArrowRightSVG className="h-[15px] w-[9px]" />
        </p>
      }
      breakLabel="..."
      pageCount={pageCount}
      marginPagesDisplayed={marginPagesDisplayed}
      pageRangeDisplayed={pageRangeDisplayed}
      forcePage={currentPage}
      onPageChange={onPageChange}
      containerClassName="pagination"
      activeLinkClassName="active_a"
      pageLinkClassName="page_a"
    />
  );
};

export default Pagination;
