import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/auth',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/LoginPage.vue') },
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    children: [
      {
        path: 'courses',
        component: () => import('pages/admin/courses/CoursesPage.vue'),
      },
      {
        path: 'courses/:id',
        component: () => import('pages/admin/courses/CoursesEditPage.vue'),
      },
      {
        path: 'courses/create',
        component: () => import('pages/admin/courses/CoursesStorePage.vue'),
      },
      {
        path: 'groups',
        component: () => import('pages/admin/groups/GroupsPage.vue'),
      },
      {
        path: 'groups/:id',
        component: () => import('pages/admin/groups/GroupsEditPage.vue'),
      },
      {
        path: 'groups/create',
        component: () => import('pages/admin/groups/GroupsStorePage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
