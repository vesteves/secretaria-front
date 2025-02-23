<template>
  <q-page padding>
    <div>Editar curso</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input v-model="name" label="Nome" />

      <q-input v-model="summary" label="Resumo" />

      <q-input v-model="description" label="Descrição" />

      <q-input v-model="position" label="Posição" type="number" />

      <q-input v-model="workload" label="Carga Horária" type="number" />

      <div>
        <q-toggle
          v-model="inCompany"
          label="inCompany"
        />
      </div>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />

        <q-btn
          color="primary"
          label="Voltar"
          to="/admin/courses"
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getById, update } from 'src/services/admin/courses';
import { useRoute, useRouter } from 'vue-router';

const name = ref<string>('');
const summary = ref<string>('');
const description = ref<string>('');
const position = ref<number>(0);
const workload = ref<number>(0);
const inCompany = ref<boolean>(false);

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const result = await getById(Number(route.params.id));
  name.value = result.data.name;
  summary.value = result.data.summary;
  description.value = result.data.description;
  position.value = result.data.position;
  workload.value = result.data.workload;
  inCompany.value = result.data.inCompany === 1;
});

const onSubmit = async () => {
  try {
    await update(Number(route.params.id), {
      name: name.value,
      summary: summary.value,
      description: description.value,
      position: position.value,
      workload: workload.value,
      inCompany: inCompany.value,
    });
    await router.push('/admin/courses');
  } catch (error: unknown) {
    console.log(error);
  }
};

const onReset = () => {
  name.value = '';
  summary.value = '';
  description.value = '';
  position.value = 0;
  workload.value = 0;
  inCompany.value = false;
};
</script>
