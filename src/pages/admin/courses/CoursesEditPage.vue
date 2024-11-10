<template>
  <q-page padding>
    <div>Editar curso</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input rounded outlined v-model="name" label="Nome" />

      <q-input rounded outlined v-model="summary" label="Resumo" />

      <q-input rounded outlined v-model="description" label="Descrição" />

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

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const result = await getById(Number(route.params.id));
  name.value = result.data.name;
  summary.value = result.data.summary;
  description.value = result.data.description;
});

const onSubmit = async () => {
  try {
    await update(Number(route.params.id), {
      name: name.value,
      summary: summary.value,
      description: description.value,
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
};
</script>
