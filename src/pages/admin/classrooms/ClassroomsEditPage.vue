<template>
  <q-page padding>
    <div>Editar salas</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input v-model="classroom" label="Sala" />

      <q-input v-model="total" label="Total" type="number" />

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
import { onMounted, ref } from 'vue';
import { getById, update } from 'src/services/admin/classrooms';
import { useRoute, useRouter } from 'vue-router';

const classroom = ref<string>('')
const total = ref<number>(0);

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const result = await getById(Number(route.params.id));
  classroom.value = result.data.classroom;
  total.value = result.data.total;
});

const onSubmit = async () => {
  try {
    await update(Number(route.params.id), {
      total: total.value,
      classroom: classroom.value,
    });
    await router.push('/admin/classrooms');
  } catch (error: unknown) {
    console.log(error);
  }
};

const onReset = () => {
  classroom.value = '';
  total.value = 0;
};
</script>
