<template>
  <q-page padding>
    <div>Listagem de alunos</div>

    <div>
      <q-btn color="primary" label="Adicionar" to="/student/new" />
    </div>

    <q-table :columns="columns" :rows="rows" row-key="name" title="Alunos">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="summary" :props="props">
            {{ props.row.email }}
          </q-td>
          <q-td key="description" :props="props">
            {{ props.row.phone }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn
              color="primary"
              label="Editar"
              class="q-ml-sm"
              :to="`/admin/students/${props.row.id}`"
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
import { getAll, destroy } from 'src/services/admin/students';
import { Student } from 'src/services/admin/students.d';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    field: (row: Student) => row.name,
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

const rows = ref<Student[]>([]);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  const response = await getAll();
  rows.value = response.data as Student[];
};

const onRemove = async (id: number) => {
  await destroy(id);
  await fetchData();
};
</script>
