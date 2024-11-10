<template>
  <q-page padding>
    <div>Listagem de turmas</div>

    <div>
      <q-btn color="primary" label="Adicionar" to="/admin/groups/create" />
    </div>

    <q-table :columns="columns" :rows="rows" row-key="name" title="Turmas">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="start" :props="props">
            {{ date.formatDate(new Date(props.row.start), 'DD/MM/YYYY HH:mm') }}
          </q-td>
          <q-td key="end" :props="props">
            {{ date.formatDate(new Date(props.row.end), 'DD/MM/YYYY HH:mm') }}
          </q-td>
          <q-td key="price" :props="props">
            {{ (props.row.price / 100).toFixed(2) }}
          </q-td>
          <q-td key="discount" :props="props">
            {{ (props.row.discount / 100).toFixed(2) }}
          </q-td>
          <q-td key="course_id" :props="props">
            {{ props.row.course.name }}
          </q-td>
          <q-td key="edit" :props="props">
            <q-btn
              color="primary"
              label="Editar"
              class="q-ml-sm"
              :to="`/admin/groups/${props.row.id}`"
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
import { getAll, destroy } from 'src/services/admin/groups';
import { Group } from 'src/services/admin/groups.d';
import { date } from 'quasar';

const columns = [
  {
    name: 'start',
    required: true,
    label: 'Início',
    field: 'start',
    sortable: true,
  },
  { name: 'end', label: 'Fim', field: 'end', sortable: true },
  {
    name: 'price',
    label: 'Preço',
    field: 'price',
    sortable: true,
  },
  {
    name: 'discount',
    label: 'Desconto',
    field: 'discount',
    sortable: true,
  },
  {
    name: 'course_id',
    label: 'Curso',
    field: 'course_id',
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

const rows = ref<Group[]>([]);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  const response = await getAll({
    course: 'true',
  });
  rows.value = response.data as Group[];
};

const onRemove = async (id: number) => {
  await destroy(id);
  await fetchData();
};
</script>
