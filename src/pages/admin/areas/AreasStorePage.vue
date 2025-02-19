<template>
  <q-page padding>
    <div>Adicionar área</div>

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
import { ref } from 'vue';
import { store } from 'src/services/admin/areas';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref<string>('');
const position = ref<number>(0);

const onSubmit = async () => {
  try {
    const result = await store({
      name: name.value,
      position: position.value,
    });
    console.log(result);
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
