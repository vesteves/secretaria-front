<template>
  <q-page padding>
    <div>Adicionar curso</div>

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
import { ref } from 'vue';
import { store } from 'src/services/admin/courses';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref<string>('');
const summary = ref<string>('');
const description = ref<string>('');

const onSubmit = async () => {
  try {
    const result = await store({
      name: name.value,
      summary: summary.value,
      description: description.value,
    });
    console.log(result);
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
