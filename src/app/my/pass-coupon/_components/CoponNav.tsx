import ClassFilter from './ClassFilter';
import FilterOptions from './FilterOptions';
import SortOptions from './SortOptions';

const CoponNav = () => {
  return (
    <>
      <nav className="flex flex-wrap gap-5 border-y border-solid border-sub-color4 py-5">
        <FilterOptions />

        <ClassFilter />
      </nav>

      <SortOptions />
    </>
  );
};

export default CoponNav;
