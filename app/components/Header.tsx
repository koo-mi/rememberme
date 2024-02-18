import MenuIcon from "@mui/icons-material/Menu";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-center items-center max-w-7xl p-4 bg-blue-200 m-auto">
      <div className="flex justify-between items-center w-full">
        <Link href="/">
          <MenuIcon />
        </Link>
        <div className="flex gap-1">
          <div>
            <SearchRoundedIcon />
          </div>
          <Link href="/newcardset">
            <AddCircleOutlineRoundedIcon />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
