<template>
  <q-page padding>
    <div>Editar área</div>

    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input rounded outlined v-model="name" label="Nome" />

      <q-input rounded outlined v-model="position" label="Posição" type="number" />

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
          to="/admin/areas"
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getById, update } from 'src/services/admin/areas';
import { useRoute, useRouter } from 'vue-router';

const name = ref<string>('');
const position = ref<number>(0);

const route = useRoute();
const router = useRouter();

onMounted(async () => {
  const result = await getById(Number(route.params.id));
  name.value = result.data.name;
  position.value = result.data.position;
});

const onSubmit = async () => {
  try {
    await update(Number(route.params.id), {
      name: name.value,
      position: position.value,
    });
    await router.push('/admin/areas');
  } catch (error: unknown) {
    console.log(error);
  }
};

const onReset = () => {
  name.value = '';
  position.value = 0;
};
</script>
