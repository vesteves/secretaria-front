import { RouteRecordRaw } from 'vue-router';
import { useAdmin } from 'src/composables/useAdmin'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/GuestLayout.vue'),
    children: [{ path: '', redirect: '/auth/login', }],
  },

  {
    path: '/auth',
    component: () => import('layouts/GuestLayout.vue'),
    beforeEnter: async (to, from, next) => {
      const admin = useAdmin()

      if (await admin.checkAuth()) {
        return next('/admin/groups')
      }

      return next()
    },
    children: [
      { path: 'login', component: () => import('pages/auth/LoginPage.vue') },
    ],
  },

  {
    path: '/admin',
    component: () => import('layouts/AdminLayout.vue'),
    beforeEnter: async (to, from, next) => {
      const admin = useAdmin()

      if (!await admin.checkAuth()) {
        return next('/auth/login')
      }

      return next()
    },
    children: [
      {
        path: 'areas',
        component: () => import('pages/admin/areas/AreasPage.vue'),
      },
      {
        path: 'areas/:id',
        component: () => import('pages/admin/areas/AreasEditPage.vue'),
      },
      {
        path: 'areas/create',
        component: () => import('pages/admin/areas/AreasStorePage.vue'),
      },
      {
        path: 'classrooms',
        component: () => import('pages/admin/classrooms/ClassroomsPage.vue'),
      },
      {
        path: 'classrooms/:id',
        component: () => import('pages/admin/classrooms/ClassroomsEditPage.vue'),
      },
      {
        path: 'classrooms/create',
        component: () => import('pages/admin/classrooms/ClassroomsStorePage.vue'),
      },
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
      {
        path: 'students',
        component: () => import('pages/admin/students/StudentsPage.vue'),
      },
      {
        path: 'students/:id',
        component: () => import('pages/admin/students/StudentsEditPage.vue'),
      },
      {
        path: 'students/create',
        component: () => import('pages/admin/students/StudentsStorePage.vue'),
      },
      {
        path: 'users',
        component: () => import('pages/admin/users/UsersPage.vue'),
      },
      {
        path: 'users/:id',
        component: () => import('pages/admin/users/UsersEditPage.vue'),
      },
      {
        path: 'users/create',
        component: () => import('pages/admin/users/UsersStorePage.vue'),
      },
    ],
  },

  {
    path: '/student',
    component: () => import('layouts/GuestLayout.vue'),
    children: [
      {
        path: 'new',
        component: () => import('pages/student/CreatePage.vue'),
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
