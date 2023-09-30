import Menu from './Menu';
import UserProfileLinks from './UserProfileLinks';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 mx-auto flex h-[7.6rem] w-screen max-w-[1440px] items-end justify-between bg-white/[.95] px-16 pb-5 backdrop-blur-sm">
      <Menu />
      <UserProfileLinks />
    </header>
  );
};

export default Header;
