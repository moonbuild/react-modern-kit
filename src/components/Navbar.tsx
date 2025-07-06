import { useMemo } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routeMap from '../constants/routes/route-map';
import { useTheme } from '../utils/theme/theme-context';

import './navbar.css';

const Navbar = () => {
  const { toggleTheme, isDark } = useTheme();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

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
      value: t('navbar.pages.home'),
      path: routeMap.home,
    },
    {
      key: 'table',
      value: t('navbar.pages.table'),
      path: routeMap.table,
    },
  ];

  return (
    <nav className="navbar ">
      <div className="nav-left">
        <div className="nav-title" onClick={() => handleNavigate(routeMap.home)}>
          {t('navbar.appName')}
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
        <div className="lang-box">
          <div
            className={`lang-left ${i18n.language === 'en' ? 'lang-active' : ''}`}
            onClick={() => changeLanguage('en')}
          >
            EN
          </div>
          <div
            className={`lang-middle ${i18n.language === 'fr' ? 'lang-active' : ''}`}
            onClick={() => changeLanguage('fr')}
          >
            FR
          </div>
          <div
            className={`lang-right ${i18n.language === 'tel' ? 'lang-active' : ''}`}
            onClick={() => changeLanguage('tel')}
          >
            TEL
          </div>
        </div>
        {isDark ? (
          <Moon size={18} color="var(--contrast)" onClick={toggleTheme} />
        ) : (
          <Sun size={18} color="var(--contrast)" onClick={toggleTheme} />
        )}
      </div>
    </nav>
  );
};
export default Navbar;
