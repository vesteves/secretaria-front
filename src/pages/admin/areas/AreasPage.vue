<template>
  <q-page padding>
    <div>Listagem de áreas</div>

    <div>
      <q-btn color="primary" label="Adicionar" to="/admin/areas/create" />
    </div>

    <q-table :columns="columns" :rows="rows" row-key="name" title="Áreas">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="position" :props="props">
            {{ props.row.position }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn
              color="primary"
              label="Editar"
              class="q-ml-sm"
              :to="`/admin/areas/${props.row.id}`"
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
import { getAll, destroy } from 'src/services/admin/areas';
import { Area } from 'src/services/admin/areas.d';

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nome',
    field: (row: Area) => row.name,
    sortable: true,
  },
  { name: 'position', label: 'Posição', field: 'position', sortable: true },
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

const rows = ref<Area[]>([]);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  const response = await getAll();
  rows.value = response.data as Area[];
};

const onRemove = async (id: number) => {
  await destroy(id);
  await fetchData();
};
</script>
