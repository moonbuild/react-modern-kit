import { BrowserRouter, useRoutes } from 'react-router-dom';

import AllRoutes from './constants/routes/AllRoutes';
import Navbar from './components/Navbar';

import './variables.css';
import './App.css';

const AppContent = () => {
  const AppRoutes = () => {
    const element = useRoutes(AllRoutes);
    return element;
  };

  return (
    <BrowserRouter basename="/react-modern-kit/">
      <div className="app-content">
        <Navbar />
        <div className="app-body">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
};
export default AppContent;
