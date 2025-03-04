<template>
  <q-page padding>
    <div>Listagem de contratos</div>

    <q-table :columns="columns" :rows="rows" row-key="name" title="Contratos">
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="student_id" :props="props">
            {{ props.row.student_id }}
          </q-td>
          <q-td key="group_id" :props="props">
            {{ props.row.group_id }}
          </q-td>
          <q-td key="course_id" :props="props">
            {{ props.row.course_id }}
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

const columns = [
  { name: 'student_id', label: 'Aluno', field: 'student_id', sortable: true },
  { name: 'group_id', label: 'Turma', field: 'group_id', sortable: true },
  { name: 'course_id', label: 'Curso', field: 'course_id', sortable: true },
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
