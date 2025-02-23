<template>
  <q-page padding>
    <div>Listagem de salas</div>

    <div>
      <q-btn color="primary" label="Adicionar" to="/admin/classrooms/create" />
    </div>

    <q-table :columns="columns" :rows="rows" row-key="name" title="Áreas">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="classroom" :props="props">
            {{ props.row.classroom }}
          </q-td>
          <q-td key="total" :props="props">
            {{ props.row.total }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn
              color="primary"
              label="Editar"
              class="q-ml-sm"
              :to="`/admin/classrooms/${props.row.id}`"
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
import { getAll, destroy } from 'src/services/admin/classrooms';
import { Classroom } from 'src/services/admin/classrooms.d';

const columns = [
  {
    name: 'classroom',
    required: true,
    label: 'Sala',
    field: 'classroom',
    sortable: true,
  },
  {
    name: 'total',
    required: true,
    label: 'Total',
    field: 'total',
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

const rows = ref<Classroom[]>([]);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  const response = await getAll();
  rows.value = response.data as Classroom[];
};

const onRemove = async (id: number) => {
  await destroy(id);
  await fetchData();
};
</script>
