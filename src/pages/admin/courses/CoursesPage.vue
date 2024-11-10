<template>
  <q-page padding>
    <div>Listagem de cursos</div>

    <div>
      <q-btn color="primary" label="Adicionar" to="/admin/courses/create" />
    </div>

    <q-table :columns="columns" :rows="rows" row-key="name" title="Cursos">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="summary" :props="props">
            {{ props.row.summary }}
          </q-td>
          <q-td key="description" :props="props">
            {{ props.row.description }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn
              color="primary"
              label="Editar"
              class="q-ml-sm"
              :to="`/admin/courses/${props.row.id}`"
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
import { getAll, destroy } from 'src/services/admin/courses';
import { Course } from 'src/services/admin/courses.d';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    field: (row: Course) => row.name,
    sortable: true,
  },
  { name: 'summary', label: 'Resumo', field: 'summary', sortable: true },
  {
    name: 'description',
    label: 'Descrição',
    field: 'description',
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

const rows = ref<Course[]>([]);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  const response = await getAll();
  rows.value = response.data as Course[];
};

const onRemove = async (id: number) => {
  await destroy(id);
  await fetchData();
};
</script>
