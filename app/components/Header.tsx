'use client';
import './Header.scss';
import MenuIcon from '@mui/icons-material/Menu';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Header = () => {
	const { data: session } = useSession();

	return (
		<header className="flex justify-center items-center p-4 bg-blue-200 m-auto">
			<div className="flex justify-between items-center w-full">
				<Link href="/">
					<MenuIcon />
				</Link>
				<div className="flex gap-2 justify-center items-center">
					<div className="header__button rounded-xl p-1 flex justify-center items-center bg-white">
						<SearchRoundedIcon />
					</div>
					<Link
						href="/newcardset"
						className="header__button rounded-xl p-1 flex justify-center items-center bg-white"
					>
						<AddCircleOutlineRoundedIcon />
					</Link>
					{session && session.user ? (
						<Link href="/api/auth/signout">
							<div className="rounded-full py-1 flex justify-center items-center bg-white signbutton">
								<p>Sign Out</p>
							</div>
						</Link>
					) : (
						<Link href="/api/auth/signin">
							<div className="rounded-full py-1 flex justify-center items-center bg-white signbutton">
								<p>Sign In</p>
							</div>
						</Link>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
