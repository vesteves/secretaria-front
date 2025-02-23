<template>
  <q-page padding>
    <div>Adicionar salas</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input v-model="classroom" label="Sala" />

      <q-input type="number" v-model="total" label="Total" />

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
          to="/admin/classrooms"
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { store } from 'src/services/admin/classrooms';
import { useRouter } from 'vue-router';

const router = useRouter();

const classroom = ref<string>('')
const total = ref<number>(0);

const onSubmit = async () => {
  try {
    const result = await store({
      classroom: classroom.value,
      total: total.value,
    });
    console.log(result);
    await router.push('/admin/classrooms');
  } catch (error: unknown) {
    console.log(error);
  }
};

const onReset = () => {
  total.value = 0;
};
</script>
