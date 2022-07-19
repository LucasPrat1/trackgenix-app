import React, { lazy, Suspense } from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Layout from 'Components/Shared/Layout';

const Home = lazy(() => import('Components/Admin/Home'));
const Employees = lazy(() => import('Components/Admin/Employees'));
const Projects = lazy(() => import('Components/Admin/Projects'));

const adminRoutes = [
  { path: '/admin/employees', name: 'Employees' },
  { path: '/admin/projects', name: 'Projects' }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={adminRoutes} logout>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path={`${url}/home`} component={Home} />
          <Route path={`${url}/employees`} component={Employees} />
          <Route path={`${url}/projects`} component={Projects} />
          <Redirect to={`${url}/home`} />
        </Switch>
      </Suspense>
    </Layout>
  );
};

export default AdminRoutes;
