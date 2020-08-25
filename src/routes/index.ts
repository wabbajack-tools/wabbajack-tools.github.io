import { createRouter, Route } from 'router5';
import browserPlugin from 'router5-plugin-browser';
import loggerPlugin from 'router5-plugin-logger';

type RouteName =
  | 'home'
  | 'test'
  | 'test.lel'
  | 'modlists'
  | 'modlists.gallery'
  | 'modlists.info'
  | 'modlists.status'
  | 'modlists.status.detailed'
  | 'modlists.search'
  | 'modlists.search.all'
  | 'modlists.search.single'
  | 'modlists.manifest';

interface IRoute extends Route<Record<string, any>> {
  name: RouteName;
}

const routes: IRoute[] = [
  { name: 'home', path: '/' },
  { name: 'test', path: '/test' },
  { name: 'test.lel', path: '/lel' },
  { name: 'modlists', path: '/modlists' },
  { name: 'modlists.gallery', path: '/gallery' },
  { name: 'modlists.info', path: '/info?:machineURL' },
  { name: 'modlists.status', path: '/status' },
  { name: 'modlists.status.detailed', path: '?:machineURL' },
  { name: 'modlists.search', path: '/search' },
  { name: 'modlists.search.all', path: '/all' },
  { name: 'modlists.search.single', path: '?:machineURL' },
  { name: 'modlists.manifest', path: '/manifest' },
];

const configureRouter = () => {
  const router = createRouter(routes, {
    defaultRoute: 'home',
  });

  router.usePlugin(browserPlugin({ useHash: true }));

  if (process.env.NODE_ENV === 'development') router.usePlugin(loggerPlugin);

  return router;
};

export { routes, configureRouter, RouteName };
