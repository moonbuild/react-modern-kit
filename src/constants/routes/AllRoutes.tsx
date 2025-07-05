import type { RouteObject } from 'react-router-dom';

import Home from '../../components/pages/home/Home';
import Table from '../../components/pages/table/Table';

const AllRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/table',
    element: <Table />,
  },
];
export default AllRoutes;
