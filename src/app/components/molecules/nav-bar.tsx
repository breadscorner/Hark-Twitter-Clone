import Link from 'next/link';
import HomeIcon from '../atoms/nav-home-icon';
import SearchIcon from '../atoms/nav-search-icon';
import AddIcon from '../atoms/nav-add-icon';
import LikeIcon from '../atoms/nav-like-icon';
import ProfileIcon from '../atoms/nav-profile-icon';

export default function NavBar() {
  return (
    <div>
      <nav className="mb-4">
        <ul className="container mx-auto flex justify-center space-x-24">
          <li>
              <HomeIcon />
          </li>
          <li>
              <SearchIcon />
          </li>
          <li>
              <AddIcon />
          </li>
          <li>
              <LikeIcon />
          </li>
          <li>
              <ProfileIcon />
          </li>
        </ul>
      </nav>
    </div>
  );
}
