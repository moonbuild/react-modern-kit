import { useMemo } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import routeMap from '../constants/routes/route-map';
import { useTheme } from '../utils/theme/theme-context';

import './navbar.css';

const Navbar = () => {
  const { toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = (item: string) => {
    navigate(item);
  };
  const activeRoute = useMemo(() => location.pathname, [location.pathname]);

  interface navbarProps {
    key: string;
    value: string;
    path: string;
  }
  const navbarItems: navbarProps[] = [
    {
      key: 'home',
      value: 'Home',
      path: routeMap.home,
    },
    {
      key: 'table',
      value: 'Table',
      path: routeMap.table,
    },
  ];
  return (
    <nav className="navbar ">
      <div className="nav-left">
        <div className="nav-title" onClick={() => handleNavigate(routeMap.home)}>
          Modern Kit
        </div>
        <div className="nav-links">
          {navbarItems.map(({ key, value, path }) => (
            <div
              key={key}
              className={`nav-link-item ${activeRoute === path ? 'nav-item-active' : ''}`}
              onClick={() => handleNavigate(path)}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <div className="nav-right">
        {isDark ? (
          <Moon size={18} color="var(--neutral-1)" onClick={toggleTheme} />
        ) : (
          <Sun size={18} color="var(--neutral-1)" onClick={toggleTheme} />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
