import Link from 'next/link';
import NavHomeIcon from '../atoms/navbar/nav-home-icon';
import NavSearchIcon from '../atoms/navbar/nav-search-icon';
import NavAPIcon from '../atoms/navbar/nav-ap-icon';
import NavLikeIcon from '../atoms/navbar/nav-like-icon';
import NavProIcon from '../atoms/navbar/nav-pro-icon';
import ThemeToggleButton from '../atoms/theme-toggle-button';
// import { ThemeProvider } from './theme-provider';

export default function NavBar() {

  return (
    <div>

      {/* <div className="flex justify-end">
        <ThemeProvider children={undefined} />
        <ThemeToggleButton />
        <ThemeProvider children={undefined} />
      </div> */}

      <nav className="mb-4">
        <ul className="container mx-auto flex justify-center sm:space-x-24 space-x-4">
          <li>
            <Link href="/">
              <NavHomeIcon />
            </Link>
          </li>
          <li>
            <Link href="/search">
              <NavSearchIcon />
            </Link>
          </li>
          <li>
            <Link href="/create-post">
              <NavAPIcon />
            </Link>
          </li>
          <li>
            <Link href="/likes">
              <NavLikeIcon />
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <NavProIcon />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
