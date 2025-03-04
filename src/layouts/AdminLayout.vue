<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Secretaria </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink, {
  EssentialLinkProps,
} from 'components/EssentialLink.vue';

defineOptions({
  name: 'AdminLayout',
});

const linksList: EssentialLinkProps[] = [
  {
    title: 'Áreas',
    caption: 'Divisão de Áreas',
    icon: 'school',
    link: '/admin/areas',
  },
  {
    title: 'Contratos',
    caption: 'Adminsitração de Contratos',
    icon: 'school',
    link: '/admin/contracts',
  },
  {
    title: 'Cursos',
    caption: 'Adminsitração de Cursos',
    icon: 'school',
    link: '/admin/courses',
  },
  {
    title: 'Turmas',
    caption: 'Adminsitração de Turmas',
    icon: 'school',
    link: '/admin/groups',
  },
  {
    title: 'Salas',
    caption: 'Salas disponíveis',
    icon: 'school',
    link: '/admin/classrooms',
  },
  {
    title: 'Usuários',
    caption: 'Usuários do sistema',
    icon: 'school',
    link: '/admin/users',
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
