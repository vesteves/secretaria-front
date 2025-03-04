<template>
  <q-page padding>
    <div>Listagem de usuário</div>

    <div>
      <q-btn color="primary" label="Adicionar" to="/admin/users/create" />
    </div>

    <q-table :columns="columns" :rows="rows" row-key="name" title="Áreas">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="email" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="profile" :props="props">
            {{ props.row.profile }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn
              color="primary"
              label="Editar"
              class="q-ml-sm"
              :to="`/admin/users/${props.row.id}`"
            />
          </q-td>
          <q-td key="remove" :props="props">
            <q-btn
              color="primary"
              label="Remover"
              class="q-ml-sm"
              @click="onRemove(props.row.id)"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getAll, destroy } from 'src/services/admin/users';
import { User } from 'src/services/admin/users.d';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    field: 'name',
    sortable: true,
  },
  {
    name: 'email',
    required: true,
    label: 'E-mail',
    field: 'email',
    sortable: true,
  },
  {
    name: 'profile',
    required: true,
    label: 'Perfil',
    field: 'profile',
    sortable: true,
  },
  {
    name: 'edit',
    label: 'Editar',
    field: 'edit',
  },
  {
    name: 'remove',
    label: 'Remover',
    field: 'remove',
  },
];

const rows = ref<User[]>([]);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  const response = await getAll();
  rows.value = response.data as User[];
};

const onRemove = async (id: number) => {
  await destroy(id);
  await fetchData();
};
</script>
