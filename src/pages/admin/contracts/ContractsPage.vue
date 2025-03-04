<template>
  <q-page padding>
    <div>Listagem de contratos</div>

    <q-table :columns="columns" :rows="rows" row-key="name" title="Contratos">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="student.name" :props="props">
            {{ props.row.student.name }}
          </q-td>
          <q-td key="group.start" :props="props">
            {{ date.formatDate(new Date(props.row.group.start), 'DD/MM/YYYY HH:mm') }}
          </q-td>
          <q-td key="course.name" :props="props">
            {{ props.row.course.name }}
          </q-td>
          <q-td key="group_student_id" :props="props">
            {{ props.row.group_student_id }}
          </q-td>
          <q-td key="show" :props="props">
            <q-btn
              color="primary"
              label="Mostrar"
              class="q-ml-sm"
              :to="`/admin/contracts/${props.row.id}`"
            />
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { getAll } from 'src/services/admin/contracts';
import { Contract } from 'src/services/admin/contracts.d';
import { date } from 'quasar';

const columns = [
  { name: 'student.name', label: 'Aluno', field: 'student.name', sortable: true },
  { name: 'group.start', label: 'Turma', field: 'group.start', sortable: true },
  { name: 'course.name', label: 'Curso', field: 'course.name', sortable: true },
  { name: 'group_student_id', label: 'Matrícula', field: 'group_student_id', sortable: true },
  {
    name: 'show',
    label: 'Mostrar',
    field: 'show',
  },
];

const rows = ref<Contract[]>([]);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  const response = await getAll();
  rows.value = response.data as Contract[];
};

</script>
